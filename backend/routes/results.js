const express = require('express');
const router = express.Router();
const { 
    addResult, 
    getResults, 
    getMyResults, 
    updateResult, 
    deleteResult 
} = require('../controllers/resultcontroller');
const { protect, adminOnly } = require('../middleware/authmiddleware');

// 1. Logged-in Student ke liye (Sirf apna result dekhne ke liye)
// Isse upar rakhna zaroori hai taaki ye priority pe rahe
router.get('/my-results', protect, getMyResults);

// 2. Saare Results dekhne ke liye (Admin ke liye)
router.get('/', protect, adminOnly, getResults);

// 3. Naya result add karne ke liye (Admin/Teacher Only)
router.post('/', protect, adminOnly, addResult);

// 4. Result update karne ke liye (Admin Only)
router.put('/:id', protect, adminOnly, updateResult);

// 5. Result delete karne ke liye (Admin Only)
router.delete('/:id', protect, adminOnly, deleteResult);

module.exports = router;