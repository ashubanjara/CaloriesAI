const express = require("express");
const router = express.Router();
const dotenv = require("dotenv").config();
const jwt = require('jsonwebtoken');
const authenticateToken = require("../middlewares/authentication");

router.post("/login", async (req, res) => {

  const { password } = req.body;

  if (password !== dotenv.parsed.PW) {
    return res.status(400).send('Invalid credentials');
  } 

  const token = jwt.sign({}, dotenv.parsed.JWT_SECRET, {
    expiresIn: dotenv.parsed.JWT_EXPIRES_IN,
  });

  res.json({ token });
});

router.get('/validate', authenticateToken, (req, res) => {
  res.json({ valid: true });
});

module.exports = router;