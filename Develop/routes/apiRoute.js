
const NotesDb = require("../db/notes");
const router = require("express").Router();

// "/notes" responds with the notes.html file
router.get("notes", (req, res) => {
    NotesDb.getNotes()
        .then(function (notes) {
            res.json(notes)
        })
        .catch(function (error) {
            res.status(500).json(error);
      })
});

module.exports = router;
