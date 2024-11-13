const EventoRepository = require('../repositories/eventoRepository');
const PetRepository = require('../repositories/petRepository');

exports.cadastrarEvento = async (req, res) => {
    try {
        const { petId, date, time, type } = req.body;

        // Verifica se o pet existe
        const petExists = await PetRepository.findById(petId);
        if (!petExists) {
            return res.status(404).json({ message: 'Pet não encontrado.' });
        }

        const novoEvento = await EventoRepository.createEvento({ pet: petId, date, time, type });
        res.status(201).json({ message: 'Evento cadastrado com sucesso!', evento: novoEvento });
    } catch (error) {
        console.error('Erro ao cadastrar evento:', error);
        res.status(500).json({ message: 'Erro ao cadastrar evento.', error: error.message });
    }
};
