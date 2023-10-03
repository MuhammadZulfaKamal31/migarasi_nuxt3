import { defineStore } from 'pinia'

export const useAktifLinkStore = defineStore('aktifLinkStore', {
  state: () => ({
    aktifLink : null
  }),
  actions: {
     setActive(route){
      if (process.client) {
          sessionStorage.setItem('activeLink', route);
          this.$state.aktifLink  = sessionStorage.getItem('activeLink');
          // console.log(coba.value);
      }}
    },
  },
)
