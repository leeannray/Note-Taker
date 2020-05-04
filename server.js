const express = require("express");

// const apiRoutes = require("./routes/apiRoutes");
// const htmlRoutes = require("./routes/htmlRoutes");

// Initialize the app and create a port
const app = express();
const PORT = process.env.PORT || 7000;

// Set up body parsing, static, and route middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const htmlRoutes = require("./routes/htmlRoutes.js");
const apiRoutes = require("./routes/apiRoutes.js");

app.use(htmlRoutes);
app.use(apiRoutes);

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
