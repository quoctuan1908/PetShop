module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Supplier', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            unique: true,
            allowNull: false,
            primaryKey: true
        },
        supplier_name: {
            type: DataTypes.STRING,
            validate: {
                max: 50,
                min: 4
            },
            allowNull: false
        },
        address: {
            type: DataTypes.TEXT
        },
        phone_number: {
            type: DataTypes.STRING
        }
    })
}