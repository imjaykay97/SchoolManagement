const express = require('express');
const router = express.Router();

// Controller functions ko import karein
const { 
    getStudents, 
    addStudent, 
    loginStudent,
    updateStudent 
} = require('../controllers/studentcontroller');

// Middleware import karein
const { protect, adminOnly } = require('../middleware/authmiddleware');

/**
 * @route   POST /api/students/login
 * @desc    Student login
 * @access  Public
 */
router.post('/login', loginStudent);

/**
 * @route   GET /api/students
 * @desc    Saare students ki list ya Class-wise filtered list (Attendance ke liye)
 * @access  Protect (Middleware use karein taaki secure rahe)
 */
router.get('/', protect, getStudents);

/**
 * @route   POST /api/students
 * @desc    Naya student add karne ke liye (Admission)
 * @access  Protect/AdminOnly
 */
router.post('/', protect, adminOnly, addStudent);

/**
 * @route   PUT /api/students/:id
 * @desc    Student ka data update karne ke liye
 * @access  Protect
 */
router.put('/:id', protect, updateStudent);

module.exports = router;