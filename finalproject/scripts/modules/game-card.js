export function createGameCard(
    game,
    index,
    favoriteIds,
    mode = "catalog"
) {

    const card =
        document.createElement("article");

    card.classList.add("game-card");


    const isFavorite =
        favoriteIds.includes(game.id);


    const favoriteLabel =
        mode === "favorites"
            ? "Remove Favorite"
            : isFavorite
                ? "Remove Favorite"
                : "Add to Favorites";


    const favoriteAction =
        mode === "favorites"
            ? "remove-favorite"
            : "favorite";


    const loading =
        index < 2 ? "eager" : "lazy";


    card.innerHTML = `
        <img
            src="images/${game.image}"
            alt="${game.title} game artwork"
            width="300"
            height="200"
            loading="${loading}"
            decoding="async">

        <div class="game-card-content">

            <h2>${game.title}</h2>

            <p>
                <strong>Genre:</strong>
                ${game.genre}
            </p>

            <p>
                <strong>Platform:</strong>
                ${game.platform}
            </p>

            <p>
                <strong>Rating:</strong>
                ${game.rating} / 5
            </p>

            <p>
                <strong>Release:</strong>
                ${game.releaseYear}
            </p>

            <div class="card-actions">

                <button
                    type="button"
                    class="action-button"
                    data-action="details"
                    data-id="${game.id}">
                    Details
                </button>

                <button
                    type="button"
                    class="action-button secondary-button"
                    data-action="${favoriteAction}"
                    data-id="${game.id}">
                    ${favoriteLabel}
                </button>

            </div>

        </div>
    `;

    return card;
}