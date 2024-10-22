let suggestionContSuggestionsPage = document.querySelector("#suggestionContainer-suggestionsPage");
let titleOfContent = sessionStorage.getItem("title");
let URL = sessionStorage.getItem("url");
let title_suggestions_page = sessionStorage.getItem("content_name");
let URL_suggestions_page = sessionStorage.getItem("specific_url");

document.getElementById("heading").innerText = `Search result for ${titleOfContent}...`;

window.addEventListener("load", async () => {
    document.title = `Search for ${titleOfContent}`;
    let response = await fetch(URL);
    let data = await response.json();
    if (data.Response === "True") {
        data.Search.forEach(titles => {
            titleArray.push(titles.Title);
            yearArray.push(titles.Year);
            posterArray.push(titles.Poster);
            imdbArray.push(titles.imdbID);
            suggestionsPushSuggestionsPage(titles.Title, titles.Year, titles.Poster);
        });
    }
});

const suggestionsPushSuggestionsPage = (title, year, poster) => {
    if (i < 10) {
        let s2 = document.createElement("button");
        s2.setAttribute("class", "suggestions");
        s2.setAttribute("id", `suggestion${i++}`);
        suggestionContSuggestionsPage.append(s2);

        let p2 = document.createElement("img");
        if (poster === "N/A")
            poster = "https://upload.wikimedia.org/wikipedia/commons/d/dc/No_Preview_image_2.png";
        p2.setAttribute("src", poster);
        p2.setAttribute("class", "posters");
        s2.append(p2);

        let d2 = document.createElement("div");
        d2.setAttribute("class", "details");
        suggestionContSuggestionsPage.append(d2);

        let t2 = document.createElement("p");
        t2.innerText = title;
        t2.setAttribute("class", "titles");
        let y2 = document.createElement("p");
        y2.innerText = year;
        y2.setAttribute("class", "years");
        d2.append(t2, y2);
        s2.append(d2);

        s2.addEventListener("click", () => {
            if (s2.getAttribute("id").endsWith(0)) {
                contentName = titleArray[0];
                UID = imdbArray[0];
            }
            else if (s2.getAttribute("id").endsWith(1)) {
                contentName = titleArray[1];
                UID = imdbArray[1];
            }
            else if (s2.getAttribute("id").endsWith(2)) {
                contentName = titleArray[2];
                UID = imdbArray[2];
            }
            else if (s2.getAttribute("id").endsWith(3)) {
                contentName = titleArray[3];
                UID = imdbArray[3];
            }
            else if (s2.getAttribute("id").endsWith(4)) {
                contentName = titleArray[4];
                UID = imdbArray[4];
            }
            else if (s2.getAttribute("id").endsWith(5)) {
                contentName = titleArray[5];
                UID = imdbArray[5];
            }
            else if (s2.getAttribute("id").endsWith(6)) {
                contentName = titleArray[6];
                UID = imdbArray[6];
            }
            else if (s2.getAttribute("id").endsWith(7)) {
                contentName = titleArray[7];
                UID = imdbArray[7];
            }
            else if (s2.getAttribute("id").endsWith(8)) {
                contentName = titleArray[8];
                UID = imdbArray[8];
            }
            else if (s2.getAttribute("id").endsWith(9)) {
                contentName = titleArray[9];
                UID = imdbArray[9];
            }
            SPECIFIC_URL = `${BASE_URL}&i=${UID}`;
            sessionStorage.setItem("content_name", contentName);
            sessionStorage.setItem("specific_url", SPECIFIC_URL);
            window.location.href = "content-details.html";
        });
    }
}