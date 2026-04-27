const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  // Student se connection (ID ke through)
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student', // Check kar lena Student model ka main name yahi ho
    required: true
  },
  // Kitni fees bhari
  amount: {
    type: Number,
    required: true
  },
  // Status: UI ke hisaab se Paid ya Pending
  status: {
    type: String,
    enum: ['Paid', 'Pending'],
    default: 'Paid'
  },
  // Kab payment hui (Default: Aaj ki date)
  transactionDate: {
    type: Date,
    default: Date.now
  },
  // Payment kaise hui (Cash, UPI, Card, etc.)
  method: {
    type: String,
    enum: ['Cash', 'UPI', 'Card', 'Bank Transfer'],
    default: 'Cash'
  },
  // Optional: Agar kuch extra note likhna ho
  remarks: {
    type: String,
    trim: true
  }
}, { 
  timestamps: true // Isse createdAt aur updatedAt apne aap ban jayenge
});

module.exports = mongoose.model('Payment', paymentSchema);