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


const gamesContainer =
    document.querySelector("#games");

const gamesStatus =
    document.querySelector("#games-status");

const gameCount =
    document.querySelector("#game-count");

const searchInput =
    document.querySelector("#search-input");

const genreFilter =
    document.querySelector("#genre-filter");

const platformFilter =
    document.querySelector("#platform-filter");


const dialog =
    document.querySelector("#game-dialog");

const closeDialog =
    document.querySelector("#close-dialog");


let allGames = [];


async function loadGames() {

    try {

        allGames =
            await fetchGames();

        createFilterOptions();

        applyFilters();

        gamesStatus.textContent = "";

    } catch (error) {

        gamesStatus.textContent =
            "Game information is currently unavailable.";
    }
}


function createFilterOptions() {

    const genres =
        [...new Set(
            allGames.map(
                game => game.genre
            )
        )].sort();


    const platforms =
        [...new Set(
            allGames.map(
                game => game.platform
            )
        )].sort();


    genres.forEach(genre => {

        const option =
            document.createElement("option");

        option.value = genre;
        option.textContent = genre;

        genreFilter.appendChild(option);
    });


    platforms.forEach(platform => {

        const option =
            document.createElement("option");

        option.value = platform;
        option.textContent = platform;

        platformFilter.appendChild(option);
    });
}


function applyFilters() {

    const searchTerm =
        searchInput.value
            .trim()
            .toLowerCase();

    const selectedGenre =
        genreFilter.value;

    const selectedPlatform =
        platformFilter.value;


    const filteredGames =
        allGames.filter(game => {

            const matchesSearch =
                game.title
                    .toLowerCase()
                    .includes(searchTerm);

            const matchesGenre =
                selectedGenre === "all" ||
                game.genre === selectedGenre;

            const matchesPlatform =
                selectedPlatform === "all" ||
                game.platform ===
                    selectedPlatform;


            return (
                matchesSearch &&
                matchesGenre &&
                matchesPlatform
            );
        });


    displayGames(filteredGames);
}


function displayGames(games) {

    gamesContainer.innerHTML = "";

    gameCount.textContent =
        `${games.length} games found`;


    if (games.length === 0) {

        gamesContainer.innerHTML = `
            <p class="empty-state">
                No games match your current filters.
            </p>
        `;

        return;
    }


    const favorites =
        getFavorites();


    games.forEach((game, index) => {

        const card =
            createGameCard(
                game,
                index,
                favorites
            );

        gamesContainer.appendChild(card);
    });
}


gamesContainer.addEventListener(
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
            "favorite"
        ) {
            toggleFavorite(id);

            applyFilters();
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


searchInput.addEventListener(
    "input",
    applyFilters
);

genreFilter.addEventListener(
    "change",
    applyFilters
);

platformFilter.addEventListener(
    "change",
    applyFilters
);


loadGames();