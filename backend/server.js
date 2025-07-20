const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const donationRoutes = require('./routes/donationRoutes');
const animalRoutes = require('./routes/animalRoutes');
const adoptionRoutes = require('./routes/adoptionRoutes'); // make sure this file exists

const app = express(); // ✅ FIRST initialize app

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB error:', err));

// API Routes
app.use('/api/donations', donationRoutes);
app.use('/api/animals', animalRoutes);
app.use('/api/adoptions', adoptionRoutes); // ✅ Add this AFTER app is defined

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
