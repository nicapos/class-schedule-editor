const User = require("../models/User");
const upload = require("../middleware/multer");
const { getValidator } = require("../utils/validation");
const uploadFile = require("../utils/uploads");

const { Router } = require("express");
const cryptoJS = require("crypto-js");
const crypto = require("crypto");

const router = Router();

// Custom middleware to check session timeout
const sessionTimeoutMiddleware = (req, res, next) => {
  // Check if the user has an active session
  if (req.session && req.session.lastAccess) {
      const currentTime = new Date().getTime();
      const sessionTimeout = 45 * 60 * 1000; // Session timeout set to 15 minutes (in milliseconds)

      // Check if the session has expired
      if (currentTime - req.session.lastAccess > sessionTimeout) {
          // If the session has expired, destroy the session and redirect to login page
          req.session = null ;
      }
  }

  // Update lastAccess time in session
  req.session.lastAccess = new Date().getTime();

  // Call the next middleware
  next();
};

// Session middleware setup
 router.use(sessionTimeoutMiddleware);

/**
 * @swagger
 * /auth/register:
 *   post:
 *      summary: Register New User
 *      description: Registers a new user by email and password
 *      tags:
 *          - auth
 *      consumes:
 *          - multipart/form-data
 *      parameters:
 *          - in: formData
 *            name: avatar
 *            type: object
 *            description: The user's avatar (accepts jpeg, jpg, png)
 *            properties:
 *              media:
 *                type: string
 *                format: byte
 *          - in: body
 *            description: account registration details
 *            schema:
 *              $ref: '#/components/schemas/EditableUser'
 *      responses:
 *          '201':
 *              description: Resource added successfully
 *              content:
 *                application/json:
 *                  schema:
 *                    type: object
 *                    properties:
 *                      data:
 *                        type: object
 *                        $ref: '#/components/schemas/User'
 *          '400':
 *              description: Bad request
 *              content:
 *                application/json:
 *                  schema:
 *                    $ref: '#/components/schemas/Error'
 *          '500':
 *              description: Internal server error
 *              content:
 *                application/json:
 *                  schema:
 *                    $ref: '#/components/schemas/Error'
 */
router.post("/register", upload.single("avatar"), async (req, res) => {
  const { fullName, email, password, phoneNumber } = req.body;

  function validateField(fieldName, validatorFn) {
    const value = req.body[fieldName];

    if (!value) {
      return res
        .status(400)
        .json({ error: `Missing required field '${fieldName}'` });
    }

    if (!validatorFn(value)) {
      return res.status(400).json({ error: `Invalid '${fieldName}' provided` });
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

  validateField("fullName", getValidator("fullName"));
  validateField("email", getValidator("email"));
  validateField("password", getValidator("password"));
  validateField("phoneNumber", getValidator("phoneNumber"));

  const salt = process.env.PASSWORD_SALT;
  const saltedPassword = password + salt;
  const hashedPassword = cryptoJS
    .SHA256(saltedPassword)
    .toString(cryptoJS.enc.Base64);

  // Handle uploaded avatar
  const uploadedAvatarURL = await uploadFile(
    req.file.buffer,
    req.file.originalname
  );

  try {
    const user = await User.create({
      fullName: fullName,
      email: email,
      password: hashedPassword,
      phoneNumber: phoneNumber,
      photoUrl: uploadedAvatarURL,
      userType: "USER",
    });

    return res.status(201).json({ data: user });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *      summary: Sign-in
 *      description: Log-in to an existing user account using email and password
 *      tags:
 *          - auth
 *      parameters:
 *          - in: body
 *            description: account registration details
 *            schema:
 *              type: object
 *              required:
 *              - email
 *              - password
 *              properties:
 *                email:
 *                  type: string
 *                  minLength: 1
 *                  maxLength: 320
 *                  example: johndoe@mail.com
 *                password:
 *                  type: string
 *                  minLength: 8
 *                  maxLength: 320
 *                  example: P@ssw0rd
 *      responses:
 *          '200':
 *              description: Found matching credentials, logged-in successfully
 *              content:
 *                application/json:
 *                  schema:
 *                    type: object
 *                    properties:
 *                      data:
 *                        type: object
 *                        $ref: '#/components/schemas/User'
 *          '400':
 *              description: Bad request
 *              content:
 *                application/json:
 *                  schema:
 *                    $ref: '#/components/schemas/Error'
 *          '500':
 *              description: Internal server error
 *              content:
 *                application/json:
 *                  schema:
 *                    $ref: '#/components/schemas/Error'
 */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email)
    return res.status(400).json({ error: "Missing required field 'email'" });

  if (!password)
    return res.status(400).json({ error: "Missing required field 'password'" });

  const salt = process.env.PASSWORD_SALT;
  const saltedPassword = password + salt;
  const hashedPassword = cryptoJS
    .SHA256(saltedPassword)
    .toString(cryptoJS.enc.Base64);

  try {
    const user = await User.findOne({
      where: { email: email, password: hashedPassword },
    });

    if (user) {
      req.session.userId = user.dataValues.id;
      req.session.userEmail = user.dataValues.email;

      res.status(200).json({ data: user.dataValues });

      return;
    }
    return res.status(400).json({
      error: "Login failed. Please check your credentials and try again.",
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /auth/logout:
 *   post:
 *      summary: Sign out
 *      tags:
 *          - auth
 *      responses:
 *          '200':
 *              description: Logged out successfully
 *              content:
 *                application/json:
 *                  schema:
 *                    type: object
 *                    properties:
 *                      message:
 *                        type: string
 *                        example: Logged out successfully
 *          '500':
 *              description: Internal server error
 *              content:
 *                application/json:
 *                  schema:
 *                    $ref: '#/components/schemas/Error'
 */
router.post("/logout", async (req, res) => {
  // Clear session data (for cookie-session)
  req.session = null;

  return res.status(200).json({ message: "Logged out successfully" });
});

module.exports = router;
