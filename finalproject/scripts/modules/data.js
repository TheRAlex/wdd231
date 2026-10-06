export async function fetchGames() {
    try {
        const response =
            await fetch("data/games.json");

        if (!response.ok) {
            throw new Error(
                `HTTP error: ${response.status}`
            );
        }

        const data =
            await response.json();

        if (!Array.isArray(data)) {
            throw new Error(
                "Game data is not an array."
            );
        }

        return data;

    } catch (error) {
        console.error(
            "Unable to load game data.",
            error
        );

        throw error;
    }
}