// console.log("Hello from client-side JavaScript!");
/*
Search for songs by artist
*/
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

    // create a table to display the results
    const table = document.createElement("table");
    // add a caption to the table
    const caption = document.createElement("caption");
    // set the caption text based on the artist name
    caption.textContent = `Search results for ${artist}`;
    // append the caption to the table
    table.appendChild(caption);

    // create a header row
    const headerRow = document.createElement("tr");
    // create a header for each column
    const headers = ["ID", "Artist", "Title", "Year", "Quantity", ""];
    // add the headers to the header row with a loop
    headers.forEach((header) => {
      const th = document.createElement("th");
      th.textContent = header;
      headerRow.appendChild(th);
    });

    // append the header row to the table
    table.appendChild(headerRow);

    // add a row for each song with a loop
    songs.forEach((song) => {
      // create a row
      const row = document.createElement("tr");
      // create a cell for the id
      const idCell = document.createElement("td");
      // set the cell text to the song id
      idCell.textContent = song.id;
      // create a cell for the artist
      const artistCell = document.createElement("td");
      // set the cell text to the artist name
      artistCell.textContent = song.artist;
      // create a cell for the title
      const titleCell = document.createElement("td");
      // set the cell text to the song title
      titleCell.textContent = song.title;
      // create a cell for the year
      const yearCell = document.createElement("td");
      // set the cell text to the song year
      yearCell.textContent = song.year;
      // create a cell for quantity
      const quantityCell = document.createElement("td");
      quantityCell.setAttribute("id", "qtyCell");
      // set the cell text to the song quantity
      const qty = document.createElement("input");
      qty.setAttribute("type", "number");
      qty.setAttribute("value", "1");
      qty.setAttribute("id", "qty");
      (quantityCell.textContent = song.quantity), quantityCell.appendChild(qty);
      // create a cell for the button
      const buttonCell = document.createElement("td");
      // create a button
      const buy_btn = document.createElement("input");
      // set the button attributes
      buy_btn.setAttribute("type", "button");
      buy_btn.setAttribute("value", "Buy");
      buy_btn.setAttribute("id", "buy_btn");
      // append the button to the cell
      buttonCell.appendChild(buy_btn);
      // append the cells to the row
      row.appendChild(idCell);
      row.appendChild(artistCell);
      row.appendChild(titleCell);
      row.appendChild(yearCell);
      row.appendChild(quantityCell);
      row.appendChild(buttonCell);
      // append the row to the table
      table.appendChild(row);

      // event listener for the buy button
      buy_btn.addEventListener("click", async (event) => {
        try {
          // get the quantity value from the input field
          const qtyValue = quantityCell.querySelector("#qty").value;
          // send post request to the server with the quantity as a query parameter
          const response = await fetch(`/buy/${song.id}?qty=${qtyValue}`, {
            method: "POST",
          });
          // if the request is successful, display a success message
          if (response.status === 200) {
            alert(
              `Successfully bought ${qtyValue} x ${song.title} by ${song.artist}`
            );
          } else {
            // if there was an error, the JSON response will contain an error message
            const jsonData = await response.json();
            alert(jsonData.error);
          }
        } catch (error) {
          alert(`Error with song ID ${song.id}: ${error}`);
        }
      });
    });

    // creating a new div to display the results
    const resultsDiv = document.getElementById("results");
    // clear the div
    resultsDiv.innerHTML = "";
    // append the table to the div
    resultsDiv.appendChild(table);
    // display the div
    resultsDiv.style.display = "block";
  } catch (error) {
    alert(`There was an error: ${error}`);
  }
}

/*
Adding a new song to the database
*/
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

/*
Search for songs by artist, title or year using a dropdown menu
*/

document.getElementById("search_btn").addEventListener("click", async () => {
  const searchType = document.getElementById("selection").value;
  // if the user selects artist, run the following code
  if (searchType === "artist") {
    ajaxSearch(document.getElementById("searchText").value);
    // if the user selects title, run the following code
  } else if (searchType === "title") {
    const response = await fetch(
      `/title/${document.getElementById("searchText").value}`
    );
    const songs = await response.json();
    const table = document.createElement("table");
    const caption = document.createElement("caption");
    caption.textContent = "Search Results";
    table.appendChild(caption);

    const headerRow = document.createElement("tr");
    const headers = ["Artist", "Title", "Year", ""];
    headers.forEach((header) => {
      const th = document.createElement("th");
      th.textContent = header;
      headerRow.appendChild(th);
    });

    table.appendChild(headerRow);

    songs.forEach((song) => {
      const row = document.createElement("tr");
      const artistCell = document.createElement("td");
      artistCell.textContent = song.artist;
      const titleCell = document.createElement("td");
      titleCell.textContent = song.title;
      const yearCell = document.createElement("td");
      yearCell.textContent = song.year;
      const buttonCell = document.createElement("td");
      const buy_btn = document.createElement("input");
      buy_btn.setAttribute("type", "button");
      buy_btn.setAttribute("value", "Buy");
      buy_btn.setAttribute("id", "buy_btn");
      buttonCell.appendChild(buy_btn);
      row.appendChild(artistCell);
      row.appendChild(titleCell);
      row.appendChild(yearCell);
      row.appendChild(buttonCell);
      table.appendChild(row);
    });

    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";
    resultsDiv.appendChild(table);
    resultsDiv.style.display = "block";
    document.getElementById("searchResult").innerHTML = html;

    // if the user selects year, run the following code
  } else if (searchType === "year") {
    const response = await fetch(
      `/year/${document.getElementById("searchText").value}`
    );
    const songs = await response.json();
    const table = document.createElement("table");
    const caption = document.createElement("caption");
    caption.textContent = "Search Results";
    table.appendChild(caption);

    const headerRow = document.createElement("tr");
    const headers = ["Artist", "Title", "Year", ""];
    headers.forEach((header) => {
      const th = document.createElement("th");
      th.textContent = header;
      headerRow.appendChild(th);
    });

    table.appendChild(headerRow);

    songs.forEach((song) => {
      const row = document.createElement("tr");
      const artistCell = document.createElement("td");
      artistCell.textContent = song.artist;
      const titleCell = document.createElement("td");
      titleCell.textContent = song.title;
      const yearCell = document.createElement("td");
      yearCell.textContent = song.year;
      const buttonCell = document.createElement("td");
      const buy_btn = document.createElement("input");
      buy_btn.setAttribute("type", "button");
      buy_btn.setAttribute("value", "Buy");
      buy_btn.setAttribute("id", "buy_btn");
      buttonCell.appendChild(buy_btn);
      row.appendChild(artistCell);
      row.appendChild(titleCell);
      row.appendChild(yearCell);
      row.appendChild(buttonCell);
      table.appendChild(row);
    });

    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";
    resultsDiv.appendChild(table);
    resultsDiv.style.display = "block";
  }
});
