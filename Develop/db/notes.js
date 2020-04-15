const fs = require("fs");
const util = require("util");
const readFileAsyn = util.promisify(fs.readFile);
const writeFileAsyn = util.promisify(fs.writeFile);
class NotesData {
  readNote() {
    return readFileAsyn("./db.json", "utf8");
  }
  writeNote(newNote) {
    return writeFileAsyn("./db.json", JSON.stringify(newNote));
  }

  getNotes() {
    return this.read().then((notes) => {
      let parsedNotes;

      // If notes isn't an array or can't be turned into one, send back a new empty array
      try {
        parsedNotes = [].concat(JSON.parse(notes));
      } catch (err) {
        parsedNotes = [];
      }

      return parsedNotes;
    });
  }


    //addNote

    //remove Notes


}
module.exports = new NotesData();