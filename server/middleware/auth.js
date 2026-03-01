const jwt = require('jsonwebtoken');
const { findById } = require('../models/user');

function signToken(user){
  // include minimal claims: id and isAdmin flag
  const payload = { id: user.id, isAdmin: user.isAdmin ? 1 : 0 };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
}

function setAuthCookie(res, token){
  // HttpOnly cookie, secure only in production when using HTTPS
  const secure = process.env.NODE_ENV === 'production';
  res.cookie('satm_token', token, { httpOnly: true, secure, sameSite: 'lax', maxAge: 7*24*60*60*1000 });
}

function authenticateJWT(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'Missing Authorization header' });
  const parts = auth.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ error: 'Malformed Authorization header' });
  const token = parts[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });
    findById(payload.id, (e, user) => {
      if (e) return res.status(500).json({ error: 'Server error' });
      if (!user) return res.status(401).json({ error: 'User not found' });
      req.user = user;
      next();
    });
  });
}

function requireAdmin(req, res, next) {
  if (req.user && Number(req.user.isAdmin) === 1) return next();
  return res.status(403).json({ error: 'Admin only' });
}

module.exports = { authenticateJWT, requireAdmin, signToken, setAuthCookie };
