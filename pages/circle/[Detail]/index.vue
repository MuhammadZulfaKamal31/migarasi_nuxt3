<template>
    <div :class="sideBar.openSideBar ? '' : 'duration-300'">

        <!-- <div class=" h-[77px]  bg-white rounded-md flex items-center justify-between px-6 absolute md:top-36 invisible md:visible"
            :class="sideBar.openSideBar ? ' duration-300 md:ml-12 md:w-[1020px]' : 'duration-300  md:ml-24 md:w-[1250px]'">
            <span class=" text-2xl font-[500]">Komune</span>
            <div class="flex flex-row space-x-2 font-semibold text-sm text-red-500">
                <div v-for="(link, index) in links" :key="index">
                    <nuxt-link :href="generateLink(index)" class="hover:text-black">{{ link }}</nuxt-link>
                    <span v-if="!(link === links[links.length - 1])" class="ml-2">/</span>
                </div>
            </div>
        </div> -->

        <!-- loading -->
        <div v-if="loading" class=" h-screen lg:h-[560px] flex justify-center py-40 bg-slate-200"
            :class="sideBar.openSideBar ? ' duration-300' : 'w-full duration-300'">
            <div class="inline-block h-14 w-14 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status">
                <span
                    class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
            </div>
        </div>
        <div v-else>
            <div class=" flex flex-col items-center md:items-start lg:flex-row gap-5  px-5 py-20 md:py-12 bg-slate-200 lg:pt-14"
                :class="sideBar.openSideBar ? 'md:px-[14px] duration-300 md:pl-[50px]' : 'md:px-[4%] duration-300 md:pl-[100px]'">
                <!-- //pageName Mobile -->
                <div v-show="loading == false" class="py-[30px] md:py-0 w-full md:w-0 md:mt-0 md:hidden">
                    <div class="h-10 bg-white rounded-md flex items-center justify-between px-2 ">
                        <span class=" text-[15px] md:text-2xl font-[500]"> Update Profile</span>
                        <div class=" text-[70%]  flex flex-row space-x-1 font-semibold text-sm text-red-500">
                            <div v-for="(link, index) in links" :key="index">
                                <nuxt-link :to="generateLink(index)"
                                    class="hover:text-gray-800 hover:bg-gray-800 hover:bg-opacity-10 p-1 rounded-sm">
                                    {{ link }}</nuxt-link>
                                <span v-if="!(link === links[links.length - 1])" class="">/</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex items-center h-[100px]  md:h-[82px] w-[300px] md:w-[200px] bg-white rounded-md">
                    <div class=" h-[60px] w-[60px] bg-red-600 m-7 md:m-2"></div>
                    <div>
                        <span class=" text-[17px] md:text-base text-slate-600 font-[700]">Total Anggota</span>
                        <div class=" h-[20px] md:h-[25px] text-[17px] md:text-[20px] font-[800]">
                            {{ totalAnggota }}
                        </div>
                    </div>
                </div>
                <div class="flex items-center h-[100px]  md:h-[82px] w-[300px] md:w-[230px] bg-white rounded-md">
                    <div class=" h-[60px] w-[60px] bg-red-600 m-7 md:m-2"></div>
                    <div>
                        <span class=" text-[17px] md:text-base text-slate-600 font-[700]">Total Management</span>
                        <div class=" h-[20px] md:h-[25px] text-[17px] md:text-[20px] font-[800]">
                            {{ totalBisnis }}
                        </div>
                    </div>
                </div>
                <div class="flex items-center h-[100px]  md:h-[82px] w-[300px] md:w-[200px] bg-white rounded-md">
                    <div class=" h-[60px] w-[60px] bg-red-600 m-7 md:m-2"></div>
                    <div>
                        <span class=" text-[17px] md:text-base text-slate-600 font-[700]">Total Project</span>
                        <div class=" h-[20px] md:h-[25px] text-[17px] md:text-[20px] font-[800]">
                            {{ totalProject }}
                        </div>
                    </div>
                </div>
            </div>
            <!-- studio -->
            <div class='w-full h-full md:h-[564px] bg-slate-200  rounded-md overflow-auto'
                :class="sideBar.openSideBar ? ' md:pr-[55px] md:pl-10 duration-300' : ' md:px-20 duration-300'">
                <div class="flex flex-col flex-wrap mx-4 bg-white p-10 rounded-md">
                    <h1 class=" text-[32px] font-[600] pb-4"> List Bisnis</h1>
                    <div class=" flex">
                        <div v-for="i in bisnis" class=" w-1/2 md:w-2/4 lg:w-1/5 px-4 mb-4">
                            <div class="h-full border rounded-md overflow-hidden shadow-xl">
                                <img :src="`${baseImageUrl}` + i.business.business_logo" alt="" class="object-cover w-full">
                                <h5 class="p-4 text-[14px] font-semibold">{{ i.business.business_name }}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- totalAnggota -->
    </div>
    <div class=" w-full text-start p-5  pl-[85px] shadow-sm bg-slate-200">
        <span> © 2023 <router-link to="/dashboard" class=" text-red-500 text-[14px]">jruhub.com.</router-link> All rights
            reserved.</span>
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
const loading = ref(false)

import { useRoute } from 'vue-router';
const route = useRoute();
const id_circle = route.params.Detail;

const totalAnggota = ref(null);
const totalBisnis = ref(null);
const totalProject = ref(null);
const bisnis = ref(null);

async function getDetailCircle() {
    const token = localStorage.getItem("token");
    const url = `${import.meta.env.VITE_BASE_API_URL}/circle/detail/${id_circle}`;
    loading.value = true;

    await useFetch(url, {
        method: "get",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => {
        setTimeout(() => {
            console.log(res.data)
            totalAnggota.value = res.data.value.data.circle_info.total_employee
            totalBisnis.value = res.data.value.data.circle_info.total_business;
            totalProject.value = res.data.value.data.circle_info.total_project;
            bisnis.value = res.data.value.data.business;

            loading.value = false
        }, 1000)

    }).catch(err => {
        console.log(err)
    })
}

onBeforeMount(async () => {
    await getDetailCircle();
})

//======================================= BreadCrumbs =======================================================
const links = ref([]);
function makeBreadcrumbs() {
    const routeName = useRoute().name;
    links.value = routeName.split("-")
    // .filter(link => link.toLowerCase() !== 'detail');
}
// function makeBreadcrumbs() {
//     console.log("sdasdjabj " + route.name.split(" - "))
//     links.value = route.name.split("-")
// }

function generateLink(index) {
    const subLinks = links.value.slice(0, index + 1);
    console.log("sjndjkasdjk" + index)
    console.log(subLinks)
    return '/' + subLinks.join("/");
}

// function formatLink(link) {
//     if (link.toLowerCase() === 'detail') {
//         return null;
//     }
//     return link;
// }

onMounted(() => {
    makeBreadcrumbs()
})



</script>
<style></style>