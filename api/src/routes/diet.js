const { Diet } = require('../db');
const router = require('express').Router();

router.get('/', (req, res, ) => {
  Diet.findAll()
  .then(data => {
    if (data !== null) {
      res.send(data)
    }
  })
  .catch(err => console.error(err))
});


module.exports = router;
