import React, { useState, useEffect } from 'react';
import { Users, UserCircle, Plus, MoreVertical, X, Edit2, Trash2 } from 'lucide-react';
import axios from 'axios';
import './Classes.css';

const Classes = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null); 
  const [classes, setClasses] = useState([]); 
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ className: '', classTeacher: '', roomNumber: '' });

  // UPDATE: Login se role nikalna (key: 'role' use kar rahe hain)
  const userRole = localStorage.getItem('role');

  const getAuthConfig = () => {
    const token = localStorage.getItem('token');
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  const fetchClasses = async () => {
    try { 
      const config = getAuthConfig();
      const res = await axios.get('http://localhost:5000/api/classes', config);
      const data = Array.isArray(res.data) ? res.data : (res.data.classes || []);
      setClasses(data);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleDelete = async (id) => {
    // Security: Only Admin
    if (userRole !== 'admin') return;

    if (window.confirm("Do You want to delete this class?")) {
      try {
        const config = getAuthConfig();
        await axios.delete(`http://localhost:5000/api/classes/${id}`, config);
        alert("Class Deleted! 🗑️");
        setActiveMenu(null);
        fetchClasses(); 
      } catch (err) {
        alert("Error deleting class: " + (err.response?.data?.message || "Server Error"));
      }
    }
  };

  const handleEditClick = (item) => {
    // Security: Only Admin
    if (userRole !== 'admin') return;

    setIsEditing(true);
    setEditId(item._id);
    setFormData({ 
      className: item.className, 
      classTeacher: item.classTeacher, 
      roomNumber: item.roomNumber || '' 
    });
    setShowModal(true);
    setActiveMenu(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = getAuthConfig();
    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/classes/${editId}`, formData, config);
        alert("Class Updated! ✨");
      } else {
        await axios.post('http://localhost:5000/api/classes', formData, config);
        alert("Class Added Successfully! 🎉");
      }
      
      setShowModal(false);
      setIsEditing(false);
      setFormData({ className: '', classTeacher: '', roomNumber: '' });
      fetchClasses(); 
    } catch (err) {
      alert("Error: " + (err.response?.data?.message || "Something went wrong"));
    }
  };

  return (
    <div className="modern-classes-container">
      <div className="classes-header">
        <div className="header-text">
          <h1>Class <span className="text-highlight">Hub</span></h1>
          <p>Streamline your academic structure with ease.</p>
        </div>
        
        {/* UPDATE: New Class button sirf Admin ko dikhega */}
        {userRole === 'admin' && (
          <button className="add-btn-modern" onClick={() => { setIsEditing(false); setFormData({className:'', classTeacher:'', roomNumber:''}); setShowModal(true); }}>
            <div className="btn-icon"><Plus size={18} /></div>
            <span>New Class</span>
          </button>
        )}
      </div>

      {/* UPDATE: Modal protection */}
      {showModal && userRole === 'admin' && (
        <div className="glass-modal-overlay">
          <div className="glass-modal-content">
            <div className="modal-header">
              <h2 style={{color: 'white'}}>{isEditing ? "Edit Class" : "Add New Class"}</h2>
              <X style={{color: '#777', cursor: 'pointer'}} onClick={() => setShowModal(false)} />
            </div>
            <form className="modern-form" onSubmit={handleSubmit}>
              <div className="input-box">
                <label>Class Name</label>
                <input type="text" value={formData.className} onChange={(e) => setFormData({...formData, className: e.target.value})} required />
              </div>
              <div className="input-box">
                <label>Class Teacher</label>
                <select value={formData.classTeacher} onChange={(e) => setFormData({...formData, classTeacher: e.target.value})} required>
                  <option value="">Select Teacher</option>
                  <option value="Rahul Sharma">Rahul Sharma</option>
                  <option value="Priya Verma">Priya Verma</option>
                  <option value="Amit Singh">Amit Singh</option>
                  <option value="jimin Verma">Amit Verma</option>
                  <option value="Neha Gupta">Neha Gupta</option>
                  <option value="Rohit Mehta">Rohit Mehta</option>
                  <option value="Pooja Singh">Pooja Singh</option>
                  <option value="Karan Patel">Karan Patel</option>
                  <option value="Sneha Iyer">Sneha Iyer</option>
                  <option value="Vikas Yadav">Vikas Yadav</option>
                  <option value="Anjali Desai">Anjali Desai</option>
                  <option value="Suresh Nair">Suresh Nair</option>
                  <option value="Meera Joshi">Meera Joshi</option>
                  <option value="Arun Kapoor">Arun Kapoor</option>
                  <option value="Priya Shah">Priya Shah</option>
                  <option value="Nikhil Agarwal">Nikhil Agarwal</option>
                  <option value="Divya Reddy">Divya Reddy</option>
                  <option value="Manoj Kumar">Manoj Kumar</option>
                  <option value="Kavita Mishra">Kavita Mishra</option>
                </select>
              </div>
              <div className="input-box">
                <label>Room Number</label>
                <input type="text" value={formData.roomNumber} onChange={(e) => setFormData({...formData, roomNumber: e.target.value})} />
              </div>
              <button type="submit" className="confirm-btn">{isEditing ? "Save Changes" : "Create Now"}</button>
            </form>
          </div>
        </div>
      )}

      <div className="classes-grid-modern">
        {classes.length > 0 ? (
          classes.map((item) => (
            <div className="modern-card" key={item._id}>
              <div className="card-accent" style={{ background: '#e33411' }}></div>
              <div className="card-main">
                <div className="top-row">
                  <span className="room-badge">Room {item.roomNumber || 'N/A'}</span>
                  
                  {/* UPDATE: MoreVertical dots sirf Admin ko dikhenge */}
                  {userRole === 'admin' && (
                    <div style={{position: 'relative'}}>
                        <MoreVertical size={18} className="dots" onClick={() => setActiveMenu(activeMenu === item._id ? null : item._id)} />
                        {activeMenu === item._id && (
                            <div className="dropdown-menu-modern">
                                <button onClick={() => handleEditClick(item)}><Edit2 size={14} /> Edit</button>
                                <button className="delete-opt" onClick={() => handleDelete(item._id)}>
                                  <Trash2 size={14} /> Delete
                                </button>
                            </div>
                        )}
                    </div>
                  )}
                </div>
                <h2 className="class-title">{item.className}</h2>
                <div className="stats-row">
                  <div className="stat"><Users size={14} /><span>{item.studentsCount || 0} Students</span></div>
                  <div className="stat"><UserCircle size={14} /><span>{item.classTeacher}</span></div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p style={{color: 'white', textAlign: 'center', gridColumn: '1/-1'}}>No classes to display.</p>
        )}
      </div>
    </div>
  );
};

export default Classes;