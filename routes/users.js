const express = require('express');
const router  = express.Router();

const service = require('../services/users');

router.get('/:id', service.getById);
router.post('/add', service.add);
router.put('/:id', service.update);
router.delete('/:id', service.delete);

module.exports = router;

