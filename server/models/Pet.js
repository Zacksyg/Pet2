// models/Pet.js
const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Ligação com o dono
        required: true
    },
    petName: {
        type: String,
        required: true
    },
    species: {
        type: String,
        required: true
    },
    breed: {
        type: String
    },
    age: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    vaccinated: {
        type: String,
        required: true
    },
    additionalInfo: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Pet', PetSchema);
