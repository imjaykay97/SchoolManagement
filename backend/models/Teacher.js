const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  teacherName: { type: String, required: true },
  subject: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  status: { type: String, default: 'Active' }, // Active ya On Leave
}, { timestamps: true });

module.exports = mongoose.model('Teacher', teacherSchema);