const dotenv = require("dotenv");
const { Sequelize } = require('sequelize');

dotenv.config();

const sequelizeOptions = {
  dialect: 'postgres',
  logging: (msg) => console.log('\x1b[90m%s\x1b[0m', msg), // Log as grey messages
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

const sequelize = new Sequelize(process.env.DATABASE2_URL, sequelizeOptions);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.isAvailable = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to db2 has been established");
    return true;
  } catch (error) {
    console.error("Unable to connect to db2:", error);
    return false;
  }
}

module.exports = db;
