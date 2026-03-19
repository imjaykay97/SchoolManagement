import React from 'react';
import { Users, GraduationCap, IndianRupee, Activity, ArrowUpRight, Calendar } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1>Welcome Back, <span className="red-glow">Admin</span></h1>
          <p>Here's what's happening in your school today.</p>
        </div>
        <div className="date-display">
          <Calendar size={18} />
          <span>Thu, Mar 19, 2026</span>
        </div>
      </div>

      {/* --- Quick Stats Row --- */}
      <div className="stats-grid-dashboard">
        <div className="stat-card-elite">
          <div className="stat-icon blue"><Users size={24} /></div>
          <div className="stat-content">
            <p>Total Students</p>
            <h3>1,240</h3>
            <span className="growth">+12% this month</span>
          </div>
        </div>
        <div className="stat-card-elite">
          <div className="stat-icon red"><GraduationCap size={24} /></div>
          <div className="stat-content">
            <p>Total Teachers</p>
            <h3>84</h3>
            <span className="growth">Active Staff</span>
          </div>
        </div>
        <div className="stat-card-elite">
          <div className="stat-icon green"><IndianRupee size={24} /></div>
          <div className="stat-content">
            <p>Revenue</p>
            <h3>₹4.2L</h3>
            <span className="growth">+5% from last month</span>
          </div>
        </div>
      </div>

      <div className="dashboard-lower-grid">
        {/* --- Recent Activity Feed --- */}
        <div className="glass-panel activity-feed">
          <div className="panel-header">
            <h3>Recent Activity</h3>
            <button className="view-all-btn">View All</button>
          </div>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-dot green" />
              <p><strong>Kaur Rajvi</strong> (#147) paid tuition fees.</p>
              <span>2 mins ago</span>
            </div>
            <div className="activity-item">
              <div className="activity-dot red" />
              <p>Attendance marked for <strong>Class 10-A</strong>.</p>
              <span>1 hour ago</span>
            </div>
            <div className="activity-item">
              <div className="activity-dot blue" />
              <p>New Teacher <strong>Rahul Sharma</strong> joined.</p>
              <span>Yesterday</span>
            </div>
          </div>
        </div>

        {/* --- Quick Actions / Notice --- */}
        <div className="glass-panel notice-board">
          <h3>Notice Board</h3>
          <div className="notice-content">
            <div className="notice-card">
              <p className="notice-tag">Exam</p>
              <h4>Final Exams starting from April 5th.</h4>
              <span>Updated by Admin</span>
            </div>
            <button className="add-notice-btn">Post New Notice</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;