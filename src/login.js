const axios = require('axios')
const JWT = require('jsonwebtoken')
const { generateAccessToken, generateRefreshToken } = require('./auth')
const {auth_address} = require("./util")

const login = (req, res) => {
    const username = req.body.username
    const user = { name: username}

    const accessToken = generateAccessToken(user, '20s')

    const refreshToken = generateRefreshToken(user)

    axios.post(auth_address, {
        name: username, token: refreshToken
    }).catch(error => {
        console.log(error);
    })

    res.json({accessToken, refreshToken})
}

module.exports = { login }