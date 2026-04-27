import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Layout Components
import Sidebar from './Components/Sidebar';
import Navbar from './Components/Navbar';

// Pages
import Login from './Pages/Login'; // <--- Naya Login Import
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

// Ek chhota wrapper component banaya hai taaki Login pe Sidebar na dikhe
const AppContent = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  return (
    <div className={isLoginPage ? "login-only-layout" : "modern-app-layout"}>
      {/* Agar Login page nahi hai, tabhi Sidebar aur Navbar dikhao */}
      {!isLoginPage && <Sidebar />}

      <div className={isLoginPage ? "" : "main-viewport"}>
        {!isLoginPage && <Navbar />}

        <div className={isLoginPage ? "" : "content-container"}>
          <Routes>
            {/* Pehla page ab Login hoga */}
            <Route path="/" element={<Login />} />
            
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/students" element={<StudentList />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/subjects" element={<Subjects />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/exams" element={<Exams />} />
            <Route path="/classes" element={<Classes />} />

            {/* Galat URL pe Login pe bhej do */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;