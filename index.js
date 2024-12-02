const searchBtn = document.getElementById("search-button")
const searchEl = document.getElementById("my-search")
const searchResultContainer = document.getElementById("search-results-container")
const baseUrl = "https://www.omdbapi.com/?"
const key = "f7f81c19"

let searchResult = []
let imdbIdSearchResult = []
let watchlist = JSON.parse(localStorage.getItem("watchlist")) || []

searchBtn.addEventListener('click', handleSearch)

function handleSearch(e){
    e.preventDefault()
    const searchInput = searchEl.value
    const params = new URLSearchParams({
        s: searchInput,
        type: "movie",
        plot: "short",
        apiKey: key
    })
    const fetchUrl = `${baseUrl}${params.toString()}`   

    fetch(fetchUrl)
        .then(res => res.json())
        .then(searchData => {
            if (searchData.Response === "True"){
                const moviesArr = searchData.Search || []
                searchResult = moviesArr
                searchTitle()
            } else {
                searchResultContainer.innerHTML = `
            <div class="search-error">
                <p>No results found. Try a different search.</p>
            <div>
            `
            }        
        })
        .catch(error => {
            console.error("Error fetching search results:", error)
            alert("An error occurred while searching. Please try again later.")
        })     
}

function searchTitle(){
    imdbIdSearchResult = []
    let html = ``

    for (let movie of searchResult){
        const imdbId = movie.imdbID
        const params = new URLSearchParams({
            i: imdbId,
            apiKey: key
        })
        const fetchUrl = `${baseUrl}${params.toString()}`

        fetch(fetchUrl)
            .then(res => res.json())
            .then(data => {
                imdbIdSearchResult.push(data)

                    html += `                        
                        <div class="result-card-container" data-imdbid="${data.imdbID}">
                            <div class="card-poster">
                                <img src="${data.Poster}" class="poster" alt="A poster for the movie ${data.Title}">
                            </div>
                            <div class="card-content">
                                <div class="card-header">
                                    <h2>${data.Title}</h2>
                                    <i class="fa-solid fa-star"></i>
                                    <p class="imdb-rating" aria-label="imdb rating">${data.imdbRating || "N/A"}</p>
                                </div>
                                <div class="card-info">
                                    <p class="runtime" aria-label="runtime">${data.Runtime || "N/A"}</p>
                                    <p class="genre" aria-label="genre">${data.Genre || "N/A"}</p>
                                    <div class="actions" onclick="addToWatchlist('${data.imdbID}')">
                                        <i class="fa-solid fa-circle-plus"></i>
                                        <button class="add-button">Add to Watchlist</button>
                                    </div>
                                </div>
                                <div class="card-plot">
                                    <p class="plot-container" id="plot-container">
                                        ${data.Plot || "No plot available"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    `                
                    searchResultContainer.innerHTML = html
            })
            .catch(error => {
                console.error("Error fetching movie details:", error)
                alert("An error occurred while fetching movie details. Please try again later.")   
            })            
    }
}


function addToWatchlist(imdbId) {
    const movie = imdbIdSearchResult.find(m => m.imdbID === imdbId)

    if (movie && !watchlist.some(item => item.imdbID === imdbId)) {
        watchlist.push(movie)
        localStorage.setItem("watchlist", JSON.stringify(watchlist))
        alert(`${movie.Title} added to your watchlist!`)
    } else {
        alert(`${movie ? movie.Title : "This movie"} is already in your watchlist.`)
    }
}