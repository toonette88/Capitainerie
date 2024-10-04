const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Reservation = new Schema({
    catwayNumber: {
        type    : Schema.Types.ObjectId,
        trim    : true, 
        ref     : "Catway",
        required: [true, 'Le numero de pont est requis']
    },
    clientName: {
        type    : String, 
        trim    : true,
        required: [true, 'Le nom du client est requis']
    },
    boatName: {
        type    : String, 
        trim    : true,
        required: [true, 'Le nom du bateau est requis']
    },
    checkIn:  {
        type    : Date
    },
    checkOut:  {
        type    : Date 
    }
});

module.exports = mongoose.model('Reservation', Reservation);
