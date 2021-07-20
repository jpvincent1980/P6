const bestMovie = document.getElementById("best-movie");
const caroussels = document.getElementsByClassName("caroussel");
const modals = document.getElementsByClassName("open-modal");
const closeModal= document.getElementById("close-modal");

const movieTitle = document.getElementById("movie-title");
const movieGenre = document.getElementById("movie-genre");
const movieReleaseDate = document.getElementById("movie-release-date");
const movieRated = document.getElementById("movie-rated");
const movieImdbScore = document.getElementById("movie-imdb-score");
const movieDirectors = document.getElementById("movie-directors");
const movieActors = document.getElementById("movie-actors");
const movieDuration = document.getElementById("movie-duration");
const movieCountries = document.getElementById("movie-countries");
const movieBoxOffice = document.getElementById("movie-box-office");
const movieSynopsis = document.getElementById("movie-synopsis");
const movieImage = document.getElementById("movie-image");

async function getBestMovie(url,genre = "") {
let fullURL = url + genre;
let fetchRequest = await fetch(fullURL);
let response = await fetchRequest.json();
let bestMovie = await response.results.slice(0,1)[0];
return bestMovie
}

async function getSevenMovies(url,genre = "") {
let fullURL = url + genre;
let fetchRequest = await fetch(fullURL);
let response = await fetchRequest.json();
let nextPage = await response.next;
let firstFiveMovies = await response.results;
let fetchSecondRequest = await fetch(nextPage);
let nextResponse = await fetchSecondRequest.json();
let lastTwoMovies = await nextResponse.results.slice(0,2);
let fullList = await firstFiveMovies.concat(lastTwoMovies);
return fullList
}

getBestMovie("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=")
.then(function(resolve) {
fetch(resolve.url)
.then(function(response) {
return response.json();
})
.then(function(resolve) {
let elements = bestMovie.getElementsByClassName("open-modal");
for (let element of elements) {
element.setAttribute("href",resolve.url);
};
let image = bestMovie.getElementsByTagName("img")[0];
image.setAttribute("src",resolve.image_url);
let title = bestMovie.getElementsByTagName("h3")[0];
title.innerText = resolve.title;
let description = bestMovie.getElementsByTagName("h4")[0];
description.innerText = resolve.description;
})
.catch((err) => console.log("Erreur : " + err));
})
.catch((err) => console.log("Erreur : " + err));

for (let caroussel of caroussels) {
let genre = caroussel.id;
if (genre == "bestScores") {
genre = "";
};
getSevenMovies("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=",genre)
.then(function(resolve) {
let movies = resolve;
let images = caroussel.getElementsByClassName("open-modal");
let i = 0;
for (let image of images) {
image.setAttribute("src",movies[i].image_url);
image.setAttribute("href",movies[i].url);
i += 1;
};
})
.catch((err) => console.log("Erreur : " + err));
};


for (let modal of modals) {
modal.addEventListener("click", function(event) {
    event.preventDefault();
    let url = this.getAttribute("href");
    fetch(url)
    .then(function(response) {
    return response.json();
    })
    .then(function(data) {
    movieTitle.textContent = data.title;
    movieGenre.textContent = "GENRE: " + data.genres;
    movieReleaseDate.textContent = "DATE DE SORTIE: " + data.date_published;
    movieRated.textContent = "CLASSE: " + data.rated;
    movieImdbScore.textContent = "SCORE IMDB: " + data.imdb_score + "/10";
    movieDirectors.textContent = "REALISE PAR: " + data.directors;
    movieActors.textContent = "AVEC: " + data.actors;
    movieDuration.textContent = "DUREE: " + data.duration + " min.";
    movieCountries.textContent = "PAYS D'ORIGINE: " + data.countries;
    let boxOffice = new Intl.NumberFormat().format(data.worldwide_gross_income);
    movieBoxOffice.textContent = "BOX-OFFICE: " + boxOffice + " $";
    movieSynopsis.textContent = "RESUME: " + data.description;
    movieImage.innerHTML = "<img src='" + data.image_url +"' />";
    })
    .catch((err) => console.log("Erreur : " + err));
    document.getElementById("modal").style.visibility = "visible";
    document.getElementById("modal-content").style.visibility = "visible";
    document.getElementById("modal-content").style.opacity = 1;
    document.getElementById("modal-content").style.transform = "translateY(50%)";
});
}

closeModal.addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById("modal").style.visibility = "hidden";
    document.getElementById("modal-content").style.visibility = "hidden";
    document.getElementById("modal-content").style.opacity = 0;
    document.getElementById("modal-content").style.transform = "translateY(40%)";
});

document.addEventListener("click", function(event) {
    if (event.target == document.getElementById("modal")) {
    document.getElementById("modal").style.visibility = "hidden";
    document.getElementById("modal-content").style.visibility = "hidden";
    document.getElementById("modal-content").style.opacity = 0;
    document.getElementById("modal-content").style.transform = "translateY(40%)";
    }
});

document.addEventListener("keyup", function(event) {
    if (event.key == "Escape") {
    document.getElementById("modal").style.visibility = "hidden";
    document.getElementById("modal-content").style.visibility = "hidden";
    document.getElementById("modal-content").style.opacity = 0;
    document.getElementById("modal-content").style.transform = "translateY(40%)";
    }
})