    document.getElementById("currentyear").innerHTML = new Date().getFullYear();
    document.getElementById("lastModified").innerHTML = "Last Modified: " + document.lastModified;

    const businesses = [
    {
        name: "Business Name",
        tag: "Business Tag line",
        email: "info@gmail.com",
        phone: +56970706060,
        url: "mybusiness.com",
        image: ""
    },
    {
        name: "Business Name",
        tag: "Business Tag line",
        email: "info@gmail.com",
        phone: +56970706060,
        url: "mybusiness.com",
        image: ""
    },
   {
        name: "Business Name",
        tag: "Business Tag line",
        email: "info@gmail.com",
        phone: +56970706060,
        url: "mybusiness.com",
        image: ""
    },
    {
        name: "Business Name",
        tag: "Business Tag line",
        email: "info@gmail.com",
        phone: +56970706060,
        url: "mybusiness.com",
        image: ""
    },
    {
        name: "Business Name",
        tag: "Business Tag line",
        email: "info@gmail.com",
        phone: +56970706060,
        url: "mybusiness.com",
        image: ""
    },
    {
        name: "Business Name",
        tag: "Business Tag line",
        email: "info@gmail.com",
        phone: +56970706060,
        url: "mybusiness.com",
        image: ""
    }
    ];


function createBusinessCards(list) {
    const container = document.querySelector(".res-grid");
    container.innerHTML = "";
 
    list.forEach(business => {
        const card = document.createElement("section");
        card.className = "business-card";
 
        const header = document.createElement("div");
        header.className = "card-header";
 
        const name = document.createElement("h3");
        name.textContent = business.name;
 
        const tag = document.createElement("p");
        tag.textContent = business.tag;
 
        header.append(name, tag);
 
        const body = document.createElement("div");
        body.className = "card-body";
 
        const img = document.createElement("img");
        img.setAttribute("src", business.image);
        img.setAttribute("alt", `${business.name} logo`);
        img.setAttribute("loading", "lazy");
 
        const info = document.createElement("div");
        info.className = "card-info";
        info.innerHTML = `
            <p><span class="label">Email:</span> ${business.email}</p>
            <p><span class="label">Phone:</span> ${business.phone}</p>
            <p><span class="label">URL:</span> ${business.url}</p>
        `;
 
        body.append(img, info);
        card.append(header, body);
        container.appendChild(card);
    });
}
 
createBusinessCards(businesses);

const gridBtn = document.getElementById("grid-btn");
const listBtn = document.getElementById("list-btn");
const directory = document.querySelector(".res-grid");

gridBtn.addEventListener("click", () => {
    directory.classList.remove("list-view");
    gridBtn.classList.add("active");
    listBtn.classList.remove("active");
});

listBtn.addEventListener("click", () => {
    directory.classList.add("list-view");
    listBtn.classList.add("active");
    gridBtn.classList.remove("active");
});

const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
	navigation.classList.toggle('open');
	hamButton.classList.toggle('open');
});