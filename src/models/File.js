const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('./index');
const { File: _File } = require('./replicas/File')

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

// Setup replication via hook
File.afterCreate((instance, options) => {
  // Handle the creation of a new record in File
  // Replicate the data to File in DB2
  _File.create(instance.dataValues)
    .then(targetInstance => {
      console.log(`Replicated data to _File with ID: ${targetInstance.id}`);
    })
    .catch(error => {
      console.error('Error replicating data to _File:', error);
    });
});

module.exports = File;
