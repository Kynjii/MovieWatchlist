const searchBtn = document.getElementById("search-button")
const searchEl = document.getElementById("my-search")

function handleSearch(e){
    e.preventDefault()
    const baseUrl = "http://www.omdbapi.com/?"
    const key = "f7f81c19"
    const searchInput = searchEl.value
    const params = new URLSearchParams({
        s: searchInput,
        apiKey: key
    })
    const fetchUrl = `${baseUrl}${params.toString()}`
    console.log(fetchUrl)

    fetch(fetchUrl)
        .then(res => res.json())
        .then(data => console.log(data))        
}

searchBtn.addEventListener('click', handleSearch)

