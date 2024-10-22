const Catway = require('../models/catway');

/**
 * Récupère tous les catways
 * @param {express.Response} res Objet de réponse Express utilisé pour envoyer la réponse au client
 * returns {liste}
 */
exports.getAllCatways = async (req, res) => {
    await Catway.find()
        .then(catways => res.status(200).json({data : catways}))
        .catch(err => res.status(500).json({message: 'Database Error', error: err}))
}

/**
 * Récupère un catway par son identifiant
 * @param {express.Request} req Objet de requête Express contenant les paramètres de la requête
 * @param {express.Response} res Objet de réponse Express utilisé pour envoyer la réponse au client
 * @returns {Réponse}
 */
exports.getById = async (req, res) => {
    const id = req.params.id
    
    try{
        let catway = await Catway.findOne({_id: id});

        if (catway) {
            return res.status(200).json(catway);
        }

        return res.status(404).json('catway_not_found');
    } catch (error) {
        return res.status(501).json(error)
    }
}

/**
 * Crée un catway
 * @param {express.Request} req Objet de requête Express contenant les données du catway à créer
 * @param {express.Response} res Objet de réponse Express utilisé pour envoyer la réponse au client
 * @returns {Réponse}
 */
exports.add = async (req, res) => {

    const temp = ({
        catwayNumber: req.body.catwayNumber,
        type        : req.body.type,
        catwayState : req.body.catwayState,
        checkIn     : req.body.checkIn,
        checkOut    : req.body.checkOut
    });

    try {
        let catway = await Catway.create(temp);

        return res.status(201).json({message: 'Catway enregistré'});
    } catch (error) {
        return res.status(501).json({error});
    }
}

/**
 * Met à jour un catway existant
 * @param {express.Request} req Objet de requête Express contenant les données mises à jour du catway
 * @param {express.Response} res Objet de réponse Express utilisé pour envoyer la réponse au client
 * @returns {Réponse} 
 */
exports.update = async (req, res) => {
    const id = req.params.id
    const temp = ({
        catwayNumber: req.body.catwayNumber,
        type        : req.body.type,
        catwayState : req.body.catwayState
    });

    try {
        let catway = await Catway.findOne({catwayNumber : id });

        if (catway) {
            Object.keys(temp).forEach((key) => {
                if (!!temp[key]) {
                    catway[key] = temp[key];
                }
            });

            await catway.save();
            return res.status(201).json({message: 'Catway modifié'});
        }

        return res.status(404).json('catway_not_found');
    } catch (error) {
        return res.status(501).json(error);
    }
}

/**
 * Supprime un catway existant
 * @param {express.Request} req Objet de requête Express contenant les paramètres de la requête HTTP
 * @param {express.Response} res Objet de réponse Express utilisé pour envoyer la réponse au client
 * @returns {Réponse} 
 */
exports.delete = async (req, res) => {
    const id = req.params.id

    try {
        await Catway.deleteOne({_id: id});

        return res.status(204).json({message: 'Catway supprimé'});
    } catch (error) {
        return res.status(501).json(error)
    }
}