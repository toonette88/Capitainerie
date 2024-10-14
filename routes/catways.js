const express = require('express');
const router = express.Router();

const service = require('../services/catways');
const private = require('../middlewares/private');

router.get('/', service.getAllCatways);
router.get('/:id', service.getById);
router.post('/', service.add);
router.put('/:id', service.update);
router.patch('/:id', service.update);
router.delete('/:id', service.delete);

module.exports = router;
