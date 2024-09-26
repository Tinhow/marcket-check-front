import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: false,
    token: null as string | null,
  }),

  actions: {
    login(token: string) {
      this.isAuthenticated = true;
      this.token = token;
      localStorage.setItem("authToken", token);
    },

    logout() {
      this.isAuthenticated = false;
      this.token = null;
      localStorage.removeItem("authToken");
    },

    checkAuth() {
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        this.isAuthenticated = true;
        this.token = storedToken;
      } else {
        this.isAuthenticated = false;
        this.token = null;
      }
    },
  },
});
