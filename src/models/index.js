const dotenv = require("dotenv");
const { Sequelize } = require('sequelize');

dotenv.config();

const sequelize = new Sequelize(
  process.env.DATABASE_URL,
  {
    dialect: 'postgres',
    logging: (msg) => console.log('\x1b[90m%s\x1b[0m', msg), // Log as grey messages
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
