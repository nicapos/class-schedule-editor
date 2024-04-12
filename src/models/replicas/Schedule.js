const { User } = require('./User');
const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('./index');
const nanoid = require('../../utils/id');


const Schedule = sequelize.define('ClassSchedule', {
  id: {
    type: DataTypes.STRING(10),
    primaryKey: true,
    defaultValue: () => nanoid(),
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(32),
    allowNull: true,
  },
  userId: {
    type: Sequelize.UUID,
    references: {
      model: 'users',
      key: 'id',
    },
  },
}, {
  tableName: 'schedules'
});

Schedule.belongsTo(User, { foreignKey: 'userId' });

module.exports = {Schedule};
