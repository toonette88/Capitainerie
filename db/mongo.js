const mongoose = require('mongoose');

const clientOptions = {
    dbName         : 'capitainerie' 
};

exports.initClientDBConnection = async() => {
    try {
        // On se connecte à MongoDB en utilisant une variable d'environnement URL_MONGO
        await mongoose.connect(process.env.URL_MONGO, clientOptions)
        console.log('Connected');
    } catch(error) {
        console.log('error');
        throw error;
    }
}