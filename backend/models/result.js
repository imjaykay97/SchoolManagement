const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    // Student ko link karne ke liye
    studentId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Student', // Dhyaan rakhna ye wahi naam ho jo aapne student model mein rakha hai
        required: true 
    },
    // Kaunse exam ka result hai uske liye link
    examId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Exam', // Dhyaan rakhna ye wahi naam ho jo aapne exam model mein rakha hai
        required: true 
    },
    // Marks ki details
    marksObtained: { 
        type: Number, 
        required: true 
    },
    totalMarks: { 
        type: Number, 
        default: 100 
    },
    // Grade logic controller mein handle hoga, par yahan save karenge
    grade: { 
        type: String,
        required: true
    },
    // Status (Pass/Fail)
    status: { 
        type: String, 
        enum: ['Pass', 'Fail'], 
        default: 'Pass' 
    }
}, { timestamps: true });

module.exports = mongoose.model('Result', resultSchema);