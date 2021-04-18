const { Recipe, User, Diet } = require('../db');
const router = require('express').Router();

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password });
  res.cookie('userId', user.id);
  res.send(user);
});

router.get('/:id', async function (req, res) {
  const user = await User.findByPk(req.params.id, { include: { all: true, nested: true }})
  if (user === null) {
    res.status(404).send({ message: 'The user could not be found' })
  }
  else {
    res.send(user.recipes.map(r => r.dataValues))
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    const user = await User.findOne({ where: { email: email } });
    if (user.password === password) {
      res.cookie('userId', user.id);
      return res.send(user)
    }
    else {
      return res.send('user not found')
    }
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