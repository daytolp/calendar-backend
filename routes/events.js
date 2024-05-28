const { Router } = require('express');
const router = Router();
const {validarJwt} = require('../middlewares/validar-jwt');
const {getEvents, createEvents, updateEvents, deleteEvents} = require('../controllers/events');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');


router.use(validarJwt);

router.get('/', getEvents);

router.post('/', 
            [
                check('title', 'El titulo es obligatorio').not().isEmpty(),
                check('start', 'Fecha de inicio obligatoria').custom(isDate),
                check('end', 'Fecha de finalización obligatoria').custom(isDate),
                validarCampos,
            ],
            createEvents);

router.put('/:id', 
            [
                check('title', 'El titulo es obligatorio').not().isEmpty(),
                check('start', 'Fecha de inicio obligatoria').custom(isDate),
                check('end', 'Fecha de finalización obligatoria').custom(isDate),
            ],
            updateEvents);


router.delete('/:id',
            // [
            //     validarJwt
            // ],
            deleteEvents);

module.exports = router;