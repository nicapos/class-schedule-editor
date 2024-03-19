const { Router } = require("express");
const User = require("../models/User");

const router = Router();

/**
 * @swagger
 * /:
 *   get:
 *      summary: Check server status
 *      responses:
 *        '200':
 *          description: API is up and running
 *          content:
 *            text/plain:
 *              schema:
 *                type: string
 *                example: API is up and running!
 */
router.get("/", (req, res) => {
  res.status(200).send("API is up and running!");
});

// Outdated route, should be GET /api/user/me. Keep route until frontend is updated.
router.get("/me", async (req, res) => {
  const email = req.session.userEmail;
  const id = req.session.userId;

  try {
    const user = await User.findByEmailAndId(email, id);
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// Outdated route, should be GET /api/user/all. Keep route until frontend is updated.
router.get("/users", async (req, res) => {
  // TODO: Check if user is admin
  const users = await User.findAll();
  return res.status(200).json({ users });
});

/**
 * @swagger
 * components:
 *  schemas:
 *    Error:
 *      type: object
 *      required:
 *        - error
 *      properties:
 *        error:
 *          type: string
 *          minLength: 1
 *          maxLength: 50
 *          example: Error message goes here
 */

module.exports = router;
