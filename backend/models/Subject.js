const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    // Picture 2 fields
    name: { type: String, required: true }, // e.g. Quantum Physics
    code: { type: String, unique: true, required: true }, // PHY-101
    classGrade: { type: String, required: true }, // 10th - A
    
    // Picture 1 card fields (teacher add karte waqt linked hoga)
    teacherName: { type: String, default: "Not Assigned" }, // e.g. Anjali Gupta
    department: { type: String, default: "Academic" }, // General category
    
}, { timestamps: true });

module.exports = mongoose.model('Subject', subjectSchema);