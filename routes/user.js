const express = require("express");
const router = express.Router();
const userSchema = require("../models/user");
const bycript = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
                // res.status(202).send('Ha iniciado Sesion!!');
                
                const payload = {
                    id: data[0]._id,
                    email: data[0].email
                }

                const options = {
                    expiresIn: "1h",
                    issuer: "cultiveCare"
                }
                
                const token = jwt.sign(payload, process.env.ACC_TOKEN , options)

                res.send({
                    token,
                });
                
            }else{
                error
            }
            
        })
        .catch((error) => res.status(401).send(`Tu Email o Contraseña son incorrectos`));
        // res.json({ message: error})); 

});

module.exports = router;
