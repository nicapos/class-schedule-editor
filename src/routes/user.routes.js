const { Router } = require("express");
const User = require("../models/User");
const cryptoJS = require("crypto-js");
const logger = require("../utils/logger");

const router = Router();

/**
 * @swagger
 * /user/me:
 *   get:
 *      summary: Get logged-in user's account details
 *      tags:
 *        - user
 *      responses:
 *        '200':
 *          description: Successful response
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  user:
 *                    type: object
 *                    $ref: '#/components/schemas/User'
 *        '500':
 *            description: Internal server error
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Error'
 */
router.get("/me", async (req, res) => {
  const email = req.session.userEmail;
  const id = req.session.userId;

  try {
    const user = await User.findByEmailAndId(email, id);
    return res.status(200).json({ user: user.dataValues });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /user/all:
 *   get:
 *      summary: Get all user account details
 *      description: Get a list of all user accounts, including account details. Only admins can access this route.
 *      tags:
 *        - user
 *      responses:
 *        '200':
 *          description: Successful response
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  data:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/User'
 *        '500':
 *            description: Internal server error
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Error'
 */
router.get("/all", async (req, res) => {
  // TODO: Check if user is admin
  const users = await User.findAll();
  logger.log(`ADMIN: Fetched ${users.length} users`);
  return res.status(200).json({ data: users });
});

/**
 * @swagger
 * /user/{id}:
 *   put:
 *      summary: Update user details
 *      tags:
 *        - user
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: User ID
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        '200':
 *          description: Successful response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *        '500':
 *            description: Internal server error
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Error'
 */
router.put("/:id", async (req, res) => {
  // TODO: Check if user is admin or owner
  const userId = req.params.id;
  let userData = req.body;

  if (userData['password']) {
    const salt = process.env.PASSWORD_SALT;
    const saltedPassword = userData['password'] + salt;
    const hashedPassword = cryptoJS
      .SHA256(saltedPassword)
      .toString(cryptoJS.enc.Base64);

    userData['password'] = hashedPassword;
  }

  try {
    await User.update(userData, { where: { id: userId } });
    logger.log(`ADMIN: Updated user ${id}`);
    return res.send(201).end();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *      summary: Delete user
 *      tags:
 *        - user
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: User ID
 *      responses:
 *        '204':
 *          description: User deleted successfully
 *        '500':
 *            description: Internal server error
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Error'
 */
router.delete("/:id", async (req, res) => {
  // TODO: Check if user is admin or owner
  const userId = req.params.id;

  try {
    await User.destroy({ where: { id: userId } });
    logger.log(`ADMIN: Deleted user ${id}`);
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
