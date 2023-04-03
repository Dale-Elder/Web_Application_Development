// app.mjs - use mjs extension as ECMAScript 6 modules are used

// Import the Express module
import express from "express";

// Create a new Express application
const app = express();

// Create a route for (/hello/:personName) to respond with a
// greeting along with the :personName parameter.
app.get("/hello/:personName", (request, response) => {
  response.send(`Hello ${request.params.personName}!`);
});

// Create a route for (/time) to respond with the
// total miliseconds since 1/1/1970.
app.get("/time", (request, response) => {
  response.send(`There have been ${Date.now()} milliseconds since 1/1/70 `);
});

// Create a route for (/jsonExample) to generate and respond
// with a JSON from a JavaScript array.
app.get("/jsonExample", (request, response) => {
  const monthLengths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  response.json(monthLengths);
});

// Create a route for (/jsonExample2) to respond
// with a JSON from an object.
app.get("/jsonExample2", (request, response) => {
  const obama = {
    name: "Barrack Obama",
    age: 56,
    nationality: "US",
    job: "US President 2008-16",
  };
  response.json(obama);
});

// Create a route for (/jsonExample3) to respond
// with a JSON from an array of objects.
app.get("/jsonExample3", (request, response) => {
  const politicians = [
    {
      name: "Barack Obama",
      age: 56,
      nationality: "US",
      job: "US President 2008-16",
    },

    {
      name: "Donald Trump",
      age: 75,
      nationality: "US",
      job: "US President 2016-20",
    },

    {
      name: "Joe Biden",
      age: 79,
      nationality: "US",
      job: "US President 2020-",
    },
  ];
  response.json(politicians);
});

// App listen on port 3000, and log to console.
app.listen(3000, () => {
  console.log("App listening on port 3000!");
});
