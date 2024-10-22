const express = require('express');
const router  = express.Router();

const service = require('../services/users');
const private = require('../middlewares/private');

router.get('/', service.getAllUsers)
router.get('/:id', service.getById);
router.post('/add', service.add);
router.put('/:id', service.update);
router.delete('/:id', service.delete);

router.post('/authenticate', service.authenticate);

module.exports = router;

