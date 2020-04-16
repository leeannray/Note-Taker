
const data = require("../db/notes");
const router = require("express").Router();


// GET "/api/notes" responds with all notes from the database
router.get("/notes", (req, res) => {
  data
    .getNotes()
    .then(notes => res.json(notes))
    .catch(err => res.status(500).json(err));
});

router.post("/notes", (req, res) => {
  data
    .addNote(req.body)
    .then(note => res.json(note))
    .catch(err => res.status(500).json(err));
});

// DELETE "/api/notes" deletes note
//id equal to req.params.id
router.delete("/notes/:id", (req, res) => {
  data
    .deleteNote(req.params.id)
    .then(() => res.json({ ok: true }))
    .catch(err => res.status(500).json(err));
});

module.exports = router;
