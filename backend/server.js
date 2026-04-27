require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// 1. Connect to MongoDB Atlas
connectDB(); 

// 2. Middleware Configuration
app.use(cors());
app.use(express.json());

// Logger Middleware: Terminal mein har request ka track rakhne ke liye
app.use((req, res, next) => {
    console.log(`${req.method} request received at ${req.url}`);
    next();
});

// 3. Route Imports (Existing Names Only)
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/Admin');
const studentRoutes = require('./routes/students');
const teacherRoutes = require('./routes/teachers');
const attendanceRoutes = require('./routes/attendance');
const classRoutes = require('./routes/classes');
const examRoutes = require('./routes/exams'); // Pehle wala name
const paymentRoutes = require('./routes/payments'); 
const subjectRoutes = require('./routes/subjects');
const resultRoutes = require('./routes/results');

// 4. API Endpoints Configuration
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/students', studentRoutes); 
app.use('/api/teachers', teacherRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/exams', examRoutes); // Wahi variable jo upar define kiya hai
app.use('/api/payments', paymentRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/results', resultRoutes);

// 5. Basic Health Check & Welcome Route
app.get('/', (req, res) => {
    res.send("🚀 KOKO~PANEL Backend is Running Successfully...");
});

// 6. Global Error Handling Middleware
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    console.error(`Error: ${err.message}`);
    res.status(statusCode).json({
        success: false,
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

// 7. Server Initialization
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`📡 Server started on port ${PORT}`);
    console.log(`🔗 Local API: http://localhost:${PORT}`);
    console.log(`🛠️ Mode: ${process.env.NODE_ENV || 'Development'}`);
});