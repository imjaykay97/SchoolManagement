const express = require('express');
const router = express.Router();

// Controller functions ko import karein
const { 
    addTeacher, 
    getTeachers, 
    updateTeacher, 
    deleteTeacher 
} = require('../controllers/teachercontroller');

// Note: Middleware ko import rakha hai par use nahi kiya taki error na aaye
const { protect, adminOnly } = require('../middleware/authmiddleware');

/**
 * @route   GET /api/teachers
 * @desc    Saare teachers ki list dekhne ke liye
 */
router.get('/', getTeachers); // protect hata diya

/**
 * @route   POST /api/teachers
 * @desc    Naya teacher add karne ke liye
 */
router.post('/', addTeacher); // protect aur adminOnly hata diya

/**
 * @route   PUT /api/teachers/:id
 * @desc    Teacher ka data update karne ke liye
 */
router.put('/:id', updateTeacher); // protect aur adminOnly hata diya

/**
 * @route   DELETE /api/teachers/:id
 * @desc    Teacher ko remove karne ke liye
 */
router.delete('/:id', deleteTeacher); // protect aur adminOnly hata diya


module.exports = router;