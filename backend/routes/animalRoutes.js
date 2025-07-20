const express = require("express");
const router = express.Router();
const Animal = require("../models/Animal");

// GET /api/animals
router.get("/", async (req, res) => {
  try {
    const animals = await Animal.find();
    res.json(animals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
