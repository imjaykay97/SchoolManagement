import React, { useState } from 'react';
import { UserPlus, X, Edit2 } from 'lucide-react';
import './StudentList.css';

const StudentList = () => {
  const [showModal, setShowModal] = useState(false);

  const [students] = useState([
    { id: 1, rollNo: "#147", name: "Kaur Rajvi", class: "10-A", parent: "Palray Ranjitsingh", status: "Active" },
    { id: 2, rollNo: "#152", name: "Terma Jinal", class: "10-B", parent: "Terma Bhikhubhai", status: "Active" },
    { id: 3, rollNo: "#160", name: "Syed Sadiya", class: "9-A", parent: "Syed aliabbas", status: "Pending" },
  ]);

  return (
    <div className="students-page">
      {/* Header Section with proper spacing */}
      <div className="students-header">
        <div className="title-group">
          <h1 className="main-title">Student <span className="red-accent">Management</span></h1>
          <p className="subtitle">Total Students: {students.length}</p>
        </div>
        
        {/* Modern Red Button */}
        <button className="btn-add-student-red" onClick={() => setShowModal(true)}>
          <UserPlus size={18} /> 
          <span>Add New Student</span>
        </button>
      </div>

      {/* --- MODAL SECTION --- */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content-glass">
            <div className="modal-header">
              <h2>New Admission</h2>
              <X className="close-icon" onClick={() => setShowModal(false)} />
            </div>
            
            <form className="student-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-row-custom">
                <div className="form-input-group">
                  <label>Roll No</label>
                  <input type="text" placeholder="#000" />
                </div>
                <div className="form-input-group">
                  <label>Class</label>
                  <input type="text" placeholder="10-A" />
                </div>
              </div>
              
              <div className="form-input-group">
                <label>Student Name</label>
                <input type="text" placeholder="Full name here" />
              </div>
              
              <div className="form-input-group">
                <label>Parent Name</label>
                <input type="text" placeholder="Guardian name" />
              </div>

              <button type="submit" className="submit-btn-red" onClick={() => setShowModal(false)}>
                Confirm Admission
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Table Section */}
      <div className="glass-table-container">
        <table className="students-table-elite">
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Student Name</th>
              <th>Class</th>
              <th>Parent Name</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id}>
                <td className="roll-cell">{s.rollNo}</td>
                <td className="name-cell">{s.name}</td>
                <td>{s.class}</td>
                <td>{s.parent}</td>
                <td>
                  <span className={`status-badge ${s.status.toLowerCase()}`}>
                    {s.status}
                  </span>
                </td>
                <td>
                  <button className="edit-btn-mini">
                    <Edit2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentList;