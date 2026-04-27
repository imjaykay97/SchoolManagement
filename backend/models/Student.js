const mongoose = require('mongoose');

// Student ka Schema design
const studentSchema = new mongoose.Schema({
    rollNo: {
        type: String,
        required: [true, "Roll Number zaroori hai"],
        unique: true, // Do students ka same roll no nahi ho sakta
        trim: true
    },
    studentName: {
        type: String,
        required: [true, "Student ka naam zaroori hai"],
        trim: true
    },
    className: {
        type: String,
        required: [true, "Class ka naam zaroori hai"],
        trim: true
    },
    parentName: {
        type: String,
        required: [true, "Parent/Guardian ka naam zaroori hai"],
        trim: true
    },
    status: {
        type: String,
        enum: ['ACTIVE', 'PENDING', 'INACTIVE'],
        default: 'ACTIVE'
    },
    admissionDate: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true // Isse createdAt aur updatedAt apne aap ban jayenge
});

// Model export karna
module.exports = mongoose.model('Student', studentSchema);