// app.mjs

import express from "express";
import Database from "better-sqlite3";

const app = express();
// Create a database connection to the database file
const db = new Database("C:\\Users\\felix\\wadsongs.db");

// Create a (/) route that returns a "Hello World!" message
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Create a (/artist) route that returns all artists
// based on the artist name parameter
app.get("/artist/:artist", (req, res) => {
  try {
    const statement = db.prepare("SELECT * FROM wadsongs WHERE artist =?");
    const results = statement.all(req.params.artist);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Create a (/song) route that returns all songs
// based on the song title parameter
app.get("/song/:title", (req, res) => {
  try {
    const statement = db.prepare("SELECT * FROM wadsongs WHERE title =?");
    const results = statement.all(req.params.title);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Create a (/artist/song) route that returns all songs
// based on the artist and song title parameters
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

// Create a (/id) route that returns a single song
// based on the id parameter
app.get("/id/:id", (req, res) => {
  try {
    const statement = db.prepare("SELECT * FROM wadsongs WHERE id =?");
    const results = statement.get(req.params.id);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Create a Post route to buy a song from the database
// and update the purchased column by 1
app.post("/buy/:id", (req, res) => {
  try {
    const statement = db.prepare(
      "UPDATE wadsongs SET purchased = 1 WHERE id =?"
    );
    statement.run(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Create a Delete route to delete a song from the database
// based on the id parameter
app.delete("/delete/:id", (req, res) => {
  try {
    const statement = db.prepare("DELETE FROM wadsongs WHERE id =?");
    statement.run(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Create a Post route to add a song to the database
// based on the title, artist, album, price and purchased parameters
app.post("/add/:title/:artist/:album/:price/:purchased", (req, res) => {
  try {
    const statement = db.prepare(
      "INSERT INTO wadsongs (title, artist, album, price, purchased) VALUES (?,?,?,?,?)"
    );
    statement.run(
      req.params.title,
      req.params.artist,
      req.params.album,
      req.params.price,
      req.params.purchased
    );
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// application is listening on port 3000
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
