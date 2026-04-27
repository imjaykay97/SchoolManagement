import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, Check, X, Clock, Save } from 'lucide-react';
import './Attendance.css';

const Attendance = () => {
  // --- 0. Role Check ---
  const userRole = localStorage.getItem('role');

  // --- 1. Filter States ---
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedClass, setSelectedClass] = useState('10-A');
  const [attendanceData, setAttendanceData] = useState([]); 

  // --- 2. Classes List Generator ---
  const classesOptions = [];
  for (let i = 1; i <= 12; i++) {
    ['A', 'B', 'C'].forEach(section => {
      classesOptions.push(`${i}-${section}`);
    });
  }

  // --- 3. Fetch Students by Class ---
  const fetchStudentsByClass = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/students?classGrade=${selectedClass}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      
      const formattedData = res.data.map(student => ({
        id: student._id,
        roll: `#${student.rollNo}`,
        name: student.studentName, 
        status: "PRESENT" 
      }));
      
      setAttendanceData(formattedData);
    } catch (err) {
      console.error("Error fetching students:", err.message);
    }
  };

  useEffect(() => {
    fetchStudentsByClass();
  }, [selectedClass]);

  const updateStatus = (id, newStatus) => {
    // Security: Student cannot update status
    if (userRole !== 'admin') return;
    
    setAttendanceData(attendanceData.map(student => 
      student.id === id ? { ...student, status: newStatus } : student
    ));
  };

  // --- 4. Save Logic ---
  const handleSaveAttendance = async () => {
    // Security: Only Admin can save
    if (userRole !== 'admin') {
      alert("Unauthorized: Only Admin can save attendance.");
      return;
    }

    try {
        const payload = {
            date: selectedDate,
            classGrade: selectedClass,
            records: attendanceData.map(s => ({
                studentId: s.id,
                status: s.status
            }))
        };
        await axios.post('http://localhost:5000/api/attendance', payload, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        alert("Attendance Saved Successfully! ✅");
    } catch (err) {
        alert("Something went wrong while saving attendance. Please try again.");
    }
  };

  return (
    <div className="attendance-page">
      <div className="attendance-header">
        <div className="title-area">
          <h1>Daily <span className="red-glow">Attendance</span></h1>
          <p>Mark and track student presence for today.</p>
        </div>
        
        <div className="controls-area">
          {/* Admin controls: Date and Class select */}
          <div className="glass-input-box">
            <Calendar size={16} />
            <input 
              type="date" 
              value={selectedDate} 
              onChange={(e) => setSelectedDate(e.target.value)}
              disabled={userRole !== 'admin'} // Student date change nahi kar sakta
            />
          </div>

          <div className="glass-input-box">
            <select 
              className="attendance-select-main" 
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              disabled={userRole !== 'admin'} // Student class change nahi kar sakta
              style={{ background: 'transparent', border: 'none', color: 'white', outline: 'none', cursor: 'pointer' }}
            >
              {classesOptions.map(cls => (
                <option key={cls} value={cls} style={{color: 'black'}}>Class {cls}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="attendance-card">
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Student Name</th>
              <th>Current Status</th>
              {/* Mark Attendance column sirf Admin ke liye */}
              {userRole === 'admin' && <th className="center-text">Mark Attendance</th>}
            </tr>
          </thead>
          <tbody>
            {attendanceData.length > 0 ? (
              attendanceData.map((s) => (
                <tr key={s.id}>
                  <td className="roll-no">{s.roll}</td>
                  <td className="student-name">{s.name}</td>
                  <td>
                    <span className={`status-text ${s.status.toLowerCase()}`}>
                      {s.status}
                    </span>
                  </td>
                  {/* UPDATE: Buttons sirf Admin ko dikhenge */}
                  {userRole === 'admin' && (
                    <td>
                      <div className="attendance-actions">
                        <button 
                          className={`att-btn p-btn ${s.status === 'PRESENT' ? 'active' : ''}`}
                          onClick={() => updateStatus(s.id, 'PRESENT')}
                        >
                          <Check size={16} /> P
                        </button>
                        <button 
                          className={`att-btn a-btn ${s.status === 'ABSENT' ? 'active' : ''}`}
                          onClick={() => updateStatus(s.id, 'ABSENT')}
                        >
                          <X size={16} /> A
                        </button>
                        <button 
                          className={`att-btn l-btn ${s.status === 'LEAVE' ? 'active' : ''}`}
                          onClick={() => updateStatus(s.id, 'LEAVE')}
                        >
                          <Clock size={16} /> L
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={userRole === 'admin' ? "4" : "3"} style={{ textAlign: 'center', padding: '20px' }}>
                  No Records found for Class {selectedClass}
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* UPDATE: Save button sirf Admin ke liye */}
        {userRole === 'admin' && (
          <div className="footer-action">
            <button className="save-attendance-btn" onClick={handleSaveAttendance}>
              <Save size={18} /> Save Daily Records
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Attendance;