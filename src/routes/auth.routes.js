const User = require("../models/User");
const upload = require("../middleware/multer");
const { isValid } = require("../utils/validation");

const { Router } = require("express");
const cryptoJS = require("crypto-js");

const router = Router();

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


/**
 * @swagger
 * components:
 *  schemas:
 *    EditableUser:
 *      type: object
 *      required:
 *        - full_name
 *        - email
 *        - password
 *        - phone_number
 *      properties:
 *        full_name:
 *          type: string
 *          minLength: 3
 *          maxLength: 50
 *          example: John Doe
 *        email:
 *          type: string
 *          minLength: 1
 *          maxLength: 320
 *          example: johndoe@mail.com
 *        password:
 *          type: string
 *          minLength: 8
 *          maxLength: 320
 *          example: P@ssw0rd
 *        phone_number:
 *          type: string
 *          minLength: 8
 *          maxLength: 13
 *          example: 639123456789
 *        
 *    User:
 *      allOf:
 *        - $ref: '#/components/schemas/EditableUser'
 *        - type: object
 *          properties:
 *            photo_url:
 *              type: string
 *              minLength: 4
 *              maxLength: 2000
 *              example: https://placehold.co/50x50
 *            user_type:
 *              type: string
 *              example: 'USER'
 */

module.exports = router;
