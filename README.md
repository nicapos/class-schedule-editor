# Class Schedule Editor

This project uses React for frontend, NodeJS and ExpressJS for backend, and PostgreSQL for the database.

## Getting Started

1. Clone the repository
2. Navigate to the project folder.
3. Initialize and install the necessary modules.

```bash
npm install
```

4. Navigate to the client directory and initialize and install the necessary modules (for frontend).

```bash
cd client && npm install
```

5. Run `cd ..` to go back to the root project folder.

6. Create a `.env` file following the format:
```bash
DATABASE_URL=
SECRET_KEY=
GCP_BUCKET_NAME=
```

7. For file uploads, Google's Cloud Storage will be used. [Create a service account](https://cloud.google.com/iam/docs/service-accounts-create) for your Google Cloud project, then upload the key in JSON format as [`/src/config/service-account.json`](./src/config/). The file's contents should be similar to:
```json
{
  "type": "",
  "project_id": "",
  "private_key_id": "",
  "private_key": "",
  "client_email": "",
  "client_id": "",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "",
  "universe_domain": "googleapis.com"
}
```

## Usage

**To run the application, run `npm run dev`.**

To run the frontend only, run `npm run dev:client` or `npm start --prefix ./client`.

To run the backend only, run `npm run dev:server`. Alternatively, you can use the following commands:

- To see live changes using nodemon, run `nodemon server.js` to see changes live
- To run the current version only (restart required for any changes), run `node server.js`

## Content

- [client](./client/) - contains files for the frontend
- [src](./src/) - contains files for the backend
  - [controllers](./src/controllers/) - contains files which defines callback functions for client requests.
  - [models](./src/models/) - contains files for database modeling and access.
  - [public](./src/public/) - contains static assets such as css, js, and image files.
  - [routes](./src/routes/) - contains files which describes the response of the server for each HTTP method request to a specific path in the server.
  - [app.js](./src/app.js) - The main entry point of the web application.
