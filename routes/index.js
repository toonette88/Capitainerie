var express = require('express');
var router = express.Router();

const userRoute   = require('../routes/users');
const catwayRoute = require('../routes/catways');
const reservationRoute = require('../routes/reservations');
const private = require('../middlewares/private')

router.get('/', async (req, res) => {
  res.status(200).json({
    name    : process.env.APP_NAME,
    version : '1.0',
    status  : 200,
    message : 'Bienvenue sur l\'API'
  });
});

router.use('/users', userRoute);
router.use('/catways',private.checkJWT, catwayRoute);
router.use('/reservations',private.checkJWT, reservationRoute);

module.exports = router;
