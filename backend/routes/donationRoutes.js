// backend/routes/donationRoutes.js
const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const Donation = require('../models/Donation');

const razorpay = new Razorpay({
  key_id: 'rzp_test_0cPxR2QSwVRXyP',
  key_secret: 'L6C5YbCQXS8uBz04p6PHmP18', // Replace with real one
});

// 1. Create Razorpay order
router.post('/', async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // in paise
      currency: 'INR',
      receipt: `receipt_order_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).json({ message: 'Failed to create order' });
  }
});

// 2. Save donation after successful payment
router.post('/verify', async (req, res) => {
  try {
    const { orderId, amount, currency, animalId } = req.body;

    const donation = new Donation({
      orderId,
      amount,
      currency,
      status: 'paid',
      animalId, // save this too
    });

    await donation.save();

    res.json({ message: 'Donation recorded' });
  } catch (err) {
    console.error('Error saving donation:', err);
    res.status(500).json({ message: 'Failed to save donation' });
  }
});

// 3. Get total donated per animal
router.get('/total/:animalId', async (req, res) => {
  try {
    const total = await Donation.aggregate([
      { $match: { animalId: req.params.animalId } },
      { $group: { _id: null, totalAmount: { $sum: "$amount" } } }
    ]);

    res.json({ totalAmount: total[0]?.totalAmount || 0 });
  } catch (err) {
    console.error('Error getting total:', err);
    res.status(500).json({ message: 'Error getting total donation' });
  }
});

module.exports = router;
