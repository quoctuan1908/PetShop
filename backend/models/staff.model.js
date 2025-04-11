module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Staff', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            unique: true,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            max: 50
        },
        address: {
            type: DataTypes.TEXT,
            max: 100
        },
        email: {
            type: DataTypes.STRING,
            max: 50
        },
        phone_number: {
            type: DataTypes.STRING,
            min:10,
            max: 10
        }
    })
}