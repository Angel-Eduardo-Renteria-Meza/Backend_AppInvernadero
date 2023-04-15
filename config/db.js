const mongoose = require('mongoose');

// URL de conexión a la base de datos
const url = process.env.MONGO_URL;

// Opciones de conexión
const options = {
  keepAlive: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
};

// Conectar a la base de datos
module.exports = () =>{
        mongoose.connect(url, options)
        .then(() => console.log('Conexión exitosa a Mongo Atlas'))
        .catch(err => console.log('Error al conectar a Mongo Atlas:', err));
    }

