import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Grid, 
  Users, 
  UserCheck, 
  GraduationCap, 
  BookOpen, 
  Calendar, 
  CreditCard, 
  ClipboardList, 
  LogOut 
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Active path check karne ke liye logic
  const isActive = (path) => location.pathname === path ? "nav-link active" : "nav-link";

  // Logout Function
  const handleLogout = () => {
    if (window.confirm("Bhai, sach mein logout karna hai?")) {
      navigate('/'); // Redirect to login/home
    }
  };

  return (
    <aside className="modern-sidebar">
      <div className="sidebar-brand">
        <div className="logo-glow"></div>
        <GraduationCap size={32} color="#e33411" />
        <h2>KOKO~<span>PANEL</span></h2>
      </div>

      <nav className="nav-menu">
        <Link to="/dashboard" className={isActive('/dashboard')}>
          <Grid size={20}/> <span>Dashboard</span>
        </Link>
        
        <Link to="/students" className={isActive('/students')}>
          <Users size={20}/> <span>Students</span>
        </Link>
        
        <Link to="/teachers" className={isActive('/teachers')}>
          <UserCheck size={20}/> <span>Teachers</span>
        </Link>

        <Link to="/classes" className={isActive('/classes')}>
          <GraduationCap size={20}/> <span>Classes</span>
        </Link>
        
        <Link to="/subjects" className={isActive('/subjects')}>
          <BookOpen size={20}/> <span>Subjects</span>
        </Link>
        
        <Link to="/attendance" className={isActive('/attendance')}>
          <Calendar size={20}/> <span>Attendance</span>
        </Link>
        
        <Link to="/payments" className={isActive('/payments')}>
          <CreditCard size={20}/> <span>Payments</span>
        </Link>
        
        <Link to="/exams" className={isActive('/exams')}>
          <ClipboardList size={20}/> <span>Exams</span>
        </Link>
      </nav>

       
       <div className="sidebar-footer">
     
      <button className="logout-modern" onClick={handleLogout}>
        <LogOut size={20} /> <span>Sign Out</span>
        </button>

        <div className="copyright-section">
        <p>©2026<span>koo~</span>. All Rights Reserved.</p>
       </div>
       </div>
    </aside>
  );
};

export default Sidebar;