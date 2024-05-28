
//obtener ventos
const {response} = require('express');
const Evento = require('../models/Evento');


const getEvents = async(req, res = response) => {
    const eventos = await Evento.find()
                                .populate('user', 'name');
    res.status(200).json({
        ok:true,
        eventos
    })
}
const createEvents = async(req, res = response) => {

    const evento = new Evento(req.body);

    try {
       const eventoDB = await evento.save();
       evento.user = req.uid;

       res.status(201).json({
        ok:false,
        evento: eventoDB
    })
    } catch (error) {
        console.log("ERROR::", error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

}

const updateEvents = async(req, res = response) => {
    const uid = req.uid;
    const eventoId = req.params.id;

    try {
        const eventoDB = await Evento.findById(eventoId);
        console.log({eventoDB})
        if (!eventoDB) 
            return res.status(404).json({
                        ok:false,
                        msg:"Evento no encontrado con id " + eventoId
                    });
        
        // if (eventoDB.user !== uid)
        //     return res.status(401).json({
        //                  ok:false,
        //                  msg: "No tiene privilegio de editar este evento"
        //                 });

        const nuevoEvento = {
            ...req.body,
            user: uid
        }        
        
        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, { new: true });

        res.status(201).json({
         ok:true,
         evento: eventoActualizado
        });
     } catch (error) {
         console.log("ERROR::", error)
         res.status(500).json({
             ok: false,
             msg: 'Por favor hable con el administrador'
         });
     }
}

const deleteEvents = async(req, res = response) => {
    
    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById( eventoId );

        if ( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            });
        }

        if ( evento.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de eliminar este evento'
            });
        }


        await Evento.findByIdAndDelete( eventoId );

        res.json({ ok: true });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

module.exports = {
    getEvents,
    createEvents,
    updateEvents,
    deleteEvents
}
