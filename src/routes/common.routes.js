const { Router } = require("express");
const User = require("../models/User");
const { getGoogleOAuthURL } = require('../utils/oauth/getGoogleUrl');
const { googleOauthHandler } = require('../utils/oauth/getGoogleHandler');

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

// For Google OAuth redirect URI (/api/google-login)
router.get("/google-login", async (req, res) => {
  try{
    const googleOAuthURL = getGoogleOAuthURL();
    // console.log(googleOAuthURL);
    res.status(200).json({ googleOAuthURL });
  }
  catch(error){
    res.status(400).json({ error: error.message });
  }
}); 

// For Google OAuth endpoint (/api/sessions/oauth/google)
router.get("/sessions/oauth/google", async (req, res) => {
  googleOauthHandler(req, res);
  // proceed to login
  // If user is created successfully, send a response to the client
  // res.status(201).json({ message: 'User created successfully. Proceed to Login' });
  // res.status(200).json({ user });

}); 

module.exports = router;
