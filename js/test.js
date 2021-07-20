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

async function getBestMovie(url,genre = "") {
let fullURL = url + genre;
let fetchRequest = await fetch(fullURL);
let response = await fetchRequest.json();
let bestMovie = await response.results.slice(0,1)[0];
return bestMovie
}


getSevenMovies("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=","Animation")
.then(function(resolve) {
for (let movie of resolve) {
console.log(movie.title);
console.log(movie.year);
};
})

getBestMovie("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=")
.then(function(resolve) {
console.log(resolve.title);
})