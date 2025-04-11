require('dotenv').config()

module.exports = {
    postgres: {
        username: process.env.POSTGRES_USERNAME,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB
    },
    key: {
        jwt_key: process.env.SECRETKEY
    }
}