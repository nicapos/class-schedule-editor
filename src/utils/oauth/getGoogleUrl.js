function getGoogleOAuthURL(){
    const rootURL = 'https://accounts.google.com/o/oauth2/v2/auth';

    const options = {
        redirect_uri: process.env.REDIRECT_URI,
        client_id: process.env.CLIENT_ID,
        access_type: 'offline',
        response_type: 'code',
        prompt: 'consent',
        scope: 'openid'
    }

    const qs = new URLSearchParams(options);

    return `${rootURL}?${qs.toString()}`;
}

module.exports = { getGoogleOAuthURL };