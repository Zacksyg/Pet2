const express = require('express');
const path = require('path');
const router = express.Router();
const petController = require('../controllers/petController'); 
const authMiddleware = require('../middleware/auth');


router.post('/cadastrar', authMiddleware, petController.cadastrarPet);
router.get('/dados', authMiddleware, petController.obterDadosPet);
router.get('/evento/cadastrar', authMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, '../public/evento.html'));
});

router.get('/', authMiddleware, (req, res) => {
    res.render('home');
});

module.exports = router;
