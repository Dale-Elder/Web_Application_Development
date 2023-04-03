// app.mjs - use mjs extension as ECMAScript 6 modules are used

// Import the Express module
import express from "express";

// Create a new Express application
const app = express();

// JS array of song objects.

const songs = [
  {
    songName: "Nancy Boy",
    artistName: "Placebo",
    releaseYear: "1997",
    chartPosition: "4",
  },
  {
    songName: "Pure Morning",
    artistName: "Placebo",
    releaseYear: "1998",
    chartPosition: "4",
  },
  {
    songName: "For what it's worth",
    artistName: "Placebo",
    releaseYear: "2009",
    chartPosition: "97",
  },
  {
    songName: "Master of puppets",
    artistName: "Metallica",
    releaseYear: "1986",
    chartPosition: "22",
  },
  {
    songName: "Enter Sandman",
    artistName: "Metallica",
    releaseYear: "1991",
    chartPosition: "5",
  },
];

// Route for (/hello/:personName) to respond with a
// greeting along with the :personName parameter.
app.get("/hello/:personName", (request, response) => {
  response.send(`Hello ${request.params.personName}!`);
});

// Route for (/time) to respond with the
// total miliseconds since 1/1/1970.
app.get("/time", (request, response) => {
  response.send(`There have been ${Date.now()} milliseconds since 1/1/70 `);
});

// Route for (/artistName) to respond with a the top songs from
// the songs array, that match the provided artistName parameter.
app.get("/artist/:artistName", (request, response) => {
  const matchingSongs = songs.filter(
    (song) =>
      song.artistName.toLowerCase() === request.params.artistName.toLowerCase()
  );
  response.json(matchingSongs);
});

// Route for (/artistName/?/songName/:?) to respond with a message
// and the songName and artistName parameter provided.
app.get("/artist/:artistName/song/:songName", (request, response) => {
  response.send(
    `You are searching for ${request.params.songName} by ${request.params.artistName}!`
  );
});

// Route to display the list of songs
app.get("/topSongs", (request, response) => {
  response.send(songs);
});

// Route for (/from/:year1/to/:year2) to display a list of songs
// that match the provided releaseYear parameter.
app.get("/from/:year1/to/:year2", (request, response) => {
  const matchingSongs = songs.filter(
    (song) =>
      song.releaseYear >= request.params.year1 &&
      song.releaseYear <= request.params.year2
  );
  response.json(matchingSongs);
});

// App listen on port 3000, and log to console.
app.listen(3000, () => {
  console.log("App listening on port 3000!");
});
