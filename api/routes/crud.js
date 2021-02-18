var express = require('express');
var router = express.Router();
const programController = require('../db/controller/program.controller')

/* GET home page. */
router.post('/program', programController.create);
router.get('/program', programController.findAll);
router.get('/program/:id', programController.findById);
router.delete('/program/:id', programController.deleteById)
router.put('/program/:id', programController.updateById)

module.exports = router;
