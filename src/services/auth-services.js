const https = require('https');
const qs = require('qs');
const axios = require('axios').default;

function postRequest(url, data) {
  return new Promise((resolve, reject) => {
    const postData = qs.stringify(data);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    const req = https.request(url, options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(responseData));
        } else {
          reject(new Error(`HTTP request failed with status code ${res.statusCode}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

async function getGoogleOAuthTokens({ code }) {
  const url = "https://oauth2.googleapis.com/token";

  const values = {
    code,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uri: process.env.REDIRECT_URI,
    grant_type: "authorization_code",
  };

  const postData = qs.stringify(values);

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const responseData = JSON.parse(data);
          resolve(responseData);
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}



async function getGoogleUser({ id_token, access_token }) {
    try {
        const res = await axios.get(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,{
            headers: {
              Authorization: `Bearer ${id_token}`,
            },
          }
        );
        return res.data;
      } catch (error) {
        log.error(error, "Error fetching Google user");
        throw new Error(error.message);
      }
}

module.exports = {getGoogleOAuthTokens, getGoogleUser};
