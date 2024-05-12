const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/perform_login', authController.login);

module.exports = router;
