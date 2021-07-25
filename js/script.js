//Defines constants for elements of webpage
const bestMovie = document.getElementById("best-movie");
const carousels = document.getElementsByClassName("carousel");

//Defines constants used for modal window
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

//Defines constants and variables used for carousels
const imageWidth = 182;
const imagePadding = 2;
const scrollStep = imageWidth + (2*imagePadding);
let nextRight = 30;
let previousLeft = 0;
const initialNextRight = nextRight+"px";
const initialPreviousLeft = previousLeft+"px";
const minNextRight = nextRight - (3*scrollStep)+"px";
const maxPreviousLeft = previousLeft + (3*scrollStep)+"px";

//Get movie data for the movie with the best score
async function getBestMovie(url,genre = "") {
let fullURL = url + genre;
let fetchRequest = await fetch(fullURL);
let response = await fetchRequest.json();
let bestMovie = await response.results.slice(0,1)[0];
return bestMovie
}

//Get the list of the seven best movies of a given category
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

//Gets data for the best movie
getBestMovie("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=")
.then(function(resolve) {
fetch(resolve.url)
.then(function(response) {
return response.json();
})
.then(function(resolve) {
let elements = bestMovie.getElementsByClassName("open-modal");
for (let element of elements) {
element.setAttribute("longdesc",resolve.url);
};
let image = bestMovie.getElementsByTagName("img")[0];
image.setAttribute("src",resolve.image_url);
let title = bestMovie.getElementsByTagName("h1")[0];
title.innerText = resolve.title;
let description = bestMovie.getElementsByTagName("h4")[0];
description.innerText = resolve.description;
})
.catch((err) => console.log("Erreur : " + err));
})
.catch((err) => console.log("Erreur : " + err));

//Gets data for the seven best movies for each category i.e. carousel
for (let carousel of carousels) {
let genre = carousel.id;
if (genre == "bestScores") {
genre = "";
};
getSevenMovies("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=",genre)
.then(function(resolve) {
let movies = resolve;
let images = carousel.getElementsByClassName("open-modal");
let i = 0;
for (let image of images) {
image.setAttribute("src",movies[i].image_url);
image.setAttribute("longdesc",movies[i].url);
image.setAttribute("alt",movies[i].title);
i += 1;
};
})
.catch((err) => console.log("Erreur : " + err));
//Handles the scrolling of the carousel with the dynamic arrows
const previous = carousel.getElementsByClassName("previous")[0];
const next = carousel.getElementsByClassName("next")[0];
next.addEventListener("click", function(e) {
nextRight = Number(next.style.right.replace("px",""));
nextRight -= scrollStep;
previousLeft = Number(previous.style.left.replace("px",""));
previousLeft += scrollStep;
next.style.right = nextRight+"px";
previous.style.left = previousLeft+"px";
carousel.scrollBy(scrollStep,0);
if (next.style.right == minNextRight) {
next.style.display = "none";
} else {
next.style.display = "flex";
}
if (previous.style.left == initialPreviousLeft) {
previous.style.display = "none";
} else {
previous.style.display = "flex";
}
})
previous.addEventListener("click", function(e) {
nextRight = Number(next.style.right.replace("px",""));
nextRight += scrollStep;
previousLeft = Number(previous.style.left.replace("px",""));
previousLeft -= scrollStep;
next.style.right = nextRight+"px";
previous.style.left = previousLeft+"px";
carousel.scrollBy(-scrollStep,0);
if (next.style.right == minNextRight) {
next.style.display = "none";
} else {
next.style.display = "flex";
}
if (previous.style.left == initialPreviousLeft) {
previous.style.display = "none";
} else {
previous.style.display = "flex";
}
})
};

//Handles the opening and closing of the modal window
for (let modal of modals) {
modal.addEventListener("click", function(event) {
    event.preventDefault();
    let url = this.getAttribute("longdesc");
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

//Closes the modal window if user clicks on the X button at the top right
closeModal.addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById("modal").style.visibility = "hidden";
    document.getElementById("modal-content").style.visibility = "hidden";
    document.getElementById("modal-content").style.opacity = 0;
    document.getElementById("modal-content").style.transform = "translateY(40%)";
});

//Closes the modal window if user clicks outside of the modal window
document.addEventListener("click", function(event) {
    if (event.target == document.getElementById("modal")) {
    document.getElementById("modal").style.visibility = "hidden";
    document.getElementById("modal-content").style.visibility = "hidden";
    document.getElementById("modal-content").style.opacity = 0;
    document.getElementById("modal-content").style.transform = "translateY(40%)";
    }
});

//Closes the modal window if user presses Escape
document.addEventListener("keyup", function(event) {
    if (event.key == "Escape") {
    document.getElementById("modal").style.visibility = "hidden";
    document.getElementById("modal-content").style.visibility = "hidden";
    document.getElementById("modal-content").style.opacity = 0;
    document.getElementById("modal-content").style.transform = "translateY(40%)";
    }
})

//Handles the appearance and disappearance of a Back To Top button at the
//bottom right of the screen
const backToTopButton = document.getElementById("backToTop");
window.onscroll = function() {scrollFunction()};
function scrollFunction() {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    backToTopButton.style.display = "block";
  } else {
    backToTopButton.style.display = "none";
  }
}
function backToTopFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}