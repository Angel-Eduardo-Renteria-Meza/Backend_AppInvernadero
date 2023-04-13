const express = require('express')
const router = express.Router()
const mediaSchema = require('../models/mediaDia')

router.get('/mediaDia', (req, res) => {
    
     mediaSchema
     .find()
     .then((data) => res.json(data))
     .catch((error) => res.json({ message: error})); 

});

module.exports = router;