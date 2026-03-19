import React, { useState } from 'react';
import { BookOpen, Plus, X, GraduationCap, User, Layers, Trash2, Edit } from 'lucide-react';
import './Subjects.css';

const Subjects = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // 7 Realistic Subjects Data
  const [subjects, setSubjects] = useState([
    { id: 1, name: "Mathematics", code: "MATH-101", class: "10th", teacher: "Rahul Sharma" },
    { id: 2, name: "Physics", code: "PHY-202", class: "12th", teacher: "Priya Verma" },
    { id: 3, name: "Chemistry", code: "CHEM-303", class: "11th", teacher: "Sandeep Patil" },
    { id: 4, name: "English Literature", code: "ENG-105", class: "10th", teacher: "Amit Khanna" },
    { id: 5, name: "Computer Science", code: "CS-404", class: "12th", teacher: "Sneha Reddy" },
    { id: 6, name: "Biology", code: "BIO-206", class: "11th", teacher: "Anjali Gupta" },
    { id: 7, name: "History", code: "HIST-108", class: "9th", teacher: "Vikram Singh" },
  ]);

  return (
    <div className="subjects-page-elite">
      <div className="subjects-header-modern">
        <div className="header-text">
          <h1>Academic <span className="red-glow-text">Subjects</span></h1>
          <p>Organize curriculum and assign faculty to departments.</p>
        </div>
        <button className="add-subject-btn-red" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          <span>Add New Subject</span>
        </button>
      </div>

      {/* --- ELITE MODAL FORM --- */}
      {isModalOpen && (
        <div className="modal-overlay-blur">
          <div className="elite-subject-modal">
            <div className="modal-header-lite">
              <h2>Create New <span className="red-glow-text">Subject</span></h2>
              <button className="icon-close-btn" onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form className="modern-form-layout" onSubmit={(e) => e.preventDefault()}>
              <div className="compact-input-box">
                <label>Subject Name</label>
                <div className="input-with-icon">
                   <BookOpen size={16} className="input-icon" />
                   <input type="text" placeholder="e.g. Quantum Physics" />
                </div>
              </div>

              <div className="grid-split-2">
                <div className="compact-input-box">
                  <label>Subject Code</label>
                  <input type="text" placeholder="PHY-101" />
                </div>
                <div className="compact-input-box">
                  <label>Class / Grade</label>
                  <input type="text" placeholder="10th - A" />
                </div>
              </div>

              <div className="compact-input-box">
                <label>Assign Teacher</label>
                <select className="elite-select">
                  <option value="">Select Faculty Member</option>
                  <option value="rahul">Rahul Sharma</option>
                  <option value="priya">Priya Verma</option>
                  <option value="sneha">Sneha Reddy</option>
                </select>
              </div>

              <div className="modal-action-footer">
                <button type="button" className="action-btn-secondary" onClick={() => setIsModalOpen(false)}>Discard</button>
                <button type="submit" className="action-btn-primary">Create Subject</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- SUBJECTS LIST CARD GRID --- */}
      <div className="subjects-grid">
        {subjects.map((s) => (
          <div className="subject-card-elite" key={s.id}>
            <div className="card-top">
              <div className="subject-icon-box">
                <GraduationCap size={24} color="#e33411" />
              </div>
              <div className="subject-actions">
                <button className="mini-btn"><Edit size={14} /></button>
                <button className="mini-btn"><Trash2 size={14} /></button>
              </div>
            </div>
            
            <h3 className="subject-title">{s.name}</h3>
            <span className="subject-code-tag">{s.code}</span>
            
            <div className="subject-details-footer">
              <div className="detail-item">
                <Layers size={14} /> <span>{s.class} Class</span>
              </div>
              <div className="detail-item">
                <User size={14} /> <span>{s.teacher}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subjects;