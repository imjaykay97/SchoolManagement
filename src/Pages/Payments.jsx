import React, { useState } from 'react';
import { CreditCard, Search, CheckCircle, AlertCircle, TrendingUp, Users, Wallet, ArrowUpRight } from 'lucide-react';
import './Payments.css';

const Payments = () => {
  const [payments, setPayments] = useState([
    { id: 1, student: "Kaur Rajvi", roll: "#147", amount: 15000, date: "2026-03-10", method: "UPI", status: "Paid" },
    { id: 2, student: "Terma Jinal", roll: "#152", amount: 12500, date: "2026-03-12", method: "Card", status: "Paid" },
    { id: 3, student: "Syed Sadiya", roll: "#160", amount: 18000, date: "-", method: "-", status: "Pending" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const totalPaid = payments.filter(p => p.status === "Paid").reduce((sum, p) => sum + p.amount, 0);
  const totalPending = payments.filter(p => p.status === "Pending").reduce((sum, p) => sum + p.amount, 0);

  const handleMarkAsPaid = (id) => {
    const today = new Date().toLocaleDateString();
    setPayments(payments.map(p => 
      p.id === id ? { ...p, status: "Paid", date: today, method: "Cash" } : p
    ));
  };

  const filteredPayments = payments.filter(p => 
    p.student.toLowerCase().includes(searchTerm.toLowerCase()) || p.roll.includes(searchTerm)
  );

  return (
    <div className="payments-container-modern">
      {/* Header Section */}
      <div className="modern-header">
        <div className="header-text">
          <h1>Revenue <span className="red-glow">Insights</span></h1>
          <p>Financial management and fee tracking system</p>
        </div>
        <div className="search-wrapper-modern">
          <Search size={18} className="search-icon-dim" />
          <input 
            type="text" 
            placeholder="Quick search student..." 
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Modern Stats Cards */}
      <div className="stats-layout">
        <div className="stat-box-modern">
          <div className="icon-wrap green-bg"><TrendingUp size={20} /></div>
          <div>
            <p>Total Collected</p>
            <h2>₹{totalPaid.toLocaleString()}</h2>
          </div>
        </div>
        <div className="stat-box-modern">
          <div className="icon-wrap red-bg"><Wallet size={20} /></div>
          <div>
            <p>Outstanding</p>
            <h2 className="red-glow-text">₹{totalPending.toLocaleString()}</h2>
          </div>
        </div>
        <div className="stat-box-modern">
          <div className="icon-wrap blue-bg"><Users size={20} /></div>
          <div>
            <p>Total Invoices</p>
            <h2>{payments.length}</h2>
          </div>
        </div>
      </div>

      {/* Elite Table Section */}
      <div className="glass-table-card">
        <table className="modern-payment-table">
          <thead>
            <tr>
              <th>Student Profile</th>
              <th>Amount</th>
              <th>Transaction Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((p) => (
              <tr key={p.id}>
                <td>
                  <div className="student-profile">
                    <div className="avatar-init">{p.student.charAt(0)}</div>
                    <div>
                      <div className="name-bold">{p.student}</div>
                      <div className="roll-dim">{p.roll}</div>
                    </div>
                  </div>
                </td>
                <td className="amount-bold">₹{p.amount.toLocaleString()}</td>
                <td className="date-dim">{p.date}</td>
                <td>
                  <span className={`pill-modern ${p.status.toLowerCase()}`}>
                    <div className="dot" /> {p.status}
                  </span>
                </td>
                <td>
                  {p.status === "Pending" ? (
                    <button className="btn-action-pay" onClick={() => handleMarkAsPaid(p.id)}>
                      Collect <ArrowUpRight size={14} />
                    </button>
                  ) : (
                    <span className="label-verified"><CheckCircle size={16} /> Verified</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payments;