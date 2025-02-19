const express = require("express");
const router = express.Router();
const Meme = require("../models/vote");

router.get("/random", async (req, res) => {
  try {
    const memes = await Meme.aggregate([{ $sample: { size: 2 } }]);
    res.json(memes);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/vote", async (req, res) => {
  const { memeId, email } = req.body;
  try {
    console.log(`User ${email} voted for meme ${memeId}`);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
