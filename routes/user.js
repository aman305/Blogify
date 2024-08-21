const { Router } = require('express');
const User = require('../models/user');
const router = Router();

router.get('/signin', (req, res) => {
  return res.render('signin');
});

router.get('/signup', (req, res) => {
  return res.render('signup');
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.matchPassword(email, password);
  console.log('User', user);
  return res.redirect('/');
});

router.post('/signup', async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const newUser = await User.create({
      fullName,
      email,
      password,
    });
    if (newUser) {
      return res.redirect('/');
    } else {
      throw new Error('User creation failed');
    }
  } catch (error) {
    console.log('Error during Signup: ', error);
    return res.status(500).json({ error: 'Signup failed. Please try again.' });
  }
});
module.exports = router;
