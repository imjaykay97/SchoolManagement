const mongoose = require('mongoose');
const Result = require('../models/result');
const Student = require('../models/Student'); // Path check kar lena (Case sensitive)

// 1. Naya Result add karna (Admin Side - ID Fix ke saath)
const addResult = async (req, res) => {
    try {
        const { studentId, examId, marksObtained, totalMarks } = req.body;

        if (!studentId || !examId) {
            return res.status(400).json({ message: "Student aur Exam ID zaroori hain!" });
        }

        // STEP: Student profile dhoondo taaki uski Login Account ID mil sake
        let actualLoginId = studentId;
        try {
            const studentProfile = await Student.findById(studentId);
            if (studentProfile && studentProfile.userId) {
                actualLoginId = studentProfile.userId;
                console.log("Match Found! Saving with Account ID:", actualLoginId);
            }
        } catch (err) {
            console.log("Student lookup failed, using provided ID.");
        }

        const percentage = (marksObtained / totalMarks) * 100;
        let grade = 'F';
        if (percentage >= 90) grade = 'A+';
        else if (percentage >= 80) grade = 'A';
        else if (percentage >= 70) grade = 'B+';
        else if (percentage >= 60) grade = 'B';
        else if (percentage >= 50) grade = 'C';
        else if (percentage >= 40) grade = 'D';

        const result = await Result.create({
            studentId: actualLoginId, 
            examId,
            marksObtained,
            totalMarks,
            grade,
            status: percentage >= 40 ? 'Pass' : 'Fail'
        });

        res.status(201).json(result);
    } catch (error) {
        console.error("Add Result Error:", error.message);
        res.status(500).json({ message: error.message });
    }
};

// 2. Logged-in student ka result (Jimin Fix - Double ID Check)
const getMyResults = async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: "Bhai, login toh kar lo pehle!" });
        }

        // Flexible Search: Jimin ki profile dhoondo uski login ID se
        const profile = await Student.findOne({ userId: req.user._id });
        
        // List banao: [Login ID, Profile ID]
        const idList = [req.user._id];
        if (profile) {
            idList.push(profile._id); 
        }

        console.log("Searching results for IDs:", idList);

        // '$in' use karke dono IDs check karo
        const results = await Result.find({ studentId: { $in: idList } })
            .populate('studentId', 'name  email')
            .populate('examId', 'subject date');
        
        res.status(200).json(results);
    } catch (error) {
        console.error("Get My Results Error:", error.message);
        res.status(500).json({ message: error.message });
    }
};

// 3. Saare Results fetch karna (Admin Side)
const getResults = async (req, res) => {
    try {
        const results = await Result.find()
            .populate('studentId', 'name studentName email') 
            .populate('examId', 'subject');
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 4. Update Result
const updateResult = async (req, res) => {
    try {
        const updatedResult = await Result.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedResult);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// 5. Delete Result
const deleteResult = async (req, res) => {
    try {
        await Result.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { 
    addResult, 
    getResults, 
    getMyResults, 
    updateResult, 
    deleteResult 
};