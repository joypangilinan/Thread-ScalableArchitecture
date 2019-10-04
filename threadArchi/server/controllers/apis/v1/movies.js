const express = require('express');
const moviesService = require('../../../services/v1/movies/movies');
let router = express.Router();

router.get('/title', moviesService.display)

module.exports = router

