import React, { useState } from 'react';
import { UserPlus, X, Mail, Phone, Trash2, Edit, ShieldCheck } from 'lucide-react';
import './Teacher.css';

const Teacher= () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // 7 Teachers ka professional data
  const [teachers, setTeachers] = useState([
    { id: 1, name: "Rahul Sharma", subject: "Mathematics", email: "rahul.maths@school.com", phone: "+91 98765-43210", status: "Active" },
    { id: 2, name: "Priya Verma", subject: "Science", email: "priya.science@school.com", phone: "+91 87654-32109", status: "On Leave" },
    { id: 3, name: "Amit Khanna", subject: "English", email: "amit.eng@school.com", phone: "+91 76543-21098", status: "Active" },
    { id: 4, name: "Sneha Reddy", subject: "Computer Science", email: "sneha.cs@school.com", phone: "+91 99887-76655", status: "Active" },
    { id: 5, name: "Vikram Singh", subject: "History", email: "vikram.his@school.com", phone: "+91 88776-65544", status: "Active" },
    { id: 6, name: "Anjali Gupta", subject: "Geography", email: "anjali.geo@school.com", phone: "+91 77665-54433", status: "On Leave" },
    { id: 7, name: "Sandeep Patil", subject: "Physical Education", email: "sandeep.pe@school.com", phone: "+91 66554-43322", status: "Active" },
  ]);

  return (
    <div className="teachers-page-elite">
      <div className="teachers-header-modern">
        <div className="header-text">
          <h1>Faculty <span className="red-glow-text">Directory</span></h1>
          <p>Manage and track {teachers.length} professional staff members.</p>
        </div>
        <button className="add-teacher-btn-red" onClick={() => setIsModalOpen(true)}>
          <UserPlus size={18} />
          <span>Add New Teacher</span>
        </button>
      </div>

      {/* --- ELITE MODAL FORM --- */}
      {isModalOpen && (
        <div className="modal-overlay-blur">
          <div className="elite-modal-box">
            <div className="modal-header-lite">
              <h2>Add New <span className="red-glow-text">Teacher</span></h2>
              <button className="icon-close-btn" onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form className="modern-form-layout" onSubmit={(e) => e.preventDefault()}>
              <div className="compact-input-box">
                <label>Full Name</label>
                <input type="text" placeholder="e.g. Rahul Sharma" />
              </div>

              <div className="compact-input-box">
                <label>Subject Specialist</label>
                <input type="text" placeholder="e.g. Physics" />
              </div>

              <div className="grid-split-2">
                <div className="compact-input-box">
                  <label>Email Address</label>
                  <input type="email" placeholder="email@school.com" />
                </div>
                <div className="compact-input-box">
                  <label>Phone Number</label>
                  <input type="text" placeholder="+91 00000-00000" />
                </div>
              </div>

              <div className="modal-action-footer">
                <button type="button" className="action-btn-secondary" onClick={() => setIsModalOpen(false)}>Discard</button>
                <button type="submit" className="action-btn-primary">Save Faculty Member</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- TEACHERS TABLE --- */}
      <div className="glass-table-container">
        <table className="elite-faculty-table">
          <thead>
            <tr>
              <th>Profile & Name</th>
              <th>Department</th>
              <th>Contact Details</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((t) => (
              <tr key={t.id}>
                <td>
                  <div className="teacher-profile-cell">
                    <div className="avatar-box">{t.name.charAt(0)}</div>
                    <div>
                      <div className="teacher-name-bold">{t.name}</div>
                      <div className="verified-tag"><ShieldCheck size={10} /> Verified Faculty</div>
                    </div>
                  </div>
                </td>
                <td><span className="subject-tag">{t.subject}</span></td>
                <td>
                  <div className="contact-details-box">
                    <span><Mail size={12} className="red-icon" /> {t.email}</span>
                    <span><Phone size={12} className="red-icon" /> {t.phone}</span>
                  </div>
                </td>
                <td>
                  <span className={`status-pill-modern ${t.status.toLowerCase().replace(" ", "-")}`}>
                    <div className="status-dot"></div> {t.status}
                  </span>
                </td>
                <td>
                  <div className="action-btns-row">
                    <button className="icon-btn-edit"><Edit size={16} /></button>
                    <button className="icon-btn-delete"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Teacher;