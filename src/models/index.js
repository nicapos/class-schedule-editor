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

const sequelize1 = new Sequelize(process.env.DATABASE1_URL, sequelizeOptions);
const sequelize2 = new Sequelize(process.env.DATABASE2_URL, sequelizeOptions);

const db = { sequelize1, sequelize2 };

db.Sequelize = Sequelize;
db.sequelize = sequelize1; // by default, sequelize refers to DATABASE1

module.exports = db;
