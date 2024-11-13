// Arquivo: userController.js
const UserRepository = require('../repositories/userRepository');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // Certifique-se de importar bcrypt

exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Remover o hashing manual da senha
        const user = await UserRepository.createUser({ name, email, password });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserRepository.findByEmail(email);
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Comparar senha usando bcrypt
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token, name: user.name });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
