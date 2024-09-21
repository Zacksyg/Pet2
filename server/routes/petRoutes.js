// routes/petRoutes.js
const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');
const authMiddleware = require('../middleware/auth');

router.post('/cadastrar', authMiddleware, petController.cadastrarPet);

module.exports = router;
