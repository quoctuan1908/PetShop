const { Sequelize } = require("sequelize");
const config = require('../config');
const accountModel = require("./account.model");
const petModel = require("./pet.model");
const speciesModel = require("./species.model");
const supplierModel = require("./supplier.model");
const petItemModel = require("./pet_item.model");
const itemUsageModel = require("./item_usage.model");
const userModel = require("./user.model");
const staffModel = require("./staff.model");
const orderModel = require("./order.model");


const sequelize = new Sequelize(config.postgres.database,config.postgres.username, config.postgres.password,{
    host: 'localhost',
    dialect: 'postgres'
})

const db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    Account: accountModel(sequelize, Sequelize.DataTypes),
    Pet: petModel(sequelize, Sequelize.DataTypes),
    Species: speciesModel(sequelize, Sequelize.DataTypes),
    Order: orderModel(sequelize, Sequelize.DataTypes),
    Supplier: supplierModel(sequelize, Sequelize.DataTypes),
    PetItem: petItemModel(sequelize, Sequelize.DataTypes),
    ItemUsage: itemUsageModel(sequelize, Sequelize.DataTypes),
    User: userModel(sequelize, Sequelize.DataTypes),
    Staff: staffModel(sequelize, Sequelize.DataTypes)
}

module.exports = db