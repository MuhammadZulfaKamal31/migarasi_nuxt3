// Dalam store auth.js
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    PageName: null,
  }),
  actions: {
    logout() {
      this.token = null; // Atur token menjadi null
      sessionStorage.setItem('token'); // Hapus token dari localStorage
    },
  },
});
