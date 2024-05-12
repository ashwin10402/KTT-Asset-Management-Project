// models/asset.model.js
module.exports = (sequelize, DataTypes) => {
    const Asset = sequelize.define("Asset", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        serial_number: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        make: {
            type: DataTypes.STRING
        },
        model: {
            type: DataTypes.STRING
        },
        asset_type: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.TEXT
        },
        status: {
            type: DataTypes.STRING
        },
      
       
    },{
        tableName: 'assets',  // explicitly specify the table name
        timestamps: false
    });

    Asset.sync();

    return Asset;
};
