const dotenv = require('dotenv')
dotenv.config()

const auth_address = process.env.DATA_ADDRESS + "/auth"

module.exports = {auth_address}