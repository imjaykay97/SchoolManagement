const express = require('express');
const router = express.Router();

// 1. Controller se saare functions import karein
// Dhayan de: controller ka naam exact wahi hona chahiye jo tumhari file ka hai (classcontroller.js)
const { 
    getClasses, 
    createClass, 
    updateClass, 
    deleteClass 
} = require('../controllers/classcontroller');

// 2. Auth Middleware import karein
const { protect, adminOnly } = require('../middleware/authmiddleware');

// --- ROUTES LOGIC ---

/**
 * @route   GET /api/classes
 * @desc    Sabhi logged-in users saari classes dekh sakte hain
 */
router.get('/', protect, getClasses);

/**
 * @route   POST /api/classes
 * @desc    Sirf Admin nayi class create kar sakta hai
 */
router.post('/', protect, adminOnly, createClass);

/**
 * @route   PUT /api/classes/:id
 * @desc    Sirf Admin existing class ko update/edit kar sakta hai
 */
router.put('/:id', protect, adminOnly, updateClass);

/**
 * @route   DELETE /api/classes/:id
 * @desc    Sirf Admin kisi class ko delete kar sakta hai
 */
router.delete('/:id', protect, adminOnly, deleteClass);

module.exports = router;