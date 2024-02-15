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
