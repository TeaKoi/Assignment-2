const artIds = ["200498163", "200105887", "200463545", "200678251", "200545165"]
// japan, netherlands, france, italy, germany
const urlPrefix = "https://id.rijksmuseum.nl/"
const urlSuffix = "?_profile=la-framed"

async function getLinkedArt(url) {
    const response = await fetch(url)
    const data = await response.json();

    return data;
}

function makeImage(imageUrl, title, artist) {
    const newCard = document.createElement("div");
    newCard.classList.add("card");

    const newImage = document.createElement("img");
    const newTitle = document.createElement("h2");
    const newArtist = document.createElement("p");

    newTitle.textContent = title;
    newArtist.textContent = artist;
    newImage.src = imageUrl;
    newImage.alt = title;

    document.querySelector("art").appendChild(newCard);
    newCard.appendChild(newImage);
    newCard.appendChild(newTitle);
    newCard.appendChild(newArtist);
}

async function processRijksData(id) {
    const rijksUrl = urlPrefix + id + urlSuffix;
    console.log("Rijks URL:", rijksUrl);

    // call fetch function with endpoint
    const data = await getLinkedArt(rijksUrl);
    console.log("Rijks data:", data);

    // get data from JSON object
    const imageUrl = data.subject_of[0].digitally_carried_by[0].access_point[0].id;
    const title = data.identified_by[1].content;
    const artist = data.produced_by.part[0].referred_to_by[1].content;

    // create card with image, title, and artist
    makeImage(imageUrl, title, artist);
}

async function processIds() {
    for (const id of artIds) {
        await processRijksData(id);
}
}

processIds();