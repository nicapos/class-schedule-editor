const { Request, Response } = require('express');
const {getGoogleOAuthTokens} = require('../../services/auth-services');
const {getGoogleUser} = require('../../services/auth-services');
const User = require('../../models/User');

async function googleOauthHandler(req, res) {
    const code = req.query.code;
  
      const { id_token, access_token } = await getGoogleOAuthTokens({ code });
      console.log({ id_token, access_token });

      const googleUser = await getGoogleUser({ id_token, access_token });
      console.log(googleUser.name);

    try
      {// Register new User
        const user = await User.create({
          email: googleUser.email, 
          password: 'P@ssw0rd',
          fullName: googleUser.name,
          photoUrl: googleUser.picture,
          phoneNumber: '09876453627',
          userType: 'USER'
        });

        alert('User created successfully. Proceed to Login');

        // Log in existing User
        const n = await User.findByEmail(googleUser.email);
        
        if (!n) {
          return res.redirect('/login');
        } else {
          
          req.session.userId = user.id;
          return res.redirect('/login');
        }}
    catch(error){
        res.status(400).json({ error: error.message });
    }
}


module.exports = { googleOauthHandler };
