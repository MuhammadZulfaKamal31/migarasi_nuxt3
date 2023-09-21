<template>
    <!-- loading -->
    <div v-if="loading" class="h-[2000px] flex justify-center py-40 bg-slate-50 absolute"
        :class="sideBar.openSideBar ? ' w-[79%] duration-300' : 'w-full duration-300'">
        <div class="inline-block h-14 w-14 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status">
            <span
                class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
        </div>
    </div>

    <div class=" h-full w-full pt-20 px-7  md:p-14  gap-6 flex flex-col bg-slate-200 "
        :class="sideBar.openSideBar ? 'md:pr-[65px] duration-300' : ' md:px-24 duration-300'">
        <div class=" h-[77px]  bg-white rounded-md flex items-center justify-start px-6 absolute md:top-36 invisible md:visible"
            :class="sideBar.openSideBar ? ' duration-300 md:w-[1010px]' : 'duration-300  md:w-[1245px]'">
            <span class=" text-2xl font-[500]">{{ pageName }}</span>
        </div>
        <div class=" md:h-[487px] w-full flex flex-col md:flex-row gap-10">
            <!-- Pendamping -->
            <div class="h-full  w-full bg-white p-8 rounded-md">
                <div class=" flex justify-between">
                    <h1 class=" text-[29px] md:text-[32px] font-semibold">Pendamping</h1>
                    <i class="fa-solid fa-up-right-from-square text-xl"></i>
                </div>
                <table class="w-full mt-9">
                    <thead>
                        <tr class=" py-10">
                            <th class="text-[16px] font-[600] text-start ">Name</th>
                            <th class="text-[16px] font-[600] text-start">Pendamping</th>
                        </tr>
                    </thead>
                    <tbody v-for="i in pendamping">
                        <tr class="">
                            <td class=" py-4 pt-6  flex items-center gap-3 text-red-600 text-[15px] font-[600]">
                                <img class=" w-[40px] h-[40px] rounded-full"
                                    :src="`${baseImageUrl}` + i.companion_user.user_profile_picture" alt="">
                                {{ i.companion_user.user_full_name }}
                            </td>
                            <td class="text-[15px] font-[600]">{{ i.companion_as.name }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- Tambah Pendamping -->
            <div class=" h-full w-full bg-white p-8 rounded-md">
                <h1 class=" text-[29px] md:text-[32px] font-semibold"> Tambah Pendamping</h1>
                <form action="">
                    <div class=" py-4 pt-12">
                        <input type="text" placeholder=" Pilih User"
                            class="h-[58px] w-full bg-[#FAFAFA] border-2 outline-none px-2 focus:border-red-500 rounded-md">
                    </div>
                    <div class=" py-4">
                        <input type="text" placeholder=" Pilih User"
                            class="h-[58px] w-full bg-[#FAFAFA] border-2 outline-none px-2 focus:border-red-500 rounded-md">
                    </div>
                    <div class=" flex items-center gap-2 py-3">
                        <input type="checkbox" class=" h-[17px] w-[17px]">
                        <span class=" text-[#A3A3A3] text-[13px] font-medium"> Aktif</span>
                    </div>
                    <div class=" flex items-center gap-2 py-3">
                        <input type="checkbox" class=" h-[17px] w-[17px]">
                        <span class=" text-[#A3A3A3] text-[13px] font-medium"> Tidak Aktif</span>
                    </div>

                    <button type=" submit" class=" mt-5 w-full p-3 bg-red-600 text-white text-[20px] font-semibold">
                        Login
                    </button>
                </form>
            </div>
        </div>
        <!-- Detail Pendamping -->
        <div class=" flex md:w-[48%] h-[600px] gap-10">
            <div class=" h-full w-full bg-white p-8 rounded-md">
                <div class=" flex flex-col items-center" v-for="i in pendamping">
                    <h1 class=" text-[29px] md:text-[32px] font-semibold py-6">Detail Pendamping</h1>
                    <div class=" py-5">
                        <div class=" h-[241px] w-[241px] bg-[#D9D9D9] rounded-full">
                            <img :src="`${baseImageUrl}` + i.companion_user.user_profile_picture" alt=""
                                class=" rounded-full h-[241px] w-[241px] object-cover">
                        </div>
                    </div>
                    <div class=" flex flex-col items-center pt-6">
                        <h1 class=" text-[29px] md:text-[32px]  font-semibold"> {{ i.companion_user.user_full_name }}
                        </h1>
                        <p class=" text-[20px]">{{ i.companion_as.name }}</p>
                    </div>
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
});
// import { onMounted } from 'vue';
import { useSidebarStore } from '../../stores/Store';
// import { useDetailPendamping } from '../../stores/Bisnis/DetailPendamping.mjs';

const sideBar = useSidebarStore();
const baseImageUrl = import.meta.env.VITE_BASE_IMAGE_URL;


//===================================useFetch Api ================================

const loading = ref(false)

import { useRoute } from 'vue-router';
const route = useRoute();
const id_bisnis = route.params.DetailPendamping;
const pendamping = ref([]);
const pendampingDetail = ref(null);
const pageName = ref(null);

async function getBisnis() {
    const token = localStorage.getItem("token");
    console.log(token);
    const url = `${import.meta.env.VITE_BASE_API_URL}/business/detail/${id_bisnis}/companion`;
    loading.value = true;

    await useFetch(url, {
        method: "get",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => {
        setTimeout(() => {
            console.log(res.data)
            pendampingDetail.value = res.data.value;
            pendamping.value = res.data.value.companions;
            pageName.value = res.data.value.business_id.business_name
            loading.value = false
        }, 1000);

    }).catch(err => {
        console.log(err);
    })
}

onBeforeMount(async () => {
    await getBisnis();
});

</script>
<style ></style>