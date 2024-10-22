const express = require('express');
const router = express.Router();

const service = require('../services/reservations');
const private = require('../middlewares/private')

router.get('/', service.getAllReservations);
router.get('/:idReservation', service.getById);
router.post('/', service.add);
router.delete('/:idReservation', service.delete);

module.exports = router;