const mongoose = require('mongoose');

const eventoSchema = new mongoose.Schema({
    pet: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    type: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Evento', eventoSchema);
