import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <nav className="top-navbar">
      {/* 1. Left Section: Khali jagah sidebar ke liye (ye alignment maintain karega) */}
      <div className="nav-placeholder"></div>

    {/* --- Center Section: Main Heading --- */}
     <div className="nav-center">
      {/* Yahan 'red-glow-text' class add kar di hai */}
      <h2 className="red-glow-text">School Management System</h2>
     </div>
      {/* 3. Right Section: Date aur Profile */}
      <div className="nav-right">
        <div className="time-box">
          <span className="current-date">{formattedDate}</span>
        </div>
        <div className="user-profile">
          <div className="status-indicator"></div>
          <span className="admin-tag">Admin</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;