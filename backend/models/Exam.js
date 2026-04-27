const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
    // 'examName' ki jagah 'subject' use kar rahe hain kyunki frontend mein subject hai
    subject: { 
        type: String, 
        required: true 
    },
    date: { 
        type: Date, 
        required: true 
    },
    // Naya field: Exam ka time (e.g., "10:00 AM")
    time: { 
        type: String, 
        required: true 
    },
    // Naya field: Room number (e.g., "Room 101")
    room: { 
        type: String, 
        required: true 
    },
    // Optional: Agar aapko class-wise exams rakhne hain
    class: { 
        type: String, 
        default: "All" 
    },
    totalMarks: { 
        type: Number, 
        default: 100 
    }
}, { timestamps: true });

module.exports = mongoose.model('Exam', examSchema);