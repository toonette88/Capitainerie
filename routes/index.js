var express = require('express');
var router = express.Router();

const usersRoute = require('../routes/users');
const { version } = require('mongoose');

const userRoute   = require('../routes/users');
const catwayRoute = require('../routes/catways');
const reservationRoute = require('../routes/reservations');

router.get('/', async (req, res) => {
  res.render('pages/index', {
    title: 'Accueil'
  })
});

router.use('/users', userRoute);
router.use('/catways', catwayRoute);
router.use('/reservations', reservationRoute);

module.exports = router;
