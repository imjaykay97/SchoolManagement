const Attendance = require('../models/Attendance');

const saveAttendance = async (req, res) => {
    try {
        const { date, classGrade, records } = req.body;

        if (!date || !classGrade || !records) {
            return res.status(400).json({ success: false, message: "Data missing hai bhai!" });
        }

        // Format records to match model
        const formattedRecords = records.map(rec => ({
            studentId: rec.studentId || rec.id,
            status: rec.status
        }));

        const attendance = await Attendance.findOneAndUpdate(
            { date, classGrade },
            { records: formattedRecords },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        res.status(200).json({
            success: true,
            message: "Attendance makkhan ki tarah save ho gayi!",
            data: attendance
        });
    } catch (error) {
        console.error("Save Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const getAttendanceByDate = async (req, res) => {
    try {
        const { date, classGrade } = req.query;
        if (!date || !classGrade) {
            return res.status(400).json({ message: "Date aur Class zaroori hai!" });
        }

        const attendance = await Attendance.findOne({ date, classGrade })
            .populate('records.studentId', 'studentName rollNo');

        if (!attendance) {
            return res.status(404).json({ success: false, message: "Record nahi mila" });
        }

        res.status(200).json({ success: true, data: attendance });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { saveAttendance, getAttendanceByDate };