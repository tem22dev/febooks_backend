const express = require('express');
const router = express.Router();

const cateController = require('../app/controllers/CateController');

router.get('/genre', cateController.getAllGenre);

module.exports = router;
