const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;


/**
 * Verifie si le token est du bon type
 * Si le token n'est pas du type 'string' alors on renvoie false
 * Si le token est du type 'string' alors on verifie la cohérence entre le token envoyer et le token créer avec les identifiants
 */
const extractBearer = authorization => {

    if(typeof authorization !== 'string') {
        return false
    }

    const matches = authorization.match(/(bearer)\s+(\S+)/i)

    return matches && matches[2]

}

/**
 * Vérifie si le jeton JWT est valide et associe l'utilisateur correspondant à la requête.
 * Si le jeton est valide, ajoute `req.user` avec les informations de l'utilisateur.
 * Si le jeton est invalide ou s'il manque, envoie une réponse 401.
 * @param {express.Request} req Objet de requête Express pour récupérer le token
 * @param {express.Response} res Objet de réponse Express si l'accès est autorisé ou non
 * @param {express.NextFunction} next Fonction middleware Express, non utilisé ici mais respecte la structure standard des middlewares Express
 * @returns {Réponse}
 */
exports.checkJWT = async(req, res, next) => {
    const token = req.headers.authorization && extractBearer(req.headers.authorization)
    
    if(!token) {
        return res.status(401).json('token_required');
    } else {

    jwt.verify(token, SECRET_KEY, (err, decodedToken) => {
        if(err) {
            return res.status(401).json('token_not_valid');
        }
        
            next()
        })
    }
}