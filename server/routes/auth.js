const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { createUser, findByEmail, findByGoogleId, normalizeEmail } = require('../models/user');
const { signToken, setAuthCookie } = require('../middleware/auth');
const db = require('../db');

const router = express.Router();

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
}, (accessToken, refreshToken, profile, cb) => cb(null, profile)));

router.post('/signup', async (req, res) => {
  try{
    let { email, password, name } = req.body || {};
    name = name ? String(name).trim() : null;
    email = normalizeEmail(email);
    if (!email || !password) return res.status(400).json({ error: 'Missing email or password' });
    if (typeof password !== 'string' || password.length < 8) return res.status(400).json({ error: 'Password must be at least 8 characters' });
    // basic email format check
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return res.status(400).json({ error: 'Invalid email' });
    findByEmail(email, async (err, existing) => {
      if (err) return res.status(500).json({ error: 'Server error' });
      if (existing) return res.status(409).json({ error: 'Email already registered' });
      const hash = await bcrypt.hash(password, 10);
      createUser({ email, password: hash, name }, (e, id) => {
        if (e) return res.status(500).json({ error: 'Server error' });
        const token = signToken({ id, isAdmin: 0 });
        // also set cookie for convenience
        setAuthCookie(res, token);
        res.json({ token });
      });
    });
  }catch(err){
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/login', (req, res) => {
  try{
    let { email, password } = req.body || {};
    email = normalizeEmail(email);
    if (!email || !password) return res.status(400).json({ error: 'Missing email or password' });
    findByEmail(email, async (err, user) => {
      if (err) return res.status(500).json({ error: 'Server error' });
      if (!user || !user.password) return res.status(401).json({ error: 'Invalid credentials' });
      const ok = await bcrypt.compare(password, user.password);
      if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
      const token = signToken(user);
      setAuthCookie(res, token);
      res.json({ token });
    });
  }catch(e){
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin creation endpoint: protected by ADMIN_SECRET in env
router.post('/create-admin', (req, res) => {
  const secret = req.headers['x-admin-secret'] || req.body.adminSecret;
  if (!process.env.ADMIN_SECRET || secret !== process.env.ADMIN_SECRET) return res.status(403).json({ error: 'Forbidden' });
  const { email, password, name } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Missing' });
  findByEmail(email, async (err, existing) => {
    if (err) return res.status(500).json({ error: err.message });
    if (existing) return res.status(400).json({ error: 'Email taken' });
    const hash = await bcrypt.hash(password, 10);
    createUser({ email, password: hash, name, isAdmin: 1 }, (e, id) => {
      if (e) return res.status(500).json({ error: e.message });
      res.json({ id });
    });
  });
});

// Google OAuth routes
router.get('/google', passport.authenticate('google', { scope: ['profile','email'] }));

router.get('/google/callback', passport.authenticate('google', { session: false, failureRedirect: '/auth/google/failure' }),
  (req, res) => {
    // Passport provides profile at req.user
    const profile = req.user;
    const emailRaw = (profile.emails && profile.emails[0] && profile.emails[0].value) || null;
    const email = emailRaw ? normalizeEmail(emailRaw) : null;
    const googleId = profile.id;
    const name = profile.displayName || '';

    // find or create user
    findByGoogleId(googleId, (err, user) => {
      if (err) return res.status(500).send('Server error');
      if (user) {
        const token = signToken(user);
        setAuthCookie(res, token);
        return res.redirect(process.env.CLIENT_REDIRECT || 'http://localhost:5173');
      }
      // if email exists in DB, link it
      if (email) {
        findByEmail(email, (e2, existing) => {
          if (e2) return res.status(500).send('Server error');
          if (existing) {
            // update existing user's googleId; handle DB errors
            db.run(`UPDATE users SET googleId = ? WHERE id = ?`, [googleId, existing.id], function (uErr) {
              if (uErr) return res.status(500).send('Server error');
              const token = signToken(existing);
              setAuthCookie(res, token);
              return res.redirect(process.env.CLIENT_REDIRECT || 'http://localhost:5173');
            });
            return;
          }
          // create new user
          createUser({ email, password: null, name, googleId }, (cErr, id) => {
            if (cErr) return res.status(500).send('Server error');
            // createUser doesn't return user object; create token with id
            const token = jwt.sign({ id, isAdmin: 0 }, process.env.JWT_SECRET, { expiresIn: '7d' });
            setAuthCookie(res, token);
            return res.redirect(process.env.CLIENT_REDIRECT || 'http://localhost:5173');
          });
        });
      } else {
        // no email, create user with googleId only
        createUser({ email: null, password: null, name, googleId }, (cErr, id) => {
          if (cErr) return res.status(500).send('Server error');
          const token = jwt.sign({ id, isAdmin: 0 }, process.env.JWT_SECRET, { expiresIn: '7d' });
          setAuthCookie(res, token);
          return res.redirect(process.env.CLIENT_REDIRECT || 'http://localhost:5173');
        });
      }
    });
  }
);

module.exports = router;
