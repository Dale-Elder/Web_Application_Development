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
