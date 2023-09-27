<template>
    <div>
        <div class='w-full h-screen md:h-[564px] bg-slate-200  rounded-md overflow-auto pt-20 md:pt-4 px-7'
            :class="sideBar.openSideBar ? ' md:pr-[45px] md:pl-10' : 'md:px-20'">
            <div class=" h-[77px]  bg-white rounded-md flex items-center justify-between px-6 absolute md:top-36 invisible md:visible"
                :class="sideBar.openSideBar ? ' duration-300 md:ml-4 md:w-[1020px]' : 'duration-300  md:ml-4 md:w-[1250px]'">
                <span class=" text-2xl font-[500]">Pendampingan</span>
                <div class="flex flex-row space-x-2 font-semibold text-sm text-red-500">
                    <div v-for="(link, index) in links" :key="index">
                        <nuxt-link :href="generateLink(index)" class="hover:text-black">{{ link }}</nuxt-link>
                        <!-- {{ link === links[links.length - 1] }} -->
                        <span v-if="!(link === links[links.length - 1])" class="ml-2">/</span>
                    </div>
                </div>
            </div>
            <!-- loading -->
            <div v-if="loading" class="h-[700px] md:h-full flex justify-center py-40 bg-slate-200"
                :class="sideBar.openSideBar ? ' w-[100%] ' : ' w-full'">
                <div class="inline-block h-14 w-14 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status">
                    <span
                        class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                </div>
            </div>

            <!-- //pageName Mobile -->
            <div v-show="loading == false" class="py-[30px] md:py-0 w-full md:w-0">
                <div class="h-10 bg-white rounded-md flex items-center justify-between px-2 md:invisible "
                    :class="sideBar.openSideBar ? ' duration-300 md:ml-4 md:w-[960px]' : 'duration-300  md:ml-4 md:w-[1250px]'">
                    <span class=" text-[15px] md:text-2xl font-[500]">Pendampingan</span>
                    <div class=" text-[0.7rem] md:text-[15px] flex flex-row space-x-2 font-semibold text-sm text-red-500">
                        <div v-for="(link, index) in links" :key="index">
                            <nuxt-link :to="generateLink(index)" class="hover:text-black">{{ link }}</nuxt-link>
                            <span v-if="!(link === links[links.length - 1])" class="ml-2">/</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex flex-wrap md:mx-4 bg-white p-10 rounded-md">
                <div v-for="i in pendamping" class=" w-1/2 md:w-1/5 px-4 mb-4">
                    <nuxt-link :to="`/Pendampingan/${i.business_id.business_slug}`">
                        <div class="h-full border rounded-md overflow-hidden shadow-xl">
                            <img :src="`${baseImageUrl}` + i.business_id.business_logo" alt="" class="object-cover w-full">
                            <h5 class="p-4 text-[14px] font-semibold">{{ i.business_id.business_name }}</h5>
                        </div>
                    </nuxt-link>
                </div>
            </div>
        </div>
    </div>
    <div class=" w-full text-start p-5 pl-[60px] md:pl-[65px] shadow-sm bg-slate-200 -mt-16 md:mt-0">
        <span> © 2023 <span class=" text-red-500 text-[14px]">jruhub.com.</span> All rights reserved.</span>
    </div>
</template>
<script setup>
definePageMeta({
    layout: "layouts"
})
import { useSidebarStore } from '../../stores/Store';

const baseImageUrl = import.meta.env.VITE_BASE_IMAGE_URL;
const sideBar = useSidebarStore()

//====================================================useFetch APi ================================

const pendamping = ref([]);
console.log("pendamping" + pendamping)
const loading = ref(false)

async function getPendamping() {
    const token = localStorage.getItem("token");
    console.log(token)
    const url = `${import.meta.env.VITE_BASE_API_URL}/business/my-companion`;
    loading.value = true

    await useFetch(url, {
        method: "get",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => {
        setTimeout(() => {
            console.log(res.data)
            pendamping.value = res.data.value.data;
            loading.value = false
        }, 700)

    }).catch(err => {
        console.log(err)
    })
}

onBeforeMount(async () => {
    await getPendamping();
})

//==========================================BreadCrumb ==========================================
import { useRoute } from 'vue-router'
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
    makeBreadcrumbs();
})


</script>
<style></style>