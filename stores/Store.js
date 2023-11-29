// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


// export const useSidebarStore = defineStore('sidebar', () => {

//   const openSideBar = ref(null)

//   const closeSideBar = () => {
//     openSideBar.value = false;
//   };

//   const toggleSideBar = () => {
//     openSideBar.value = !openSideBar.value;
//   };
//   return { openSideBar, toggleSideBar, closeSideBar };
// });


export const useSidebarStore = defineStore('sidebar', {
  state: () => ({
    openSideBar: true,
  }),
  actions: {
    closeSideBar() {
      this.$state.openSideBar = false;
    },
    toggleSidebar() {
      this.$state.openSideBar = !this.$state.openSideBar
    }
  },
});


//======================= Highlight Menu sideBar ====================================

// import { defineStore } from 'pinia'

// export const useBusinessStore = defineStore('business', {
//   state: () => ({
//     business : []
//   }),
//   actions: {

//   }
// })
