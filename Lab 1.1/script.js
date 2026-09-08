document.addEventListener("DOMContentLoaded", () => {
    fetch("employees_dept.json")
        .then(response => response.json())
        .then(renderDirectory);
});


function renderDirectory(data) {
    const mainContainer = document.getElementById("main-content");
    mainContainer.innerHTML = ""; 

    data.forEach(dept => {
        const section = document.createElement("section");
        section.className = "department-section";

        const title = document.createElement("h2");
        title.className = "department-title";
        title.textContent = dept.name;
        section.appendChild(title);

        const ul = document.createElement("ul");
        ul.className = "employee-list";

        dept.employees.forEach(emp => {
            const li = document.createElement("li");
            const fullName = emp.lastName ? `${emp.firstName} ${emp.lastName}` : emp.firstName;
            li.textContent = fullName;
            ul.appendChild(li);
        });

        section.appendChild(ul);
        mainContainer.appendChild(section);
    });
}