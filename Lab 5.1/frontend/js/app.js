document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("current-year").textContent = new Date().getFullYear();
  loadDirectory();
  document.getElementById("employee-form").addEventListener("submit", submitEmployee);
});

async function submitEmployee(event) {
  event.preventDefault();
  const form = event.target;
  const message = document.getElementById("employee-form-message");
  const data = Object.fromEntries(new FormData(form).entries());
  try {
    await window.employeeRepository.create(data);
    message.textContent = "Employee added.";
    form.reset();
    loadDirectory();
  } catch (err) {
    message.textContent = err.message;
  }
}

function fillFormOptions(employees, roles) {
  const deptSelect = document.getElementById("department-select");
  const roleSelect = document.getElementById("role-select");
  deptSelect.innerHTML = "";
  roleSelect.innerHTML = "";
  const departments = [...new Set(employees.map((e) => e.department))];
  departments.forEach((name) => {
    const option = document.createElement("option");
    option.textContent = name;
    deptSelect.appendChild(option);
  });
  roles.forEach((role) => {
    const option = document.createElement("option");
    option.value = role.id;
    option.textContent = role.title;
    roleSelect.appendChild(option);
  });
}

async function loadDirectory() {
  const main = document.getElementById("main-content");
  const loading = document.getElementById("loading-message");
  const errorEl = document.getElementById("error-message");

  try {
    const [employees, roles] = await Promise.all([
      window.employeeRepository.getAll(),
      window.roleRepository.getAll(),
    ]);
    const roleById = new Map(roles.map((role) => [role.id, role]));
    fillFormOptions(employees, roles);
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
