// controllers/petController.js
const Pet = require('../models/Pet');

exports.cadastrarPet = async (req, res) => {
    try {
        const { nome, idade, especie, peso, vacinado } = req.body;

        // Verifica se os dados estão corretos
        if (!nome || !idade || !especie || !peso || !vacinado) {
            return res.status(400).json({ message: 'Dados incompletos.' });
        }

        // Cria um novo pet
        const novoPet = new Pet({
            petName: nome,
            age: idade,
            species: especie,
            weight: peso,
            vaccinated: vacinado,
            owner: req.user._id // Associa o pet ao dono autenticado
        });

        // Salva o pet no banco de dados
        await novoPet.save();
        res.status(201).json({ message: 'Pet cadastrado com sucesso!' });
    } catch (error) {
        console.error('Erro ao cadastrar o pet:', error);
        res.status(500).json({ message: 'Erro ao cadastrar o pet.', error: error.message });
    }
};
