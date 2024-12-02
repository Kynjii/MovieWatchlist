const searchBtn = document.getElementById("search-button")
const searchEl = document.getElementById("my-search")
const searchContainer = document.getElementById("search-container")
const searchResultContainer = document.getElementById("search-results-container")

let searchResult = []
let detailedResults = []
let watchlist = JSON.parse(localStorage.getItem("watchlist")) || []




function handleSearch(e){
    e.preventDefault()
    const baseUrl = "https://www.omdbapi.com/?"
    const key = "f7f81c19"
    const searchInput = searchEl.value
    const params = new URLSearchParams({
        s: searchInput,
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
    detailedResults = []
    let html = ``

    for (let movie of searchResult){
        const baseUrl = "https://www.omdbapi.com/?"
        const key = "f7f81c19"
        const imdbId = movie.imdbID
        const params = new URLSearchParams({
            i: imdbId,
            apiKey: key
        })
        const fetchUrl = `${baseUrl}${params.toString()}`

        fetch(fetchUrl)
            .then(res => res.json())
            .then(data => {
                detailedResults.push(data)

                    html += `
                        <div class="result-card-container" data-imdbid="${data.imdbID}">
                            <img src="${data.Poster}" class="poster" alt="A poster for the movie ${data.Title}">
                            <h2>${data.Title}</h2>
                            <i class="fa-solid fa-star"></i>
                            <p class="imdb-rating" aria-label="imdb rating">${data.imdbRating}</p>
                            <p class="runtime" aria-label="runtime">${data.Runtime}</p>
                            <p class="genre" aria-label="genre">${data.Genre}</p>
                                <div class="actions">
                                    <i class="fa-solid fa-circle-plus"></i>   
                                    <button class="add-button" onclick="addToWatchlist('${data.imdbID}')">Add to Watchlist</button>               
                                </div>
                            <p class="plot-container" id="plot-container">
                                ${data.Plot}
                            </p>
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

searchBtn.addEventListener('click', handleSearch)







function addToWatchlist(imdbId) {
    const movie = detailedResults.find(m => m.imdbID === imdbId)

    if (movie && !watchlist.some(item => item.imdbID === imdbId)) {
        watchlist.push(movie)
        localStorage.setItem("watchlist", JSON.stringify(watchlist))
        alert(`${movie.Title} added to your watchlist!`)
    } else {
        alert(`${movie ? movie.Title : "This movie"} is already in your watchlist.`)
    }
}





 
