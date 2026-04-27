const Class = require('../models/Class');
const Student = require('../models/Student');

// 1. Saari classes get karne ke liye (With Real-time Student Count)
const getClasses = async (req, res) => {
    try {
        const classes = await Class.find();
        
        console.log("--- Backend Debug ---");
        console.log("DB se kitni classes mili:", classes.length);

        // Har class ke liye students ka count nikalne ka logic
        const classesWithCount = await Promise.all(classes.map(async (singleClass) => {
            // Student model mein check kar rahe hain ki is class mein kitne students hain
            // Note: Hum 'className' field use kar rahe hain jo aapke Student model mein hai
            const count = await Student.countDocuments({ className: singleClass.className });
            
            return {
                ...singleClass._doc,
                studentsCount: count // Yahan original 0 ki jagah actual count chala jayega
            };
        }));

        res.json(classesWithCount);
    } catch (error) {
        console.error("Fetch Error:", error.message);
        res.status(500).json({ message: error.message });
    }
};

// 2. Nayi class create karne ke liye
const createClass = async (req, res) => {
    try {
        console.log("Creating class with data:", req.body);
        const newClass = await Class.create(req.body);
        res.status(201).json(newClass);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// 3. Class update karne ke liye
const updateClass = async (req, res) => {
    try {
        const updatedClass = await Class.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        );
        if (!updatedClass) return res.status(404).json({ message: "Class nahi mili" });
        res.json(updatedClass);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// 4. Class delete karne ke liye
const deleteClass = async (req, res) => {
    try {
        const deletedClass = await Class.findByIdAndDelete(req.params.id);
        if (!deletedClass) return res.status(404).json({ message: "Class nahi mili!" });
        res.json({ success: true, message: "Class delete ho gayi!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getClasses, createClass, updateClass, deleteClass };