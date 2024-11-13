const Evento = require('../models/Evento');

class EventoRepository {
    async createEvento(data) {
        const evento = new Evento(data);
        return evento.save();
    }

    async findByPetId(petId) {
        return Evento.find({ pet: petId });
    }

}

module.exports = new EventoRepository();
