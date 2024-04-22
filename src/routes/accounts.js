const express = require('express');
const router = express.Router();

const accountsController = require('../app/controllers/AccountsController');

router.get('/', accountsController.index);

module.exports = router;
