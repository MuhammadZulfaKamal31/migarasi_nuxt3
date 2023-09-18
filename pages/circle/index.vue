<template>
    <div>
        <div class='w-full h-full md:h-[564px] bg-slate-200  rounded-md overflow-auto pt-20 md:pt-14'
            :class="sideBar.openSideBar ? ' md:pr-[37px] md:pl-10 duration-300' : ' md:px-20 duration-300'">
            <div class=" h-[77px]  bg-white rounded-md flex items-center justify-start px-6 absolute md:top-36 invisible md:visible"
                :class="sideBar.openSideBar ? ' duration-300 md:ml-4 md:w-[1020px]' : 'duration-300  md:ml-4 md:w-[1250px]'">
                <span class=" text-2xl font-[500]">Circle</span>
            </div>
            <div class="flex flex-wrap mx-4 bg-white p-10 rounded-md">
                <!-- {{ circle }} -->
                <div v-for="i in circle" class=" w-1/2 md:w-1/5 px-4 mb-4">
                    <router-link :to="`/circle/detail/${i.circle.id}`">
                        <div class="h-full border rounded-md overflow-hidden shadow-xl">
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


//=======================useFetch api ==============================================
// import nuxtStorage from 'nuxt-storage';
// const token = nuxtStorage.localStorage.getData('token');

// const { data: circle } = await useFetch(`${import.meta.env.VITE_BASE_API_URL}/circle`, {
//     method: "GET",
//     headers: {
//         'Authorization': `Bearer ${token}`
//     },
// })

//==========================================usefetch===============
const circle = ref(null);

async function getCircle() {
    const token = localStorage.getItem("token");
    console.log(token)
    const url = `${import.meta.env.VITE_BASE_API_URL}/circle`;

    await useFetch(url, {
        method: "get",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => {
        setTimeout(() => {
            console.log(res.data)
            circle.value = res.data.value.data
        }, 500)

    }).catch(err => {
        console.log(err)
    })
}

onBeforeMount(async () => {
    await getCircle();
})

</script>
<style></style> v-if="circle"