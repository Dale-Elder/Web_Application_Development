console.log("Hello from client-side JavaScript!");

// Make the AJAX run when we click a button
document.getElementById("ht_search").addEventListener("click", (e) => {
  // Read te artist from the input field
  const artist = document.getElementById("ht_artist").value;
  ajaxSearch(artist);
});

async function ajaxSearch(artist) {
  try {
    // send a request to our remote server
    const response = await fetch(`/artist/${artist}`);

    // parse the JSON
    const songs = await response.json();

    // loop through the array of JSON objects and add the results to the <div>
    let html = "";
    songs.forEach((song) => {
      html += `Artist: ${song.artist}, Title: ${song.title}, Year: ${song.year}<br />`;
    });
    console.log(html);

    document.getElementById("results").innerHTML = html;
  } catch (error) {
    alert(`There was an error: ${error}`);
  }
}

document.getElementById("ht_add").addEventListener("click", async () => {
  const newSong = {
    title: document.getElementById("title").value,
    artist: document.getElementById("artist").value,
    year: document.getElementById("year").value,
    downloads: document.getElementById("downloads").value,
    price: document.getElementById("price").value,
    quantity: document.getElementById("quantity").value,
  };

  try {
    const response = await fetch("/add/song", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSong),
    });
    if (response.status === 200) {
      alert("Song added successfully!");
    } else if (response.status === 400) {
      alert("blank fields are not allowed");
    } else {
      alert(`Uknown error: code ${response.status}`);
    }
  } catch (error) {
    alert(`There was an error: ${error}`);
  }
});
