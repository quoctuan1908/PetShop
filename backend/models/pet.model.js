module.exports = (sequelize, DataTypes) => {
    const pet_model = sequelize.define('Pet', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            unique: true,
            allowNull: false,
            primaryKey: true
        },
        species_id: {
            type: DataTypes.UUID
        },
        seller_id: {
            type: DataTypes.UUID
        },
        pet_name: {
            type: DataTypes.STRING,
            validate: {
                max: 50
            },
            defaultValue: "No name"
        },
        sex: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        weight: {
            type: DataTypes.FLOAT,
            validate: {
                min: 0
            }
        },
        age: {
            type: DataTypes.FLOAT,
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
        quantity: {
            type: DataTypes.INTEGER,
            validate: {
                min: 0
            }
        },
        description: {
            type: DataTypes.TEXT
        },
        image: {
            type: DataTypes.STRING
        }
    })

    const Species = require('./species.model')(sequelize, DataTypes)
    const Supplier = require('./supplier.model')(sequelize, DataTypes)

    Supplier.hasOne(pet_model, {
        foreignKey: 'seller_id',
        sourceKey: 'id',
        constraints: true
    });

    pet_model.belongsTo(Supplier, {
        foreignKey: 'seller_id',
        targetKey: 'id',
        constraints: true
    });


    Species.hasOne(pet_model, {
        foreignKey: 'species_id',
        sourceKey: 'id',
        constraints: true
    });

    pet_model.belongsTo(Species, {
        foreignKey: 'species_id',
        targetKey: 'id',
        constraints: true
    });

    return pet_model;
}