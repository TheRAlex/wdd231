import {
    setupPage,
    getFavorites,
    toggleFavorite
} from "./modules/common.js";

import {
    fetchGames
} from "./modules/data.js";

import {
    createGameCard
} from "./modules/game-card.js";


setupPage();


const featuredContainer =
    document.querySelector("#featured-games");

const featuredStatus =
    document.querySelector("#featured-status");


const dialog =
    document.querySelector("#game-dialog");

const closeDialog =
    document.querySelector("#close-dialog");


let featuredGames = [];


async function loadFeaturedGames() {
    try {
        const games =
            await fetchGames();

        featuredGames =
            [...games]
                .sort(
                    (a, b) =>
                        b.rating - a.rating
                )
                .slice(0, 3);

        displayFeaturedGames();

        featuredStatus.textContent = "";

    } catch (error) {

        featuredStatus.textContent =
            "Featured games could not be loaded.";
    }
}


function displayFeaturedGames() {

    featuredContainer.innerHTML = "";

    const favorites =
        getFavorites();


    featuredGames.forEach(
        (game, index) => {

            const card =
                createGameCard(
                    game,
                    index,
                    favorites
                );

            featuredContainer.appendChild(card);
        }
    );
}


featuredContainer.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                "button[data-action]"
            );

        if (!button) {
            return;
        }

        const id =
            Number(button.dataset.id);

        const game =
            featuredGames.find(
                item => item.id === id
            );

        if (!game) {
            return;
        }

        if (
            button.dataset.action ===
            "details"
        ) {
            showGameDetails(game);
        }

        if (
            button.dataset.action ===
            "favorite"
        ) {
            toggleFavorite(id);
            displayFeaturedGames();
        }
    }
);


function showGameDetails(game) {

    document.querySelector(
        "#dialog-title"
    ).textContent = game.title;

    document.querySelector(
        "#dialog-description"
    ).textContent = game.description;

    document.querySelector(
        "#dialog-genre"
    ).textContent = game.genre;

    document.querySelector(
        "#dialog-platform"
    ).textContent = game.platform;

    document.querySelector(
        "#dialog-rating"
    ).textContent = `${game.rating} / 5`;

    document.querySelector(
        "#dialog-year"
    ).textContent = game.releaseYear;

    dialog.showModal();
}


closeDialog.addEventListener(
    "click",
    () => {
        dialog.close();
    }
);


loadFeaturedGames();