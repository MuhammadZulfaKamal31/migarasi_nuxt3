<template>
    <div class="">
        <!-- loading -->
        <div v-if="loading" class=" h-screen lg:h-[550px] flex justify-center py-40 bg-slate-200"
            :class="sideBar.openSideBar ? ' duration-300' : 'w-full duration-300'">
            <div class="inline-block h-14 w-14 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status">
                <span
                    class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
            </div>
        </div>

        <div v-else
            class='w-full h-screen md:h-screen lg:h-[564px] bg-slate-200  rounded-md overflow-auto pt-20 md:pt-16 px-7'
            :class="sideBar.openSideBar ? ' md:pr-[50px] md:pl-7 lg:pl-10 duration-300' : ' md:px-[45px]  lg:px-20 duration-300'">
            <!-- //pageName Mobile -->
            <div v-show="loading == false" class="py-[30px] md:py-0 w-full md:w-0">
                <div class="h-10 bg-white rounded-md flex items-center justify-between px-2 md:hidden "
                    :class="sideBar.openSideBar ? ' duration-300 md:ml-4 md:w-[960px]' : 'duration-300  md:ml-4 md:w-[1250px]'">
                    <span class=" text-[15px] md:text-2xl font-[500]"> Usaha Saya</span>
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

            <div class="flex flex-wrap md:mx-4 bg-white p-10 rounded-md">
                <div v-for="i in bisnis" :key="i" class=" w-1/2 md:h-1/2 lg:w-1/5 px-4 mb-4">
                    <router-link :to="`/Bisnis/${i.business_slug}`">
                        <div class="h-[150px] w-full border rounded-md line-clamp-3 shadow-xl p-2 flex-col items-stretch">
                            <img :src="`${baseImageUrl}` + i.business_logo" alt="" class="object-cover w-full">
                            <h5 class=" py-6 text-[16px] font-semibold text-center">{{ i.business_name }}</h5>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>

    <div class=" w-full text-start p-5 pl-[60px] md:pl-[65px] shadow-sm bg-slate-200">
        <span> © 2023 <router-link to="/dashboard" class=" text-red-500 text-[14px]">jruhub.com.</router-link> All rights
            reserved.</span>
    </div>
</template>
<script setup>
definePageMeta({
    layout: "layouts"
})

const baseImageUrl = import.meta.env.VITE_BASE_IMAGE_URL;

import { useSidebarStore } from '../../stores/Store';
const sideBar = useSidebarStore();

//=============================================useFetch Langsung=========================================

const bisnis = ref(null);
const loading = ref(false)

async function getDetailCircle() {
    const token = localStorage.getItem("token");
    const url = `${import.meta.env.VITE_BASE_API_URL}/business`;
    loading.value = true

    await useFetch(url, {
        method: "get",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => {
        setTimeout(() => {
            console.log(res.data)
            bisnis.value = res.data.value.data
            loading.value = false
        }, 500)
    }).catch(err => {
        console.log(err)
    })
}

onBeforeMount(async () => {
    await getDetailCircle();
})

//==========================================BreadCrumb ==============================================
import { useRoute } from 'vue-router'
const links = ref([]);
const makeBreadcrumbs = () => {
    const routeName = useRoute().path;
    links.value = routeName.split("/").filter((i) => i != "");
}

const generateLink = (index) => {
    const subLinks = links.value.slice(0, index + 1)
    console.log(subLinks)
    return '/' + subLinks.join("/");
}

onMounted(() => {
    makeBreadcrumbs();
})

</script>
<style></style>