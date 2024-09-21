const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/protected', auth, (req, res) => {
    res.send('Acesso autorizado!');
});

module.exports = router;
