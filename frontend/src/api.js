const API_URL = "http://localhost:5001/api";

const getAuthToken = () => localStorage.getItem("token") || sessionStorage.getItem("token");

export const api = {
  async request(path, options = {}) {
    const token = getAuthToken();
    const headers = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    };

    let res;
    try {
      res = await fetch(`${API_URL}${path}`, {
        ...options,
        headers,
      });
    } catch (error) {
      throw new Error("Cannot connect to server. Please make sure the backend is running.");
    }

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  },

  signup(body) {
    return this.request("/auth/signup", { method: "POST", body: JSON.stringify(body) });
  },
  login(body) {
    return this.request("/auth/login", { method: "POST", body: JSON.stringify(body) });
  },
  getMe() {
    return this.request("/auth/me");
  },
  logout() {
    return this.request("/auth/logout", { method: "POST" });
  },
  getAdminStats() {
    return this.request("/admin/stats");
  },
  getAdminUsers() {
    return this.request("/admin/users");
  },
  deleteAdminUser(id) {
    return this.request(`/admin/users/${id}`, { method: "DELETE" });
  },
  updateAdminProfile(body) {
    return this.request("/admin/profile", { method: "PUT", body: JSON.stringify(body) });
  },
  createAppointment(body) { return this.request("/appointments", { method: "POST", body: JSON.stringify(body) }); },
  getMyAppointments() { return this.request("/appointments/me"); },
  getMyAppointmentStats() { return this.request("/appointments/me/stats"); },
  updateAppointmentStatus(id, body) { return this.request(`/admin/appointments/${id}`, { method: "PUT", body: JSON.stringify(body) }); },
  getAdminAppointments() { return this.request("/admin/appointments"); },
  createContactMessage(body) { return this.request("/contact-messages", { method: "POST", body: JSON.stringify(body) }); },
  subscribeToNewsletter(body) { return this.request("/subscribers", { method: "POST", body: JSON.stringify(body) }); },
  getAdminSubscribers() { return this.request("/admin/subscribers"); },
  deleteAdminSubscriber(id) { return this.request(`/admin/subscribers/${id}`, { method: "DELETE" }); },
  createComment(body) { return this.request("/comments", { method: "POST", body: JSON.stringify(body) }); },
  getApprovedComments() { return this.request("/comments/approved"); },
  getAdminContacts() { return this.request("/admin/contact-messages"); },
  getAdminComments() { return this.request("/admin/comments"); },
  updateCommentStatus(id, status) { return this.request(`/admin/comments/${id}`, { method: "PUT", body: JSON.stringify({ status }) }); },
  deleteAdminComment(id) { return this.request(`/admin/comments/${id}`, { method: "DELETE" }); },
  getHomeContent() {
    return this.request("/home-content");
  },
  updateHomeContent(body) {
    return this.request("/admin/home-content", { method: "PUT", body: JSON.stringify(body) });
  },
  uploadImage(formData) {
    const token = getAuthToken();
    return fetch(`${API_URL}/admin/home-content/upload`, {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    }).then(async (res) => {
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || "Upload failed");
      return data;
    });
  },

  // Generic CMS helpers
  cmsPublic(resource) {
    return {
      getAll: (query = "") => this.request(`/${resource}${query ? `?${query}` : ""}`),
      getBySlug: (slug) => this.request(`/${resource}/slug/${slug}`),
    };
  },
  cmsAdmin(resource) {
    return {
      getAll: () => this.request(`/admin/${resource}`),
      getById: (id) => this.request(`/admin/${resource}/${id}`),
      create: (body) => this.request(`/admin/${resource}`, { method: "POST", body: JSON.stringify(body) }),
      update: (id, body) => this.request(`/admin/${resource}/${id}`, { method: "PUT", body: JSON.stringify(body) }),
      remove: (id) => this.request(`/admin/${resource}/${id}`, { method: "DELETE" }),
    };
  },
};
