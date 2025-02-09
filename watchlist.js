window.onload = function () {
    const watchlist = JSON.parse(localStorage.getItem("watchlist")) || []
    renderWatchlist(watchlist)
}

function renderWatchlist(watchlist){  
    const watchlistContainer = document.getElementById("watchlist-container") 
    
    if (watchlist.length === 0) {
    watchlistContainer.innerHTML = `
        <div class="empty-watchlist-state">
            <p>Your watchlist is looking a little empty...</p>
            <div class="go-find-button">
                <a href="index.html">
                    <i class="fa-solid fa-circle-plus"></i>   
                    <p>Let's add some movies!</p>
                </a>                                   
            </div>
         </div>
    `
    return
    }    

    let html = watchlist.map(movie => `          
        <div class="watchlist-card-container" data-imdbid="${movie.imdbID}">
            <div class="card-poster">
                <img src="${movie.Poster}" class="poster" alt="A poster for the movie ${movie.Title}">
            </div>
            <div class="card-content">
                <div class="card-header">
                    <h2>${movie.Title}</h2>
                    <i class="fa-solid fa-star"></i>
                    <p class="imdb-rating" aria-label="imdb rating">${movie.imdbRating || "N/A"}</p>
                </div>
                <div class="card-info">
                    <p class="runtime" aria-label="runtime">${movie.Runtime || "N/A"}</p>
                    <p class="genre" aria-label="genre">${movie.Genre || "N/A"}</p>
                    <div class="actions" onclick="removeFromWatchlist('${movie.imdbID}')">
                        <i class="fa-solid fa-circle-minus"></i>
                        <button class="remove-button" id="remove-button">Remove</button>
                    </div>
                </div>
                <div class="card-plot">
                    <p class="plot-container" id="plot-container">
                        ${movie.Plot || "No plot available"}
                    </p>
                </div>
            </div>
        </div>
    `).join("")
    watchlistContainer.innerHTML = html
}

function removeFromWatchlist(imdbId) {
    let watchlist = JSON.parse(localStorage.getItem("watchlist")) || []

    watchlist = watchlist.filter(movie => movie.imdbID !== imdbId)
    localStorage.setItem("watchlist", JSON.stringify(watchlist))
    renderWatchlist(watchlist)
}







