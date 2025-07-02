const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

let notes = [];
let idCounter = 1;

app.use(cors());
app.use(express.json());

// Get all notes
app.get("/api/notes", (req, res) => {
  res.json(notes);
});

// Get single note
app.get("/api/notes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const note = notes.find(n => n.id === id);
  if (!note) return res.status(404).json({ error: "Note not found" });
  res.json(note);
});

// Create note
app.post("/api/notes", (req, res) => {
  const { title, content, date } = req.body;
  if (!title || !content || !date) return res.status(400).json({ error: "All fields are required" });

  const newNote = { id: idCounter++, title, content, date };
  notes.push(newNote);
  res.status(201).json(newNote);
});

// Update note
app.put("/api/notes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content, date } = req.body;
  const note = notes.find(n => n.id === id);
  if (!note) return res.status(404).json({ error: "Note not found" });

  if (title) note.title = title;
  if (content) note.content = content;
  if (date) note.date = date;

  res.json(note);
});

// Delete note
app.delete("/api/notes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = notes.findIndex(n => n.id === id);
  if (index === -1) return res.status(404).json({ error: "Note not found" });

  const deleted = notes.splice(index, 1);
  res.json({ message: "Note deleted", note: deleted[0] });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});



