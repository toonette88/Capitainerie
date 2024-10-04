const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Catway = new Schema({
    catwayNumber: {
        type: Number,
        trim: true,
        unique: true,
        required: [true, 'Le numéro de pont est requis']
    },
    type : {
        type    : String, 
        enum    : ["long", "short"],
        required: [true, "Le type est requis"]
    },
    catwayState: {
        type: String,
        required: [true, 'La description est requise']
    }
});

module.exports = mongoose.model('Catway', Catway);
