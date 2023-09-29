<template>
    <div class=" bg-slate-200">

        <div class=" flex flex-col items-center md:items-start md:pt-16 pt-4
        md:flex-row h-screen md:h-[580px] gap-5 md:ml-[40px] md:px-5 px-10 py-20 md:py-12"
            :class="sideBar.openSideBar ? 'md:px-[14px] duration-300' : 'md:px-[4%] duration-300'">
            <!-- //pageName -->
            <!-- <div class="pt-[80px] md:pt-0 w-full md:w-0">
                <div class=" md:h-[77px] h-10 bg-white rounded-md flex items-center justify-between px-2 md:px-6 md:absolute md:top-36 "
                    :class="sideBar.openSideBar ? ' duration-300 md:ml-4 md:w-[960px]' : 'duration-300  md:ml-4 md:w-[1250px]'">
                    <span class=" text-[15px] md:text-2xl font-[500]">Beranda</span>
                    <div class=" text-[0.7rem] md:text-[15px] flex flex-row space-x-2 font-semibold text-sm text-red-500">
                        <div v-for="(link, index) in links" :key="index">
                            <nuxt-link :to="generateLink(index)" class="hover:text-black">{{ link }}</nuxt-link>
                            <span v-if="!(link === links[links.length - 1])" class="ml-2">/</span>
                        </div>
                    </div>
                </div>
            </div> -->
            <!-- loading -->
            <div v-if="loading" class=" w-full h-screen md:h-[530px] flex justify-center pt-40 bg-slate-200"
                :class="sideBar.openSideBar ? ' duration-300 md:w-[1000px]' : 'duration-300 md:w-[full]'">
                <div class="inline-block h-14 w-14 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status">
                    <span
                        class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                </div>
            </div>
            <!-- total Anggota -->
            <div v-else class="flex md:flex-row flex-col gap-5 w-full">
                <div class="flex items-center h-[100px]  md:h-[82px] w-full md:w-[200px] bg-white rounded-md">
                    <div class=" h-[60px] w-[60px] bg-red-600 m-7 md:m-2"></div>
                    <div>
                        <span class=" text-[17px] md:text-base text-slate-600 font-[700]">Total Anggota</span>
                        <div class=" h-[20px] md:h-[25px] text-[17px] md:text-[20px] font-[800]">
                            {{ totalAnggota }}
                        </div>
                    </div>
                </div>
                <div class="flex items-center h-[100px]  md:h-[82px] w-full md:w-[200px] bg-white rounded-md">
                    <div class=" h-[60px] w-[60px] bg-red-600 m-7 md:m-2"></div>
                    <div>
                        <span class=" text-[17px] md:text-base text-slate-600 font-[700]">Total Bisnis</span>
                        <div class=" h-[20px] md:h-[25px] text-[17px] md:text-[20px] font-[800]">
                            {{ totalBisnis }}
                        </div>
                    </div>
                </div>
                <div class="flex items-center h-[100px]  md:h-[82px] w-full md:w-[200px] bg-white rounded-md">
                    <div class=" h-[60px] w-[60px] bg-red-600 m-7 md:m-2"></div>
                    <div>
                        <span class=" text-[17px] md:text-base text-slate-600 font-[700]">Total Circle</span>
                        <div class=" h-[20px] md:h-[25px] text-[17px] md:text-[20px] font-[800]">
                            {{ totalCircle }}
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div class=" w-full bg-slate-200 text-start p-5 pl-[65px] shadow-sm -mt-16 md:-mt-0">
            <span> © 2023 <router-link to="/dashboard" class=" text-red-500 text-[14px]">jruhub.com.</router-link> All
                rights reserved.</span>
        </div>

    </div>
</template>
<!-- jangan lupa setup nya di pakai -->
<script setup>
definePageMeta({
    layout: "layouts",
    // middleware: ['auth'],
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

//=====================================BreadCrumbs ==================================

import { useRoute } from '#vue-router';

const links = ref([]);
const makeBreadcrumbs = () => {
    const routeName = useRoute().name;
    links.value = routeName.split("-");
}

const generateLink = (index) => {
    const subLinks = links.value.slice(0, index + 1)
    console.log(subLinks)
    return '/' + subLinks.join("/");
}
onMounted(() => {
    makeBreadcrumbs()
})

</script>
<style></style>
