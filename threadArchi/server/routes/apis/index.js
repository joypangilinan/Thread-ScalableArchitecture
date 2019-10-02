const express = require('express');
const v1ApiController = require('./v1');
let router = express.Router();
router.use('/users', v1ApiController);
module.exports = router;