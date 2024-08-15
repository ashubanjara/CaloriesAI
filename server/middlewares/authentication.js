const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, dotenv.parsed.JWT_SECRET, (err) => {
    console.log(err)

    if (err) return res.sendStatus(403)

    next()
  })
}

module.exports = authenticateToken