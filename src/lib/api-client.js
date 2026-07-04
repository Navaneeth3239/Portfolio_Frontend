export const TOKEN_KEY = "portfolio_auth_token";
const BASE_URL = import.meta.env.VITE_API_URL || "";

async function fetchWithAuth(url, options = {}) {
  const token = localStorage.getItem(TOKEN_KEY);

  const headers = new Headers(options.headers || {});
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  if (!(options.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const finalUrl = url.startsWith("http") ? url : `${BASE_URL}${url}`;
  const response = await fetch(finalUrl, {
    ...options,
    headers
  });

  if (!response.ok) {
    let message = "Request failed";
    try {
      const errorData = await response.json();
      message = errorData.message || message;
    } catch {

      // ignore
    }throw new Error(message);
  }

  return response.json();
}

export const api = {
  // Auth
  async login(email, password) {
    const data = await fetchWithAuth("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password })
    });
    if (data.token) {
      localStorage.setItem(TOKEN_KEY, data.token);
    }
    return data;
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY);
  },

  async verifySession() {
    return fetchWithAuth("/api/auth/verify");
  },

  isAuthenticated() {
    return !!localStorage.getItem(TOKEN_KEY);
  },

  // Profile
  async getProfile() {
    return fetchWithAuth("/api/profile");
  },

  async updateProfile(payload) {
    return fetchWithAuth("/api/profile", {
      method: "PUT",
      body: JSON.stringify(payload)
    });
  },

  // Projects
  async getProjects() {
    return fetchWithAuth("/api/projects");
  },

  async createProject(payload) {
    return fetchWithAuth("/api/projects", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  },

  async updateProject(id, payload) {
    return fetchWithAuth("/api/projects/" + id, {
      method: "PUT",
      body: JSON.stringify(payload)
    });
  },

  async deleteProject(id) {
    return fetchWithAuth("/api/projects/" + id, {
      method: "DELETE"
    });
  },

  // Certificates
  async getCertificates() {
    return fetchWithAuth("/api/certificates");
  },

  async createCertificate(payload) {
    return fetchWithAuth("/api/certificates", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  },

  async updateCertificate(id, payload) {
    return fetchWithAuth("/api/certificates/" + id, {
      method: "PUT",
      body: JSON.stringify(payload)
    });
  },

  async deleteCertificate(id) {
    return fetchWithAuth("/api/certificates/" + id, {
      method: "DELETE"
    });
  },

  // Messages
  async getMessages() {
    return fetchWithAuth("/api/messages");
  },

  async sendMessage(payload) {
    return fetchWithAuth("/api/messages", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  },

  async deleteMessage(id) {
    return fetchWithAuth("/api/messages/" + id, {
      method: "DELETE"
    });
  },

  // Upload
  async uploadFile(file) {
    const formData = new FormData();
    formData.append("file", file);
    return fetchWithAuth("/api/upload", {
      method: "POST",
      body: formData
    });
  }
};