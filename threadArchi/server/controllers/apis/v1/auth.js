const express = require('express');
const authService = require('../../../services/v1/auth/auth');
const validation = require('../../../middlewares/authgaurd');
let router = express.Router();

router.get('/register', authService.register)
router.post('/register', authService.register)

router.get('/login', authService.login)
router.post('/login', authService.login)

module.exports = router