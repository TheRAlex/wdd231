const menuButton = document.querySelector("#menuButton");
const navigation = document.querySelector("#navigation");


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


/* Form Information */

const parameters =
    new URLSearchParams(window.location.search);


const firstName =
    parameters.get("firstName");

const lastName =
    parameters.get("lastName");

const email =
    parameters.get("email");

const phone =
    parameters.get("phone");

const organization =
    parameters.get("organization");

const timestamp =
    parameters.get("timestamp");


document.querySelector("#displayFirstName").textContent =
    firstName;

document.querySelector("#displayLastName").textContent =
    lastName;

document.querySelector("#displayEmail").textContent =
    email;

document.querySelector("#displayPhone").textContent =
    phone;

document.querySelector("#displayOrganization").textContent =
    organization;


if (timestamp) {

    const applicationDate =
        new Date(timestamp);

    document.querySelector("#displayTimestamp").textContent =
        applicationDate.toLocaleString();

}