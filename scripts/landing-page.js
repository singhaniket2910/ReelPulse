let button = document.querySelector("#searchBar>button");
let title = document.querySelector("#searchBar>input");
let type = document.querySelector("#searchBar>select");
let suggestionCont = document.querySelector("#suggestionContainer");

let BASE_URL = "https://www.omdbapi.com/?apikey=bcf1e9d7";
let NEW_URL, i = 1;
let titleArray = [], yearArray = [], posterArray = [];

button.disabled = true;
button.style.cursor = "not-allowed";

title.addEventListener("input", () => {
    button.disabled = false;
    button.style.cursor = "pointer";
    userInput();
    clearSuggestions();
    if (title.value === "") {
        button.disabled = true;
        button.style.cursor = "not-allowed";
    }
    else
        getData();
    titleArray = [], yearArray = [], posterArray = [];
});

button.addEventListener("click", () => {
    userInput();
    clearSuggestions();
    getData();
    titleArray = [], yearArray = [], posterArray = [];
});

title.addEventListener("keypress", (evt) => {
    if (evt.key === "Enter") {
        userInput();
        clearSuggestions();
        getData();
        titleArray = [], yearArray = [], posterArray = [];
    }
});

const userInput = () => {
    if (title.value !== "") {
        let formatted_title = "";
        for (let char of title.value) {
            if (char === ' ')
                char = '+';
            formatted_title += char;
        }
        if (type.value === "movie" || type.value === "series")
            NEW_URL = `${BASE_URL}&s=${formatted_title}&type=${type.value}`;
        else
            NEW_URL = `${BASE_URL}&s=${formatted_title}`;
    }
}

const clearSuggestions = () => {
    while (suggestionCont.hasChildNodes())
        suggestionCont.removeChild(suggestionCont.firstChild);
    i = 1;
}

const getData = async () => {
    let response = await fetch(NEW_URL);
    let data = await response.json();
    if (data.Response === "True") {
        data.Search.forEach(titles => {
            titleArray.push(titles.Title);
            yearArray.push(titles.Year);
            posterArray.push(titles.Poster);
            suggestionsPush(titles.Title, titles.Year, titles.Poster);
        });
    }
}

const suggestionsPush = (title, year, poster) => {
    if (i <= 5) {
        let s = document.createElement("div");
        s.setAttribute("class", "suggestions");
        s.setAttribute("id", `suggestion${i++}`);
        suggestionCont.append(s);
        let p = document.createElement("img");
        if (poster === "N/A")
            poster = "https://upload.wikimedia.org/wikipedia/commons/d/dc/No_Preview_image_2.png";
        p.setAttribute("src", poster);
        p.setAttribute("class", "posters");
        s.append(p);
        let d = document.createElement("div");
        d.setAttribute("class", "details");
        suggestionCont.append(d);
        let t = document.createElement("p");
        t.innerText = title;
        t.setAttribute("class", "titles");
        let y = document.createElement("p");
        y.innerText = year;
        y.setAttribute("class", "years");
        d.append(t, y);
        s.append(d);
    }
}