const fs = require("fs");
const util = require("util");
const readFileAsyn = util.promisify(fs.readFile);
const writeFileAsyn = util.promisify(fs.writeFile);
class NotesData {
  constructor() {
    this.lastId = 0;
  }

  readNote() {
    return readFileAsyn("/db.json", "utf8", (err, data) => {
      if (err) throw err;
    });
  };

  writeNote(newNote) {
    return writeFileAsyn("/db.json", JSON.stringify(newNote), (err) => {
      if (err) throw err;
    });
  };

  getNotes() {
    return this.read().then((notes) => {
      let parsedNotes;

  // If notes not an array or cannot be turned into one, send back a new empty array
      try {
        parsedNotes = [].concat(JSON.parse(notes));
      } catch (err) {
        parsedNotes = [];
      }

      return parsedNotes;
    });
  };

  addNote(note) {
    const { title, text } = note;

    if (!title || !text) {
      throw new Error("Note 'title' and 'text' cannot be blank");
    };

    // Increment `this.lastId` and assign it to `newNote.id`
    const newNote = { title, text, id: ++this.lastId };

    // Get all notes, add the new note, write all the updated notes, return the newNote
    return this.getNotes()
      .then((notes) => [...notes, newNote])
      .then((updatedNotes) => this.write(updatedNotes))
      .then(() => newNote);
  };

  removeNote(id) {
    // Get all notes, remove the note with the given id, write the filtered notes
    return this.getNotes()
      .then((notes) => notes.filter((note) => note.id !== parseInt(id)))
      .then((filteredNotes) => this.write(filteredNotes));
  }
};

module.exports = new NotesData

