const express = require('express');
const morgan = require('morgan');
const axios = require('axios');
const app = express();
const initDB = require('./config/db')
const userRoutes = require('./routes/user')
const mediaRoutes = require('./routes/mediaDia');

// configuracion
app.set('port', process.env.PORT || 5000);

// middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use('/inv', userRoutes)
app.use('/inv', mediaRoutes)

// Media del Dia de los sensores
let temperature = [];
let humedad1 = [];
let humedad2 = [];
let humedadatm = [];
// Obtiene la temperatura y la guarda en un array cada 15 minutos
setInterval(() => {
	axios.get('https://backend-vf-12.vercel.app/api/ultimo')
		.then(res => {
			// Response de datos
			const temp = parseFloat(res.data[0]['Temperatura'])
			const hum1 = res.data[0]['Humedad_cultivo_1'];
			const hum2 = res.data[0]['Humedad_cultivo_2'];
			const humatm = parseFloat(res.data[0]['Humedad_atm'])
			// Pasar los datos a las variables con arreglo
			temperature.push(temp);
			humedad1.push(hum1);
			humedad2.push(hum2);
			humedadatm.push(humatm);
		})
		.catch(error => {
			console.log(error);
		});
}, 5000); // 30 minutos 1800000

setInterval(() => {
	// Media temperatura
	const suma = temperature.reduce((a, b) => a + b, 0);
	const mediaTemp = suma / temperature.length;
	// Media Humedad 1
	const suma2 = humedad1.reduce((a, b) => a + b, 0);
	const mediaHum = suma2 / humedad1.length;
	// Media Humedad 2
	const suma3 = humedad2.reduce((a, b) => a + b, 0);
	const mediaHum2 = suma3 / humedad2.length;
	// Media Humedad ATM
	const suma4 = humedadatm.reduce((a, b) => a + b, 0);
	const mediaHumAtm = suma4 / humedadatm.length;
	// Fecha Actual
	const fechaActual = new Date();
	const fechaFormateada = fechaActual.toLocaleDateString();
	// ---------------------------------------------------------
	axios.post('https://backend-app-invernadero.vercel.app/inv/mediaDia/post', {
			mediaTemperatura: mediaTemp,
			media_Humedad_1: mediaHum,
			media_Humedad_2: mediaHum2,
			media_Humedad_atm: mediaHumAtm,
			fecha: fechaFormateada
		})
		.then(response => {
			console.log(response);
		})
		.catch(error => {
			console.error('Error al enviar la petición:', error);
		});
	temperature = [];
	humedad1 = [];
	humedad2 = [];
	humedadatm = [];
},  60000); // 24 horas 00 minutos 86400000
//60000 1 minuto
// Empezando el servidor
app.listen(app.get('port'), () =>{
    console.log(`servidor en el puerto ${app.get('port')}`);
});

initDB()