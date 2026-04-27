const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    // Date ko String mein rakhna easy rehta hai (YYYY-MM-DD) filter karne ke liye
    date: { 
        type: String, 
        required: true 
    }, 
    // Class/Section (e.g., 10-A)
    classGrade: { 
        type: String, 
        required: true 
    },
    // Saare students ka status ek hi array mein save hoga
    records: [
        {
            studentId: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Student',
                required: true
            },
            status: { 
                type: String, 
                enum: ['PRESENT', 'ABSENT', 'LEAVE'], 
                default: 'PRESENT' 
            }
        }
    ]
}, { timestamps: true });

// Indexing taaki search fast ho (Same date aur same class ka ek hi record rahega)
attendanceSchema.index({ date: 1, classGrade: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', attendanceSchema);