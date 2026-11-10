/**
 * Lab 4.1 — RoleRepository (front-end).
 * The ONLY place the front-end talks to the back-end about roles.
 * There was no Role data in the front-end before Lab 4.1 — roles
 * come from Appendix B of the case study, via the back-end.
 *
 * API: GET /api/roles
 *      GET /api/roles/:id
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

  window.roleRepository = {
    async getAll() {
      const response = await fetch(`${baseUrl()}/roles`);
      return handleResponse(response);
    },

    async getById(id) {
      const response = await fetch(`${baseUrl()}/roles/${encodeURIComponent(id)}`);
      return handleResponse(response);
    },
  };
})();
