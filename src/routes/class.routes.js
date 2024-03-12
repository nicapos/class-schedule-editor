const ClassItem = require('../models/ClassItem');
const { Router } = require("express");

const router = Router();

/**
 * @swagger
 * /class:
 *   post:
 *     summary: Create a new class item
 *     tags: [classes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClassItem'
 *     responses:
 *       '201':
 *         description: Class item created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClassItem'
 *       '500':
 *         description: Internal Server Error
 */
router.post('/class', async (req, res) => {
  try {
    // Using the ClassItem model to parse and validate req.body
    const newClassItem = await ClassItem.create(req.body);

    // Respond with the created class item
    res.status(201).json(newClassItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * @swagger
 * /class:
 *   get:
 *     summary: Get all class items
 *     tags: [classes]
 *     responses:
 *       '200':
 *         description: List of class items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ClassItem'
 *       '500':
 *         description: Internal Server Error
 */
router.get('/class', async (req, res) => {
  try {
    const classItems = await ClassItem.findAll();
    res.json(classItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * @swagger
 * /class/{id}:
 *   put:
 *     summary: Update class item by id
 *     tags: [classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id of the class item to update
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClassItem'
 *     responses:
 *       '200':
 *         description: Class item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClassItem'
 *       '404':
 *         description: Class item not found
 *       '500':
 *         description: Internal Server Error
 */
router.put('/class/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const classItem = await ClassItem.findByPk(id);
    if (!classItem) {
      return res.status(404).json({ error: 'Class item not found' });
    }
    await classItem.update(req.body);
    res.json(classItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * @swagger
 * /class/{id}:
 *   delete:
 *     summary: Delete class item by id
 *     tags: [classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id of the class item to delete
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Class item deleted successfully
 *       '404':
 *         description: Class item not found
 *       '500':
 *         description: Internal Server Error
 */
router.delete('/class/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const classItem = await ClassItem.findByPk(id);
    if (!classItem) {
      return res.status(404).json({ error: 'Class item not found' });
    }
    await classItem.destroy();
    res.json({ message: 'Class item deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
