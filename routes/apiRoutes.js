
const data = require("../db/db.json");
const fs = require('fs');
const util = require('util');
const router = require("express").Router();
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
const { v4:uuidv4 } = require('uuid');


// GET "/api/notes" responds with all notes from the database. 500 = server cannot process request for some unknown reason
router.get("/api/notes", (req, res) => {
  readFileAsync("data/db.json", "utf-8")
    .then(notes => res.json(JSON.parse(notes)))
    .catch(err => res.status(500).json(err));
});

router.post("/api/notes", (req, res) => {
  req.body.id = uuidv4();
  data.push(req.body);
  writeFileAsync("data/db.json", JSON.stringify(data, null, 2))
    .then(res.status(200).json("Note added!"))
    .catch(err => res.status(500).json(err));
});

// DELETE "/api/notes" deletes note
//id equal to req.params.id
router.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  for (let i = 0; i < data.length; i++){
    if (data[i].id === id) {
      data.splice(i, 1);
    }
  }
    writeFileAsync("data/db.json", JSON.stringify(data, null, 2))
      .then(res.status(200).json("Note deleted!"))
      .catch((err) => res.status(500).json(err));
});

module.exports = router;
