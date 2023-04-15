const express = require('express');
const morgan = require('morgan');
const app = express();
const initDB = require('./config/db')
const userRoutes = require('./routes/user')
const mediaRoutes = require('./routes/mediaDia');

// configuracion
app.set('port', process.env.PORT || 5000);

// middlewares
app.use(morgan('dev'));
app.use(express.json());

//Rutas
app.use('/inv', userRoutes)
app.use('/inv', mediaRoutes)


// Empezando el servidor
app.listen(app.get('port'), () =>{
    console.log(`servidor en el puerto ${app.get('port')}`);
});

initDB();