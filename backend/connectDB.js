const db = require("./models");

const connectDB = async () => {
    try {
        await db.sequelize.authenticate();
        console.log("Connection has been established successfully.")
        await db.sequelize.sync();
        console.log("Sync models successfully.")
    } catch (err) {
        console.error(err)
    }
}

module.exports = {
    connectDB
}