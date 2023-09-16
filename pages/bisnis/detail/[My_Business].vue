<!-- hati hati dalam penggunaan lang, karena itu masalah error  -->
<template>
    <div class=" pt-20 md:pt-16  flex flex-col gap-8 flex-wrap bg-slate-200"
        :class="openSideBar.openSideBar ? ' p-12  md:pr-[370px] duration-300' : 'p-12 md:p-20 md:pl-24 md:pr-24 duration-300 '">
        <div class=" h-[77px]  bg-white rounded-md flex items-center justify-start px-6 absolute md:top-36 invisible md:visible"
            :class="openSideBar.openSideBar ? ' duration-300 md:w-[1020px]' : 'duration-300  md:w-[1250px]'">
            <span class=" text-2xl font-[500]">Bisnis Saya</span>
        </div>

        <!-- crackinCode -->
        <div class=" w-full h-[700px] md:h-full bg-white rounded-md p-7">
            <div class=" flex justify-between">
                <div class=" flex items-center md:h-[150px]">
                    <img class=" h-11 md:h-32" :src="`${baseImageUrl}` + logo" alt="">
                    <div class="p-4">
                        <h2 class=" text-[20px] md:text-[40px] font-[700]">{{ namaBisnis }}
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
        <div class=" flex flex-col md:flex-row gap-12 w-full h-full md:h-[505px] md:px-4">
            <!-- pemilik -->
            <div class=" w-full h-full bg-white rounded-md px-7 p-5 md:p-7 md:pl-[50px]">
                <div class=" flex justify-between">
                    <h4 class=" text-[32px] font-[600]"> Pemilik</h4>
                    <router-link :to="`/bisnis/detail/detailpemilik/${router}`"
                        class="fa-solid fa-up-right-from-square text-xl">
                    </router-link>
                </div>
                <table class="w-full mt-9">
                    <thead>
                        <tr class=" py-4">
                            <th class=" text-[16px] font-[600] text-start ">Name</th>
                            <th class="text-[16px] font-[600] text-start">Share</th>
                        </tr>
                    </thead>
                    <tbody v-for="  i  in pemilik ">
                        <tr class="">
                            <td class=" py-4  flex items-center gap-3 text-red-600 text-[15px] font-[600]">
                                <img class=" w-[40px] h-[40px] rounded-full"
                                    :src="`${baseImageUrl}` + i.owner_user.user_profile_picture" alt="">
                                {{ i.owner_user.user_full_name }}
                            </td>
                            <td class="text-[15px] font-[600]">{{ i.owner_shares }}%</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- pendamping -->
            <div class=" w-full h-full bg-white rounded-md px-5 p-5 md:p-7 md:pl-[50px]">
                <div class=" flex justify-between">
                    <h4 class=" text-[32px] font-[600]"> Pendamping</h4>
                    <router-link :to="`/bisnis/detail/detailpendamping/${router}`"
                        class="fa-solid fa-up-right-from-square text-xl"></router-link>
                </div>
                <table class="w-full mt-9">
                    <thead>
                        <tr class=" py-4">
                            <th class=" text-[16px] font-[600] text-start ">Name</th>
                            <th class="text-[16px] font-[600] text-start">Jenis Pendamping</th>
                        </tr>
                    </thead>
                    <tbody v-for="i in pendamping ">
                        <tr class="">
                            <td class=" py-4  flex items-center gap-3 text-red-600 text-[15px] font-[600]">
                                <img class=" w-[40px] h-[40px] rounded-full"
                                    :src="`${baseImageUrl}` + i.companion_user.user_profile_picture" alt="">
                                {{ i.companion_user.user_full_name }}
                            </td>
                            <td class="text-[15px] font-[600]">{{ i.companion_as.name }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class=" flex flex-col md:flex-row gap-12 w-full h-full md:h-[505px] md:px-4">
            <!-- karyawan -->
            <div class=" w-full h-full bg-white rounded-md px-7 p-5 md:p-7 md:pl-[50px]">
                <div class=" flex justify-between">
                    <h4 class=" text-[32px] font-[600]"> Karyawan</h4>
                    <router-link :to="`/bisnis/detail/detailkaryawan/${router}`"
                        class="fa-solid fa-up-right-from-square text-xl"></router-link>
                </div>
                <table class="w-full mt-9">
                    <thead>
                        <tr class=" py-4">
                            <th class=" text-[18px] font-[600] text-start ">Name</th>
                            <th class="text-[18px] font-[600] text-start">Posisi</th>
                        </tr>
                    </thead>
                    <tbody v-for="  i  in  karyawan ">
                        <tr class="">
                            <td class=" py-4  flex items-center gap-3 text-red-600 text-[15px] font-[600]">
                                <img class=" w-[40px] h-[40px] rounded-full"
                                    :src="`${baseImageUrl}` + i.employee_user.user_profile_picture" alt="">
                                {{ i.employee_user.user_full_name }}
                            </td>
                            <td class="text-[15px] font-[600]">{{ i.employee_position.jabatan }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- asset -->
            <div class=" w-full h-full bg-white rounded-md px-7 p-5 md:p-7 md:pl-[50px]">
                <div class=" flex justify-between">
                    <h4 class=" text-[32px] font-[600]"> Asset</h4>
                    <router-link :to="`/bisnis/detail/detailasset/${router}`"
                        class="fa-solid fa-up-right-from-square text-xl"></router-link>
                </div>
                <table class="w-full mt-9">
                    <thead>
                        <tr class=" py-4">
                            <th class=" text-[18px] font-[600] text-start ">Name</th>
                            <th class="text-[18px] font-[600] text-start">Kondisi</th>
                        </tr>
                    </thead>
                    <tbody v-for="  i  in  asset ">
                        <tr class="">
                            <td class=" py-4  flex items-center gap-3 text-red-600 text-[15px] font-[600]">
                                <img class=" w-[40px] h-[40px] rounded-full"
                                    :src="`${baseImageUrl}` + i.asset_name.asset_photo" alt="">
                                {{ i.asset_name }}
                            </td>
                            <td class=" text-[15px] font-[600]">{{ i.asset_condition }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class=" w-full h-[389px] bg-white rounded-md p-3 md:p-7">
            <!-- Target -->
            <h1 class=" text-[25px] md:text-[32px] font-[600]"> Target & Pencapaian</h1>
            <table class="w-full mt-9">
                <thead>
                    <tr class=" py-4">
                        <th class=" text-[17px] md:text-[20px] font-[600] text-start ">Deskripsi</th>
                        <th class=" text-[17px] md:text-[20px] font-[600] text-start ">Target</th>
                        <th class="text-[17px] md:text-[20px] font-[600] text-start">Share</th>
                    </tr>
                </thead>
                <tbody v-for=" i in target">
                    <tr class="">
                        <td class=" py-4  flex items-center gap-3 text-[14px] md:text-[15px] font-[600]">
                            {{ i.target_description }}
                        </td>
                        <td class="text-[14px] md:text-[15px] font-[600]"> {{ i.target_end_date }}</td>
                        <td class="text-[14px] md:text-[15px] font-[600]">
                            <span class=" bg-[#00FFFF] p-2">{{ i.target_status.name }}</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class=" w-full text-start p-5 pl-[65px] shadow-sm bg-slate-200">
        <span> © 2023 <span class=" text-red-500 text-[14px]">jruhub.com.</span> All rights reserved.</span>
    </div>
</template>
<script setup>
definePageMeta({
    layout: "layouts"
})

import { useSidebarStore } from '../../../stores/Store';

// import DetailAsset from './detailasset/[DetailAsset].vue';

const openSideBar = useSidebarStore();


//======================usefect data===============================================

// const baseImageUrl = import.meta.env.VITE_BASE_IMAGE_URL;
// import { useRoute } from 'vue-router';

// const route = useRoute();
// const id_bisnis = route.params.My_Business;
// const { data: bisnisDetail } = useFetch(`https://admin.jruhub.com/api/v1/business/detail/${id_bisnis}`, {
//     method: "GET",
//     headers: {
//         'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk4MDQ0MzM4LCJpYXQiOjE2OTI4NDg0MTEsImp0aSI6IjJmMjQ0ODU2OTE1ODQ2Y2U5NWMxMjgzZDY5OWZlZWZjIiwidXNlcl9pZCI6MX0.VgqE4tN8lrZIPUGq8UjURZXigpdF7z5MvUsh5_cRqB0`,
//     },
// })

// console.log(bisnisDetail);

//==============================Usefect Data =======================================
const baseImageUrl = import.meta.env.VITE_BASE_IMAGE_URL;
import { useRoute } from "vue-router";

const route = useRoute()
const id_bisnis = route.params.My_Business;

const router = ref(null)

const logo = ref(null);
const namaBisnis = ref(null);
const deskripsiBisnis = ref(null);

const pemilik = ref(null)
const pendamping = ref([]);
const karyawan = ref([]);
const asset = ref([]);
const target = ref([])

async function getDetailCircle() {
    const token = localStorage.getItem("token");
    const url = `${import.meta.env.VITE_BASE_API_URL}/business/detail/${id_bisnis}`;

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
            router.value = res.data.value.data.business.id;
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
        }, 1000)

    }).catch(err => {
        console.log(err)
    })
}

onBeforeMount(async () => {
    await getDetailCircle();
})


</script>
<style ></style>