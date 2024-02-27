const { Router } = require("express");
const User = require("../models/User");

const router = Router();

router.get("/me", async (req, res) => {
  const email = req.session.userEmail;
  const id = req.session.userId;

  const user = await User.findByEmailAndId(email, id);

  return res.status(200).json({ user });
});

router.get("/all", async (req, res) => {
  // TODO: Check if user is admin
  const users = await User.getAll();
  return res.status(200).json({ users });
});

module.exports = router;
