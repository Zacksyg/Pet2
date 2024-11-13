const Pet = require('../models/Pet');

class PetRepository {
    async findById(id) {
        return Pet.findById(id).populate('events');
    }

    async createPet(data) {
        const pet = new Pet(data);
        return pet.save();
    }

    async addEventToPet(petId, event) {
        return Pet.findByIdAndUpdate(
            petId,
            { $push: { events: event } },
            { new: true }
        );
    }


}

module.exports = new PetRepository();
