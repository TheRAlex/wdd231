const menuButton = document.querySelector("#menuButton");
const navigation = document.querySelector("#navigation");

const currentWeather = document.querySelector("#current-weather");
const forecastContainer = document.querySelector("#forecast");
const spotlightsContainer = document.querySelector("#spotlights");


menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");

    if (navigation.classList.contains("open")) {
        menuButton.textContent = "✕ Close";
    } else {
        menuButton.textContent = "☰ Menu";
    }
});


document.querySelector("#currentYear").textContent =
    new Date().getFullYear();

document.querySelector("#lastModified").textContent =
    document.lastModified;



const apiKey = "07b8b98e129d313da2051c31519ded04";

const latitude = -33.4489;
const longitude = -70.6693;

const weatherURL =
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

const forecastURL =
    `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;


async function getWeather() {
    try {
        const weatherResponse = await fetch(weatherURL);
        const forecastResponse = await fetch(forecastURL);

        if (!weatherResponse.ok || !forecastResponse.ok) {
            throw new Error("Weather data could not be loaded.");
        }

        const weatherData = await weatherResponse.json();
        const forecastData = await forecastResponse.json();

        displayCurrentWeather(weatherData);
        displayForecast(forecastData);

    } catch (error) {
        currentWeather.innerHTML =
            "<p>Weather information is currently unavailable.</p>";

        forecastContainer.innerHTML =
            "<p>Forecast information is currently unavailable.</p>";

        console.error(error);
    }
}


function displayCurrentWeather(data) {
    const temperature = Math.round(data.main.temp);

    const description =
        data.weather[0].description;

    currentWeather.innerHTML = `
        <p class="current-temp">${temperature}°C</p>
        <p>${capitalize(description)}</p>
    `;
}


function displayForecast(data) {
    forecastContainer.innerHTML = "";

    const dailyForecast = data.list
        .filter(item => item.dt_txt.includes("12:00:00"))
        .slice(0, 3);

    dailyForecast.forEach(day => {
        const forecastDay = document.createElement("div");
        forecastDay.classList.add("forecast-day");

        const date = new Date(day.dt * 1000);

        const dayName = date.toLocaleDateString("en-US", {
            weekday: "long"
        });

        const temperature = Math.round(day.main.temp);

        forecastDay.innerHTML = `
            <p><strong>${dayName}</strong></p>
            <p>${temperature}°C</p>
        `;

        forecastContainer.appendChild(forecastDay);
    });
}


function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}



const membersURL = "data/members.json";


async function getSpotlights() {
    try {
        const response = await fetch(membersURL);

        if (!response.ok) {
            throw new Error("Member data could not be loaded.");
        }

        const data = await response.json();

        const qualifiedMembers = data.members.filter(member =>
            member.membership === 2 ||
            member.membership === 3
        );

        const randomMembers = qualifiedMembers
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);

        displaySpotlights(randomMembers);

    } catch (error) {
        spotlightsContainer.innerHTML =
            "<p>Business spotlights are currently unavailable.</p>";

        console.error(error);
    }
}


function displaySpotlights(members) {
    spotlightsContainer.innerHTML = "";

    members.forEach(member => {
        const card = document.createElement("article");

        card.classList.add("spotlight-card");

        const membership =
            member.membership === 3 ? "Gold" : "Silver";

        card.innerHTML = `
            <img
                src="images/${member.image}"
                alt="${member.name} logo"
                width="400"
                height="300"
                loading="lazy">

            <h3>${member.name}</h3>

            <p>${member.address}</p>

            <p>${member.phone}</p>

            <p>
                <strong>Membership:</strong>
                ${membership}
            </p>

            <a href="${member.website}"
                target="_blank"
                rel="noopener">
                Visit Website
            </a>
        `;

        spotlightsContainer.appendChild(card);
    });
}


getWeather();
getSpotlights();