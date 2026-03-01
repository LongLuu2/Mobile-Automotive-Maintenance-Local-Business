const db = require('../db');

function normalizeEmail(email){
  if (!email && email !== null) return null;
  if (typeof email !== 'string') return null;
  return email.trim().toLowerCase();
}

function createUser({ email, password, name, googleId, isAdmin = 0 }, cb) {
  const nEmail = email ? normalizeEmail(email) : null;
  const nName = name ? String(name).trim() : null;
  const stmt = db.prepare(`INSERT INTO users (email, password, name, googleId, isAdmin) VALUES (?,?,?,?,?)`);
  stmt.run(nEmail, password, nName, googleId, isAdmin, function (err) {
    cb(err, this && this.lastID);
  });
}

function findByEmail(email, cb) {
  const nEmail = normalizeEmail(email);
  if (!nEmail) return cb(null, null);
  db.get(`SELECT * FROM users WHERE email = ?`, [nEmail], cb);
}

function findById(id, cb) {
  db.get(`SELECT * FROM users WHERE id = ?`, [id], cb);
}

function findByGoogleId(googleId, cb) {
  if (!googleId) return cb(null, null);
  db.get(`SELECT * FROM users WHERE googleId = ?`, [googleId], cb);
}

module.exports = { createUser, findByEmail, findById, findByGoogleId, normalizeEmail };
