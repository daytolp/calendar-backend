const { response } = require('express');
const jwt = require('jsonwebtoken');


const validarJwt = (req, res = response, next) => {
    //x-token headers
    const token = req.header('x-token');
   
    if (!token) return response.json({
        ok:false,
        msg: 'No hay token en la petición'
    });

    try {
        const payload = jwt.verify(token, process.env.SECRET_JWT_SEED);
        req.uid = payload.uid;
        req.name = payload.name;
         
    } catch (error) {
        console.log("ERROR ->", error)
      return res.status(401).json({
        ok:false,
        msg: 'Token no valido'
    });
 
    }
    next();
}

module.exports = {
    validarJwt
}
