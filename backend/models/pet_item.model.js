module.exports = (sequelize, DataTypes) => {
    const pet_item_model =  sequelize.define('PetItem', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            unique: true,
            allowNull: false,
            primaryKey: true
        },
        seller_id: {
            type: DataTypes.UUID
        },
        item_name: {
            type: DataTypes.STRING,
            validate: {
                min: 4,
                max: 50
            }
        },
        mfg_date: {
            type: DataTypes.DATE,
            defaultValue: new Date()
        },
        exp_date: {
            type: DataTypes.DATE,
            defaultValue: new Date()
        },
        origin: {
            type: DataTypes.STRING,
            validate: {
                min: 0
            }
        },
        material: {
            type: DataTypes.STRING,
            validate: {
                min: 0
            }
        },
        quantity: {
            type: DataTypes.INTEGER,
            validate: {
                min: 0
            }
        },
        selling_prices: {
            type: DataTypes.DOUBLE,
            validate: {
                min: 0
            }
        },
        import_prices: {
            type: DataTypes.DOUBLE,
            defaultValue: 0,
            validate: {
                min: 0
            }
        },
        image: {
            type: DataTypes.STRING
        }
    })

    const Supplier = require('./supplier.model')(sequelize, DataTypes)
    Supplier.hasOne(pet_item_model, {
        foreignKey: 'seller_id',
        sourceKey: 'id',
        constraints: true
    });

    pet_item_model.belongsTo(Supplier, {
        foreignKey: 'seller_id',
        targetKey: 'id',
        constraints: true
    });

    return pet_item_model;
}