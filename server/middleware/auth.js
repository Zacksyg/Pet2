// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Acesso negado. Nenhum token fornecido.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Verifique se o usuário existe no banco de dados (opcional, mas recomendável)
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: 'Usuário não encontrado.' });
        }

        req.user = user; // Adiciona o usuário autenticado à requisição
        next();
    } catch (error) {
        console.error('Erro na verificação do token:', error);
        res.status(400).json({ message: 'Token inválido.', error: error.message });
    }
};
