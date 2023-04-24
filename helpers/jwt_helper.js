const jwt = require('jsonwebtoken')

module.exports = {
    signAccessToken: (userId, userName) => {
        return new Promise((resolve, reject) => {
            const payload = {
                name: `${userName}`
            }
            const options = {
                expiresIn: '24h',
                issuer: "cultivecare.website",
                audience: `${userId}`
            }

            jwt.sign(payload, process.env.ACC_TOKEN , options, (err, token) => {
                if(err){err}
                resolve(token)
            })
        })
    }
}