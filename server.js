const { resolve } = require("path");

const app = require("./src/app");

app.get("*", (req, res) => {
  res.sendFile(resolve(__dirname, "client", "build", "index.html"));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
