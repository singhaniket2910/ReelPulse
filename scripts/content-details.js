let title_content_page = sessionStorage.getItem("content_name");
let URL_content_page = sessionStorage.getItem("specific_url");
document.title = title_content_page;
let response, data, ratingValue;

const getDetailedData = async () => {
    response = await fetch(URL_content_page);
    data = await response.json();
    let container = document.getElementById("details-container");

    let primaryDetails = document.getElementById("primary-details");

    let posterElement = document.createElement("img");
    posterElement.setAttribute("src", data.Poster);

    let p1 = document.createElement("p");
    p1.innerText = `${data.Title} (${data.Year})`;

    let p2 = document.createElement("p");
    p2.innerText = data.Country;

    primaryDetails.append(posterElement, p1, p2);

    let secondaryDetails = document.getElementById("secondary-details");

    let p3 = document.createElement("p");
    p3.innerText = data.Plot;

    let p4 = document.createElement("p");
    p4.innerText = `Runtime: ${data.Runtime}`;

    let p5 = document.createElement("p");
    p5.innerText = `Actors: ${data.Actors}`;

    let p6 = document.createElement("p");
    p6.innerText = `Director: ${data.Director}`;

    let p7 = document.createElement("p");
    p7.innerText = `Release Date: ${data.Released}`;

    secondaryDetails.append(p3, p4, p5, p6, p7);

    let ratings = document.createElement("div");
    ratings.setAttribute("id", "ratings");

    let subRating1 = document.createElement("div");
    subRating1.setAttribute("class", "sub-ratings");

    let logo1 = document.createElement("img");
    logo1.setAttribute("src", "https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg");

    let p8 = document.createElement("p");
    data.Ratings.forEach(rating => {
        if (rating.Source === "Internet Movie Database") {
            p8.innerText = `${rating.Value} (${data.imdbVotes} Votes)`;
        }
    });
    subRating1.append(logo1, p8);

    let subRating2 = document.createElement("div");
    subRating2.setAttribute("class", "sub-ratings");

    let logo2 = document.createElement("img");

    let p9 = document.createElement("p");
    data.Ratings.forEach(rating => {
        if (rating.Source === "Rotten Tomatoes") {
            p9.innerText = rating.Value;
            ratingValue = p9.innerText.slice(0, -1);
            if (parseInt(ratingValue) >= 75 && parseInt(ratingValue) <= 100)
                logo2.setAttribute("src", "https://upload.wikimedia.org/wikipedia/en/b/b2/Certified_Fresh_2018.svg");
            else if (parseInt(ratingValue) >= 60 && parseInt(ratingValue) < 75) logo2.setAttribute("src", "https://upload.wikimedia.org/wikipedia/commons/5/5b/Rotten_Tomatoes.svg");
            else if (parseInt(ratingValue) >= 0 && parseInt(ratingValue) < 60)
                logo2.setAttribute("src", "https://upload.wikimedia.org/wikipedia/commons/5/52/Rotten_Tomatoes_rotten.svg");
        }
    });
    subRating2.append(logo2, p9);

    ratings.append(subRating1, subRating2);
    secondaryDetails.append(ratings);

    container.style.visibility = "visible";
}

getDetailedData();