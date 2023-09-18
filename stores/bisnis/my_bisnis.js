
// import { defineStore } from 'pinia'
// import { useRoute } from 'vue-router'

// export const useDetailBusines = defineStore('detailBusines', {
//   state: () => ({
//     Detaillbusiness : [],
//   }),
//   actions: {
//     async fetchBisnis() {
//       try {
//         const route = useRoute();
//         const id_bisnis = route.params.My_Business;
//         const { data: bisnisDetail } = await useFetch(`https://ac20-103-162-237-62.ngrok-free.app/api/v1/business/detail/${id_bisnis}`, {
//             method: "GET",
//             headers: {
//                 'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk4MDQ0MzM4LCJpYXQiOjE2OTI4NDg0MTEsImp0aSI6IjJmMjQ0ODU2OTE1ODQ2Y2U5NWMxMjgzZDY5OWZlZWZjIiwidXNlcl9pZCI6MX0.VgqE4tN8lrZIPUGq8UjURZXigpdF7z5MvUsh5_cRqB0`,
//             }
//         })

//         this.$state.Detaillbusiness = bisnisDetail

//         console.log(" coba"+ this.$state.Detaillbusiness);
        
//       } catch (error) {
//         console.error('Error fetching businesses:', error)
//       }
//     },
//   },
// })
