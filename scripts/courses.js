const courses = [
    {
        subject: "CSE",
        number: 110,
        title: "Introduction to Programing",
        credits: 2,
        completed: true
    },

    {
        subject: "CSE",
        number: 111,
        title: "Programming with Functions",
        credits: 2,
        completed: true
    },

    {
        subject: "WDD",
        number: 130,
        title: "Web Fundamentals",
        credits: 2,
        completed: true
    },

    {
        subject: "WDD",
        number: 131,
        title: "Dynamic Web Fundamentals",
        credits: 2,
        completed: true
    },

    {
        subject: "WDD",
        number: 231,
        title: "Web Frontend Development I",
        credits: 2,
        completed: false
    },

    {
        subject: "CSE",
        number: 210,
        title: "Programming with Classes",
        credits: 2,
        completed: true
    }
];

const courseContainer = document.querySelector("#courseContainer");
const totalCredits = document.querySelector("#totalCredits");

const allButton = document.querySelector("#allButton");
const cseButton = document.querySelector("#cseButton");
const wddButton = document.querySelector("#wddButton");


function displayCourses(courseList) {

    courseContainer.innerHTML = "";

    courseList.forEach((course) => {

        const card = document.createElement("article");

        card.classList.add("course");

        if (course.completed) {
            card.classList.add("completed");
        }

        const title = document.createElement("h3");

        title.textContent =
            `${course.subject} ${course.number}`;

        const name = document.createElement("p");

        name.textContent = course.title;

        const credits = document.createElement("p");

        credits.textContent =
            `${course.credits} credits`;

        card.appendChild(title);
        card.appendChild(name);
        card.appendChild(credits);

        if (course.completed) {

            const completed = document.createElement("span");

            completed.classList.add("completed-label");

            completed.textContent = "✓ Completed";

            card.appendChild(completed);
        }

        courseContainer.appendChild(card);
    });

    totalCredits.textContent = courseList.reduce(
        (total, course) => total + course.credits,
        0
    );
}


function setActiveButton(activeButton) {

    document.querySelectorAll(".filter").forEach((button) => {
        button.classList.remove("active-filter");
    });

    activeButton.classList.add("active-filter");
}


allButton.addEventListener("click", () => {

    displayCourses(courses);

    setActiveButton(allButton);
});


cseButton.addEventListener("click", () => {

    const cseCourses = courses.filter(
        (course) => course.subject === "CSE"
    );

    displayCourses(cseCourses);

    setActiveButton(cseButton);
});


wddButton.addEventListener("click", () => {

    const wddCourses = courses.filter(
        (course) => course.subject === "WDD"
    );

    displayCourses(wddCourses);

    setActiveButton(wddButton);
});


displayCourses(courses);