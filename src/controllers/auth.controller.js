const User = require("../models/User");
const { isValid } = require("../utils/validation");

const controller = {
  registerUser: async (req, res) => {
    const { full_name, email, password, phone_number } = req.body;

    if (req.file && req.file.size > upload.limits.fileSize) {
      return res
        .status(400)
        .json({ error: "File size exceeds the limit of 5MB" });
    }

    if (!full_name)
      return res
        .status(400)
        .json({ error: "Missing required field 'full_name'" });

    if (!isValid("full_name", full_name))
      return res.status(400).json({ error: "Invalid 'full_name' provided" });

    if (!email)
      return res.status(400).json({ error: "Missing required field 'email'" });

    if (!isValid("email", email))
      return res.status(400).json({ error: "Invalid 'email' provided" });

    if (!password)
      return res
        .status(400)
        .json({ error: "Missing required field 'password'" });

    if (!isValid("password", password))
      return res.status(400).json({ error: "Invalid 'password' provided" });

    if (!phone_number)
      return res
        .status(400)
        .json({ error: "Missing required field 'phone_number'" });

    if (!isValid("phone_number", phone_number))
      return res.status(400).json({ error: "Invalid 'phone_number' provided" });

    try {
      const user = await User.create(full_name, email, password, phone_number);
      return res.status(201).json({ data: user });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    if (!email)
      return res.status(400).json({ error: "Missing required field 'email'" });

    if (!password)
      return res
        .status(400)
        .json({ error: "Missing required field 'password'" });

    try {
      const user = await User.findByEmailAndPassword(email, password);

      if (user) return res.status(200).json({ data: user });
      return res
        .status(400)
        .json({
          error: "Login failed. Please check your credentials and try again.",
        });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
};

module.exports = controller;
