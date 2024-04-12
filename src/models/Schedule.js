const User = require('./User');
const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('./index');
const nanoid = require('../utils/id');
const { Schedule: _Schedule } = require('./replicas/Schedule');

/**
 * @swagger
 * components:
 *   schemas:
 *     EditableSchedule:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the schedule.
 *           example: "My Schedule"
 *         userId:
 *           type: integer
 *           description: The id of the user associated with the schedule.
 *           example: 123
 * 
 *     Schedule:
 *       allOf:
 *         - $ref: '#/components/schemas/EditableSchedule'
 *         - type: object
 *           properties:
 *             id:
 *               type: string
 *               description: The ID of the class item.
 *               example: 4f90d13a42
 */
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

// Setup replication via hook
Schedule.afterCreate((instance, options) => {
  // Handle the creation of a new record in Schedule
  // Replicate the data to Schedule in DB2
  _Schedule.create(instance.dataValues)
    .then(targetInstance => {
      console.log(`Replicated data to _Schedule with ID: ${targetInstance.id}`);
    })
    .catch(error => {
      console.error('Error replicating data to _Schedule:', error);
    });
});

module.exports = Schedule;
