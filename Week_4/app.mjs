// app.mjs

import express from "express";
import Database from "better-sqlite3";

// app express() is a function that creates an express application
const app = express();

// Create a database connection to the database file
const db = new Database("C:\\Users\\Felix\\wadsongs.db");

// app.use(express.static("public")); to serve static files
app.use(express.static("public"));

// app.use(express.json()); to parse JSON bodies
app.use(express.json());

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

// Create a (/title) route that returns all songs
// based on the song title parameter
app.get("/title/:title", (req, res) => {
  try {
    const statement = db.prepare("SELECT * FROM wadsongs WHERE title =?");
    const results = statement.all(req.params.title);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Create a (/year) route to return all songs
// based on the year parameter provided
app.get("/year/:year", (req, res) => {
  try {
    const statement = db.prepare("SELECT * FROM wadsongs WHERE year =?");
    const results = statement.all(req.params.year);
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
// and reduce the quantity column by 1
app.post("/buy/:id", (req, res) => {
  try {
    const statement = db.prepare("SELECT quantity FROM wadsongs WHERE id = ?");
    const row = statement.get(req.params.id);
    if (!row) {
      return res.status(404).json({ error: "Song not found" });
    }
    const currentQty = row.quantity;
    const requestedQty = Number(req.query.qty);
    if (requestedQty < 1) {
      return res
        .status(400)
        .json({ error: "Quantity must be a positive integer" });
    }
    if (requestedQty > currentQty) {
      return res
        .status(400)
        .json({ error: "Requested quantity exceeds available stock" });
    }
    const updateStatement = db.prepare(
      "UPDATE wadsongs SET quantity = quantity - ? WHERE id = ? AND quantity >= ?"
    );
    const result = updateStatement.run(
      requestedQty,
      req.params.id,
      requestedQty
    );
    if (result.changes === 0) {
      return res
        .status(400)
        .json({ error: "Requested quantity exceeds available stock" });
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
app.post("/add/song", (req, res) => {
  try {
    const statement = db.prepare(
      "INSERT INTO wadsongs (title, artist, year, downloads, price, quantity) VALUES (?,?,?,?,?,?)"
    );
    //console.log(statement);
    //console.log(req.body);
    const info = statement.run(
      req.body.title,
      req.body.artist,
      req.body.year,
      req.body.downloads,
      req.body.price,
      req.body.quantity
    );
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
});

// application is listening on port 3000
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
