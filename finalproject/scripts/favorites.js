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


const favoritesContainer =
    document.querySelector(
        "#favorite-games"
    );

const favoritesStatus =
    document.querySelector(
        "#favorites-status"
    );

const dialog =
    document.querySelector(
        "#game-dialog"
    );

const closeDialog =
    document.querySelector(
        "#close-dialog"
    );


let allGames = [];


async function loadFavorites() {

    try {

        allGames =
            await fetchGames();

        displayFavorites();

    } catch (error) {

        favoritesStatus.textContent =
            "Favorites could not be loaded.";
    }
}


function displayFavorites() {

    favoritesContainer.innerHTML = "";


    const favoriteIds =
        getFavorites();


    const favoriteGames =
        allGames.filter(
            game =>
                favoriteIds.includes(
                    game.id
                )
        );


    if (favoriteGames.length === 0) {

        favoritesStatus.innerHTML = `
            You have not saved any games yet.
            <a href="games.html">
                Explore the game catalog.
            </a>
        `;

        return;
    }


    favoritesStatus.textContent =
        `${favoriteGames.length} saved games`;


    favoriteGames.forEach(
        (game, index) => {

            const card =
                createGameCard(
                    game,
                    index,
                    favoriteIds,
                    "favorites"
                );

            favoritesContainer.appendChild(card);
        }
    );
}


favoritesContainer.addEventListener(
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
            allGames.find(
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
            "remove-favorite"
        ) {

            toggleFavorite(id);

            displayFavorites();
        }
    }
);


function showGameDetails(game) {

    document.querySelector(
        "#dialog-title"
    ).textContent =
        game.title;

    document.querySelector(
        "#dialog-description"
    ).textContent =
        game.description;

    document.querySelector(
        "#dialog-genre"
    ).textContent =
        game.genre;

    document.querySelector(
        "#dialog-platform"
    ).textContent =
        game.platform;

    document.querySelector(
        "#dialog-rating"
    ).textContent =
        `${game.rating} / 5`;

    document.querySelector(
        "#dialog-year"
    ).textContent =
        game.releaseYear;

    dialog.showModal();
}


closeDialog.addEventListener(
    "click",
    () => {
        dialog.close();
    }
);


loadFavorites();