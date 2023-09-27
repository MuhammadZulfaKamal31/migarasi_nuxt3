import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


export const useSidebarStore = defineStore('sidebar', () => { 

  const openSideBar = ref(true)
  const closeSideBar = () => {
    openSideBar.value = false;
  };
  const toggleSideBar = () => {
    openSideBar.value = !openSideBar.value;
  };
  return { openSideBar, toggleSideBar, closeSideBar };
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
