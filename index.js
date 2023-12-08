let imdbURL = "https://www.omdbapi.com/";
let apiKey = "3e9b4576";

window.addEventListener("load", function () {
  fetchMovieData();
});

async function fetchMovieData(searchString = "a") {
  let url = `${imdbURL}?apiKey=${apiKey}&s=${searchString}`;
  try {
    let res = await fetch(url);
    let data = await res.json();
    console.log(data);
    if(data.Response) {
        createMovieCard(data.Search);
    } else {
        
    }
  } catch (error) {
    console.log("Error occurred:", error);
  }
}

function createMovieCard(data) {

}