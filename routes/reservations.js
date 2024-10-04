const express = require('express');
const router = express.Router();

const service = require('../services/reservations');

router.get('/', service.getAll);
router.get('/:idReservation', service.getById);
router.post('/', service.add);
router.delete('/:idReservation', service.delete);

module.exports = router;
