const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Naam zaroori hai"], trim: true },
    email: { type: String, required: [true, "Email zaroori hai"], unique: true, lowercase: true, trim: true },
    password: { type: String, required: [true, "Password zaroori hai"], minlength: 6 },
    role: { type: String, enum: ['admin', 'student'], default: 'student' },
}, { timestamps: true });

// Auto-hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);