var express = require('express');
var router = express.Router();
const dotenv = require('dotenv');
dotenv.config();
const {OAuth2Client} = require("google-auth-library");

async function geUserData(access_token){
    const res = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token${access_token}`);
    const data = await res.json();
    console.log(data);
}

router.get('/', async (req, res) => {
    const code = req.query.code;
    try{
        const oAuth2Client = new OAuth2Client(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI);
        const res = await oAuth2Client.getToken(code);
        oAuth2Client.setCredentials(res.tokens);
        console.log('Tokens Acquired')
        const user = oAuth2Client.credentials;
        console.log(user);
        await geUserData(tokens.access_token);
    }catch (error){
        console.error('Error retrieving tokens:', error);
    }

});

module.exports = router;