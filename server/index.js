require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const authRoutes = require('./routes/auth');
const { authenticateJWT } = require('./middleware/auth');
const db = require('./db');

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use('/auth', authRoutes);

app.get('/me', authenticateJWT, (req, res) => {
  const u = req.user;
  res.json({ id: u.id, email: u.email, name: u.name, isAdmin: !!u.isAdmin });
});

app.listen(process.env.PORT || 4000, () => {
  console.log('Auth server running on', process.env.PORT || 4000);
});
