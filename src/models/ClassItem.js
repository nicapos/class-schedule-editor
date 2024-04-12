const Schedule = require('./Schedule');
const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');
const { ClassItem: _ClassItem } = require('./replicas/ClassItem');

const WEEK_DAY_ENUM = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/**
 * @swagger
 * components:
 *   schemas:
 *     EditableClassItem:
 *       type: object
 *       properties:
 *         className:
 *           type: string
 *           description: The name of the class.
 *           minLength: 3
 *           maxLength: 255
 *           example: Math 101
 *         day:
 *           type: string
 *           enum:
 *             - Mon
 *             - Tue
 *             - Wed
 *             - Thu
 *             - Fri
 *             - Sat
 *           description: The day of the class.
 *           example: Mon
 *         startTime:
 *           type: string
 *           description: "The start time of the class (format: HH:mm)"
 *           example: "09:00"
 *         endTime:
 *           type: string
 *           description: "The end time of the class (format: HH:mm)"
 *           example: "10:30"
 *         location:
 *           type: string
 *           description: The location of the class.
 *           maxLength: 255
 *           example: Room 101
 *         scheduleId:
 *           type: integer
 *           description: The ID of the associated schedule.
 *           example: 1
 *       example:
 *         className: Math 101
 *         day: Mon
 *         startTime: "09:00"
 *         endTime: "10:30"
 *         location: Room 101
 *         scheduleId: 1
 * 
 *     ClassItem:
 *       allOf:
 *         - $ref: '#/components/schemas/EditableClassItem'
 *         - type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: The ID of the class item.
 *               example: 1
 */

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

// Setup replication via hook
ClassItem.afterCreate((instance, options) => {
  // Handle the creation of a new record in ClassItem
  // Replicate the data to ClassItem in DB2
  _ClassItem.create(instance.dataValues)
    .then(targetInstance => {
      console.log(`Replicated data to _ClassItem with ID: ${targetInstance.id}`);
    })
    .catch(error => {
      console.error('Error replicating data to _ClassItem:', error);
    });
});
module.exports = ClassItem;
