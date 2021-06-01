const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=08bcab2729bef107400d611f28d1825b&page=1";

const IMG_PATH = "https://image.tmdb.org/t/p/w1280/";

const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=08bcab2729bef107400d611f28d1825b&query="';

const main = document.getElementById("main");
const form = document.getElementById("form");
const serach = document.getElementById("search");

// Get initial movies

getMovie(API_URL);

async function getMovie(url) {
  const res = await fetch(url);
  const data = await res.json();
  console.log (data.results)

  showMovies(data.results);
}

function showMovies(movies) {
  main.innerHTML = "";

  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = ` 
       <img
         src="${IMG_PATH + poster_path}"
         alt="${title}"
        />
       <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
         </div>
      <div class="overview">
        <h3>Overview</h3>
        ${overview}
       </div>`;

    main.appendChild(movieEl);
  });
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== "") {
    getMovie(SEARCH_API + searchTerm);

    serach.value = "";
  } else {
    window.location.reload();
  }
});



// API Collection
// URL: /discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22
// URL: /discover/movie/?certification_country=US&certification=R&sort_by=vote_average.desc
// URL: /discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc
// URL: /discover/movie?primary_release_year=2010&sort_by=vote_average.desc
// URL: /discover/movie?with_genres=18&primary_release_year=2014
// URL: /discover/movie?with_genres=878&with_cast=500&sort_by=vote_average.desc
// URL: /discover/movie?with_genres=35&with_cast=23659&sort_by=revenue.desc
// URL: /discover/movie?with_people=287,819&sort_by=vote_average.desc
// URL: /discover/movie?with_people=108916,7467&sort_by=popularity.desc
// URL: /discover/movie?with_genres=18&sort_by=vote_average.desc&vote_count.gte=10
// URL: /discover/movie?certification_country=US&certification=R&sort_by=revenue.desc&with_cast=3896