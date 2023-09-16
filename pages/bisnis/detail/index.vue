<template>
    <div class=" h-screen md:h-full">
        <div class=" h-[77px]  bg-white rounded-md flex items-center justify-start px-6 absolute md:top-36 invisible md:visible"
            :class="sideBar.openSideBar ? ' duration-300 ml-14 md:w-[980px]' : 'duration-300 ml-24 md:w-[1200px]'">
            <span class=" text-2xl font-[500]">Bisnis Saya</span>
        </div>

        <div class='w-full h-full md:h-[564px] bg-slate-200  rounded-md overflow-auto pt-20 md:pt-14'
            :class="sideBar.openSideBar ? ' md:pr-[350px] md:pl-10' : ' md:px-20'">
            <div class="flex flex-wrap mx-4 bg-white p-10 rounded-md">
                <div v-for="i in bisnis" class=" w-1/2 md:w-1/5 px-4 mb-4">
                    <router-link :to="`/Bisnis/detail/${i.business_id.id}`">
                        <div class="h-full border rounded-md overflow-hidden shadow-xl">
                            <img :src="`${baseImageUrl}` + i.business_id.business_logo" alt="" class="object-cover w-full">
                            <h5 class="p-4 text-[14px] font-semibold">{{ i.business_id.business_name }}</h5>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
    <div class=" w-full text-start p-5 pl-[60px] md:pl-[65px] shadow-sm bg-slate-200">
        <span> © 2023 <span class=" text-red-500 text-[14px]">jruhub.com.</span> All rights reserved.</span>
    </div>
</template>
<script setup>
definePageMeta({
    layout: "layouts"
})
// import { useBusinessStore } from '../../stores/bisnis/bisnis';
// import { onMounted } from 'vue';
const baseImageUrl = import.meta.env.VITE_BASE_IMAGE_URL;

import { useSidebarStore } from '../../stores/Store';
const sideBar = useSidebarStore();

//=============================================useFetch Langsung=========================================

const bisnis = ref(null);

async function getDetailCircle() {
    const token = localStorage.getItem("token");
    const url = `${import.meta.env.VITE_BASE_API_URL}/business`;

    await useFetch(url, {
        method: "get",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => {
        setTimeout(() => {
            console.log(res.data)
            bisnis.value = res.data.value.data
        }, 1000)

    }).catch(err => {
        console.log(err)
    })
}

onBeforeMount(async () => {
    await getDetailCircle();
})


</script>
<style></style>