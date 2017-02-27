const express = require('express');
const router = express.Router();
const _ = require('lodash');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

router.post('/register', (req, res, next) => {
  let body = _.pick(req.body, ['name', 'email', 'username', 'password']),
      newUser = new User(body);


  User.addUser(newUser, (err, user) => {
    if(err) {
      res.json({ success: false, msg: 'Failed to register user' });
    } else {
      res.json({ success: true, msg: 'User registered' });
    }
  });
});


router.post('/authenticate', (req, res, next) => {
  res.send('Authenticate');
});

router.get('/profile', (req, res, next) => {
  res.send('profile');
});

router.get('/validate', (req, res, next) => {
  res.send('validate');
});

module.exports = router;
