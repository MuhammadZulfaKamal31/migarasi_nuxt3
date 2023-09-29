<template>
    <div class="">
        <!-- pageName -->
        <div class="md:h-[70px]  lg:h-[77px]  bg-white rounded-md flex items-center justify-between px-6 absolute md:top-36 invisible md:visible"
            :class="sideBar.openSideBar ? ' duration-300 md:ml-10 xl:ml-13 md:w-[500px] lg:w-[750px] xl:w-[1010px]' : 'duration-300 md:w-[630px] ml-20 lg:w-[1230px]'">
            <span class=" text-2xl font-[500]">Bisnis Saya</span>
            <div class="flex flex-row space-x-2 font-semibold text-sm text-red-500">
                <div v-for="(link, index) in links ">
                    <nuxt-link :to="generateLink(index)" class=" hover:text-black">
                        {{ link }}
                        <span v-if="!(link === links[links.length - 1])" class=" ml-2">/</span>
                    </nuxt-link>
                </div>
            </div>
        </div>
        <!-- loading -->
        <div v-if="loading" class="md:h-[550px] h-[850px] flex justify-center py-40 bg-slate-200"
            :class="sideBar.openSideBar ? ' duration-300' : 'w-full duration-300'">
            <div class="inline-block h-14 w-14 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status">
                <span
                    class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
            </div>
        </div>

        <div v-else
            class='w-full h-screen md:h-[600px] lg:h-[564px] bg-slate-200  rounded-md overflow-auto pt-20 md:pt-5 px-7'
            :class="sideBar.openSideBar ? ' md:pr-[73px] md:pl-10 duration-300' : ' md:px-20 md:pr-28 duration-300'">
            <!-- PageName Mobile -->
            <div v-show="loading == false" class="py-[30px] md:py-0 w-full md:w-0">
                <div class="h-10 bg-white rounded-md flex items-center justify-between px-2 md:invisible "
                    :class="sideBar.openSideBar ? ' duration-300 md:ml-4 md:w-[960px]' : 'duration-300  md:ml-4 md:w-[1250px]'">
                    <span class=" text-[15px] md:text-2xl font-[500]">Bisnis Saya</span>
                    <div class=" text-[0.7rem] md:text-[15px] flex flex-row space-x-2 font-semibold text-sm text-red-500">
                        <div v-for="(link, index) in links" :key="index">
                            <nuxt-link :to="generateLink(index)" class="hover:text-black">{{ link }}</nuxt-link>
                            <span v-if="!(link === links[links.length - 1])" class="ml-2">/</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex flex-wrap bg-white p-7 md:p-10 rounded-md">
                <div v-for="i in bisnis" class=" w-1/2 md:w-1/5 px-4 mb-4">
                    <router-link :to="`/Bisnis/${i.business_slug}`">
                        <div class="h-full w-full border rounded-md line-clamp-3 shadow-xl">
                            <img :src="`${baseImageUrl}` + i.business_logo" alt="" class="object-cover w-full">
                            <h5 class="md:p-4 px-2 py-4 text-[14px] font-semibold">{{ i.business_name }}</h5>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
    <div class=" w-full text-start p-5 pl-[60px] md:pl-[65px] shadow-sm bg-slate-200 -mt-16 md:mt-0">
        <!-- <div class="h-screen bg-white">
            <div class="flex justify-center items-center h-full">
                <img class="h-16 w-16" src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif" alt="">
            </div>
        </div> -->
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
        }, 700)
    }).catch(err => {
        console.log(err)
    })
}

onBeforeMount(async () => {
    await getDetailCircle();
})

//==========================================BreadCrumb ==========================================
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