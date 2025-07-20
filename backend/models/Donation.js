// backend/models/Donation.js
const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  status: { type: String, default: 'created' },
  animalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Animal' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Donation', donationSchema);
