import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BookOpen, Plus, X, GraduationCap, User, Layers, Trash2, Edit } from 'lucide-react';
import './Subjects.css';

const Subjects = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  
  const [formData, setFormData] = useState({
    subjectName: '', 
    subjectCode: '', 
    classGrade: '',
    teacherName: ''
  });

  const userRole = localStorage.getItem('role');
  const API_URL = 'http://localhost:5000/api/subjects';
  const token = localStorage.getItem('token');

  const fetchSubjects = async () => {
    try {
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSubjects(res.data);
    } catch (err) {
      console.error("Error fetching subjects:", err.message);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleEditClick = (subject) => {
    if (userRole !== 'admin') return;
    setIsEditMode(true);
    setCurrentId(subject._id);
    setFormData({
      subjectName: subject.name || subject.subjectName || '',
      subjectCode: subject.code || subject.subjectCode || '',
      classGrade: subject.classGrade || '',
      teacherName: subject.teacherName || ''
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isEditMode ? `${API_URL}/${currentId}` : API_URL;
      const method = isEditMode ? 'put' : 'post';

      // CRITICAL FIX: Mapping frontend state to backend requirements
      const dataToSubmit = {
        name: formData.subjectName, // Matches backend 'name'
        code: formData.subjectCode, // Matches backend 'code'
        classGrade: formData.classGrade,
        teacherName: formData.teacherName
      };

      await axios[method](url, dataToSubmit, {
        headers: { Authorization: `Bearer ${token}` }
      });

      handleCloseModal();
      fetchSubjects();
      alert(isEditMode ? "Subject Updated! ✨" : "Subject Created! 🎯");
    } catch (err) {
      const msg = err.response?.data?.message || "Something went wrong";
      // Duplicate Key Error handling
      if (msg.includes("E11000")) {
        alert("Error: Ye Subject Code (null ya duplicate) database mein pehle se hai! Compass se cleanup karein.");
      } else {
        alert(msg);
      }
    }
  };

  const handleDelete = async (id) => {
    if (userRole !== 'admin') return;
    if (window.confirm("Bhai, pakka uda du ye subject?")) {
      try {
        await axios.delete(`${API_URL}/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchSubjects();
      } catch (err) {
        console.error("Delete failed:", err.message);
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setCurrentId(null);
    setFormData({ subjectName: '', subjectCode: '', classGrade: '', teacherName: '' });
  };

  return (
    <div className="subjects-page-elite">
      <div className="subjects-header-modern">
        <div className="header-text">
          <h1>Academic <span className="red-glow-text">Subjects</span></h1>
          <p>Organize curriculum and assign faculty to departments.</p>
        </div>
        
        {userRole === 'admin' && (
          <button className="add-subject-btn-red" onClick={() => setIsModalOpen(true)}>
            <Plus size={18} />
            <span>Add New Subject</span>
          </button>
        )}
      </div>

      {isModalOpen && userRole === 'admin' && (
        <div className="modal-overlay-blur">
          <div className="elite-subject-modal animate-in">
            <div className="modal-header-lite">
              <h2>{isEditMode ? 'Update' : 'Create New'} <span className="red-glow-text">Subject</span></h2>
              <button className="icon-close-btn" onClick={handleCloseModal}><X size={20} /></button>
            </div>

            <form className="modern-form-layout" onSubmit={handleSubmit}>
              <div className="compact-input-box">
                <label>Subject Name</label>
                <div className="input-with-icon">
                   <BookOpen size={16} className="input-icon" />
                   <input 
                    type="text" 
                    placeholder="e.g. Maths" 
                    value={formData.subjectName}
                    onChange={(e) => setFormData({...formData, subjectName: e.target.value})}
                    required
                   />
                </div>
              </div>

              <div className="grid-split-2">
                <div className="compact-input-box">
                  <label>Subject Code</label>
                  <input 
                    type="text" 
                    placeholder="MT-101" 
                    value={formData.subjectCode}
                    onChange={(e) => setFormData({...formData, subjectCode: e.target.value})}
                    required
                  />
                </div>
                <div className="compact-input-box">
                  <label>Class / Grade</label>
                  <input 
                    type="text" 
                    placeholder="10th - A" 
                    value={formData.classGrade}
                    onChange={(e) => setFormData({...formData, classGrade: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="compact-input-box">
                <label>Assign Teacher</label>
                <select 
                  className="elite-select"
                  value={formData.teacherName}
                  onChange={(e) => setFormData({...formData, teacherName: e.target.value})}
                  required
                >
                  <option value="">Select Faculty Member</option>
                  <optgroup label="Core Science & Math">
                    <option value="Dr. Rahul Sharma">Dr. Rahul Sharma</option>
                    <option value="Prof. Priya Verma">Prof. Priya Verma</option>
                    <option value="Amit Verma">Amit Verma</option>
                    <option value="Neha Gupta">Neha Gupta</option>
                    <option value="Suresh Nair">Suresh Nair</option>
                  </optgroup>
                  <optgroup label="Arts & Languages">
                    <option value="Sneha Iyer">Sneha Iyer</option>
                    <option value="Anjali Desai">Anjali Desai</option>
                    <option value="Meera Joshi">Meera Joshi</option>
                    <option value="Sneha Reddy">Sneha Reddy</option>
                    <option value="Pooja Singh">Pooja Singh</option>
                  </optgroup>
                  <optgroup label="Additional Faculty">
                    <option value="Rohit Mehta">Rohit Mehta</option>
                    <option value="Karan Patel">Karan Patel</option>
                    <option value="Vikas Yadav">Vikas Yadav</option>
                    <option value="Nikhil Agarwal">Nikhil Agarwal</option>
                    <option value="Kavita Mishra">Kavita Mishra</option>
                    <option value="Manoj Kumar">Manoj Kumar</option>
                    <option value="Arun Kapoor">Arun Kapoor</option>
                    <option value="Sanjay Singhania">Sanjay Singhania</option>
                  </optgroup>
                </select>
              </div>

              <div className="modal-action-footer">
                <button type="button" className="action-btn-secondary" onClick={handleCloseModal}>Discard</button>
                <button type="submit" className="action-btn-primary">
                  {isEditMode ? 'Save Changes' : 'Create Subject'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="subjects-grid">
        {subjects.map((s) => (
          <div className="subject-card-elite" key={s._id}>
            <div className="card-top">
              <div className="subject-icon-box">
                <GraduationCap size={24} color="#e33411" />
              </div>
              {userRole === 'admin' && (
                <div className="subject-actions">
                  <button className="mini-btn edit" onClick={() => handleEditClick(s)}><Edit size={14} /></button>
                  <button className="mini-btn delete" onClick={() => handleDelete(s._id)}><Trash2 size={14} /></button>
                </div>
              )}
            </div>
            
            <h3 className="subject-title">{s.name || s.subjectName}</h3>
            <span className="subject-code-tag">{s.code || s.subjectCode}</span>
            
            <div className="subject-details-footer">
              <div className="detail-item"><Layers size={14} /> <span>{s.classGrade} Class</span></div>
              <div className="detail-item"><User size={14} /> <span>{s.teacherName || "Not Assigned"}</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subjects;