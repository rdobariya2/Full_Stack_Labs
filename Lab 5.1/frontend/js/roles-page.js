document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("current-year").textContent = new Date().getFullYear();
  loadRoles();
  document.getElementById("role-form").addEventListener("submit", submitRole);
});

async function loadRoles() {
  const main = document.getElementById("main-content");
  const loading = document.getElementById("loading-message");
  const errorEl = document.getElementById("error-message");

  try {
    const roles = await window.roleRepository.getAll();
    loading.hidden = true;
    main.querySelectorAll(".role-section").forEach((el) => el.remove());
    const section = document.createElement("section");
    section.className = "role-section";
    const ul = document.createElement("ul");
    ul.className = "role-list";
    roles.forEach((role) => {
      const li = document.createElement("li");
      const title = document.createElement("span");
      title.className = "role-title";
      title.textContent = role.title;
      li.appendChild(title);
      const desc = document.createElement("span");
      desc.className = "role-description";
      desc.textContent = `${role.description} (${role.category})`;
      li.appendChild(desc);
      ul.appendChild(li);
    });
    section.appendChild(ul);
    main.appendChild(section);
  } catch (err) {
    console.error(err);
    loading.hidden = true;
    errorEl.hidden = false;
    errorEl.textContent =
      "Could not load roles. " +
      "Make sure the back-end is running (in backend: npm run dev) and try again. " +
      `(${err.message})`;
  }
}

async function submitRole(event) {
  event.preventDefault();
  const form = event.target;
  const message = document.getElementById("role-form-message");
  const data = Object.fromEntries(new FormData(form).entries());
  try {
    await window.roleRepository.create(data);
    message.textContent = "Role added.";
    form.reset();
    loadRoles();
  } catch (err) {
    message.textContent = err.message;
  }
}
