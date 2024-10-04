const Catway = require('../models/catway');

exports.getAll = async(req, res, next) => {
    try{
        let catways = await Catways.find()

        if(catways) {
            return res.status(200).json(catways);
        }

        return res.status(404).json('catways_not_found');
    } catch (error) {
        return res.status(501).json(error)
    }    
}

exports.getById = async(req, res, next) => {
    const id = req.params.id

    try{
        let catway = await Catway.findById(id);

        if (catway) {
            return res.status(200).json(catway);
        }

        return res.status(404).json('catway_not_found');
    } catch (error) {
        return res.status(501).json(error)
    }
}

exports.add = async (req, res, next) => {

    const temp = ({
        catwayNumber: req.body.catwayNumber,
        type        : req.body.type,
        catwayState : req.body.catwayState
    });

    try {
        let catway = await Catway.create(temp);

        return res.status(201).json(catway);
    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.update = async (req, res, next) => {
    const id = req.params.id
    const temp = ({
        catwayNumber: req.body.catwayNumber,
        type        : req.body.type,
        catwayState : req.body.catwayState
    });

    try {
        let catway = await Catway.findOne({_id : id });

        if (catway) {
            Object.keys(temp).forEach((key) => {
                if (!!temp[key]) {
                    catway[key] = temp[key];
                }
            });

            await catway.save();
            return res.status(201).json(user);
        }

        return res.status(404).json('catway_not_found');
    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.delete = async (req, res, next) => {
    const id = req.params.id

    try {
        await Catway.deleteOne({_id: id});

        return res.status(204).json('delete_ok');
    } catch (error) {
        return res.status(501).json(error)
    }
}