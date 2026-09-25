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


/* Timestamp */

const timestamp = document.querySelector("#timestamp");

timestamp.value = new Date().toISOString();


/* Membership Modals */

const membershipLinks =
    document.querySelectorAll(".membership-link");

membershipLinks.forEach(link => {

    link.addEventListener("click", event => {

        event.preventDefault();

        const dialogId = link.dataset.dialog;

        const dialog =
            document.querySelector(`#${dialogId}`);

        dialog.showModal();
    });

});


const closeButtons =
    document.querySelectorAll(".close-modal");

closeButtons.forEach(button => {

    button.addEventListener("click", () => {

        const dialog =
            button.closest("dialog");

        dialog.close();
    });

});