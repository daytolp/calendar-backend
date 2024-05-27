const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarToken } = require('../helpers/jwt');



const crearUsuario =  async(req, res = response) => {
    const { email, password, name } = req.body;

    try {
        let usuario = await Usuario.findOne({ email });
        if(usuario) {
            return res.status(400).json({
                ok:false,
                msg: 'Un usuario existe con ese correo'
            })
        }
        usuario = new Usuario(req.body);
        //encriptar contraseña
        const salt = bcrypt.genSaltSync();
        console.log(salt);
        usuario.password = bcrypt.hashSync(password, salt);
        await usuario.save();
        
        //Generar Token
        const token = await generarToken(usuario._id, usuario.name);

        res.status(201).json({
            ok: true,
            uid: usuario._id,
            name: usuario.name,
            token
        });   
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

}

const loginUsuario =  async(req, res = response) => {
    const { password, email } = req.body;
    console.log("pass: ", password, " eamil: ", email);
    const msg = 'Credenciales invalidas';
    try {
        let usuario = await Usuario.findOne({ email });
        if(!usuario) {
            return res.status(400).json({
                ok:false,
                msg 
            })
        }
      
        const validPassword = bcrypt.compareSync(password, usuario.password);
        if (!validPassword) return res.json({
            ok: false,
            msg
        });

        //Generar Token
        const token = await generarToken(usuario.id, usuario.name);


        res.status(200).json({
            ok: true,
            uid: usuario._id,
            name: usuario.name,
            token
        });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
    
}

const revalidarToken =  async(req, res = response) => {
    const { uid, name } = req;
    const token = await generarToken(uid, name); 
    res.json({
        ok: true,
        uid,
        name,
        token
    });
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}