const express = require('express');
const router = express.Router();

const service = require('../services/reservations');
const private = require('../middlewares/private')

router.get('/', service.getAllReservations);
router.get('/:id', service.getById);
router.post('/add', service.add);
router.delete('/:id', service.delete);

module.exports = router;