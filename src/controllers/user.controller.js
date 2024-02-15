const User = require("../models/User");

const controller = {
  getAllUsers: async (req, res) => {
    // TODO: Check if user is admin

    const users = await User.getAll();
    return res.status(200).json({ users });
  },
  getCurrentUser: async (req, res) => {
    const email = req.session.userEmail;
    const id = req.session.userId;

    const user = await User.findByEmailAndId(email, id);
    return res.status(200).json({ user });
  },
};

module.exports = controller;
