const express = require('express');
const router = express.Router();
// updateSubject aur deleteSubject ko controller se import karo
const { 
    addSubject, 
    getAllSubjects, 
    updateSubject, 
    deleteSubject 
} = require('../controllers/subjectcontroller');
const { protect, adminOnly } = require('../middleware/authmiddleware');

// 1. Get All Subjects (Cards load karne ke liye)
router.get('/', protect,  getAllSubjects);

// 2. Add New Subject (Picture 2 wale modal se)
router.post('/', protect, adminOnly, addSubject);

// 3. Update Subject (Pencil ✏️ Logo ke liye)
// Isme ID parameter jayega taaki pata chale kaunsa subject edit ho raha hai
router.put('/:id', protect, adminOnly, updateSubject);

// 4. Delete Subject (Dustbin 🗑️ Logo ke liye)
router.delete('/:id', protect, adminOnly, deleteSubject);

module.exports = router;