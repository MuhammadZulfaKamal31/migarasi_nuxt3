<template>
    <div class=" bg-slate-200 ">
        <!-- loading -->
        <div v-if="loading" class=" w-full h-screen flex justify-center py-40 bg-slate-50 absolute">
            <div class="inline-block h-14 w-14 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status">
                <span
                    class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
            </div>
        </div>

        <div class=" h-[77px]  bg-white rounded-md flex items-center justify-start px-6 absolute md:top-36 invisible md:visible"
            :class="sideBar.openSideBar ? ' duration-300 ml-14 md:w-[980px]' : 'duration-300 ml-24 md:w-[1200px]'">
            <span class=" text-2xl font-[500]">Beranda</span>
        </div>

        <div class=" flex flex-col items-center md:items-start
        md:flex-row md:h-[580px] gap-5 md:ml-[40px] px-5 py-20 md:py-12 "
            :class="sideBar.openSideBar ? 'md:px-[14px] duration-300' : 'md:px-[4%] duration-300'">
            <div class="flex items-center h-[100px]  md:h-[82px] w-[300px] md:w-[200px] bg-white rounded-md">
                <div class=" h-[60px] w-[60px] bg-red-600 m-7 md:m-2"></div>
                <div>
                    <span class=" text-[17px] md:text-base text-slate-600 font-[700]">Total Anggota</span>
                    <div class=" h-[20px] md:h-[25px] text-[17px] md:text-[20px] font-[800]">
                        {{ totalAnggota }}
                    </div>
                </div>
            </div>
            <div class="flex items-center h-[100px]  md:h-[82px] w-[300px] md:w-[200px] bg-white rounded-md">
                <div class=" h-[60px] w-[60px] bg-red-600 m-7 md:m-2"></div>
                <div>
                    <span class=" text-[17px] md:text-base text-slate-600 font-[700]">Total Bisnis</span>
                    <div class=" h-[20px] md:h-[25px] text-[17px] md:text-[20px] font-[800]">
                        {{ totalBisnis }}
                    </div>
                </div>
            </div>
            <div class="flex items-center h-[100px]  md:h-[82px] w-[300px] md:w-[200px] bg-white rounded-md">
                <div class=" h-[60px] w-[60px] bg-red-600 m-7 md:m-2"></div>
                <div>
                    <span class=" text-[17px] md:text-base text-slate-600 font-[700]">Total Circle</span>
                    <div class=" h-[20px] md:h-[25px] text-[17px] md:text-[20px] font-[800]">
                        {{ totalCircle }}
                    </div>
                </div>
            </div>

        </div>
        <div class=" w-full pt-[70%] md:pt-0 bg-slate-200 text-start p-5 pl-[65px] shadow-sm">
            <span> © 2023 <router-link to="/dashboard" class=" text-red-500 text-[14px]">jruhub.com.</router-link> All
                rights reserved.</span>
        </div>

    </div>
</template>
<!-- jangan lupa setup nya di pakai -->
<script setup>
definePageMeta({
    layout: "layouts"
})
//pinia
import { useSidebarStore } from '../../stores/Store';

const sideBar = useSidebarStore();

//======================get UseFetch data ===========================================
const dashboard = ref(null);
const totalAnggota = ref(null);
const totalBisnis = ref(null);
const totalCircle = ref(null);

const loading = ref(false)


const getDashboard = async () => {
    const token = localStorage.getItem("token");
    const url = `${import.meta.env.VITE_BASE_API_URL}/dashboard`;
    loading.value = true;

    await useFetch(url, {
        method: "get",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => {
        setTimeout(() => {
            dashboard.value = res.data.value;
            totalBisnis.value = res.data.value.total_business;
            totalAnggota.value = res.data.value.total_user;
            totalCircle.value = res.data.value.total_circle;
            loading.value = false
        }, 700)
    })
}

onBeforeMount(async () => {
    await getDashboard();
})

</script>
<style ></style>