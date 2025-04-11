module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Species', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            unique: true,
            allowNull: false,
            primaryKey: true
        },
        species_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                min: 0,
                max: 50
            }
        },
        average_age: {
            type: DataTypes.FLOAT,
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
}