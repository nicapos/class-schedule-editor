const User = require("../models/User");

const controller = {
  getAllUsers: async (req, res) => {
    // TODO: Check if user is admin

    const users = await User.getAll();
    return res.status(200).json({ users });
  },
};

module.exports = controller;
