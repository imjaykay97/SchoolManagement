const express = require('express');
const router = express.Router();
// Humne controller mein getExams aur deleteExam functions bhi add kiye hain
const { addExam, getExams, deleteExam } = require('../controllers/examcontroller');
const { protect, adminOnly } = require('../middleware/authmiddleware');

// 1. Saare Exams fetch karne ke liye (GET /api/exams)
// Ye dashboard aur schedule tab dono mein kaam aayega
router.get('/', protect, getExams);

// 2. Naya Exam Schedule karne ke liye (POST /api/exams)
router.post('/', protect, adminOnly, addExam);

// 3. Exam Schedule delete karne ke liye (DELETE /api/exams/:id)
router.delete('/:id', protect, adminOnly, deleteExam);

module.exports = router;