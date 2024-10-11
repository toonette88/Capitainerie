const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

const extractBearer = authorization => {

    if(typeof authorization !== 'string') {
        return false
    }

    const matches = authorization.match(/(bearer)\s+(\S+)/i)

    return matches && matches[2]

}

exports.checkJWT = async(req, res, next) => {
    const token = req.headers.authorization && extractBearer(req.headers.authorization)
    
    if(!token) {
        return res.status(401).json('token_required');
    }

    jwt.verify(token, SECRET_KEY, (err, decodedToken) => {
        if(err) {
            return res.status(401).json('token_not_valid');
        }
        
            next()
        })
    }
   