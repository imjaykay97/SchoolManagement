import React, { useState, useEffect } from 'react';
import { UserPlus, X, Edit2 } from 'lucide-react';
import axios from 'axios';
import './StudentList.css';

const StudentList = () => {
  const [showModal, setShowModal] = useState(false);
  const [students, setStudents] = useState([]);
  
  // --- NAYE STATES EDITING KE LIYE ---
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // UPDATE: Sahi key 'role' use kar rahe hain jo Login.jsx se aa rahi hai
  const userRole = localStorage.getItem('role');

  const [formData, setFormData] = useState({
    rollNo: '',
    studentName: '',
    className: '',
    parentName: '',
    email: '',
    password: ''
  });

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/students', {
        headers: { Authorization: `Bearer ${token}` }
      }); 
      setStudents(res.data);
    } catch (err) {
      console.error("Data load error:", err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditClick = (student) => {
    // Sirf Admin hi edit kar sakta hai
    if (userRole !== 'admin') return;

    setFormData({
      rollNo: student.rollNo,
      studentName: student.studentName,
      className: student.className,
      parentName: student.parentName,
      email: student.email,
      password: '' 
    });
    setCurrentId(student._id);
    setIsEditing(true); 
    setShowModal(true); 
  };

  const handleConfirmAdmission = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/students/${currentId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert("Student Updated Successfully!");
      } else {
        await axios.post('http://localhost:5000/api/students', formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert("Admission Successful!");
      }
      
      setShowModal(false);
      setIsEditing(false);
      fetchStudents(); 
      setFormData({ rollNo: '', studentName: '', className: '', parentName: '', email: '', password: '' });
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="students-page">
      <div className="students-header">
        <div className="title-group">
          <h1 className="main-title">Student <span className="red-accent">Management</span></h1>
          <p className="subtitle">Total Students: {students.length}</p>
        </div>
        
        {/* UPDATE: Sirf Admin ko dikhega Add button */}
        {userRole === 'admin' && (
          <button className="btn-add-student-red" onClick={() => { setIsEditing(false); setShowModal(true); }}>
            <UserPlus size={18} /> 
            <span>Add New Student</span>
          </button>
        )}
      </div>

      {/* MODAL: Extra security check with userRole */}
      {showModal && userRole === 'admin' && (
        <div className="modal-overlay">
          <div className="modal-content-glass">
            <div className="modal-header">
              <h2>{isEditing ? "Update Student" : "New Admission"}</h2>
              <X className="close-icon" onClick={() => setShowModal(false)} />
            </div>
            
            <form className="student-form" onSubmit={handleConfirmAdmission}>
              <div className="form-row-custom">
                <div className="form-input-group">
                  <label>Roll No</label>
                  <input type="text" name="rollNo" value={formData.rollNo} onChange={handleInputChange} required />
                </div>
                <div className="form-input-group">
                  <label>Class</label>
                  <input type="text" name="className" value={formData.className} onChange={handleInputChange} required />
                </div>
              </div>
              <div className="form-input-group">
                <label>Student Name</label>
                <input type="text" name="studentName" value={formData.studentName} onChange={handleInputChange} required />
              </div>
              <div className="form-input-group">
                <label>Parent Name</label>
                <input type="text" name="parentName" value={formData.parentName} onChange={handleInputChange} required />
              </div>
              <div className="form-row-custom">
                <div className="form-input-group">
                  <label>Login Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                </div>
                <div className="form-input-group">
                  <label>Password {isEditing && "(Leave blank to keep same)"}</label>
                  <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
                </div>
              </div>
              <button type="submit" className="submit-btn-red">
                {isEditing ? "Update Details" : "Confirm Admission"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TABLE */}
      <div className="glass-table-container">
        <table className="students-table-elite">
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Student Name</th>
              <th>Class</th>
              <th>Parent Name</th>
              {/* UPDATE: Actions column header sirf admin ko dikhega */}
              {userRole === 'admin' && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s._id}>
                <td>{s.rollNo}</td>
                <td>{s.studentName}</td>
                <td>{s.className}</td>
                <td>{s.parentName}</td>
                {/* UPDATE: Edit button sirf admin ko dikhega */}
                {userRole === 'admin' && (
                  <td>
                    <button className="edit-btn-mini" onClick={() => handleEditClick(s)}>
                      <Edit2 size={16} />
                    </button>
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

export default StudentList;