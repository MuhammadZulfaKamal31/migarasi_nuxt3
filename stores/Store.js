import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


export const useSidebarStore = defineStore('sidebar', () => {

  const openSideBar = ref(null)

  const closeSideBar = () => {
    openSideBar.value = false;
  };

  const toggleSideBar = () => {
    openSideBar.value = !openSideBar.value;
  };
  return { openSideBar, toggleSideBar, closeSideBar };
});

// import { defineStore } from 'pinia';

// export const useAuthStore = defineStore('auth', {
//   state: () => ({
//     PageName: null,
//   }),
//   actions: {
//     logout() {
//       this.token = null; // Atur token menjadi null
//       sessionStorage.setItem('token'); // Hapus token dari localStorage
//     },
//   },
// });


//======================= Highlight Menu sideBar ====================================

// import { defineStore } from 'pinia'

// export const useBusinessStore = defineStore('business', {
//   state: () => ({
//     business : []
//   }),
//   actions: {

//   }
// })
