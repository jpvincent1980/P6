const bestMovieTitle = document.getElementById("movie-title");
const bestMovieGenre = document.getElementById("movie-genre");
const bestMovieReleaseDate = document.getElementById("movie-release-date");
const bestMovieRated = document.getElementById("movie-rated");
const bestMovieImdbScore = document.getElementById("movie-imdb-score");
const bestMovieDirectors = document.getElementById("movie-directors");
const bestMovieActors = document.getElementById("movie-actors");
const bestMovieDuration = document.getElementById("movie-duration");
const bestMovieCountries = document.getElementById("movie-countries");
const bestMovieBoxOffice = document.getElementById("movie-box-office");
const bestMovieSynopsis = document.getElementById("movie-synopsis");
const bestMovieImage = document.getElementById("movie-image");

let url = getMovieURL("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score");
console.log(url);

fetch(url)
.then(function(response) {
return response.json();
})
.then(function(data) {
console.log(data);
bestMovieTitle.textContent = data.title;
bestMovieGenre.textContent = "GENRE: " + data.results[0].genres;
bestMovieReleaseDate.textContent = "DATE DE SORTIE: " + data.results[0].date_published;
bestMovieRated.textContent = "CLASSE:" + data.results[0].rated;
bestMovieImdbScore.textContent = "SCORE IMDB: " + data.results[0].imdb_score;
bestMovieDirectors.textContent = "REALISE PAR: " + data.results[0].directors;
bestMovieActors.textContent = "AVEC: " + data.results[0].actors;
bestMovieDuration.textContent = "DUREE: " + data.results[0].duration;
bestMovieCountries.textContent = "PAYS D'ORIGINE: " + data.results[0].countries;
bestMovieBoxOffice.textContent = "BOX-OFFICE: " + data.results[0].worldwide_gross_income;
bestMovieSynopsis.textContent = "RESUME: " + data.results[0].description;
bestMovieImage.innerHTML = "<img src='" + data.results[0].image_url +"' />";
})
.catch((err) => console.log("Erreur : " + err))