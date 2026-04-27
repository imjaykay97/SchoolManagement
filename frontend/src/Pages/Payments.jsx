import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CreditCard, Search, CheckCircle, TrendingUp, Users, Wallet, Plus, X, Save } from 'lucide-react';
import './Payments.css';

const Payments = () => {
  // --- 0. Role & User Info ---
  const userRole = localStorage.getItem('role');
  const userInfo = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;

  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [payments, setPayments] = useState([]); 
  const [students, setStudents] = useState([]); 
  const [classes, setClasses] = useState([]); 
  const [selectedClass, setSelectedClass] = useState(""); 
  const [stats, setStats] = useState({ totalPaid: 0, totalPending: 0 });

  const API_BASE = "http://localhost:5000/api";

  const getAuthConfig = () => {
    const token = localStorage.getItem("token") || userInfo?.token;
    return {
      headers: { Authorization: `Bearer ${token}` }
    };
  };

  // 1. Initial Data Fetching
  const fetchData = async () => {
    try {
      const config = getAuthConfig();
      
      // Admin ke liye saari payments, Student ke liye sirf uski apni
      const resPayments = await axios.get(`${API_BASE}/payments`, config);
      setPayments(resPayments.data || []);

      // Stats aur Classes sirf Admin ke liye fetch karenge
      if (userRole === 'admin') {
        const resStats = await axios.get(`${API_BASE}/payments/stats`, config);
        const resClasses = await axios.get(`${API_BASE}/classes`, config);
        
        setClasses(resClasses.data || []); 
        setStats({
          totalPaid: resStats.data.totalCollected || 0,
          totalPending: resStats.data.totalPending || 0
        });
      }
    } catch (error) {
      console.error("Fetch Error:", error.response?.data || error.message);
    }
  };

  // 2. Fetch Students by Class (Only for Admin)
  const fetchStudentsByClass = async (className) => {
    if (!className || userRole !== 'admin') {
      setStudents([]);
      return;
    }
    try {
      const config = getAuthConfig();
      const res = await axios.get(`${API_BASE}/students?className=${className}`, config);
      setStudents(res.data || []);
    } catch (error) {
      console.error("Student Fetch Error:", error);
      setStudents([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Form State
  const [newPayment, setNewPayment] = useState({
    studentId: '',
    amount: '',
    status: 'Paid',
    transactionDate: new Date().toISOString().split('T')[0],
    method: 'Cash'
  });

  const handleAddPayment = async (e) => {
    e.preventDefault();
    if (userRole !== 'admin') return;

    try {
      const config = getAuthConfig();
      await axios.post(`${API_BASE}/payments`, newPayment, config);
      
      setShowModal(false);
      fetchData(); 
      setNewPayment({ studentId: '', amount: '', status: 'Paid', transactionDate: new Date().toISOString().split('T')[0], method: 'Cash' });
      setSelectedClass(""); 
      setStudents([]);
      alert("Payment Saved! ✅");
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || "Something went wrong"));
    }
  };

  return (
    <div className="payments-container-modern">
      <div className="modern-header">
        <div className="header-text">
          <h1>Revenue <span className="red-glow">Insights</span></h1>
          <p>{userRole === 'admin' ? "Financial management and fee tracking system" : "Your personal fee history and receipts"}</p>
        </div>
        <div className="header-actions">
          {/* Search sirf admin ko dikhao ya student ko sirf records search karne do */}
          <div className="search-wrapper-modern">
            <Search size={18} className="search-icon-dim" />
            <input 
              type="text" 
              placeholder="Search transactions..." 
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
          </div>
          
          {/* UPDATE: Add Payment button sirf Admin ke liye */}
          {userRole === 'admin' && (
            <button className="add-payment-btn" onClick={() => setShowModal(true)}>
              <Plus size={18} /> Add Payment
            </button>
          )}
        </div>
      </div>

      {/* UPDATE: Stats Cards sirf Admin ke liye (cite: 24fb30b2-5b03-4bc3-be8b-4d4318923144) */}
      {userRole === 'admin' && (
        <div className="stats-layout">
          <div className="stat-box-modern">
            <div className="icon-wrap green-bg"><TrendingUp size={20} /></div>
            <div><p>Total Collected</p><h2>₹{stats.totalPaid.toLocaleString()}</h2></div>
          </div>
          <div className="stat-box-modern">
            <div className="icon-wrap red-bg"><Wallet size={20} /></div>
            <div><p>Outstanding</p><h2 className="red-glow-text">₹{stats.totalPending.toLocaleString()}</h2></div>
          </div>
          <div className="stat-box-modern">
            <div className="icon-wrap blue-bg"><Users size={20} /></div>
            <div><p>Total Records</p><h2>{payments.length}</h2></div>
          </div>
        </div>
      )}

      {/* Modal Protection */}
      {showModal && userRole === 'admin' && (
        <div className="glass-modal-overlay">
          <div className="glass-modal-content">
            <div className="modal-header">
              <h2><CreditCard size={20} /> New Transaction</h2>
              <X className="close-icon" onClick={() => setShowModal(false)} />
            </div>
            
            <form onSubmit={handleAddPayment} className="modern-form">
              <div className="input-group">
                <label>Step 1: Select Class</label>
                <select 
                  required 
                  value={selectedClass} 
                  onChange={(e) => {
                    setSelectedClass(e.target.value);
                    fetchStudentsByClass(e.target.value);
                  }}
                >
                  <option value="">-- Choose Class --</option>
                  {classes.map(c => (
                    <option key={c._id} value={c.className}>
                      {c.className}
                    </option>
                  ))}
                </select>
              </div>

              <div className="input-group">
                <label>Step 2: Select Student</label>
                <select 
                  required 
                  disabled={!selectedClass}
                  value={newPayment.studentId} 
                  onChange={(e) => setNewPayment({...newPayment, studentId: e.target.value})}
                >
                  <option value="">-- Choose Student --</option>
                  {students.map(s => (
                    <option key={s._id} value={s._id}>
                      {s.studentName} — [Roll: {s.rollNo}]
                    </option>
                  ))}
                </select>
              </div>

              <div className="input-row">
                <div className="input-group">
                  <label>Amount (₹)</label>
                  <input type="number" required value={newPayment.amount} onChange={(e) => setNewPayment({...newPayment, amount: e.target.value})} />
                </div>
                <div className="input-group">
                  <label>Method</label>
                  <select value={newPayment.method} onChange={(e) => setNewPayment({...newPayment, method: e.target.value})}>
                    <option value="Cash">Cash</option>
                    <option value="UPI">UPI</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                  </select>
                </div>
              </div>

              <div className="input-group">
                <label>Transaction Date</label>
                <input type="date" value={newPayment.transactionDate} onChange={(e) => setNewPayment({...newPayment, transactionDate: e.target.value})} />
              </div>

              <button type="submit" className="confirm-btn-payment">
                <Save size={18} /> Confirm & Save Record
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="glass-table-card">
        <table className="modern-payment-table">
          <thead>
            <tr>
              <th>Student Profile</th>
              <th>Class</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {payments.length > 0 ? (
              payments
                .filter(p => 
                  p.studentId?.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                  p.studentId?.rollNo?.toString().includes(searchTerm)
                )
                .map((p) => (
                <tr key={p._id}>
                  <td>
                    <div className="student-profile">
                      <div className="avatar-init">{(p.studentId?.studentName || "S").charAt(0)}</div>
                      <div>
                        <div className="name-bold">{p.studentId?.studentName || "Unknown"}</div>
                        <div className="roll-dim">Roll No: {p.studentId?.rollNo || "N/A"}</div>
                      </div>
                    </div>
                  </td>
                  <td className="class-cell">
                     <span className="class-badge">{p.studentId?.className || "N/A"}</span>
                  </td>
                  <td className="amount-bold">₹{p.amount.toLocaleString()}</td>
                  <td className="date-dim">{new Date(p.transactionDate).toLocaleDateString()}</td>
                  <td><span className={`pill-modern ${p.status.toLowerCase()}`}>{p.status}</span></td>
                  <td><span className="label-verified"><CheckCircle size={16} /> Verified</span></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{textAlign: 'center', padding: '30px'}}>No payment records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payments;