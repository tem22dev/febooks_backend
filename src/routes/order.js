const express = require('express');
const router = express.Router();

const orderController = require('../app/controllers/OrderController');

router.get('/history', orderController.getHistory);
router.post('/', orderController.createOrder);

module.exports = router;
