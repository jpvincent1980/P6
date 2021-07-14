let url = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score"
const bestMovieTitle = document.getElementById("movie-title");
const bestMovieGenre = document.getElementById("movie-genre");
const bestMovieReleaseDate = document.getElementById("movie-release-date");
const bestMovieVotes = document.getElementById("movie-votes");
const bestMovieRating = document.getElementById("movie-rating");
const bestMovieDirectors = document.getElementById("movie-directors");
const bestMovieActors = document.getElementById("movie-actors");
const bestMovieDuration = document.getElementById("movie-duration");
const bestMovieCountries = document.getElementById("movie-countries");
const bestMovieBoxOffice = document.getElementById("movie-box-office");
const bestMovieSynopsis = document.getElementById("movie-synopsis");
const bestMovieImage = document.getElementById("movie-image");

fetch(url)
.then(function(response) {
return response.json();
})
.then(function(data) {
console.log(data);
bestMovieTitle.textContent = data.results[0].title;
bestMovieGenre.textContent = "GENRE: " + data.results[0].genres;
bestMovieReleaseDate.textContent = "ANNEE DE SORTIE: " + data.results[0].year;
bestMovieVotes.textContent = "NOMBRE DE VOTES: " + data.results[0].votes;
bestMovieRating.textContent = "SCORE IMDB: " + data.results[0].imdb_score;
bestMovieDirectors.textContent = "REALISE PAR:: " + data.results[0].directors;
bestMovieActors.textContent = "AVEC: " + data.results[0].actors;
bestMovieDuration.textContent = "DUREE: " + data.results[0].title;
bestMovieCountries.textContent = "PAYS D'ORIGINE: " + data.results[0].title;
bestMovieBoxOffice.textContent = "BOX-OFFICE: " + data.results[0].title;
bestMovieSynopsis.textContent = "RESUME: " + data.results[0].title;
bestMovieImage.innerHTML = "<img src='" + data.results[0].image_url +"' />";
})
.catch((err) => console.log("Erreur : " + err))