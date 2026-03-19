import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layout Components
import Sidebar from './Components/Sidebar';
import Navbar from './Components/Navbar';

// Pages
import Dashboard from './Pages/Dashboard';
import StudentList from './Pages/StudentList';
import Teachers from './Pages/Teacher';
import Subjects from './Pages/Subjects';
import Attendance from './Pages/Attendance';
import Payments from './Pages/Payments';
import Exams from './Pages/Exams';
import Classes from './Pages/Classes';

// Styling
import './App.css';

function App() {
  return (
    <Router>
      <div className="modern-app-layout">
        {/* Fixed Sidebar - Jisme humne Sign Out logic dala hai */}
        <Sidebar />

        <div className="main-viewport">
          {/* Top Navbar for Notifications/Search */}
          <Navbar />

          {/* Dynamic Content Area */}
          <div className="content-container">
            <Routes>
              {/* Default landing page ko Dashboard par redirect kar diya */}
              <Route path="/" element={<Navigate to="/dashboard" />} />
              
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/students" element={<StudentList />} />
              <Route path="/teachers" element={<Teachers />} />
              <Route path="/subjects" element={<Subjects />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/exams" element={<Exams />} />
              <Route path="/classes" element={<Classes />} />

              {/* Kal hum yahan Login route add karenge */}
              {/* <Route path="/login" element={<Login />} /> */}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;