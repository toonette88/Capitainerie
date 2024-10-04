const Reservation = require('../models/reservation');

exports.getAll = async(req, res, next) => {
    try{
        let reservations = await Reservations.find()

        if(reservations) {
            return res.status(200).json(reservations);
        }

        return res.status(404).json('reservations_not_found');
    } catch (error) {
        return res.status(501).json(error)
    }    
}

exports.getById = async(req, res, next) => {
    const idReservation = req.params.id

    try{
        let reservation = await Reservation.findById(idReservation);

        if (reservation) {
            return res.status(200).json(reservation);
        }

        return res.status(404).json('reservation_not_found');
    } catch (error) {
        return res.status(501).json(error)
    }
}

exports.add = async (req, res, next) => {

    const temp = ({
        catwayNumber: req.body.catwayNumber,
        clientName  : req.body.clientName,
        boattName   : req.body.boatName,
        checkIn     : req.body.checkIn,
        checkOut    : req.body.checkOut
    });

    try {
        let reservation = await Reservation.create(temp);

        return res.status(201).json(reservation);
    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.delete = async (req, res, next) => {
    const idReservation = req.params.id

    try {
        await Reservation.deleteOne({_id: idReservation});

        return res.status(204).json('delete_ok');
    } catch (error) {
        return res.status(501).json(error)
    }
}