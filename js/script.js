//Defines constants for elements of webpage
const bestMovie = document.getElementById("best-movie");
const carousels = document.getElementsByClassName("carousel-wrapper");

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
element.setAttribute("data-source",resolve.url);
bestMovie.getElementsByTagName("h2")[0].innerText = resolve.title;
bestMovie.getElementsByTagName("h3")[0].innerText = resolve.description;
if (element.getElementsByTagName("img").length > 0) {
element.getElementsByTagName("img")[0].setAttribute("src",resolve.image_url);
};
}
})
.catch((err) => console.log("Erreur : " + err));
})
.catch((err) => console.log("Erreur : " + err));

//Gets data for the seven best movies for each category i.e. carousel
for (let carousel of carousels) {
let genre = carousel.getElementsByTagName("div")[0].getAttribute("id");
if (genre == "bestScores") {
genre = "";
};
getSevenMovies("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=",genre)
.then(function(resolve) {
let movies = resolve;
let images = carousel.getElementsByTagName("div")[0].getElementsByClassName("open-modal");
let i = 0;
for (let image of images) {
image.setAttribute("data-source",movies[i].url);
image.getElementsByTagName("img")[0].setAttribute("src",movies[i].image_url);
image.getElementsByTagName("img")[0].setAttribute("alt",movies[i].title);
i += 1;
};
})
.catch((err) => console.log("Erreur : " + err));

//Handles the scrolling of the carousel with the dynamic arrows
const previous = carousel.getElementsByClassName("previous")[0];
const next = carousel.getElementsByClassName("next")[0];

next.addEventListener("click", function(e) {
let liValue = Number(carousel.getElementsByTagName("ol")[0].getAttribute("data-counter"));
carousel.getElementsByTagName("ol")[0].setAttribute("data-counter", liValue += 1);
carousel.getElementsByClassName("carousel")[0].scrollTo((liValue-1)*scrollStep,0);
if (Number(carousel.getElementsByTagName("ol")[0].getAttribute("data-counter")) > 3) {
next.style.display = "none";
} else {
next.style.display = "flex";
}
if (Number(carousel.getElementsByTagName("ol")[0].getAttribute("data-counter")) == 1) {
previous.style.display = "none";
} else {
previous.style.display = "flex";
}
})

previous.addEventListener("click", function(e) {
let liValue = Number(carousel.getElementsByTagName("ol")[0].getAttribute("data-counter"));
carousel.getElementsByTagName("ol")[0].setAttribute("data-counter", liValue -= 1);
carousel.getElementsByClassName("carousel")[0].scrollTo((liValue-1)*scrollStep,0);
if (Number(carousel.getElementsByTagName("ol")[0].getAttribute("data-counter")) > 3) {
next.style.display = "none";
} else {
next.style.display = "flex";
}
if (Number(carousel.getElementsByTagName("ol")[0].getAttribute("data-counter")) == 1) {
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
    let url = this.getAttribute("data-source");
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