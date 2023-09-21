<template>
    <div>
        <!-- loading -->
        <div v-if="loading" class="h-screen flex justify-center py-40 bg-slate-50 absolute"
            :class="sideBar.openSideBar ? ' w-[78%] ' : ' w-full'">
            <div class="inline-block h-14 w-14 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status">
                <span
                    class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
            </div>
        </div>

        <div class='w-full h-full md:h-[564px] bg-slate-200  rounded-md overflow-auto pt-20 md:pt-14'
            :class="sideBar.openSideBar ? ' md:pr-[37px] md:pl-10 duration-300' : ' md:px-20 duration-300'">
            <div class=" h-[77px]  bg-white rounded-md flex items-center justify-start px-6 absolute md:top-36 invisible md:visible"
                :class="sideBar.openSideBar ? ' duration-300 md:ml-4 md:w-[1020px]' : 'duration-300  md:ml-4 md:w-[1250px]'">
                <span class=" text-2xl font-[500]">Circle</span>
            </div>
            <div class="flex flex-wrap mx-4 bg-white p-10 rounded-md">
                <!-- {{ circle }} -->
                <div v-for="i in circle" class=" w-1/2 md:w-1/5 px-4 mb-4">
                    <router-link :to="`/circle/detail/${i.circle.id}`" exact-active-class>
                        <div class=" h-full border rounded-md overflow-hidden shadow-xl">
                            <img :src="`${baseImageUrl}` + i.circle.circle_logo" alt="" class="object-cover w-full">
                            <h5 class="p-4 text-[14px] font-semibold">{{ i.circle.circle_name }}</h5>
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

</script>
<style></style>