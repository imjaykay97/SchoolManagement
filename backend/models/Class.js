const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    className: { type: String, required: true },
    classTeacher: { type: String, required: true }, // Baad mein ise Teacher ID se link kar sakte hain
    studentsCount: { type: Number, default: 0 },
    roomNumber: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Class', classSchema);