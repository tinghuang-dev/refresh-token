const dotenv = require('dotenv')

// 开启env功能
dotenv.config()

const axios = require('axios')

const user_info = (req, res) => {
    axios.get(process.env.DATA_ADDRESS + "/user")
    // .then(response => {
    //     res.json(response.data)
    // })
    .then(response => {
        res.json(response.data.filter( user => user.name === req.user.name))
    })
}

module.exports = { user_info }