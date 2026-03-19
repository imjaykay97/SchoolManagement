import React, { useState } from 'react';
import { Trophy, Calendar, X, Edit3, Trash2, Save, BookOpen, User, Hash, Star } from 'lucide-react';
import './Exams.css';

const Exams = () => {
  const [activeTab, setActiveTab] = useState('schedule');
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);
  const [newMarks, setNewMarks] = useState("");

  const [examData] = useState([
    { id: 1, subject: "Mathematics", date: "2026-04-05", time: "10:00 AM", room: "Room 101" },
    { id: 2, subject: "Science", date: "2026-04-07", time: "10:00 AM", room: "Lab A" },
    { id: 3, subject: "English", date: "2026-04-10", time: "09:00 AM", room: "Hall 2" },
  ]);

  const [resultsData, setResultsData] = useState([
    { id: 1, name: "Kaur Rajvi", roll: "#147", marks: "85", total: "100", grade: "A" },
    { id: 2, name: "Terma Jinal", roll: "#152", marks: "92", total: "100", grade: "A+" },
    { id: 3, name: "Syed Sadiya", roll: "#160", marks: "78", total: "100", grade: "B+" },
  ]);

  const handleEditClick = (student) => {
    setSelectedResult(student);
    setNewMarks(student.marks);
    setShowEditModal(true);
  };

  const handleSave = () => {
    setResultsData(resultsData.map(item => 
      item.id === selectedResult.id ? { ...item, marks: newMarks } : item
    ));
    setShowEditModal(false);
  };

  return (
    <div className="exams-page-elite">
      <div className="exams-header-modern">
        <div className="header-left">
          <h1>Examination <span className="red-glow-text">Portal</span></h1>
          <p>Manage schedules and track student academic performance.</p>
        </div>
        
        <div className="tab-switcher-glass">
          <button className={`tab-link ${activeTab === 'schedule' ? 'active' : ''}`} onClick={() => setActiveTab('schedule')}>
            <Calendar size={16} /> Schedule
          </button>
          <button className={`tab-link ${activeTab === 'results' ? 'active' : ''}`} onClick={() => setActiveTab('results')}>
            <Trophy size={16} /> Results
          </button>
        </div>
      </div>

      {/* --- ELITE EDIT MODAL --- */}
      {showEditModal && (
        <div className="modal-overlay-blur">
          <div className="elite-exam-modal">
            <div className="modal-header-lite">
              <h2>Update <span className="red-glow-text">Marks</span></h2>
              <button className="icon-close-btn" onClick={() => setShowEditModal(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body-content">
              <div className="student-info-tag">
                <User size={14} /> <span>{selectedResult.name} ({selectedResult.roll})</span>
              </div>
              
              <div className="compact-input-box">
                <label>Obtained Marks (out of 100)</label>
                <div className="input-with-icon">
                  <Star size={16} className="input-icon" />
                  <input 
                    type="number" 
                    value={newMarks}
                    onChange={(e) => setNewMarks(e.target.value)}
                    placeholder="Enter marks"
                    autoFocus
                  />
                </div>
              </div>

              <div className="modal-action-footer">
                <button className="action-btn-secondary" onClick={() => setShowEditModal(false)}>Cancel</button>
                <button className="action-btn-primary" onClick={handleSave}>
                  <Save size={18} /> Update Result
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- TABLES SECTION --- */}
      <div className="glass-table-wrapper">
        {activeTab === 'schedule' ? (
          <table className="elite-exam-table">
            <thead>
              <tr><th>Subject</th><th>Date</th><th>Time</th><th>Room No</th></tr>
            </thead>
            <tbody>
              {examData.map(ex => (
                <tr key={ex.id}>
                  <td>
                    <div className="subject-cell-elite">
                      <div className="icon-bg-red"><BookOpen size={16} /></div>
                      <span>{ex.subject}</span>
                    </div>
                  </td>
                  <td><span className="date-badge">{ex.date}</span></td>
                  <td>{ex.time}</td>
                  <td><span className="room-tag">{ex.room}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="elite-exam-table">
            <thead>
              <tr><th>Student Name</th><th>Roll No</th><th>Score</th><th>Grade</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {resultsData.map(res => (
                <tr key={res.id}>
                  <td>
                    <div className="student-cell-elite">
                      <div className="avatar-circle-sm">{res.name.charAt(0)}</div>
                      <span>{res.name}</span>
                    </div>
                  </td>
                  <td><span className="roll-text">{res.roll}</span></td>
                  <td><span className="marks-highlight">{res.marks}</span><span className="total-text">/100</span></td>
                  <td><span className={`grade-pill ${res.grade.toLowerCase().replace('+', '-plus')}`}>{res.grade}</span></td>
                  <td>
                    <div className="action-btns-row">
                      <button className="icon-btn-edit" onClick={() => handleEditClick(res)}><Edit3 size={16} /></button>
                      <button className="icon-btn-delete"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Exams;