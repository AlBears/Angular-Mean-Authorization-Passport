const express = require('express');
const router = express.Router();

router.get('/register', (req, res, next) => {
  res.send('REGISTER');
});

router.get('/authenticate', (req, res, next) => {
  res.send('Authenticate');
});

router.get('/profile', (req, res, next) => {
  res.send('profile');
});

router.get('/validate', (req, res, next) => {
  res.send('validate');
});

module.exports = router;
