var express = require('express');
var router = express.Router();
const programController = require('../db/controller/program.controller')
const partnerController = require('../db/controller/partner.controller')
const seasonController = require('../db/controller/season.controller')
const instructorController = require('../db/controller/instructor.controller')
const instructorAvailabilityController = require('../db/controller/instructoravailability.controller')
const locationController = require('../db/controller/locationCache.controller')
const classController = require('../db/controller/class.controller')
const seasonAssignmentController = require('../db/controller/seasonAssignment.controller')


/* GET home page. */
router.post('/program', programController.create);
router.get('/program', programController.findAll);
router.get('/program/aggregated/:seasonId', programController.aggregatedAll);
router.get('/program/:id', programController.findById);
router.delete('/program/:id', programController.deleteById);
router.put('/program/:id', programController.updateById);

router.post('/partner', partnerController.create);
router.get('/partner', partnerController.findAll);
router.get('/partner/aggregated/:seasonId', partnerController.aggregatedAll);
router.get('/partner/:id', partnerController.findById);
router.delete('/partner/:id', partnerController.deleteById);
router.put('/partner/:id', partnerController.updateById)

router.post('/season', seasonController.create);
router.get('/season', seasonController.findAll);
router.get('/season/current', seasonController.getCurrent);
router.delete('/season/:id', seasonController.deleteById);
router.get('/season/:id', seasonController.findById);
router.put('/season/:id', seasonController.updateById)

router.post('/instructor', instructorController.createSingle);
router.post('/instructor/CSV', instructorController.createCSV);
router.get('/instructor', instructorController.findAll);
router.get('/instructor/:id', instructorController.findById);
router.delete('/instructor/:id', instructorController.deleteById);
router.put('/instructor/:id', instructorController.updateById);

router.post('/instructor/availability', instructorAvailabilityController.create);
router.get('/instructor/availability', instructorAvailabilityController.findAll);
router.get('/instructor/availability/:id', instructorAvailabilityController.findById);
router.delete('/instructor/availability/:id', instructorAvailabilityController.deleteById);
router.put('/instructor/availability/:id', instructorAvailabilityController.updateById);


router.post('/location', locationController.create);
router.get('/location', locationController.findAll);
router.get('/location/:id', locationController.findById);
router.get('/location/:name', locationController.findByName);
router.delete('/location/:id', locationController.deleteById);
router.put('/location/:id', locationController.updateById);

router.get('/program/class/:id', classController.allProgramClasses);
router.get('/partner/class/:id', classController.allPartnerClasses);
router.get('/season/class/:id', classController.allSeasonClasses);
router.post('/class', classController.create);
router.get('/class', classController.findAll);
router.get('/class/:id', classController.findById);
router.delete('/class/:id', classController.deleteById);
router.put('/class/:id', classController.updateById)

router.get('/lock/:seasonId', seasonAssignmentController.getLockedInstructors);
router.post('/lock', seasonAssignmentController.lock);
router.delete('/unlock', seasonAssignmentController.unlock);
router.post('/sort', seasonAssignmentController.sort);
module.exports = router;
