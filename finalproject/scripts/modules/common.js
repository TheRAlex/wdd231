export function setupPage() {
    const menuButton =
        document.querySelector("#menu-button");

    const navigation =
        document.querySelector("#navigation");

    if (menuButton && navigation) {
        menuButton.addEventListener("click", () => {
            const isOpen =
                navigation.classList.toggle("open");

            menuButton.textContent =
                isOpen ? "✕ Close" : "☰ Menu";
        });
    }

    const year =
        document.querySelector("#current-year");

    if (year) {
        year.textContent =
            new Date().getFullYear();
    }

    const lastModified =
        document.querySelector("#last-modified");

    if (lastModified) {
        lastModified.textContent =
            document.lastModified;
    }
}


export function getFavorites() {
    try {
        const storedFavorites =
            localStorage.getItem("gamingHubFavorites");

        return storedFavorites
            ? JSON.parse(storedFavorites)
            : [];
    } catch (error) {
        console.error(
            "Could not read favorites.",
            error
        );

        return [];
    }
}


export function saveFavorites(favorites) {
    localStorage.setItem(
        "gamingHubFavorites",
        JSON.stringify(favorites)
    );
}


export function toggleFavorite(id) {
    const favorites = getFavorites();

    const exists =
        favorites.includes(id);

    const updatedFavorites =
        exists
            ? favorites.filter(
                favoriteId => favoriteId !== id
            )
            : [...favorites, id];

    saveFavorites(updatedFavorites);

    return !exists;
}