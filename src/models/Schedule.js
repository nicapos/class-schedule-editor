const { DataTypes } = require('sequelize');
const sequelize = require('./index');

/**
 * @swagger
 * components:
 *   schemas:
 *     ClassItem:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The ID of the class item.
 *         className:
 *           type: string
 *           description: The name of the class.
 *         day:
 *           type: string
 *           enum: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
 *           description: "The day of the class."
 *         startTime:
 *           type: string
 *           description: "The start time of the class (format: HH:mm)."
 *         endTime:
 *           type: string
 *           description: "The end time of the class (format: HH:mm)."
 *         location:
 *           type: string
 *           description: The location of the class.
 *         scheduleId:
 *           type: integer
 *           description: The ID of the associated schedule.
 *       example:
 *         id: 1
 *         className: "Math 101"
 *         day: "Mon"
 *         startTime: "09:00"
 *         endTime: "10:30"
 *         location: "Room 101"
 *         scheduleId: 1
 */
const Schedule = sequelize.define('ClassSchedule', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(32),
    allowNull: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id',
    },
  },
}, {
  table: "class_schedules"
});

Schedule.belongsTo(User, { foreignKey: 'userId' });

module.exports = Schedule;
