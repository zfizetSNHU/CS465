var express = require('express');
var router = express.Router();
var controller = require('../controllers/travel');

/* GET all trips page. */
router.get('/', controller.travel);

// get details for one trip
router.get('/:tripCode', controller.travelDetails);

module.exports = router;