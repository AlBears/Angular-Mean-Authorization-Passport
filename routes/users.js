const express = require('express');
const router = express.Router();
const _ = require('lodash');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/database');

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
  let body = _.pick(req.body, ['username', 'password']);

  User.getUserByUsername(body.username, (err, user) => {
    if (err) throw err;
    if(!user) {
      return res.json({ success: false, msg: 'User not found' });
    }

    User.comparePassword(body.password, user.password, (err, isMatch) => {
      if (err) throw err;
      if(isMatch) {
        const token = jwt.sign(user, config.secret, {
          expiresIn: 604800
        });

        res.json({
          success: true,
          token: `JWT ${token}`,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        });
      } else {
        return res.json({ success: false, msg: 'Wrong password' });
      }
    });
  });
});

router.get('/profile', passport.authenticate('jwt', { session:false }), (req, res, next) => {
  res.json({ user: req.user });
});


module.exports = router;
