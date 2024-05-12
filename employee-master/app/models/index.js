const Sequelize = require('sequelize');
const dbConfig = require('../config/db.config');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

sequelize.authenticate().then(() => {
    console.log("Connection successful");
}).catch((err) => {
    console.log("Error connecting to database, " + err);
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.employees = require("./employee.model.js")(sequelize, Sequelize);
db.assets = require("./asset.model.js")(sequelize, Sequelize);
db.issueTrx = require("./issueTrx.model.js")(sequelize, Sequelize);
db.rtntrx = require("./rtntrx.model.js")(sequelize, Sequelize);

const DataTypes = Sequelize.DataTypes;



module.exports = db;
