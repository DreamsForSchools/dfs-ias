var express = require('express');
var router = express.Router();
const programController = require('../db/controller/program.controller')
const schoolController = require('../db/controller/school.controller')
const seasonController = require('../db/controller/season.controller')

/* GET home page. */
router.post('/program', programController.create);
router.get('/program', programController.findAll);
router.get('/program/:id', programController.findById);
router.delete('/program/:id', programController.deleteById);
router.put('/program/:id', programController.updateById);


router.post('/school', schoolController.create);
router.get('/school', schoolController.findAll);
router.get('/school/:id', schoolController.findById);
router.delete('/school/:id', schoolController.deleteById);
router.put('/school/:id', schoolController.updateById)

router.post('/season', seasonController.create);
router.get('/season', seasonController.findAll);
router.get('/season/current', seasonController.getCurrent);
router.delete('/season/:id', seasonController.deleteById);
router.get('/season/:id', seasonController.findById);
router.put('/season/:id', seasonController.updateById)

module.exports = router;
