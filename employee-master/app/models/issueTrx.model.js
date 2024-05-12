module.exports = (sequelize, DataTypes) => {
    const IssueTrx = sequelize.define("IssueTrx", {
        transaction_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        asset_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'assets',
                key: 'id'
            }
        },
        employee_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'employees',
                key: 'id'
            }
        },
        issue_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        
        notes: {
            type: DataTypes.TEXT
        }
    }, {
        tableName: 'issuetrx',
        timestamps: false
    });

    return IssueTrx;
};