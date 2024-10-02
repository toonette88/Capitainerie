var express = require('express');
var router = express.Router();

const usersRoute = require('../routes/users');
const { version } = require('mongoose');

/* GET home page. */
router.get('/', async(req, res) => {
  res.status(200).json({
    name   : process.env.APP_NAME,
    version: '1.0',
    status : 200,
    message: 'Bienvenue sur l\'API !'
  });
});

router.use('/users', userRoute);

module.exports = router;
