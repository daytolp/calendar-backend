//Rutas /api/auth

const { Router } = require('express');
const router = Router();
const { crearUsuario, revalidarToken, loginUsuario } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJwt } = require('../middlewares/validar-jwt');



router.post('/new',
           [
            //middlewares
            check('name', 'El nombre es obligatorio').not().isEmpty(),//cada check es un middleware una funciona que se ejecuta antes de mi metodo crearUsuario
            check('email', 'El email es obligatorio').isEmail(),            
            check('password', 'El password debe de ser de 6 caracteres').isLength({min:6}),
            validarCampos,
           ], 
           crearUsuario);

router.post('/login',
            [
                check('email', 'El email es obligatorio').isEmail(),            
                check('password', 'El password debe de ser de 6 caracteres').isLength({min:6}),
                validarCampos,
            ],
            loginUsuario);

router.get('/renew', 
        [
            validarJwt
        ],
        revalidarToken);


module.exports = router;