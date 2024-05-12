module.exports = (sequelize, DataTypes) => {
    const RtnTrx = sequelize.define("RtnTrx", {
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
        return_date: {
            type: DataTypes.DATE
        },
        issue_notes: {
            type: DataTypes.TEXT
        },
        return_notes: {
            type: DataTypes.TEXT
        },
      
    }, {
        tableName: 'rtntrx',
        timestamps: false
    });

    return RtnTrx;
};