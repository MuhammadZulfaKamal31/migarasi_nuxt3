<template>
    <div>
        <div class='w-full h-screen md:h-screen lg:h-[564px] bg-slate-200 px-7 md:px-0 rounded-md overflow-auto pt-20 md:pt-4'
            :class="sideBar.openSideBar ? 'md:pl-6 md:pr-7 lg:pr-[37px] lg:pl-10 duration-300' : 'md:px-[5%] lg:px-[90px] duration-300'">
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
                    <span class=" text-[15px] md:text-2xl font-[500]">Circle</span>
                    <div class=" text-[0.7rem] md:text-[15px] flex flex-row space-x-2 font-semibold text-sm text-red-500">
                        <div v-for="(link, index) in links" :key="index">
                            <nuxt-link :to="generateLink(index)" class="hover:text-black">{{ link }}</nuxt-link>
                            <span v-if="!(link === links[links.length - 1])" class="ml-2">/</span>
                        </div>
                    </div>
                </div>
            </div>
            <div v-show="loading == false" class="flex flex-wrap md:mx-4 bg-white p-10 rounded-md">
                <!-- {{ circle }} -->
                <div v-for="i in circle" class=" w-1/2 md:w-1/2 lg:w-1/5 px-4 mb-4">
                    <router-link :to="`/circle/${i.circle.id}`" exact-active-class>
                        <div class=" h-full border rounded-md overflow-hidden shadow-xl">
                            <img :src="`${baseImageUrl}` + i.circle.circle_logo" alt="" class="object-cover w-full">
                            <h5 class="p-4 text-[14px] font-semibold">{{ i.circle.circle_name }}</h5>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
    <div class=" w-full text-start p-5 pl-[60px] md:pl-[65px] shadow-sm bg-slate-200 -mt-20 lg:mt-0">
        <span> © 2023 <router-link to="/dashboard" class=" text-red-500 text-[14px]">jruhub.com.</router-link> All rights
            reserved.</span>
    </div>
</template>
<script setup>
definePageMeta({
    layout: "layouts"
})
import { useSidebarStore } from '../../stores/Store';

const baseImageUrl = import.meta.env.VITE_BASE_IMAGE_URL;
const sideBar = useSidebarStore()

//=======================================usefetch=================================

const circle = ref(null);
const loading = ref(false)

async function getCircle() {
    const token = localStorage.getItem("token");
    console.log(token)
    const url = `${import.meta.env.VITE_BASE_API_URL}/circle`;
    loading.value = true

    await useFetch(url, {
        method: "get",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => {
        setTimeout(() => {
            console.log(res.data)
            circle.value = res.data.value.data
            loading.value = false
        }, 700)

    }).catch(err => {
        console.log(err)
    })
}

onBeforeMount(async () => {
    await getCircle();
})

//===========================================breadcrumbs =====================================
import { useRoute } from '#vue-router'

const links = ref([]);
function makeBreadcrumbs() {
    const routeName = useRoute().name;
    links.value = routeName.split("-").filter(link => link.toLowerCase() !== 'detail');
}

function generateLink(index) {
    const subLinks = links.value.slice(0, index + 1);
    console.log("sjndjkasdjk" + index)
    console.log(subLinks)
    return '/' + subLinks.join("/");
}

function formatLink(link) {
    if (link.toLowerCase() === 'detail') {
        return null;
    }
    return link;
}
onMounted(() => {
    makeBreadcrumbs()
})



</script>
<style></style>