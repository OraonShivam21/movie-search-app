// main url with apiKey to fetch movie data
let imdbURL = "https://www.omdbapi.com/";
let apiKey = "3e9b4576";

// search-input and mainSection to display cards
let movie_search = document.getElementById("movie-search");
let mainSection = document.getElementById("display-movie-cards");

let searchString = "";
let timer;

movie_search.addEventListener("input", function () {
  searchString = movie_search.value;
  debounceFunction(fetchMovieData, 1000);
});

function debounceFunction(callback, delay) {
  if(timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(callback, delay);
}

async function fetchMovieData() {
  if(searchString) {
    let url = `${imdbURL}?apiKey=${apiKey}&s=${searchString}`;
    try {
      let res = await fetch(url);
      let data = await res.json();
      console.log(data);
      if(data.Response === "True") {
        mainSection.classList.remove("display-movie-cards");
        createMovieCardSection(data.Search);
      } else if(data.Response === "False") {
          mainSection.innerHTML = data.Error;
          mainSection.classList.add("display-movie-cards");
      }
    } catch (error) {
      console.log("Error occurred:", error);
    }
  } else {
    mainSection.classList.remove("display-movie-cards");
    mainSection.innerHTML = null;
  }
}

function createMovieCardSection(data) {
  let card_section = `
    <div class="card-section">
      ${data.map((item) => {
        return createMovieCard(item);
      })
      .join("")}
    </div>
  `;

  mainSection.innerHTML = card_section;
}

function createMovieCard(data) {
  let movie_card = `
    <div class="movie-card">
      <img class="movie-poster" src=${data.Poster} alt="${data.Title} poster" />
      <h3 class="movie-title">${data.Title}</h3>
      <p class="movie-year">Release Year : ${data.Year}</p>
      <p class="movie-id">IMDB ID : ${data.imdbID}</p>
    </div>
  `;

  return movie_card;
}