const { Router } = require("express");
const User = require("../models/User");

const router = Router();


router.get("/", (req, res) => {
  res.send("API is up and running!");
});

// Outdated route, should be GET /api/user/me. Keep route until frontend is updated.
router.get("/me", async (req, res) => {
  const email = req.session.userEmail;
  const id = req.session.userId;

  const user = await User.findByEmailAndId(email, id);

  return res.status(200).json({ user });
});

// Outdated route, should be GET /api/user/all. Keep route until frontend is updated.
router.get("/users", async (req, res) => {
  // TODO: Check if user is admin
  const users = await User.getAll();
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
