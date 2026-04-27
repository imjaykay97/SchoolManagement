import React, { useState, useEffect } from 'react';
import { Trophy, Calendar, X, Edit3, Trash2, Plus } from 'lucide-react';
import axios from 'axios';
import './Exams.css';

const Exams = () => {
  const [activeTab, setActiveTab] = useState('schedule');
  const [showResultModal, setShowResultModal] = useState(false);
  const [showExamModal, setShowExamModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const userRole = localStorage.getItem('role'); 
  const userName = localStorage.getItem('userName'); // Login user ka naam
  const [exams, setExams] = useState([]);
  const [resultsData, setResultsData] = useState([]);
  const [students, setStudents] = useState([]);

  const [examForm, setExamForm] = useState({ subject: '', date: '', time: '', room: '' });
  const [resultForm, setResultForm] = useState({ studentId: '', examId: '', marksObtained: '', totalMarks: '100', id: null });

  const API_BASE = "http://localhost:5000/api";
  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const fetchData = async () => {
    try {
      const resultsUrl = userRole === 'student' ? `${API_BASE}/results/my-results` : `${API_BASE}/results`;
      const [resExams, resResults] = await Promise.all([
        axios.get(`${API_BASE}/exams`, config),
        axios.get(resultsUrl, config)
      ]);
      
      setExams(resExams.data);
      setResultsData(resResults.data);

      if (userRole === 'admin') {
        const resStudents = await axios.get(`${API_BASE}/students`, config);
        setStudents(resStudents.data);
      }
    } catch (err) { 
      console.error("Fetch Error:", err); 
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleScheduleExam = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE}/exams`, examForm, config);
      alert("Exam Scheduled! 📅");
      setShowExamModal(false);
      setExamForm({ subject: '', date: '', time: '', room: '' });
      fetchData();
    } catch (err) { alert("Error scheduling exam"); }
  };

  const handleAddResult = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`${API_BASE}/results/${resultForm.id}`, resultForm, config);
      } else {
        await axios.post(`${API_BASE}/results`, resultForm, config);
      }
      setShowResultModal(false);
      setIsEditing(false);
      setResultForm({ studentId: '', examId: '', marksObtained: '', totalMarks: '100', id: null });
      fetchData();
    } catch (err) { alert(err.response?.data?.message || "Error saving result"); }
  };

  const handleDeleteResult = async (id) => {
    if (window.confirm("Are you sure you want to delete this result?")) {
      try {
        await axios.delete(`${API_BASE}/results/${id}`, config);
        fetchData();
      } catch (err) { console.error("Delete error:", err); }
    }
  };

  const overlayStyle = { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 };
  const modalStyle = { backgroundColor: '#1a1a1a', padding: '25px', borderRadius: '15px', width: '90%', maxWidth: '450px', position: 'relative', border: '1px solid #333' };
  const inputStyle = { width: '100%', padding: '10px', marginTop: '5px', borderRadius: '8px', background: '#222', color: '#fff', border: '1px solid #444', outline: 'none' };

  return (
    <div className="exams-page-elite">
      <div className="exams-header-modern">
        <div className="header-left">
          <h1>Welcome, <span className="red-glow-text">{userName || 'Nikki'}</span></h1>
        </div>
        <div className="header-right-actions">
          <div className="tab-switcher-glass">
            <button className={`tab-link ${activeTab === 'schedule' ? 'active' : ''}`} onClick={() => setActiveTab('schedule')}><Calendar size={16} /> Schedule</button>
            <button className={`tab-link ${activeTab === 'results' ? 'active' : ''}`} onClick={() => setActiveTab('results')}><Trophy size={16} /> Results</button>
          </div>
          {userRole === 'admin' && (
            <button 
              className="action-btn-primary" 
              onClick={() => {
                if(activeTab === 'results') {
                  setIsEditing(false);
                  setResultForm({ studentId: '', examId: '', marksObtained: '', totalMarks: '100', id: null });
                  setShowResultModal(true);
                } else {
                  setShowExamModal(true);
                }
              }} 
              style={{ marginLeft: '20px', background: activeTab === 'results' ? '#FFD700' : '#e33411', color: activeTab === 'results' ? '#000' : '#fff' }}
            >
              <Plus size={18} /> {activeTab === 'results' ? 'Add Marks' : 'Schedule Exam'}
            </button>
          )}
        </div>
      </div>

      {/* --- Exam Modal --- */}
      {showExamModal && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h2>Schedule <span className="red-glow-text">Exam</span></h2>
              <button onClick={() => setShowExamModal(false)} style={{ background: 'none', border: 'none', color: '#fff' }}><X size={24} /></button>
            </div>
            <form onSubmit={handleScheduleExam}>
              <div style={{ marginBottom: '15px' }}><label>Subject</label><input type="text" required style={inputStyle} value={examForm.subject} onChange={(e)=>setExamForm({...examForm, subject: e.target.value})} /></div>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                <div style={{ flex: 1 }}>
                  <label>Date</label>
                  {/* FIXED: setExamForm used here instead of setExams to prevent state crash */}
                  <input type="date" required style={inputStyle} value={examForm.date} onChange={(e)=>setExamForm({...examForm, date: e.target.value})} />
                </div>
                <div style={{ flex: 1 }}><label>Time</label><input type="time" required style={inputStyle} value={examForm.time} onChange={(e)=>setExamForm({...examForm, time: e.target.value})} /></div>
              </div>
              <div style={{ marginBottom: '20px' }}><label>Room</label><input type="text" required style={inputStyle} value={examForm.room} onChange={(e)=>setExamForm({...examForm, room: e.target.value})} /></div>
              <button type="submit" className="action-btn-primary" style={{ width: '100%', padding: '12px' }}>Schedule Now</button>
            </form>
          </div>
        </div>
      )}

      {/* --- Result Modal --- */}
      {showResultModal && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h2>{isEditing ? 'Edit' : 'Add'} <span className="red-glow-text">Marks</span></h2>
              <button onClick={() => setShowResultModal(false)} style={{ background: 'none', border: 'none', color: '#fff' }}><X size={24} /></button>
            </div>
            <form onSubmit={handleAddResult}>
              <div style={{ marginBottom: '15px' }}>
                <label>Student</label>
                <select style={inputStyle} required value={resultForm.studentId} onChange={(e)=>setResultForm({...resultForm, studentId: e.target.value})}>
                  <option value="">-- Choose Student --</option>
                  {students.map(s => <option key={s._id} value={s._id}>{s.name || s.studentName}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label>Subject</label>
                <select style={inputStyle} required value={resultForm.examId} onChange={(e)=>setResultForm({...resultForm, examId: e.target.value})}>
                  <option value="">-- Choose Exam --</option>
                  {exams.map(ex => <option key={ex._id} value={ex._id}>{ex.subject}</option>)}
                </select>
              </div>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <div style={{ flex: 1 }}><label>Marks</label><input type="number" required style={inputStyle} value={resultForm.marksObtained} onChange={(e)=>setResultForm({...resultForm, marksObtained: e.target.value})} /></div>
                <div style={{ flex: 1 }}><label>Total</label><input type="number" required style={inputStyle} value={resultForm.totalMarks} onChange={(e)=>setResultForm({...resultForm, totalMarks: e.target.value})} /></div>
              </div>
              <button type="submit" className="action-btn-primary" style={{ width: '100%', padding: '12px' }}>Save Result</button>
            </form>
          </div>
        </div>
      )}

      <div className="glass-table-wrapper">
        <table className="elite-exam-table">
          <thead>
            {activeTab === 'schedule' ? (
              <tr><th>Subject</th><th>Date</th><th>Time</th><th>Room</th></tr>
            ) : (
              <tr><th>Student</th><th>Subject</th><th>Score</th><th>Grade</th>{userRole === 'admin' && <th>Actions</th>}</tr>
            )}
          </thead>
          <tbody>
            {activeTab === 'schedule' ? (
              exams.length > 0 ? (
                exams.map(ex => <tr key={ex._id}><td>{ex.subject}</td><td>{new Date(ex.date).toLocaleDateString()}</td><td>{ex.time}</td><td>{ex.room}</td></tr>)
              ) : (
                <tr><td colSpan="4" style={{ textAlign: 'center' }}>No Exams Scheduled</td></tr>
              )
            ) : (
              resultsData.length > 0 ? (
                resultsData.map(res => (
                  <tr key={res._id}>
                    <td className="student-name-cell">
                      {res.studentId?.name || res.studentId?.studentName || (userRole === 'student' ? userName : "Student")}
                    </td>
                    <td>{res.examId?.subject || "N/A"}</td>
                    <td>{res.marksObtained}/{res.totalMarks}</td>
                    <td><span className="grade-pill">{res.grade}</span></td>
                    {userRole === 'admin' && (
                      <td className="action-cell">
                        <button className="mini-btn-edit" onClick={() => { 
                          setIsEditing(true); 
                          setResultForm({ studentId: res.studentId?._id, examId: res.examId?._id, marksObtained: res.marksObtained, totalMarks: res.totalMarks, id: res._id }); 
                          setShowResultModal(true); 
                        }}><Edit3 size={16}/></button>
                        <button className="mini-btn-delete" onClick={() => handleDeleteResult(res._id)}><Trash2 size={16}/></button>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr><td colSpan={userRole === 'admin' ? 5 : 4} style={{ textAlign: 'center' }}>No Results Available</td></tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Exams;