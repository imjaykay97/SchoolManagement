const Subject = require('../models/Subject');

/**
 * 1. CREATE: Naya subject add karne ke liye 
 * (Picture 2: "Create Subject" button)
 */
const addSubject = async (req, res) => {
    try {
        // req.body mein name, code, classGrade, teacherName aayenge
        const subject = await Subject.create(req.body);
        res.status(201).json(subject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * 2. READ: Saare subjects fetch karne ke liye
 * (Picture 1: Grid mein cards dikhane ke liye)
 */
const getAllSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find();
        res.status(200).json(subjects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * 3. UPDATE: Subject details change karne ke liye
 * (Picture 3: Pencil ✏️ icon click hone par)
 */
const updateSubject = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        
        // { new: true } se database update hone ke baad naya data return karta hai
        const subject = await Subject.findByIdAndUpdate(id, updatedData, { 
            new: true,
            runValidators: true // Validation check karne ke liye
        });
        
        if (!subject) {
            return res.status(404).json({ message: "Subject nahi mila bhai!" });
        }
        
        res.status(200).json(subject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * 4. DELETE: Subject udaane ke liye
 * (Picture 1: Dustbin 🗑️ icon click hone par)
 */
const deleteSubject = async (req, res) => {
    try {
        const { id } = req.params;
        const subject = await Subject.findByIdAndDelete(id);
        
        if (!subject) {
            return res.status(404).json({ message: "Subject pehle se uda diya gaya hai!" });
        }
        
        res.status(200).json({ message: "Subject successfully uda diya gaya!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { 
    addSubject, 
    getAllSubjects, 
    updateSubject, 
    deleteSubject 
};