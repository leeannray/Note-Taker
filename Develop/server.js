// Dependencies
// ===========================================================
const express = require("express");
const apiRoutes = require("./routes/apiRoute");
const htmlRoutes = require("./routes/htmlRoutes");

const app = express();
const PORT = 4000;

// Data
// ===========================================================
//middleware pipline
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
//app.use("/api", apiRoutes);
app.use("/", htmlRoutes);


app.listen(PORT,  () => console.log(`listening port: ${PORT}`));