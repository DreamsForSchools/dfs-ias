var express = require('express');
var router = express.Router();
const programController = require('../db/controller/program.controller')

/* GET home page. */
router.post('/program', programController.create);
router.get('/program', programController.findAll);

module.exports = router;
