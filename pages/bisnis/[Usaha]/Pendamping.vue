<template>
    <div class=" h-full w-full md:h-screen pt-14 md:pt-0 px-7  md:px-14  gap-6 flex flex-col bg-slate-200 "
        :class="sideBar.openSideBar ? 'md:p-[7%] lg:pr-[65px] duration-300' : ' lg:px-24 duration-300'">
        <!-- <div class=" h-[77px]  bg-white rounded-md flex items-center justify-between px-6 absolute md:top-36 invisible md:visible"
            :class="sideBar.openSideBar ? ' duration-300 md:w-[1010px]' : 'duration-300  md:w-[1245px]'">
            <span class=" text-2xl font-[500]">{{ pageName }}</span>
            <div class="flex flex-row space-x-2 font-semibold text-sm text-red-500">
                <div v-for="(link, index) in links ">
                    <nuxt-link :to="generateLink(index)" class=" hover:text-black">
                        {{ link }}
                        <span v-if="!(link === links[links.length - 1])" class=" ml-2">/</span>
                    </nuxt-link>
                </div>
            </div>
        </div> -->
        <!-- loading -->
        <div v-if="loading" class="h-screen lg:h-[440px] flex justify-center py-40 bg-slate-200"
            :class="sideBar.openSideBar ? ' w-full duration-300' : 'w-full duration-300'">
            <div class="inline-block h-14 w-14 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status">
                <span
                    class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
            </div>
        </div>
        <!-- //pageName Mobile -->
        <div v-show="loading == false" class="py-[30px] md:py-0 w-full md:w-0 md:mt-0">
            <div class="h-10 bg-white rounded-md flex items-center justify-between px-2 md:invisible ">
                <span class=" text-[15px] md:text-2xl font-[500]"> Update Profile</span>
                <div class=" text-[0.7rem] md:text-[15px] flex flex-row space-x-2 font-semibold text-sm text-red-500">
                    <div v-for="(link, index) in links" :key="index">
                        <nuxt-link :to="generateLink(index)" class="hover:text-black">{{ link }}</nuxt-link>
                        <span v-if="!(link === links[links.length - 1])" class="ml-2">/</span>
                    </div>
                </div>
            </div>
        </div>
        <div v-show="loading == false" class=" md:h-[487px] w-full flex flex-col md:flex-row gap-7 lg:gap-10">
            <!-- Pendamping -->
            <div class="h-full  w-full bg-white p-5 lg:p-8 rounded-md">
                <div class=" flex justify-between">
                    <h1 class=" text-[21px] md:text-[25px] lg:text-[32px] font-[600]">Pendamping</h1>
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
                            <td @click="tampilkan"
                                class=" py-4 pt-6  flex items-center gap-3 text-red-600 text-[15px] font-[600] cursor-pointer">
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
            <div class=" h-full w-full bg-white p-5 lg:p-8 rounded-md">
                <h1 class=" text-[21px] md:text-[25px] lg:text-[32px] font-[600]"> Tambah Pendamping</h1>
                <form action="">
                    <div class=" py-4 pt-12">
                        <input type="text" placeholder=" Pilih User"
                            class="h-[58px] w-full bg-[#FAFAFA] border-2 outline-none px-2 focus:border-red-500 rounded-md">
                    </div>
                    <div class=" py-4">
                        <input type="text" placeholder=" Pilih User"
                            class="h-[58px] w-full bg-[#FAFAFA] border-2 outline-none px-2 focus:border-red-500 rounded-md">
                    </div>
                    <div class=" flex items-center gap-2 py-1 md:py-2 lg:py-3">
                        <input type="radio" class=" h-[17px] w-[17px]">
                        <span class=" text-[#A3A3A3] text-[13px] font-medium"> Aktif</span>
                    </div>
                    <div class=" flex items-center gap-2 py-1 md:py-2 lg:py-3">
                        <input type="radio" class=" h-[17px] w-[17px]">
                        <span class=" text-[#A3A3A3] text-[13px] font-medium"> Tidak Aktif</span>
                    </div>

                    <button type=" submit" class=" mt-5 w-full p-3 bg-red-600 text-white text-[20px] font-semibold">
                        Tambahkan
                    </button>
                </form>
            </div>
        </div>
        <!-- Detail Pendamping -->
        <div v-show="tampilDetail" class=" flex md:w-[48%] h-[600px] gap-10">
            <div class=" h-full w-full bg-white p-8 rounded-md">
                <div class=" flex flex-col items-center" v-for="i in pendamping">
                    <h1 class=" text-[21px] md:text-[25px] lg:text-[32px] font-[600]">Detail Pendamping</h1>
                    <div class=" py-5">
                        <div class=" h-[200px] w-[200px] lg:h-[241px] lg:w-[241px] bg-[#D9D9D9] rounded-full">
                            <img :src="`${baseImageUrl}` + i.companion_user.user_profile_picture" alt=""
                                class=" rounded-full h-[200px] w-[200px] lg:h-[241px] lg:w-[241px] object-cover">
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
    <div class=" w-full text-start p-5 pl-[60px] md:pl-[65px] shadow-sm bg-slate-200 pt-16">
        <span> © 2023 <router-link to="/dashboard" class=" text-red-500 text-[14px]">jruhub.com.</router-link> All rights
            reserved.</span>
    </div>
</template>
<script setup>

definePageMeta({
    layout: "layouts"
});

import { useSidebarStore } from '../../stores/Store';

const sideBar = useSidebarStore();
const baseImageUrl = import.meta.env.VITE_BASE_IMAGE_URL;

//memnyembunyikan detail
const tampilDetail = ref(false);
const tampilkan = () => {
    tampilDetail.value = true;
}


//===================================useFetch Api ===================================

const loading = ref(false)
import { useRoute } from 'vue-router';
const route = useRoute();
const id_bisnis = route.params.Usaha;
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
            pendamping.value = res.data.value.data
            pageName.value = res.data.value.business;
            loading.value = false
        }, 1000);

    }).catch(err => {
        console.log(err);
    })
}

onBeforeMount(async () => {
    await getBisnis();
});

//==========================================BreadCrumb ==========================================
const links = ref([]);
const makeBreadcrumbs = () => {
    const routeName = useRoute().path;
    links.value = routeName.split("/").filter((i) => i !== "");
}

const generateLink = (index) => {
    const subLinks = links.value.slice(0, index + 1)
    console.log(subLinks)
    return '/' + subLinks.join("/");
}

onMounted(() => {
    makeBreadcrumbs()
})



</script>
<style ></style>