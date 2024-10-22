const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY

/**
 * Authentifie un utilisateur avec son email et son mot de passe
 * @param {*} req Objet de requête Express contenant les informations d'identification de l'utilisateur
 * @param {*} res Objet de réponse Express utilisé pour envoyer la réponse au client
 * @returns {Réponse}
 */
exports.authenticate = async (req, res) => {
    const { email, password } = req.body;
    
    try{
        let user = await User.findOne({ email: email }, '-__v -createdAt -updatedAt');

        if (user) {
            bcrypt.compare(password, user.password, function(err, response) {
                if (err) {
                    throw new Error(err);
                }
                if (response) {
                    delete user._doc.password;

                    const expireIn = 24 * 60 * 60;
                    const token    = jwt.sign({
                        user: user
                    },
                    SECRET_KEY,
                    {
                        expiresIn: expireIn
                    });

                    res.header('Authorization', 'Bearer' + token);

                    return res.status(200).json({access_token: token});
                }

                return res.status(403).json('wrong_credentials');
            });
        } else {
            return res.status(404).json('user_not_found');
        }
    } catch (error) {
        return res.status(501).json(error);
    }
}

/**
 * Récupère tous les utilisateur
 * @param {express.Response} res Objet de réponse Express utilisé pour envoyer la réponse au client
 * @returns {Liste}
 */
exports.getAllUsers = async (req, res) => {
    await User.find()
        .then(users => res.status(200).json({data : users}))
        .catch(err => res.status(500).json({message: 'Database Error', error: err}))
}

/**
 * Récupère un utilisateur par son identifiant
 * @param {express.Request} req Objet de requête Express contenant les paramètres de la requête
 * @param {express.Response} res Objet de réponse Express utilisé pour envoyer la réponse au client
 * @returns {Réponse}
 */
exports.getById = async(req, res) => {
    const id = req.params.id

    try{
        let user = await User.findOne({_id: id});

        if (user) {
            return res.status(200).json(user);
        }

        return res.status(404).json('user_not_found');
    } catch (error) {
        return res.status(501).json(error)
    }
}

/**
 * Crée un utilisateur
 * @param {express.Request} req Objet de requête Express contenant les données de l'utilisateur à créer
 * @param {express.Response} res Objet de réponse Express utilisé pour envoyer la réponse au client
 * @returns {Réponse}
 */
exports.add = async (req, res) => {

    const temp = ({
        name    : req.body.name,
        email   : req.body.email,
        password: req.body.password
    });

    try {
        let user = await User.create(temp);

        return res.status(201).json({message: 'Utilisateur créé'});
    } catch (error) {
        return res.status(501).json(error);
    }
}

/**
 * Met à jour un utilisateur existant
 * @param {express.Request} req Objet de requête Express contenant les données mises à jour de l'utilisateur
 * @param {express.Response} res Objet de réponse Express utilisé pour envoyer la réponse au client
 * @returns {Réponse} 
 */
exports.update = async (req, res) => {
    const id = req.params.id
    const temp = ({
        name    : req.body.name,
        email   : req.body.email,
        password: req.body.password
    });

    try {
        let user = await User.findOne({_id : id });

        if (user) {
            Object.keys(temp).forEach((key) => {
                if (!!temp[key]) {
                    user[key] = temp[key];
                }
            });

            await user.save();
            return res.status(201).json({message: 'Utilisateur modifié'});
        }

        return res.status(404).json('user_not_found');
    } catch (error) {
        return res.status(501).json(error);
    }
}

/**
 * Supprime un utilisateur existant
 * @param {express.Request} req Objet de requête Express contenant les paramètres de la requête HTTP
 * @param {express.Response} res Objet de réponse Express utilisé pour envoyer la réponse au client
 * @returns {Réponse} 
 */
exports.delete = async (req, res) => {
    const id = req.params.id

    try {
        await User.deleteOne({_id: id});

        return res.status(204).json({message: 'Utilisateur supprimé'});
    } catch (error) {
        return res.status(501).json(error)
    }
}