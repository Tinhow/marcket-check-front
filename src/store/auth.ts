import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: false,
    token: null as string | null,
    user: null as { id: number; email: string } | null,
  }),

  actions: {
    login(token: string, user: { id: number; email: string }) {
      this.isAuthenticated = true;
      this.token = token;
      this.user = user;
      localStorage.setItem("authToken", token);
      localStorage.setItem("authUser", JSON.stringify(user));
    },

    logout() {
      this.isAuthenticated = false;
      this.token = null;
      this.user = null;
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
    },

    checkAuth() {
      const storedToken = localStorage.getItem("authToken");
      const storedUser = localStorage.getItem("authUser");
      if (storedToken && storedUser) {
        this.isAuthenticated = true;
        this.token = storedToken;
        this.user = JSON.parse(storedUser);
      } else {
        this.isAuthenticated = false;
        this.token = null;
        this.user = null;
      }
    },
  },
});
