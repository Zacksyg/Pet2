const PetRepository = require('../repositories/petRepository');

exports.cadastrarPet = async (req, res) => {
    try {
        const { petName, age, species, weight, vaccinated, additionalInfo } = req.body;
        const novoPet = await PetRepository.createPet({ petName, age, species, weight, vaccinated, additionalInfo, owner: req.user._id });
        res.status(201).json({ message: 'Pet cadastrado com sucesso!', pet: novoPet });
    } catch (error) {
        console.error('Erro ao cadastrar o pet:', error);
        res.status(500).json({ message: 'Erro ao cadastrar o pet.', error: error.message });
    }
};
exports.obterDadosPet = async (req, res) => {
    try {
        const pet = await PetRepository.findById(req.params.id); // Obtém o ID do pet a partir da URL
        if (!pet) {
            return res.status(404).json({ message: 'Pet não encontrado.' });
        }

        // Verifica se o pet pertence ao usuário autenticado
        if (pet.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Acesso negado.' });
        }

        res.status(200).json({ pet });
    } catch (error) {
        console.error('Erro ao obter os dados do pet:', error);
        res.status(500).json({ message: 'Erro ao obter os dados do pet.', error: error.message });
    }
};
