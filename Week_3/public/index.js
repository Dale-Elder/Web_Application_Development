// console.log("Hello from client-side JavaScript!");

// Make the AJAX run when we click a button
document.getElementById("ht_search").addEventListener("click", (e) => {
  // Read the artist from the input field
  const artist = document.getElementById("ht_artist").value;
  ajaxSearch(artist);
});

async function ajaxSearch(artist) {
  try {
    // send a request to our remote server
    const response = await fetch(`/artist/${artist}`);

    // parse the JSON
    const songs = await response.json();

    // generate an HTML table with the results
    let html = "<table><tr><th>Artist</th><th>Title</th><th>Year</th></tr>";
    songs.forEach((song) => {
      html += `<tr><td>${song.artist}</td><td>${song.title}</td><td>${song.year}</td></tr>`;
    });
    html += "</table>";

    // update the HTML
    document.getElementById("results").innerHTML = html;
  } catch (error) {
    alert(`There was an error: ${error}`);
  }
}

// Make the AJAX run when we click a button
document.getElementById("ht_add").addEventListener("click", async () => {
  // Read new song details from the input fields
  const newSong = {
    title: document.getElementById("title").value,
    artist: document.getElementById("artist").value,
    year: document.getElementById("year").value,
    downloads: document.getElementById("downloads").value,
    price: document.getElementById("price").value,
    quantity: document.getElementById("quantity").value,
  };

  // Send the new song to the server using AJAX POST, as JSON
  try {
    const response = await fetch("/add/song", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // convert the JS object to JSON
      body: JSON.stringify(newSong),
    });
    // if the request is successful, display a success message
    if (response.status === 200) {
      alert("Song added successfully!");
      // if the request is unsuccessful and display status 400, display a message
    } else if (response.status === 400) {
      alert("blank fields are not allowed");
      // if the request is unsuccessful and display a message with the response status
    } else {
      alert(`Uknown error: code ${response.status}`);
    }
    // catch any errors and display them
  } catch (error) {
    alert(`There was an error: ${error}`);
  }
});
