const express = require("express");
const router = express.Router();
const Adoption = require("../models/Adoption");

router.post("/", async (req, res) => {
  try {
    const adoption = new Adoption(req.body);
    await adoption.save();
    res.json({ message: "Adoption request submitted!" });
  } catch (err) {
    console.error("Error saving adoption:", err);
    res.status(500).json({ message: "Failed to submit adoption." });
  }
});

module.exports = router;
