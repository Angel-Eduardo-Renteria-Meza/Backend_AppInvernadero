const express = require('express')
const router = express.Router()
const mediaSchema = require('../models/mediaDia')

//Ingresar Media y Dia
router.post('/mediaDia/post', (req, res) => {
    const mediaDia = mediaSchema(req.body);
    mediaDia
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error})); 

});
//validacion login
router.get('/mediaDia', (req, res) => {
    
     mediaSchema
     .find()
     .then((data) => res.json(data))
     .catch((error) => res.json({ message: error})); 

});

module.exports = router;