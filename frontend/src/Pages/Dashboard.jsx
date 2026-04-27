import React, { useState, useEffect } from 'react';
import { Users, GraduationCap, IndianRupee, Calendar, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalTeachers, setTotalTeachers] = useState(0); 
  const [totalRevenue, setTotalRevenue] = useState(0);   
  const navigate = useNavigate();
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [noticeData, setNoticeData] = useState({ title: '', tag: 'Exam' });
  
  // Role aur Name localStorage se nikalna
  const userName = localStorage.getItem('userName');
  const userRole = localStorage.getItem('role');

  const [notices, setNotices] = useState([
    { title: "As per Date and Time, Tomorrow Will be Exam", tag: "Exam" }
  ]);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const API_BASE = "http://localhost:5000/api";

        // 1. Students Count
        const resStudents = await axios.get(`${API_BASE}/students`, config);
        setTotalStudents(resStudents.data.length);

        // 2. Teachers Count
        const resTeachers = await axios.get(`${API_BASE}/teachers`, config);
        setTotalTeachers(resTeachers.data.length);

        // 3. Revenue (Sirf admin ko dikhana chahiye ideally, par yahan fetch kar rahe hain)
        const resStats = await axios.get(`${API_BASE}/payments/stats`, config);
        setTotalRevenue(resStats.data.totalCollected || 0);

      } catch (err) {
        console.error("Dashboard Stats Error:", err);
      }
    };
    fetchDashboardStats();
  }, []);

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toLocaleDateString('en-GB', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const handlePostNotice = (e) => {
    e.preventDefault();
    if (noticeData.title) {
      setNotices([noticeData]); 
      setShowNoticeModal(false);
      setNoticeData({ title: '', tag: 'Exam' });
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          {/* UPDATE: Yahan 'Admin' hatakar dynamic userName laga diya hai */}
          <h1>Welcome Back, <span className="red-glow">{userName || 'User'}</span></h1>
          <p>{userRole === 'admin' ? "Here's what's happening in your school today." : "Here's your academic overview for today."}</p>
        </div>
        <div className="date-display">
          <Calendar size={18} />
          <span>{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
        </div>
      </div>

      <div className="stats-grid-dashboard">
        <div className="stat-card-elite">
          <div className="stat-icon blue"><Users size={24} /></div>
          <div className="stat-content">
            <p>Total Students</p>
            <h3>{totalStudents}</h3>
            <span className="growth">Enrolled</span>
          </div>
        </div>
        
        <div className="stat-card-elite">
          <div className="stat-icon red"><GraduationCap size={24} /></div>
          <div className="stat-content">
            <p>Total Teachers</p>
            <h3>{totalTeachers}</h3> 
            <span className="growth">Active Staff</span>
          </div>
        </div>

        {/* Revenue Card: Agar aap chahte hain ki student ko na dikhe toh yahan filter laga sakte hain */}
        {userRole === 'admin' && (
          <div className="stat-card-elite">
            <div className="stat-icon green"><IndianRupee size={24} /></div>
            <div className="stat-content">
              <p>Revenue</p>
              <h3>₹{totalRevenue.toLocaleString()}</h3>
              <span className="growth">Live Collection</span>
            </div>
          </div>
        )}
      </div>

      <div className="dashboard-lower-grid">
        <div className="glass-panel activity-feed">
          <div className="panel-header">
            <h3>Recent Activity</h3>
            {userRole === 'admin' && (
              <button className="view-all-btn" onClick={() => navigate('/students')}>
                View All
              </button>
            )}
          </div>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-dot green" />
              <p><strong>System:</strong> {totalStudents} students currently enrolled in the portal.</p>
              <span>Just now</span>
            </div>
          </div>
        </div>

        <div className="glass-panel notice-board">
          <h3>Notice Board</h3>
          <div className="notice-content">
            <div className="notices-scroll-area">
              {notices.length > 0 ? (
                <>
                  <div className="notice-card" style={{ marginBottom: '15px' }}>
                    <p className="notice-tag">{notices[0].tag}</p>
                    <h4>{notices[0].title}</h4>
                    <p className="updated-by">Updated by Admin</p>
                  </div>
                  <div className="notice-card date-box-highlight">
                    <p className="notice-tag" style={{ background: '#4a90e2' }}>SCHEDULE</p>
                    <h4 style={{ color: '#fff', fontSize: '1.2rem' }}>
                      Date: {getTomorrowDate()}
                    </h4>
                    <p className="updated-by">Exam Schedule Date</p>
                  </div>
                </>
              ) : (
                <p>No active notices.</p>
              )}
            </div>
            
            {/* Sirf Admin hi notice post kar sakta hai */}
            {userRole === 'admin' && (
              <button className="add-notice-btn" onClick={() => setShowNoticeModal(true)}>
                Post New Notice
              </button>
            )}
          </div>
        </div>
      </div>

      {showNoticeModal && (
        <div className="modal-overlay">
          <div className="modal-content-glass">
            <div className="modal-header">
              <h2>Post New Notice</h2>
              <X className="close-icon" onClick={() => setShowNoticeModal(false)} />
            </div>
            <form onSubmit={handlePostNotice} className="student-form">
              <div className="form-input-group">
                <label>Notice Message</label>
                <input 
                  type="text" 
                  placeholder="e.g. Tomorrow is holiday or Exam info"
                  value={noticeData.title}
                  onChange={(e) => setNoticeData({...noticeData, title: e.target.value})}
                  required 
                />
              </div>
              <div className="form-input-group">
                <label>Category</label>
                <select 
                  value={noticeData.tag}
                  onChange={(e) => setNoticeData({...noticeData, tag: e.target.value})}
                >
                  <option value="Exam">Exam</option>
                  <option value="Holiday">Holiday</option>
                  <option value="General">General</option>
                </select>
              </div>
              <button type="submit" className="submit-btn-red">Update Notice Board</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;