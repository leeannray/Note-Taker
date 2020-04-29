//DEPENDENCIES
const path = require("path");
const router = require('express').Router();



// responds with notes.html file
router.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});

// All other routes respond with index.html file
router.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = router;