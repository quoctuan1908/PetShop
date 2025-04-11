module.exports = (sequelize, DataTypes) => {
    const user_model = sequelize.define('User', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true, 
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
             validate: {
                min: 0,
                max: 50
            },
            defaultValue: "User"
        },
        gender: {
            type: DataTypes.BOOLEAN
        },
        birthday: {
            type: DataTypes.DATE
        },
        address: {
            type: DataTypes.TEXT,
            validate: {
                min: 0,
                max: 100
            }
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                min: 0,
                max: 100
            }
        },
        phone_number: {
            type: DataTypes.STRING,
            validate: {
                min: 10,
                max: 10
            }
        }
    })

    const Account = require('./account.model')(sequelize, DataTypes)
    Account.hasOne(user_model, {
        foreignKey: 'id', // The foreign key in User is 'id'
        sourceKey: 'id',  // The source key in Account is 'id'
        constraints: true // Enforce foreign key constraint
    });

    user_model.belongsTo(Account, {
        foreignKey: 'id', // The foreign key in User is 'id'
        targetKey: 'id',  // The target key in Account is 'id'
        constraints: true // Enforce foreign key constraint
    });
    return user_model
}