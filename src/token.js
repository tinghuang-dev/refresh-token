const { default: axios } = require('axios')
const JWT = require('jsonwebtoken')
const { generateAccessToken } = require('./auth')
const { auth_address } = require('./util')

const token = (req, res) => {
    const refresh_token = req.body.token

    if (refresh_token === null && refresh_token === undefined) return res.sendStatus(401)

    JWT.verify(refresh_token, process.env.REFRESH_SECRET, (err, user)=>{
        if(err) return res.sendStatus(403)

        axios.get(auth_address).then(({data})=> {
            const info = data.filter(auth => auth.name ===user.name)

            if (info.length === 0) return res.sendStatus(401)

            for(let i=0; i<info.length; i++) {
                if(info[i].token ===refresh_token) {
                    auth_status = true
                    break
                }
            }

            if(auth_status){
                const accessToken = generateAccessToken( { name: user.name }, '20s')
                res.json({accessToken})
            } else {
                return res.sendStatus(403)
            }       
        })
    })
}

module.exports = {token}