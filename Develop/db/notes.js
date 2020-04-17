const util = require("util");
const fs = require("fs");

// This package will be used to generate our unique ids. https://www.npmjs.com/package/uuid


const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class NotesData {
  constructor() {
    this.lastId = 0;
  }

  read() {
    return readFileAsync("db/db.json", "utf8");
  }

  write(note) {
    return writeFileAsync("db/db.json", JSON.stringify(note));
  }

  getNotes() {
    return this.read().then(notes => {
      let parsedNotes;

      // If notes not an array or cannot be turned into one, send new empty array
      try {
        parsedNotes = [].concat(JSON.parse(notes));
      } catch (err) {
        parsedNotes = [];
      }

      return parsedNotes;
    });
  }

  // note to object. If no title or text then throw error
  addNote(note) {
    const { title, text } = note;

    if (!title || !text) {
      throw new Error("Title and text area cannot be blank!");
    }

    // Add unique id to note using uuid package
    const newNote = { title, text, id: ++this.lastId };

    // Get all notes, add new note, write all updated notes, return the newNote (spread array)
    return this.getNotes()
      .then(notes => [...notes, newNote])
      .then(updatedNotes => this.write(updatedNotes))
      .then(() => newNote);
  }
                                    
  deleteNote(id) {
    // Get all notes, remove note with given id, write filtered notes
    return this.getNotes()
      .then(notes => notes.filter(note => note.id !== parseInt(id)))
      .then(filteredNotes => this.write(filteredNotes));
  }
}

// calls NotesData constructor

module.exports = new NotesData()

