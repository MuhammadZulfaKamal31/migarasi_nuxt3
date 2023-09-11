<template>
    <div :class="sideBar.openSideBar ? '' : 'duration-300'">
        <div class=" flex flex-col items-center md:items-start md:flex-row gap-5 md:pl-[70px] px-5 py-20 md:py-12 bg-slate-200"
            :class="sideBar.openSideBar ? 'md:px-[14px] duration-300' : 'md:px-[4%] duration-300'">
            <div class="flex items-center h-[100px]  md:h-[82px] w-[300px] md:w-[200px] bg-white rounded-md">
                <div class=" h-[60px] w-[60px] bg-red-600 m-7 md:m-2"></div>
                <div>
                    <span class=" text-[17px] md:text-base text-slate-600 font-[700]">Total Anggota</span>
                    <div class=" h-[20px] md:h-[25px] text-[17px] md:text-[20px] font-[800]">
                        {{ circleDetail.data.data.circle_info.total_employee }}
                    </div>
                </div>
            </div>
            <div class="flex items-center h-[100px]  md:h-[82px] w-[300px] md:w-[200px] bg-white rounded-md">
                <div class=" h-[60px] w-[60px] bg-red-600 m-7 md:m-2"></div>
                <div>
                    <span class=" text-[17px] md:text-base text-slate-600 font-[700]">Total Bisnis</span>
                    <div class=" h-[20px] md:h-[25px] text-[17px] md:text-[20px] font-[800]">
                        {{ circleDetail.data.data.circle_info.total_project }}
                    </div>
                </div>
            </div>
            <div class="flex items-center h-[100px]  md:h-[82px] w-[300px] md:w-[200px] bg-white rounded-md">
                <div class=" h-[60px] w-[60px] bg-red-600 m-7 md:m-2"></div>
                <div>
                    <span class=" text-[17px] md:text-base text-slate-600 font-[700]">Total Project</span>
                    <div class=" h-[20px] md:h-[25px] text-[17px] md:text-[20px] font-[800]">
                        {{ circleDetail.data.data.circle_info.total_project }}
                    </div>
                </div>
            </div>
        </div>
        <!-- studio -->
        <div class='w-full h-full md:h-[564px] bg-slate-200  rounded-md overflow-auto'
            :class="sideBar.openSideBar ? ' md:pr-[350px] md:pl-10' : ' md:px-20'">
            <div class="flex flex-wrap mx-4 bg-white p-10 rounded-md">
                <div v-for="i in circleDetail.data.data.business" class=" w-1/2 md:w-1/5 px-4 mb-4">
                    <div class="h-full border rounded-md overflow-hidden shadow-xl">
                        <img :src="`${baseImageUrl}` + i.business.business_logo" alt="" class="object-cover w-full">
                        <h5 class="p-4 text-[14px] font-semibold">{{ i.business.business_name }}</h5>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class=" w-full text-start p-5 pl-[85px] shadow-sm bg-slate-200">
        {{ circleDetail.data.data.circle }}
        <span> © 2023 <span class=" text-red-500 text-[14px]">jruhub.com.</span> All rights reserved.</span>
    </div>
</template>
<script setup>

definePageMeta({
    layout: "layouts"
})
// import { onMounted } from 'vue';
// import { useDetailCircle } from '../../stores/Circle/CircleDetail';
import { useSidebarStore } from '../../stores/Store';

const sideBar = useSidebarStore();

//====================================useFetch api =============================================

const baseImageUrl = import.meta.env.VITE_BASE_IMAGE_URL;
import { useRoute } from 'vue-router';

const route = useRoute();
const { DetailCircle } = route.params;
// const route = useRoute();
// const { DetailCircle } = useRoute().params
// const url = `${import.meta.env.VITE_BASE_API_URL}/circle/detail/${DetailCircle}`;

// const { data: circleDetail } = await useFetch(url, {
//     method: "GET",
//     headers: {
//         'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk4MDQ0MzM4LCJpYXQiOjE2OTI4NDg0MTEsImp0aSI6IjJmMjQ0ODU2OTE1ODQ2Y2U5NWMxMjgzZDY5OWZlZWZjIiwidXNlcl9pZCI6MX0.VgqE4tN8lrZIPUGq8UjURZXigpdF7z5MvUsh5_cRqB0`,
//     },
// })

const circleDetail = ref([]);

const url = `${import.meta.env.VITE_BASE_API_URL}/circle/detail/${DetailCircle}`;

const fetchData = async () => {
    try {
        const data = await useFetch(url, {
            method: "GET",
            headers: {
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk4MDQ0MzM4LCJpYXQiOjE2OTI4NDg0MTEsImp0aSI6IjJmMjQ0ODU2OTE1ODQ2Y2U5NWMxMjgzZDY5OWZlZWZjIiwidXNlcl9pZCI6MX0.VgqE4tN8lrZIPUGq8UjURZXigpdF7z5MvUsh5_cRqB0`,
            },
        })

        circleDetail.value = data
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

watchEffect(() => {
    // Memanggil fetchData saat parameter DetailCircle berubah
    fetchData();
});

</script>
<style></style>