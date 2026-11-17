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

  window.roleRepository = {
    async getAll() {
      const response = await fetch(`${baseUrl()}/roles`);
      return handleResponse(response);
    },

    async getById(id) {
      const response = await fetch(`${baseUrl()}/roles/${encodeURIComponent(id)}`);
      return handleResponse(response);
    },

    async create(input) {
      const token = await window.pixellAuth.getToken();
      const response = await fetch(`${baseUrl()}/roles`, {
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
