module.exports = (sequelize, DataTypes) => {
    const order_model = sequelize.define('Order', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            unique: true,
            allowNull: false,
            primaryKey: true
        },
        buyer_id: {
            type: DataTypes.UUID
        },
        seller_id: {
            type: DataTypes.UUID
        },
        merchandise_id: {
            type: DataTypes.UUID
        },
        staff_id: {
            type: DataTypes.UUID
        },
        quantity: {
            type: DataTypes.INTEGER,
            min: 1
        },
        order_time: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        price: {
            type: DataTypes.FLOAT,
            min: 0
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: "PROCESSING"
        },
        address: {
            type: DataTypes.TEXT,
        },
        image: {
            type: DataTypes.STRING
        }
    })

    const User = require('./user.model')(sequelize, DataTypes)
    const Supplier = require('./supplier.model')(sequelize, DataTypes)
    const Pet = require('./pet.model')(sequelize, DataTypes)
    const PetItem = require('./pet_item.model')(sequelize, DataTypes)

    User.hasOne(order_model, {
        foreignKey: 'buyer_id',
        sourceKey: 'id',
        constraints: false
    });

    order_model.belongsTo(User, {
        foreignKey: 'buyer_id',
        targetKey: 'id',
        constraints: false
    });

    User.hasOne(order_model, {
        foreignKey: 'staff_id',
        sourceKey: 'id',
        constraints: false
    });

    order_model.belongsTo(User, {
        foreignKey: 'staff_id',
        targetKey: 'id',
        constraints: false
    });

    Pet.hasOne(order_model, {
        foreignKey: 'merchandise_id',
        sourceKey: 'id',
        constraints: false
    });

    order_model.belongsTo(Pet, {
        foreignKey: 'merchandise_id',
        targetKey: 'id',
        constraints: false
    });

    PetItem.hasOne(order_model, {
        foreignKey: 'merchandise_id',
        sourceKey: 'id',
        constraints: false
    });

    order_model.belongsTo(PetItem, {
        foreignKey: 'merchandise_id',
        targetKey: 'id',
        constraints: false
    });

    return order_model;
}