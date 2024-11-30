const searchBtn = document.getElementById("search-button")
const searchEl = document.getElementById("my-search")
const searchContainer = document.getElementById("search-container")

let searchResult = []

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
            document.getElementById("search-results-container").innerHTML = `
            <div class="search-error">
                <p>No results found. Try a different search.</p>
            <div>
            `;
        }
    })     
}

function searchTitle(){
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
                    html += `
                        <div class="result-card-container">
                            <img src="${data.Poster}" class="poster" alt="A poster for the movie ${data.Title}">
                            <h2>${data.Title}</h2>
                            <i class="fa-solid fa-star"></i>
                            <p class="imdb-rating" aria-label="imdb rating">${data.imdbRating}</p>
                            <p class="runtime" aria-label="runtime">${data.Runtime}</p>
                            <p class="genre" aria-label="genre">${data.Genre}</p>
                                <div class="add-button">
                                    <i class="fa-solid fa-circle-plus"></i>   
                                    <p>Watchlist</p>               
                                </div>
                            <p class="plot-container" id="plot-container">
                                ${data.Plot}
                            </p>
                        </div>
                    `
                
                document.getElementById("search-results-container").innerHTML = html
                     })
                
            }
    }




searchBtn.addEventListener('click', handleSearch)





function addToWatchlist(){

}




 
