const express = require('express');
const router = express.Router();

// Controller functions ko import karein (Ensure file name: attendancecontroller.js)
const { 
    saveAttendance, 
    getAttendanceByDate 
} = require('../controllers/attendancecontroller');

// Middleware import karein
const { protect, adminOnly } = require('../middleware/authmiddleware');

/**
 * @route   POST /api/attendance
 * @desc    Save or Update daily attendance
 * @access  Protect & Admin Only
 */
router.post('/', protect, adminOnly, saveAttendance);

/**
 * @route   GET /api/attendance
 * @desc    Get attendance record for a specific date and class
 * @access  Protect
 */
router.get('/', protect, getAttendanceByDate);

module.exports = router;