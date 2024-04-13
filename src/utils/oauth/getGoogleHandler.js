const { Request, Response } = require('express');
const {getGoogleOAuthTokens} = require('../../services/auth-services');
const {getGoogleUser} = require('../../services/auth-services');
const User = require('../../models/User');

async function googleOauthHandler(req, res) {
    const code = req.query.code;
  
      const { id_token, access_token } = await getGoogleOAuthTokens({ code });
      console.log({ id_token, access_token });

      const googleUser = await getGoogleUser({ id_token, access_token });
      console.log(googleUser); // Already authenticated



      // Set user ID in session and redirect to login page
      // console.log('User is Authenticated. Proceed to Login');
      // req.session.user = googleUser._id;
      // return res.redirect('/login');

      // // Check if user exists
      // const existingUser = await User.findByEmailAndId(googleUser.email, googleUser.id);
      // console.log(existingUser);

      // if (!existingUser) {
      //   // If not exist, register
      try
      {  let user = await User.create({
          email: googleUser.email, 
          password: 'P@ssw0rd',
          fullName: googleUser.name,
          photoUrl: googleUser.picture,
          phoneNumber: '09876453627',
          userType: 'USER'
        }) 
        req.session.user = user._id;
        
        req.end();
        res.redirect('/api/auth/login');}
        
        catch(err){
          return res.status(400).json({ error: err.message });
        }
}

module.exports = { googleOauthHandler };