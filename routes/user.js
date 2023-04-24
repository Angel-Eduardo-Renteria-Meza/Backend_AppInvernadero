const express = require("express");
const router = express.Router();
const userSchema = require("../models/user");
const bycript = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { signAccessToken } = require('../helpers/jwt_helper')

//crear Usuario
router.post('/users', (req, res) => {
    const user = userSchema(req.body);
    
    user
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error})); 

});
//validacion login
router.post('/users/access', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
        userSchema
        .find({email: { $eq : email}})
        .then(async function (data){ 
            let isEqual = await bycript.compare(password, data[0].password);
            if(isEqual){
                const name = data[0].nombres
                const id = data[0]._id
                
                const accessToken = await signAccessToken(id, name)

                res.send({accessToken})
            }else{
                error
            }
            
        })
        .catch((error) => res.status(401).send(`Tu Email o Contraseña son incorrectos ${error}`));
        // res.json({ message: error})); 

});

router.post('/users/token', (req, res) => {
    
    const mycookie = req.body.Token

    if (mycookie) {
        try {
          // Decodifica el token y verifica su validez
          const decoded = jwt.verify(mycookie, process.env.ACC_TOKEN);
        //   console.log(decoded);
          // Si el token es válido, el usuario está autenticado
          // y redirige a la página de la aplicación
          res.status(200).send(decoded)
        } catch (error) {
          // Si el token no es válido, debes requerir que el usuario inicie sesión
          console.error('Error al verificar el token:', error);
          res.status(401).send(error);
        }
      } else {
        // Si no hay una cookie de autenticación presente,
        // debes requerir que el usuario inicie sesión
        console.log('El usuario debe iniciar sesión no hay cookie');
        res.status(403).send("Parece ser que tu inicio de sesion se ha borrado");
      }
    });

    
module.exports = router;
