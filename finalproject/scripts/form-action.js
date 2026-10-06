import {
    setupPage
} from "./modules/common.js";


setupPage();


const params =
    new URLSearchParams(
        window.location.search
    );


const values = {
    name: params.get("name"),
    email: params.get("email"),
    genre: params.get("genre"),
    platform: params.get("platform")
};


document.querySelector(
    "#result-name"
).textContent =
    values.name || "Not provided";


document.querySelector(
    "#result-email"
).textContent =
    values.email || "Not provided";


document.querySelector(
    "#result-genre"
).textContent =
    values.genre || "Not provided";


document.querySelector(
    "#result-platform"
).textContent =
    values.platform || "Not provided";