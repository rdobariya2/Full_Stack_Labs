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

    async create(input) {
      const token = await window.pixellAuth.getToken();
      const response = await fetch(`${baseUrl()}/employees`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(input),
      });
      return handleResponse(response);
    },
  };
})();
