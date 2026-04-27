const Exam = require('../models/Exam');

// 1. Saare Exams fetch karna (Schedule Tab ke liye)
const getExams = async (req, res) => {
    try {
        // Database se saare exams mangwao aur date ke hisaab se sort karo
        const exams = await Exam.find().sort({ date: 1 });
        res.json(exams);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 2. Naya Exam Add/Schedule karna
const addExam = async (req, res) => {
    try {
        const { subject, date, time, room } = req.body;
        
        // Naya exam create karo updated model fields ke saath
        const exam = await Exam.create({
            subject,
            date,
            time,
            room
        });
        
        res.status(201).json(exam);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// 3. Exam Delete karna (Optional, par zaroori hai)
const deleteExam = async (req, res) => {
    try {
        const deletedExam = await Exam.findByIdAndDelete(req.params.id);
        if (!deletedExam) return res.status(404).json({ message: "Exam nahi mila" });
        res.json({ message: "Exam schedule delete ho gaya!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addExam, getExams, deleteExam };