const express = require('express');
const router = express.Router();

const service = require('../services/reservations');
const private = require('../middlewares/private')

router.get('/',private.checkJWT, service.getAll);
router.get('/:idReservation',private.checkJWT, service.getById);
router.post('/',private.checkJWT, service.add);
router.delete('/:idReservation',private.checkJWT, service.delete);

module.exports = router;