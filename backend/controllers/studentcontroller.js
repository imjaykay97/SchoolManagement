const Student = require('../models/Student');
const jwt = require('jsonwebtoken');

/**
 * @desc    Token banane ka helper function
 */
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secret123', {
        expiresIn: '30d',
    });
};

/**
 * @desc    1. Student Login Function
 * @route   POST /api/students/login
 */
const loginStudent = async (req, res) => {
    try {
        const { email, password } = req.body;
        const student = await Student.findOne({ email });

        if (student && (await student.matchPassword(password))) {
            res.json({
                success: true,
                _id: student._id,
                name: student.studentName,
                email: student.email,
                role: 'student',
                token: generateToken(student._id),
            });
        } else {
            res.status(401).json({ success: false, message: "Invalid Email or Password" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    2. Add Student (Admission logic)
 * @route   POST /api/students
 */
const addStudent = async (req, res) => {
    try {
        const { rollNo, studentName, className, parentName, email, password } = req.body;

        const studentExists = await Student.findOne({ email });
        if (studentExists) {
            return res.status(400).json({ message: "Student with this email already exists" });
        }

        const student = await Student.create({
            rollNo,
            studentName,
            className,
            parentName,
            email,
            password
        });

        res.status(201).json({ success: true, student });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @desc    3. Get Students (Attendance Filter + All Students for Payments)
 * @route   GET /api/students
 */
const getStudents = async (req, res) => {
    try {
        const { classGrade } = req.query; 
        let filter = {};

        // FIXED: Sirf tab filter lagao jab classGrade ki valid value ho
        // Agar Payments page se call aayegi toh classGrade 'undefined' ya khali hoga
        if (classGrade && classGrade !== "undefined" && classGrade !== "") {
            filter.className = classGrade; 
        }

        const students = await Student.find(filter).sort({ rollNo: 1 });
        
        // Debugging ke liye terminal mein count dikhega
        console.log(`Backend Log: ${students.length} students fetch huye hain.`);
        
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: "Data fetch error", error: error.message });
    }
};

/**
 * @desc    4. Update Student
 * @route   PUT /api/students/:id
 */
const updateStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);

        if (student) {
            student.rollNo = req.body.rollNo || student.rollNo;
            student.studentName = req.body.studentName || student.studentName;
            student.className = req.body.className || student.className;
            student.parentName = req.body.parentName || student.parentName;
            student.email = req.body.email || student.email;

            if (req.body.password) {
                student.password = req.body.password;
            }

            const updatedStudent = await student.save();
            res.json({ success: true, student: updatedStudent });
        } else {
            res.status(404).json({ success: false, message: "Student nahi mila" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Sabko ek saath export kar rahe hain
module.exports = {
    loginStudent,
    addStudent,
    getStudents,
    updateStudent
};