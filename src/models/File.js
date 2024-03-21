const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('./index');

const File = sequelize.define('file', {
  filename: {
    type: DataTypes.STRING,
    allowNull: false
  },
  data: {
    type: DataTypes.BLOB('long'),
    allowNull: false
  }
});

module.exports = File;
