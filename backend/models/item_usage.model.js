module.exports = (sequelize, DataTypes) => {

    const Item_Usage = sequelize.define('ItemUsage', {

    })

    const Species = require('./species.model')(sequelize, DataTypes)
    const PetItem = require('./pet_item.model')(sequelize, DataTypes)
    Species.belongsToMany(PetItem, {through: Item_Usage});
    PetItem.belongsToMany(Species, {through: Item_Usage});

    return Item_Usage
}