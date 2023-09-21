import { defineStore } from 'pinia'

export const useBusinessStore = defineStore('business', {
  state: () => ({
    business : []
  }),
  actions: {
    async fetchBisnis() {
      try {
        const token = localStorage.getItem('token');
        // console.log("execute", `${import.meta.env.VITE_BASE_API_URL}/business`)

        const {data} = await fetch(`${import.meta.env.VITE_BASE_API_URL}/business`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk4MDQ0MzM4LCJpYXQiOjE2OTI4NDg0MTEsImp0aSI6IjJmMjQ0ODU2OTE1ODQ2Y2U5NWMxMjgzZDY5OWZlZWZjIiwidXNlcl9pZCI6MX0.VgqE4tN8lrZIPUGq8UjURZXigpdF7z5MvUsh5_cRqB0`,
          },
      });

      await useFetch(()=>`${import.meta.env.VITE_BASE_API_URL}/business`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk4MDQ0MzM4LCJpYXQiOjE2OTI4NDg0MTEsImp0aSI6IjJmMjQ0ODU2OTE1ODQ2Y2U5NWMxMjgzZDY5OWZlZWZjIiwidXNlcl9pZCI6MX0.VgqE4tN8lrZIPUGq8UjURZXigpdF7z5MvUsh5_cRqB0`
        }
    })

        // response.data.value        
        this.$state.business = data.data

        console.log(" bisnis"+ this.$state.business )
        
      } catch (error) {
        console.error('Error fetching businesses:', error)
      }
    },
  },
})
