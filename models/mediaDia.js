const mongoose = require('mongoose');

const mediaSchema = mongoose.Schema({
    mediaTemperatura: {
        type: Number,
        required: true,
    },
    media_Humedad_1: {
        type: Number,
        required: true,
    },
    media_Humedad_2: {
        type: Number,
        required: true,
    },
    media_Humedad_atm: {
        type: Number,
        required: true,
    },
    fecha: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('mediaDia', mediaSchema, 'PromMedias');