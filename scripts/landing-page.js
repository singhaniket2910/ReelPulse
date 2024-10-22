let button = document.querySelector("#searchBar>a>button");
let title = document.querySelector("#searchBar>input");
let type = document.querySelector("#searchBar>select");
let suggestionCont = document.querySelector("#suggestionContainer");
let suggestionDivs = document.querySelectorAll(".suggestions");

let BASE_URL = "https://www.omdbapi.com/?apikey=bcf1e9d7";
let NEW_URL, SPECIFIC_URL, contentName, i = 0, UID;
let titleArray = [], yearArray = [], posterArray = [], imdbArray = [];
const buttonsArray = [];

type.addEventListener("click", () => {
    type.addEventListener("change", () => {
        urlGeneration();
        clearSuggestions();
        getData();
    });
});

title.addEventListener("input", () => {
    setTimeout(() => {
        urlGeneration();
        clearSuggestions();
        getData();
    }, 1500);
    if (title.value.length > 0)
        title.value = title.value.charAt(0).toUpperCase() + title.value.slice(1);
    sessionStorage.setItem("title", title.value);
    titleArray = [], yearArray = [], posterArray = [], imdbArray = [];
});

title.addEventListener("keydown", (evt) => {
    if (evt.key === "Enter")
        button.click();
});

const urlGeneration = () => {
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
        sessionStorage.setItem("url", NEW_URL);
    }
}

const clearSuggestions = () => {
    while (suggestionCont.hasChildNodes())
        suggestionCont.removeChild(suggestionCont.firstChild);
    i = 0;
}

const getData = async () => {
    let response = await fetch(NEW_URL);
    let data = await response.json();
    if (data.Response === "True") {
        data.Search.forEach(titles => {
            titleArray.push(titles.Title);
            yearArray.push(titles.Year);
            posterArray.push(titles.Poster);
            imdbArray.push(titles.imdbID);
            suggestionsPush(titles.Title, titles.Year, titles.Poster);
        });
    }
}

const suggestionsPush = (title, year, poster) => {
    if (i < 5) {
        let s1 = document.createElement("button");
        s1.setAttribute("class", "suggestions");
        s1.setAttribute("id", `suggestion${i++}`);
        suggestionCont.append(s1);

        let p1 = document.createElement("img");
        if (poster === "N/A")
            poster = "https://upload.wikimedia.org/wikipedia/commons/d/dc/No_Preview_image_2.png";
        p1.setAttribute("src", poster);
        p1.setAttribute("class", "posters");
        s1.append(p1);

        let d1 = document.createElement("div");
        d1.setAttribute("class", "details");
        suggestionCont.append(d1);

        let t1 = document.createElement("p");
        t1.innerText = title;
        t1.setAttribute("class", "titles");
        let y1 = document.createElement("p");
        y1.innerText = year;
        y1.setAttribute("class", "years");
        d1.append(t1, y1);
        s1.append(d1);

        s1.addEventListener("click", () => {
            if (s1.getAttribute("id").endsWith(0)) {
                contentName = titleArray[0];
                UID = imdbArray[0];
            }
            else if (s1.getAttribute("id").endsWith(1)) {
                contentName = titleArray[1];
                UID = imdbArray[1];
            }
            else if (s1.getAttribute("id").endsWith(2)) {
                contentName = titleArray[2];
                UID = imdbArray[2];
            }
            else if (s1.getAttribute("id").endsWith(3)) {
                contentName = titleArray[3];
                UID = imdbArray[3];
            }
            else if (s1.getAttribute("id").endsWith(4)) {
                contentName = titleArray[4];
                UID = imdbArray[4];
            }
            SPECIFIC_URL = `${BASE_URL}&i=${UID}`;
            sessionStorage.setItem("content_name", contentName);
            sessionStorage.setItem("specific_url", SPECIFIC_URL);
            window.location.href = "content-details.html";
        });
    }
}