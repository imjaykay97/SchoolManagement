const Teacher = require('../models/Teacher');

// 1. Naya Teacher add karne ke liye
const addTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.create(req.body);
        res.status(201).json({ success: true, teacher });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// 2. Saare Teachers ki list mangwane ke liye
const getTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find().sort({ createdAt: -1 }); // Naye teachers upar dikhenge
        res.json(teachers);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 3. Teacher ka data update karne ke liye (Action: Edit)
const updateTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true } // new: true se updated data wapas milta hai
        );

        if (!teacher) {
            return res.status(404).json({ success: false, message: "Teacher nahi mila" });
        }

        res.json({ success: true, teacher });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// 4. Teacher ko delete karne ke liye (Action: Delete)
const deleteTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.findByIdAndDelete(req.params.id);

        if (!teacher) {
            return res.status(404).json({ success: false, message: "Teacher nahi mila" });
        }

        res.json({ success: true, message: "Teacher deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { 
    addTeacher, 
    getTeachers, 
    updateTeacher, 
    deleteTeacher 
};