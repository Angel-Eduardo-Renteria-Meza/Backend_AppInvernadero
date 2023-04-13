const express = require("express");
const router = express.Router();
const userSchema = require("../models/user");
const bycript = require('bcryptjs')

//crear Usuario
router.post('/users', (req, res) => {
    const user = userSchema(req.body);
    
    user
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error})); 

});
//validacion login
router.get('/users/:email/:password', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
        userSchema
        .find({email: { $eq : email}})
        .then(async function (data){
            let isEqual = await bycript.compare(password, data[0].password);
            if(isEqual){
               res.status(202).send('Contraseña correcta');
            }else{
                res.status(404).send('contraseña incorrecta');
            }
            
        })
        .catch((error) => res.json({ message: error})); 

});

module.exports = router;
