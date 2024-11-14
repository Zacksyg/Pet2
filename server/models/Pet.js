const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    petName: { type: String, required: true },
    species: { type: String, required: true },
    age: { type: Number, required: true },
    weight: { type: Number, required: true },
    vaccinated: { type: String, required: true },
    additionalInfo: { type: String },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    events: [{
        type: {
            type: String, // Tipo do evento (ex: consulta, vacina)
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        time: {
            type: String, // Hora do evento
            required: true
        }
    }],
}, {
    timestamps: true
});

module.exports = mongoose.model('Pet', petSchema);
