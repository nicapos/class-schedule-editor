const { Schedule } = require('./Schedule');
const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

const WEEK_DAY_ENUM = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const ClassItem = sequelize.define('ClassItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  className: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  day: {
    type: DataTypes.ENUM(...WEEK_DAY_ENUM),
    allowNull: false,
  },
  startTime: {
    type: DataTypes.STRING(5),
    allowNull: false,
  },
  endTime: {
    type: DataTypes.STRING(5),
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  scheduleId: {
    type: DataTypes.STRING(10),
    references: {
      model: 'schedules',
      key: 'id',
    },
  },
}, {
  tableName: 'classes',
});

ClassItem.belongsTo(Schedule, { foreignKey: 'scheduleId' });

module.exports = {ClassItem};
