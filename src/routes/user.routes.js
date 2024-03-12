const { Router } = require("express");
const User = require("../models/User");

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

  const user = await User.findByEmailAndId(email, id);

  return res.status(200).json({ user });
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
  return res.status(200).json({ data: users });
});

module.exports = router;
