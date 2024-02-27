const User = require("../models/User");
const upload = require("../middleware/multer");
const { isValid } = require("../utils/validation");

const { Router } = require("express");
const cryptoJS = require("crypto-js");

const router = Router();

router.post("/register", upload.single("avatar"),
  async (req, res) => {
    const { full_name, email, password, phone_number } = req.body;

    function validateField(fieldName, validatorFn) {
      const value = req.body[fieldName];

      if (!value) {
        return res
          .status(400)
          .json({ error: `Missing required field '${fieldName}'` });
      }

      if (!validatorFn(value)) {
        return res
          .status(400)
          .json({ error: `Invalid '${fieldName}' provided` });
      }

      return null;
    }

    if (req.file && req.file.size > 5 * 1024 * 1024) {
      return res
        .status(400)
        .json({ error: "File size exceeds the limit of 5MB" });
    }

    if (!req.file)
      return res
        .status(400)
        .json({ error: "Invalid file type (accepts jpeg, jpg, png)" });

    validateField("full_name", isValid("full_name", full_name));
    validateField("email", isValid("email", email));
    validateField("password", isValid("password", password));
    validateField("phone_number", isValid("phone_number", phone_number));

    //insert hashing password here
    const hashedPassword = cryptoJS
      .SHA256(password)
      .toString(cryptoJS.enc.Base64);

    const filename = req.file
      ? `http://localhost:8080/uploads/${encodeURIComponent(req.file.filename)}`
      : null;

    try {
      const user = await User.create(
        full_name,
        email,
        hashedPassword,
        phone_number,
        filename
      );
      return res.status(201).json({ data: user });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
);

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email)
    return res.status(400).json({ error: "Missing required field 'email'" });

  if (!password)
    return res
      .status(400)
      .json({ error: "Missing required field 'password'" });

  const hashedPassword = cryptoJS.SHA256(password).toString(cryptoJS.enc.Base64);

  try {
    const user = await User.findByEmailAndPassword(email, hashedPassword);

    if (user) {
      req.session.userId = user.id;
      req.session.userEmail = user.email;

      res.status(200).json({ data: user });

      return;
    }
    return res.status(400).json({
      error: "Login failed. Please check your credentials and try again.",
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.post("/logout", async (req, res) => {
  // Clear session data (for cookie-session)
  req.session = null;

  return res.status(200).json({ message: "Logged out successfully" });
});

module.exports = router;
