<!-- hati hati dalam penggunaan lang, karena itu masalah error  -->
<template>
    <div class=" h-full pt-20 md:pt-12 lg:pt-16  flex flex-col gap-8 flex-wrap bg-slate-200"
        :class="openSideBar.openSideBar ? 'p-7  md:p-11 lg:pl-[50px] lg:pr-[60px]  duration-300' : ' p-7 md:px-16 lg:p-20 lg:px-24 duration-300 '">

        <!-- PageName Mobile -->
        <div v-show="loading == false" class=" pt-4 md:pt-0 w-full md:w-0 md:hidden">
            <div class="h-10 bg-white rounded-md flex items-center justify-between px-2 md:invisible "
                :class="openSideBar.openSideBar ? ' duration-300 md:ml-4 md:w-[960px]' : 'duration-300  md:ml-4 md:w-[1250px]'">
                <span class=" text-[15px] md:text-2xl font-[500]">Bisnis Saya</span>
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
        <!-- loading -->
        <div v-if="loading" class=" h-screen lg:h-[440px] flex justify-center py-40 bg-slate-200"
            :class="openSideBar.openSideBar ? ' w-full duration-300 ' : 'w-full duration-300'">
            <div class="inline-block h-14 w-14 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status">
                <span
                    class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...
                </span>
            </div>
        </div>

        <!-- crackinCode -->
        <div v-else class=" w-full h-full md:h-full bg-white rounded-md p-5 md:p-7">
            <div class=" flex justify-between">
                <div class=" flex items-center md:h-[150px]">
                    <img class=" h-11 md:h-32" :src="`${baseImageUrl}` + logo" alt="">
                    <div class="p-4">
                        <h2 class=" text-[22px] md:text-[30px] lg:text-[40px] font-[700]">{{ namaBisnis }}
                        </h2>
                        <p class=" text-[15px] md:text-[20px] md:w-[300]">Est.30 juni 2022</p>
                    </div>
                </div>
                <span class="fa-solid fa-pen-to-square md:text-[25px]"></span>
            </div>
            <p class=" text-[14px] md:text-[17px] p-2 md:p-9 w-full">
                {{ deskripsiBisnis }}
            </p>
        </div>
        <div v-show="loading == false"
            class=" flex flex-col md:flex-row gap-7 lg:gap-12 w-full h-full md:h-[505px] lg:px-4">
            <!-- pemilik -->
            <div class=" w-full h-full bg-white rounded-md px-7 p-5 md:p-7 lg:pl-[50px]">
                <div class=" flex justify-between">
                    <h4 class=" text-[21px] md:text-[25px] lg:text-[32px] font-[600]"> Pemilik</h4>
                    <nuxt-link :to="`/bisnis/${router}/Pemilik`" class="fa-solid fa-up-right-from-square text-xl">
                    </nuxt-link>
                </div>
                <table class="w-full mt-9">
                    <thead>
                        <tr class=" py-4">
                            <th class=" md:text-[14px] lg:text-[16px] font-[600] text-start ">Name</th>
                            <th class=" md:text-[14px] lg:text-[16px] font-[600] text-start">Share</th>
                        </tr>
                    </thead>
                    <tbody v-for="  i  in pemilik ">
                        <tr class="">
                            <td class=" py-4  flex items-center gap-3 text-red-600 text-[15px] font-[600]">
                                <img class=" w-[35px] h-[35px] lg:w-[40px] lg:h-[40px] rounded-full"
                                    :src="`${baseImageUrl}` + i.owner_user.user_profile_picture" alt="">
                                <span class=" md:text-[12px] lg:text-[15px]">
                                    {{ i.owner_user.user_full_name }}
                                </span>
                            </td>
                            <td class="md:text-[14px] lg:text-[15px] font-[600]">{{ i.owner_shares }}%</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- pendamping -->
            <div class=" w-full h-full bg-white rounded-md px-7 p-5 md:p-7 lg:pl-[50px]">
                <div class=" flex justify-between">
                    <h4 class="text-[21px] md:text-[25px] lg:text-[32px] font-[600]"> Pendamping</h4>
                    <router-link :to="`/bisnis/${router}/Pendamping`"
                        class="fa-solid fa-up-right-from-square text-xl"></router-link>
                </div>
                <table class="w-full mt-9">
                    <thead>
                        <tr class=" py-4">
                            <th class=" md:text-[14px] lg:text-[16px] font-[600] text-start ">Name</th>
                            <th class="md:text-[13px] lg:text-[16px] font-[600] text-start">Jenis Pendamping</th>
                        </tr>
                    </thead>
                    <tbody v-for="i in pendamping">
                        <tr class="">
                            <td class=" py-4  flex items-center gap-3 text-red-600 text-[15px] font-[600]">
                                <img class=" w-[35px] h-[35px] lg:w-[40px] lg:h-[40px] rounded-full lg:text-[15px]"
                                    :src="`${baseImageUrl}` + i.companion_user.user_profile_picture" alt="">
                                <span class=" md:text-[12px] lg:text-[15px]">
                                    {{ i.companion_user.user_full_name }}
                                </span>
                            </td>
                            <td class=" text-[15px] md:text-[12px] lg:text-[15px] font-[600]">{{ i.companion_as.name }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div v-show="loading == false"
            class=" flex flex-col md:flex-row gap-7 lg:gap-12 w-full h-full md:h-[505px] lg:px-4">
            <!-- karyawan -->
            <div class=" w-full h-full bg-white rounded-md px-7 p-5 md:p-7 lg:pl-[50px]">
                <div class=" flex justify-between">
                    <h4 class="text-[21px] md:text-[25px] lg:text-[32px] font-[600]"> Karyawan</h4>
                    <router-link :to="`/bisnis/${router}/Karyawan`"
                        class="fa-solid fa-up-right-from-square text-xl"></router-link>
                </div>
                <table class="w-full mt-9">
                    <thead>
                        <tr class=" py-4">
                            <th class=" md:text-[14px] lg:text-[16px] font-[600] text-start">Name</th>
                        </tr>
                    </thead>
                    <tbody v-for="  i  in  karyawan ">
                        <tr class="">
                            <td class=" py-4  flex items-center gap-3 text-red-600 text-[15px] font-[600]">
                                <img class="  w-[35px] h-[35px] lg:w-[40px] lg:h-[40px] rounded-full"
                                    :src="`${baseImageUrl}` + i.employee_user.user_profile_picture" alt="">
                                <span class="md:text-[12px] lg:text-[15px]">
                                    {{ i.employee_user.user_full_name }}
                                </span>
                            </td>
                            <td class="md:text-[12px] lg:text-[15px] font-[600]">{{ i.employee_position }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- asset -->
            <div class=" w-full h-full bg-white rounded-md px-7 p-5 md:p-7 lg:pl-[50px]">
                <div class=" flex justify-between">
                    <h4 class="text-[21px] md:text-[25px] lg:text-[32px] font-[600]"> Asset</h4>
                    <router-link :to="`/bisnis/${router}/assets`"
                        class="fa-solid fa-up-right-from-square text-xl"></router-link>
                </div>
                <table class="w-full mt-9">
                    <thead>
                        <tr class=" py-4">
                            <th class=" md:text-[14px] lg:text-[16px] font-[600] text-start ">Name</th>
                            <th class="md:text-[14px] lg:text-[16px] font-[600] text-start">Kondisi</th>
                        </tr>
                    </thead>
                    <tbody v-for="  i  in  asset ">
                        <tr class="">
                            <td class=" py-4  flex items-center gap-3 text-red-600 text-[15px] font-[600]">
                                <img class="  w-[35px] h-[35px] lg:w-[40px] lg:h-[40px] rounded-full"
                                    :src="`${baseImageUrl}` + i.asset_name.asset_photo" alt="">
                                <span class="md:text-[13px] lg:text-[16px]">
                                    {{ i.asset_name }}
                                </span>
                            </td>
                            <td class=" md:text-[14px] lg:text-[16px] font-[600]">{{ i.asset_condition }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div v-show="loading == false" class=" w-full h-[389px] bg-white rounded-md p-3 md:p-7">
            <!-- Target -->
            <h1 class=" text-[25px] md:text-[32px] font-[600]"> Target & Pencapaian</h1>
            <table class="w-full mt-9">
                <thead>
                    <tr class=" py-4">
                        <th class=" text-[17px] md:text-[20px] font-[600] text-start ">Deskripsi</th>
                        <th class=" text-[17px] md:text-[20px] font-[600] text-start ">Target</th>
                        <th class="text-[17px] md:text-[20px] font-[600] text-start">Status</th>
                    </tr>
                </thead>
                <tbody v-for=" i in target">
                    <tr class="">
                        <td class=" py-4  flex items-center gap-3 text-[14px] md:text-[15px] font-[600]">
                            {{ i.target_description }}
                        </td>
                        <td class="text-[14px] md:text-[15px] font-[600]"> {{ formatDatee(i.target_end_date) }}</td>
                        <td class="text-[14px] md:text-[15px] font-[600]">
                            <!-- <span class="p-2" :style="{ backgroundColor: statusColor(i.target_status.name) }"> -->
                            <span :class="statusColor(i.target_status.name)" class="p-2 rounded-sm">
                                {{ i.target_status.name }}
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class=" w-full text-start p-5 pl-[65px] shadow-sm bg-slate-200">
        <span> © 2023 <router-link to="/dashboard" class=" text-red-500 text-[14px]">jruhub.com.</router-link> All rights
            reserved.
        </span>
    </div>
</template>
<script setup>
definePageMeta({
    layout: "layouts"
})

import { useSidebarStore } from '../../../stores/Store';
import { formatDate, useDateFormat } from '@vueuse/core'


const openSideBar = useSidebarStore();
import { ref, defineProps } from 'vue';

const statusColor = (statusName) => {
    if (statusName === "Berlangsung") {
        return "bg-blue-400"
        // return "#00FFFF";
    } else if (statusName === "Selesai") {
        return "bg-yellow-400";
    } else if (statusName === "Batal") {
        return "bg-red-500";
    } else {
        return "transparent"; // Atur warna default sesuai kebutuhan
    }
};



//==============================Usefect Data =======================================
const baseImageUrl = import.meta.env.VITE_BASE_IMAGE_URL;
const loading = ref(false)
import { useRoute } from "vue-router";


const route = useRoute()
const id_bisnis = route.params.Usaha;

const router = ref(null)

const logo = ref(null);
const namaBisnis = ref(null);
const deskripsiBisnis = ref(null);

const pemilik = ref(null)
const pendamping = ref([]);
const karyawan = ref([]);
const asset = ref([]);
const target = ref([]);

const formatDatee = (date) => {
    return useDateFormat(date, 'DD MMMM YYYY').value
}

async function getDetailBisnis() {
    const token = localStorage.getItem("token");
    const url = `${import.meta.env.VITE_BASE_API_URL}/business/detail/${id_bisnis}`;
    loading.value = true

    await useFetch(url, {
        method: "get",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => {
        setTimeout(() => {
            // deskripsi
            logo.value = res.data.value.data.business.business_logo;
            namaBisnis.value = res.data.value.data.business.business_name;
            deskripsiBisnis.value = res.data.value.data.business.business_description;
            //ruote
            router.value = res.data.value.data.business.business_slug;
            //owner
            pemilik.value = res.data.value.data.business_owners;
            //pendamping
            pendamping.value = res.data.value.data.business_companion;
            //karyawan
            karyawan.value = res.data.value.data.business_employees;
            //asset
            asset.value = res.data.value.data.business_assets;
            //terget
            target.value = res.data.value.data.business_target;

            loading.value = false
        }, 500)
    }).catch(err => {
        console.log(err)
    })
}

onBeforeMount(async () => {
    setTimeout(() => {
        getDetailBisnis();
    }, 200)
})

//==================================================Breadcrumb ================================

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
    makeBreadcrumbs()
})

</script>
<style >
.active-link {
    background-color: #007bff;
    /* Atur warna latar belakang untuk tautan yang aktif */
    color: #fff;
    /* Atur warna teks untuk tautan yang aktif */
}
</style>