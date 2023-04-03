// app.mjs

import express from "express";
import Database from "better-sqlite3";

const app = express();
const db = new Database("C:\\Users\\felix\\wadsongs.db");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/artist/:artist", (req, res) => {
  try {
    const statement = db.prepare("SELECT * FROM wadsongs WHERE artist =?");
    const results = statement.all(req.params.artist);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.get("/song/:title", (req, res) => {
  try {
    const statement = db.prepare("SELECT * FROM wadsongs WHERE title =?");
    const results = statement.all(req.params.title);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.get("/artist/:artist/song/:title", (req, res) => {
  try {
    const statement = db.prepare(
      "SELECT * FROM wadsongs WHERE artist =? AND title =?"
    );
    const results = statement.all(req.params.artist, req.params.title);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.get("/id/:id", (req, res) => {
  try {
    const statement = db.prepare("SELECT * FROM wadsongs WHERE id =?");
    const results = statement.get(req.params.id);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
