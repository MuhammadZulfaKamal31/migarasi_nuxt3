<template>
    <div>
        <div class='w-full h-full md:h-[564px] bg-slate-200  rounded-md overflow-auto pt-20 md:pt-14'
            :class="sideBar.openSideBar ? ' md:pr-[350px] md:pl-10' : ' md:px-20'">
            <div class="flex flex-wrap mx-4 bg-white p-10 rounded-md">
                <div v-for="i in business.data" class=" w-1/2 md:w-1/5 px-4 mb-4">
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
    <div class=" w-full text-start p-5 pl-[60px] md:pl-[65px] shadow-sm">
        <span> © 2023 <span class=" text-red-500 text-[14px]">jruhub.com.</span> All rights reserved.</span>
    </div>
</template>
<script setup>
definePageMeta({
    layout: "layouts"
})
import { useBusinessStore } from '../../stores/bisnis/bisnis';
import { onMounted } from 'vue';
const baseImageUrl = import.meta.env.VITE_BASE_IMAGE_URL;

import { useSidebarStore } from '../../stores/Store';
const sideBar = useSidebarStore();

//========================================fetch langsung=====================================
// GET
const { data: business } = await useFetch(`${import.meta.env.VITE_BASE_API_URL}/business`, {
    method: 'GET',
    headers: {
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk4MDQ0MzM4LCJpYXQiOjE2OTI4NDg0MTEsImp0aSI6IjJmMjQ0ODU2OTE1ODQ2Y2U5NWMxMjgzZDY5OWZlZWZjIiwidXNlcl9pZCI6MX0.VgqE4tN8lrZIPUGq8UjURZXigpdF7z5MvUsh5_cRqB0`,
    },
})

</script>
<style></style>