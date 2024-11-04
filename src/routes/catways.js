const express = require('express');
const router = express.Router();

const service = require('../services/catways');

router.get('/', service.getAllCatways);
router.get('/:id', service.getById);
router.post('/add', service.add);
router.put('/:id', service.update);
router.patch('/:id', service.update);
router.delete('/:id', service.delete);


module.exports = router;
