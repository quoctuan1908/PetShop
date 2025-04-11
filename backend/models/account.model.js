module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Account', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            unique: true,
            allowNull: false,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
            validate: {
                min: 4,
                max: 50
            }
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        role: {
            type: DataTypes.STRING  
        }
    })
}