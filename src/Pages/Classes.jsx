import React, { useState } from 'react';
import { Users, UserCircle, BookOpen, Plus, MoreVertical, GraduationCap, X, Check, ArrowRight } from 'lucide-react';
import './Classes.css';

const Classes = () => {
  const [showModal, setShowModal] = useState(false);
  const [classList] = useState([
    { id: 1, name: "Class 10-A", teacher: "Rahul Sharma", students: "45", room: "101", color: "#e33411" },
    { id: 2, name: "Class 10-B", teacher: "Priya Verma", students: "42", room: "102", color: "#3498db" },
    { id: 3, name: "Class 9-A", teacher: "Amit Singh", students: "38", room: "201", color: "#2ecc71" },
  ]);

  return (
    <div className="modern-classes-container">
      <div className="classes-header">
        <div className="header-text">
          <h1>Class <span className="text-highlight">Hub</span></h1>
          <p>Streamline your academic structure with ease.</p>
        </div>
        <button className="add-btn-modern" onClick={() => setShowModal(true)}>
          <div className="btn-icon"><Plus size={18} /></div>
          <span>New Class</span>
        </button>
      </div>

      {showModal && (
        <div className="glass-modal-overlay">
          <div className="glass-modal-content">
            <div className="modal-header">
              <h2>Setup New Class</h2>
              <X className="close-btn" onClick={() => setShowModal(false)} />
            </div>
            <form className="modern-form" onSubmit={(e) => e.preventDefault()}>
              <div className="input-box">
                <label>Class Name</label>
                <input type="text" placeholder="e.g. 12-C" />
              </div>
              <div className="input-box">
                <label>Class Teacher</label>
                <select>
                  <option>Assign Mentor</option>
                  <option>Rahul Sharma</option>
                  <option>Priya Verma</option>
                </select>
              </div>
              <button className="confirm-btn" onClick={() => setShowModal(false)}>
                Confirm & Create
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="classes-grid-modern">
        {classList.map((item) => (
          <div className="modern-card" key={item.id}>
            <div className="card-accent" style={{ background: item.color }}></div>
            <div className="card-main">
              <div className="top-row">
                <span className="room-badge">Room {item.room}</span>
                <MoreVertical size={16} className="dots" />
              </div>
              
              <h2 className="class-title">{item.name}</h2>
              
              <div className="stats-row">
                <div className="stat">
                  <Users size={14} />
                  <span>{item.students} Students</span>
                </div>
                <div className="stat">
                  <UserCircle size={14} />
                  <span>{item.teacher}</span>
                </div>
              </div>

              <div className="card-action">
                <button className="action-link">
                  Manage Class <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Classes;