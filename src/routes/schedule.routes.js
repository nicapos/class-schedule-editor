const Schedule = require('../models/Schedule');
const ClassItem = require('../models/ClassItem');
const { Router } = require("express");
const { timeToDecimal } = require('../utils/time');
const { logger } = require("../utils/logger");

const router = Router();

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/**
 * @swagger
 * /schedule:
 *   post:
 *     summary: Create new schedule
 *     tags: [schedule]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EditableSchedule'
 *     responses:
 *       '201':
 *         description: Schedule created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Schedule'
 *       '500':
 *         description: Internal Server Error
 */
router.post('/', async (req, res) => {
  try {
    const { userId, name } = req.body;

    const schedule = await Schedule.create({ userId, name });
    res.status(201).json(schedule.dataValues);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * @swagger
 * /schedule:
 *   get:
 *     summary: Get all schedules
 *     tags: [schedule]
 *     responses:
 *       '200':
 *         description: List of schedules
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Schedule'
 *       '500':
 *         description: Internal Server Error
 */
router.get('/', async (req, res) => {
  try {
    const { userId } = req.query;
    const schedules = await Schedule.findAll({
      where: { userId }
    });
    res.status(200).json(schedules);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * @swagger
 * /schedule/{id}:
 *   get:
 *     summary: Get a schedule by id
 *     tags: [schedule]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id of the schedule to retrieve
 *         required: true
 *         schema:
 *           type: string
 *           example: "4f90d13a42"
 *     responses:
 *       '200':
 *         description: Schedule retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Schedule'
 *       '404':
 *         description: Schedule not found
 *       '500':
 *         description: Internal Server Error
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { includeClasses } = req.query;

  try {
    const schedule = await Schedule.findByPk(id);

    if (!schedule) {
      return res.status(404).json({ error: 'Schedule not found' });
    }

    if (!includeClasses)
      return res.status(200).json(schedule);

    const classesQuery = await ClassItem.findAll({
      where: { scheduleId: schedule.dataValues.id }
    });
    const classes = classesQuery.map(({ dataValues }) => ({
      ...dataValues,
      title: dataValues.className,
      startTime: timeToDecimal(dataValues.startTime),
      endTime: timeToDecimal(dataValues.endTime),
      description: dataValues.location ?? ''
    })) ?? [];

    const scheduleByDay = daysOfWeek.map((day) => ({
      name: day,
      events: classes.filter(cl => cl.day === day),
    }));

    return res.status(200).json(scheduleByDay);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

/**
 * @swagger
 * /schedule/{id}:
 *   put:
 *     summary: Update schedule by id
 *     tags: [schedule]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id of the schedule to update
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EditableSchedule'
 *     responses:
 *       '200':
 *         description: Schedule updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Schedule'
 *       '404':
 *         description: Schedule not found
 *       '500':
 *         description: Internal Server Error
 */
router.put('/:id', async (req, res) => {
  const { id } = req.query;
  try {
    const schedule = await Schedule.findByPk(id);
    if (!schedule) {
      return res.status(404).json({ error: 'Schedule not found' });
    }
    await schedule.update(req.body);
    res.json(schedule);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * @swagger
 * /schedule/{id}:
 *   delete:
 *     summary: Delete schedule by id
 *     tags: [schedule]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id of the schedule to delete
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Schedule deleted successfully
 *       '404':
 *         description: Schedule not found
 *       '500':
 *         description: Internal Server Error
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.query;
  try {
    const schedule = await Schedule.findByPk(id);
    if (!schedule) {
      return res.status(404).json({ error: 'Schedule not found' });
    }
    await schedule.destroy();
    res.json({ message: 'Schedule deleted successfully' });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
