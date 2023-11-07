var express = require('express');
var router = express.Router();


var requestEmail = require('../services/requestReset');
var demo = require('../services/requestReset')

router.post('/request-reset', requestEmail.emailSend);
router.post('/demo/:id/:token', requestEmail.demo);

module.exports = router;