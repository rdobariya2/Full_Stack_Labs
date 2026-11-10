/**
 * Lab 4.1 — EmployeeRepository (front-end).
 * The ONLY place the front-end talks to the back-end about
 * employees. Previously script.js fetched the local file
 * employees_dept.json; that file is no longer used.
 *
 * API: GET /api/employees[?department=][?roleId=]
 *      GET /api/employees/:id
 * Responses are { data, count } for lists and { data } for one item.
 */
(function () {
  const baseUrl = () => window.PIXELL_API_BASE_URL;

  async function handleResponse(response) {
    const body = await response.json().catch(() => ({}));
    if (!response.ok) {
      const message = body?.error?.message || `Request failed (${response.status}).`;
      throw new Error(message);
    }
    return body.data;
  }

  window.employeeRepository = {
    async getAll(filters = {}) {
      const params = new URLSearchParams();
      if (filters.department) params.set("department", filters.department);
      if (filters.roleId) params.set("roleId", filters.roleId);
      const query = params.toString();
      const response = await fetch(`${baseUrl()}/employees${query ? `?${query}` : ""}`);
      return handleResponse(response);
    },

    async getById(id) {
      const response = await fetch(`${baseUrl()}/employees/${encodeURIComponent(id)}`);
      return handleResponse(response);
    },
  };
})();
