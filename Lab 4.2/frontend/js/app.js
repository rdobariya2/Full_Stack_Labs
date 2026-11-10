/**
 * Lab 4.1 — front-end app.
 * Replaces the old script.js, which fetched the local
 * employees_dept.json file. It now asks the two repositories for
 * data from the back-end, then renders exactly the same directory
 * as before — grouped by department — with each person's role
 * title shown underneath their name.
 */
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("current-year").textContent = new Date().getFullYear();
  loadDirectory();
});

async function loadDirectory() {
  const main = document.getElementById("main-content");
  const loading = document.getElementById("loading-message");
  const errorEl = document.getElementById("error-message");

  try {
    // Both repositories fetch from the back-end in parallel.
    const [employees, roles] = await Promise.all([
      window.employeeRepository.getAll(),
      window.roleRepository.getAll(),
    ]);
    const roleById = new Map(roles.map((role) => [role.id, role]));
    renderDirectory(main, employees, roleById);
  } catch (err) {
    console.error(err);
    loading.hidden = true;
    errorEl.hidden = false;
    errorEl.textContent =
      "Could not load the employee directory. " +
      "Make sure the back-end is running (in backend: npm run dev) and try again. " +
      `(${err.message})`;
  }
}

function renderDirectory(main, employees, roleById) {
  document.getElementById("loading-message").hidden = true;
  main.querySelectorAll(".department-section").forEach((el) => el.remove());

  // Group by department, keeping the order departments first appear in.
  const byDepartment = new Map();
  employees.forEach((emp) => {
    if (!byDepartment.has(emp.department)) byDepartment.set(emp.department, []);
    byDepartment.get(emp.department).push(emp);
  });

  byDepartment.forEach((deptEmployees, departmentName) => {
    const section = document.createElement("section");
    section.className = "department-section";

    const title = document.createElement("h2");
    title.className = "department-title";
    title.textContent = departmentName;
    section.appendChild(title);

    const ul = document.createElement("ul");
    ul.className = "employee-list";

    deptEmployees.forEach((emp) => {
      const li = document.createElement("li");

      const name = document.createElement("span");
      name.className = "employee-name";
      name.textContent = emp.fullName || `${emp.firstName} ${emp.lastName}`;
      li.appendChild(name);

      // Role title comes from the back-end (roleTitle on the employee,
      // falling back to the roles list if needed).
      const roleTitle = emp.roleTitle || roleById.get(emp.roleId)?.title;
      if (roleTitle) {
        const role = document.createElement("span");
        role.className = "employee-role";
        role.textContent = roleTitle;
        li.appendChild(role);
      }

      ul.appendChild(li);
    });

    section.appendChild(ul);
    main.appendChild(section);
  });
}
