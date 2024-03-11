const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const getOptions = (port) => ({
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
    },
    servers: [
      {
        url: `http://localhost:${port}/api`,
      },
    ],
  },
  apis: ["./src/routes/*.js"],
});

function swaggerDocs(app, port) {
  const specs = swaggerJSDoc(getOptions(port));

  // Swagger page
  app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs));

  // Docs in JSON format
  app.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
  });

  console.log(`Docs available at http://localhost:${port}/docs`);
}

module.exports = swaggerDocs;