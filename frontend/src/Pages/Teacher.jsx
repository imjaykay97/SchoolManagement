import React, { useState, useEffect } from 'react';
import { UserPlus, X, Mail, Phone, Trash2, Edit, ShieldCheck } from 'lucide-react';
import axios from 'axios';
import './Teacher.css';

const Teacher = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [editingId, setEditingId] = useState(null); 
  const [formData, setFormData] = useState({
    teacherName: '',
    subject: '',
    email: '',
    phone: '',
    status: 'Active'
  });

  // --- ROLE CHECK ---
  const userRole = localStorage.getItem('role');

  const fetchTeachers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/teachers');
      setTeachers(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleEditClick = (teacher) => {
    // Extra Security Check
    if (userRole !== 'admin') return;

    setEditingId(teacher._id);
    setFormData({
      teacherName: teacher.teacherName,
      subject: teacher.subject,
      email: teacher.email,
      phone: teacher.phone,
      status: teacher.status || 'Active'
    });
    setIsModalOpen(true);
  };

  const handleSaveTeacher = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/teachers/${editingId}`, formData);
        alert("Teacher Updated Successfully! ✨");
      } else {
        await axios.post('http://localhost:5000/api/teachers', formData);
        alert("Teacher Added Successfully! 🎉");
      }
      
      handleCloseModal();
      fetchTeachers();
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong!");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({ teacherName: '', subject: '', email: '', phone: '', status: 'Active' });
  };

  const handleDelete = async (id) => {
    // Only Admin can Delete
    if (userRole !== 'admin') return;

    if (window.confirm("Kya aap sach mein is teacher ko nikalna chahte hain?")) {
      try {
        await axios.delete(`http://localhost:5000/api/teachers/${id}`);
        setTeachers(teachers.filter(t => t._id !== id));
        alert("Teacher Deleted!");
      } catch (err) {
        alert("Delete failed!");
      }
    }
  };

  return (
    <div className="teachers-page-elite">
      <div className="teachers-header-modern">
        <div className="header-text">
          <h1>Faculty <span className="red-glow-text">Directory</span></h1>
          <p>Manage and track {teachers.length} professional staff members.</p>
        </div>

        {/* UPDATE: Add button sirf Admin ko dikhega */}
        {userRole === 'admin' && (
          <button className="add-teacher-btn-red" onClick={() => setIsModalOpen(true)}>
            <UserPlus size={18} />
            <span>Add New Teacher</span>
          </button>
        )}
      </div>

      {/* --- MODAL FORM: Role check for security --- */}
      {isModalOpen && userRole === 'admin' && (
        <div className="modal-overlay-blur">
          <div className="elite-modal-box">
            <div className="modal-header-lite">
              <h2>{editingId ? "Edit" : "Add New"} <span className="red-glow-text">Teacher</span></h2>
              <button className="icon-close-btn" onClick={handleCloseModal}>
                <X size={20} />
              </button>
            </div>

            <form className="modern-form-layout" onSubmit={handleSaveTeacher}>
              <div className="compact-input-box">
                <label>Full Name</label>
                <input 
                  type="text" 
                  value={formData.teacherName}
                  onChange={(e) => setFormData({...formData, teacherName: e.target.value})}
                  required
                />
              </div>

              <div className="compact-input-box">
                <label>Subject Specialist</label>
                <input 
                  type="text" 
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  required
                />
              </div>

              <div className="grid-split-2">
                <div className="compact-input-box">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
                <div className="compact-input-box">
                  <label>Phone Number</label>
                  <input 
                    type="text" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="modal-action-footer">
                <button type="button" className="action-btn-secondary" onClick={handleCloseModal}>Discard</button>
                <button type="submit" className="action-btn-primary">
                  {editingId ? "Update Member" : "Save Faculty Member"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- TABLE --- */}
      <div className="glass-table-container">
        <table className="elite-faculty-table">
          <thead>
            <tr>
              <th>Profile & Name</th>
              <th>Department</th>
              <th>Contact Details</th>
              <th>Status</th>
              {/* UPDATE: Actions header sirf admin ko dikhega */}
              {userRole === 'admin' && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {teachers.map((t) => (
              <tr key={t._id}>
                <td>
                  <div className="teacher-profile-cell">
                    <div className="avatar-box">{t.teacherName?.charAt(0)}</div>
                    <div>
                      <div className="teacher-name-bold">{t.teacherName}</div>
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
                  <span className={`status-pill-modern ${t.status?.toLowerCase().replace(" ", "-")}`}>
                    <div className="status-dot"></div> {t.status || 'Active'}
                  </span>
                </td>
                {/* UPDATE: Actions column content sirf admin ko dikhega */}
                {userRole === 'admin' && (
                  <td>
                    <div className="action-btns-row">
                      <button className="icon-btn-edit" onClick={() => handleEditClick(t)}>
                        <Edit size={16} />
                      </button>
                      <button className="icon-btn-delete" onClick={() => handleDelete(t._id)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Teacher;