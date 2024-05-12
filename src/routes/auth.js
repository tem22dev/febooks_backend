const express = require('express');
const router = express.Router();

const authController = require('../app/controllers/AuthController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/account', authController.account);
router.post('/logout', authController.logout);
router.get('/refresh', authController.refresh);

module.exports = router;
