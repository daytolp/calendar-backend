const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors');
// console.log(process.env);


// Base de datos
dbConnection();


//Crear servidor de express
const app = express();


// CORS
app.use(cors());

//Directorio publico
app.use(express.static('public'))

//Lectura y parseo de body
app.use(express.json());


//Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));



//Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${4000}`);
})