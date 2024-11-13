const express = require('express');
const router = express.Router();
const eventoController = require('../controllers/eventoController'); 
const authMiddleware = require('../middleware/auth');


router.post('/cadastrar', authMiddleware, eventoController.cadastrarEvento);

module.exports = router;
