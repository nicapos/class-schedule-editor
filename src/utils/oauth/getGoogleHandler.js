const { Request, Response } = require('express');
const {getGoogleOAuthTokens} = require('../../services/auth-services');
const {getGoogleUser} = require('../../services/auth-services');
const User = require('../../models/User');

async function googleOauthHandler(req, res) {
    const code = req.query.code;
  
    try {
      const { id_token, access_token } = await getGoogleOAuthTokens({ code });
      console.log({ id_token, access_token });
  
      const googleUser = await getGoogleUser({ id_token, access_token });
      console.log({ googleUser });
  
      if (!googleUser.verified_email) {
        return res.status(403).send("Google account is not verified");
      }
    } catch (error) {
        console.error(error);
        return res.status(400).send("Failed to authorize Google user");
    }
  
    //   const user = await findAndUpdateUser(
    //     {
    //       email: googleUser.email,
    //     },
    //     {
    //       email: googleUser.email,
    //       name: googleUser.name,
    //       picture: googleUser.picture,
    //     },
    //     {
    //       upsert: true,
    //       new: true,
    //     }
    //   );

    // Create & log in user
    

  
    //   const session = await createSession(user._id, req.get("user-agent") || "");
  
    //   const accessToken = signJwt(
    //     { ...user.toJSON(), session: session._id },
    //     { expiresIn: config.get("accessTokenTtl") } // 15 minutes
    //   );
  
    //   const refreshToken = signJwt(
    //     { ...user.toJSON(), session: session._id },
    //     { expiresIn: config.get("refreshTokenTtl") } // 1 year
    //   );
  
    //   res.cookie("accessToken", accessToken, { maxAge: config.get("accessTokenTtl"), httpOnly: true });
    //   res.cookie("refreshToken", refreshToken, { maxAge: config.get("refreshTokenTtl"), httpOnly: true });
  
    //   res.redirect(config.get("origin"));
    // } catch (error) {
    //   log.error(error, "Failed to authorize Google user");
    //   return res.redirect(`${config.get("origin")}/oauth/error`);
    // }
}


module.exports = { googleOauthHandler };
