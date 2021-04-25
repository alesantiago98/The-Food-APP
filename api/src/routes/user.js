const { User } = require('../db');
const router = require('express').Router();
const bcrypt = require('bcrypt');

router.post('/register', (req, res) => {
  let { name, email, password } = req.body;
  bcrypt.hash(password, 10, async function(err, hash) {
    password = hash;
    const user = await User.create({ name, email, password });
    res.send(user);
    if(err) {
      console.error(err)
    }
  });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    const user = await User.findOne({ where: { email: email } });
    bcrypt.compare(password, user.password, function(err, result) {
      if(result) return res.send(user);
      else return res.send('user not found');
    });
  }
  else {
    return res.send('input invalid')
  }
});


router.post('/logout', (req, res) => {
  res.clearCookie('userId');
  res.send('log out succesful');
});

module.exports = router;