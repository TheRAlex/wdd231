import { places } from "../data/places.mjs";


const discoverGrid =
    document.querySelector("#discover-grid");

const visitMessage =
    document.querySelector("#visit-message");

const menuButton =
    document.querySelector("#menuButton");

const navigation =
    document.querySelector("#navigation");


/* MOBILE MENU */

menuButton.addEventListener("click", () => {

    navigation.classList.toggle("open");

    if (navigation.classList.contains("open")) {
        menuButton.textContent = "✕ Close";
    } else {
        menuButton.textContent = "☰ Menu";
    }

});


/* FOOTER */

document.querySelector("#currentYear").textContent =
    new Date().getFullYear();

document.querySelector("#lastModified").textContent =
    document.lastModified;


/* DISCOVER CARDS */

function displayPlaces() {

    places.forEach((place, index) => {

        const card =
            document.createElement("article");

        card.classList.add(
            "discover-card",
            `card-${index + 1}`
        );


        const title =
            document.createElement("h2");

        title.textContent = place.name;


        const figure =
            document.createElement("figure");


        const image =
            document.createElement("img");

        image.src =
            `images/${place.image}`;

        image.alt =
            `${place.name} in Santiago`;

        image.width = 300;
        image.height = 200;


        if (index > 1) {
            image.loading = "lazy";
        }


        figure.appendChild(image);


        const address =
            document.createElement("address");

        address.textContent =
            place.address;


        const description =
            document.createElement("p");

        description.textContent =
            place.description;


        const button =
            document.createElement("button");

        button.type = "button";
        button.textContent = "Learn More";


        card.append(
            title,
            figure,
            address,
            description,
            button
        );


        discoverGrid.appendChild(card);

    });

}


displayPlaces();


/* LAST VISIT */

const currentVisit =
    Date.now();

const lastVisit =
    localStorage.getItem("lastVisit");

const millisecondsPerDay =
    1000 * 60 * 60 * 24;


if (!lastVisit) {

    visitMessage.textContent =
        "Welcome! Let us know if you have any questions.";

} else {

    const timeDifference =
        currentVisit - Number(lastVisit);

    const daysDifference =
        Math.floor(
            timeDifference / millisecondsPerDay
        );


    if (daysDifference < 1) {

        visitMessage.textContent =
            "Back so soon! Awesome!";

    } else if (daysDifference === 1) {

        visitMessage.textContent =
            "You last visited 1 day ago.";

    } else {

        visitMessage.textContent =
            `You last visited ${daysDifference} days ago.`;

    }

}


localStorage.setItem(
    "lastVisit",
    currentVisit
);