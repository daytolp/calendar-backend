const jwt = require('jsonwebtoken');

const generarToken = (uid, name) => {
    return new Promise((resolve, reject) => {
        const payload = { uid, name };
        // console.log({payload});
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {expiresIn: '2h'}, (error, token) => {
            if (error) {
                console.log(error);
                reject('No se puede generar el token');
            }
            resolve(token);
        });
    });
}

module.exports = {
    generarToken
}