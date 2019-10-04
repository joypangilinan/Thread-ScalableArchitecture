const authController = require('../../controllers/apis/v1/auth');
const moviesController = require('../../controllers/apis/v1/movies');

const express = require('express');
let router = express.Router();

router.use('/auth', authController);
router.use('/movies', moviesController);
module.exports = router;