import React, { useState } from 'react';
import { Calendar, Check, X, Clock, Save, ChevronDown } from 'lucide-react';
import './Attendance.css';

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([
    { id: 1, roll: "#147", name: "Kaur Rajvi", status: "LEAVE" },
    { id: 2, roll: "#152", name: "Terma Jinal", status: "PRESENT" },
    { id: 3, roll: "#160", name: "Syed Sadiya", status: "ABSENT" },
  ]);

  // Logic: Status change karne ke liye
  const updateStatus = (id, newStatus) => {
    setAttendanceData(attendanceData.map(student => 
      student.id === id ? { ...student, status: newStatus } : student
    ));
  };

  return (
    <div className="attendance-page">
      <div className="attendance-header">
        <div className="title-area">
          <h1>Daily <span className="red-glow">Attendance</span></h1>
          <p>Mark and track student presence for today.</p>
        </div>
        
        <div className="controls-area">
          <div className="glass-input-box">
            <Calendar size={16} />
            <input type="date" defaultValue="2026-03-19" />
          </div>
          <div className="glass-input-box">
            <span>Class 10-A</span>
            <ChevronDown size={16} />
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
              <th className="center-text">Mark Attendance</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((s) => (
              <tr key={s.id}>
                <td className="roll-no">{s.roll}</td>
                <td className="student-name">{s.name}</td>
                <td>
                  <span className={`status-text ${s.status.toLowerCase()}`}>
                    {s.status}
                  </span>
                </td>
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
              </tr>
            ))}
          </tbody>
        </table>

        <div className="footer-action">
          <button className="save-attendance-btn">
            <Save size={18} /> Save Daily Records
          </button>
        </div>
      </div>
    </div>
  );
};

export default Attendance;