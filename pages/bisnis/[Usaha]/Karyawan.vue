<template >
    <div class=" w-full h-full md:p-11 px-7 pt-14 md:pt-14 flex flex-col md:flex-row gap-7 bg-slate-200"
        :class="sideBar.openSideBar ? ' md:px-[6%] lg:pl-[5%] duration-300' : ' md:px-16 lg:px-24 duration-300'">
        <!-- <div class=" h-[77px]  bg-white rounded-md flex items-center justify-between px-6 absolute md:top-36 invisible md:visible"
            :class="sideBar.openSideBar ? ' duration-300 md:w-[1020px]' : 'duration-300  md:w-[1240px]'">
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
        <div v-if="loading" class="h-[450px] flex justify-center py-40 bg-slate-200"
            :class="sideBar.openSideBar ? ' w-full duration-300' : 'w-full duration-300'">
            <div class="inline-block h-14 w-14 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status">
                <span
                    class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
            </div>
        </div>

        <div v-else class=" md:w-[90%] h-full flex flex-col gap-7 lg:gap-10">
            <!-- //pageName Mobile -->
            <div v-show="loading == false" class="py-[30px] md:py-0 w-full md:w-0 md:mt-0 md:hidden">
                <div class="h-10 bg-white rounded-md flex items-center justify-between px-2  ">
                    <span class=" text-[15px] md:text-2xl font-[500]"> Update Profile</span>
                    <div class=" text-[0.7rem] md:text-[15px] flex flex-row space-x-2 font-semibold text-sm text-red-500">
                        <div v-for="(link, index) in links" :key="index">
                            <nuxt-link :to="generateLink(index)" class="hover:text-black">{{ link }}</nuxt-link>
                            <span v-if="!(link === links[links.length - 1])" class="ml-2">/</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- karyawan -->
            <div class="w-full h-[428px] bg-white p-5 md:p-7 lg:p-10 rounded-md">
                <h1 class=" text-[21px] md:text-[25px] lg:text-[32px] font-[600]">Karyawan</h1>
                <table class=" w-full mt-10">
                    <thead>
                        <tr class="">
                            <td class=" md:py-2 lg:py-5 text-[17px] font-[600]">Name</td>
                        </tr>
                    </thead>
                    <tbody v-for=" i in karyawanDetail">
                        <tr class="">
                            <td @click="tampil" class=" py-3 text-red-600 text-[15px] font-[600] cursor-pointer">{{
                                i.employee_user.user_full_name }}</td>
                            <!-- <td class=" font-[600] text-[15px]">{{ i.employee_position }}</td> -->
                            <td>
                                <i class="fa-solid fa-pen-to-square"></i>
                            </td>
                            <td>
                                <i class="fa-solid fa-trash"></i>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- detil karyawan -->
            <div v-show="tampilDetail" class=" w-full h-full bg-white p-7 lg:p-10 rounded-md">
                <div v-for="i in karyawanDetail">
                    <h1 class=" text-[21px] md:text-[25px] lg:text-[32px] font-[600]"> Detil Karyawan</h1>
                    <div class=" md:pl-0 pl-7 lg:pl-7 mt-7">
                        <div class=" w-[200px] h-[200px] lg:w-[241px] lg:h-[241px] rounded-full bg-[#D9D9D9]">
                            <img :src="`${baseImageUrl}` + i.employee_user.user_profile_picture" alt="">
                        </div>
                        <div class=" flex md:justify-start">
                            <div class=" py-10 flex flex-col items-center ">
                                <h2 class=" text-[22px] md:text-[23px] lg:text-[29px] font-[500] py-2">{{
                                    i.employee_user.username }} Comming Soon
                                </h2>
                                <p class="text-[13px] font-[500]"> {{ i.employee_user.email }} Comming Soon</p>
                            </div>
                        </div>
                    </div>
                    <div class=" py-5">
                        <label for="" class=" text-[14px] font-[500]"> Posisi</label>
                        <p class=" text-[22px] md:text-[23px] lg:text-[29px] font-[600]">{{ i.employee_position }}</p>
                    </div>
                    <div class=" py-5">
                        <label for="" class=" text-[14px] font-[500]"> Gaji Pokok</label>
                        <p class=" text-[22px] md:text-[23px] lg:text-[29px] font-[600]">{{ i.employee_salary }}</p>
                    </div>
                    <div class=" py-5">
                        <label for="" class=" text-[14px] font-[500]"> Uang Makan</label>
                        <p class=" text-[22px] md:text-[23px] lg:text-[29px] font-[600]">Rp500.000,00</p>
                    </div>
                    <div class=" py-5">
                        <label for="" class=" text-[14px] font-[500]"> Tahun Masuk</label>
                        <p class=" text-[22px] md:text-[23px] lg:text-[29px] font-[600]">{{ i.employee_join_date }}</p>
                    </div>
                    <div class=" py-5">
                        <label for="" class=" text-[14px] font-[500]"> Jumlah Kesehatan</label>
                        <p class=" text-[22px] md:text-[23px] lg:text-[29px] font-[600]"> {{
                            i.employee_bpjs_ketenagakerjaan
                        }}</p>
                    </div>

                </div>

            </div>
        </div>
        <!-- Tambah Karyawan -->
        <div v-show="loading == false" class=" w-full h-full bg-white p-10 rounded-md">
            <h1 class=" text-[21px] md:text-[25px] lg:text-[32px] font-[600] lg:pb-5">Tambah Karyawan</h1>
            <form action="">
                <div class=" py-4">
                    <input placeholder=" Pilih User" type="text"
                        class=" h-[58px] w-full bg-[#FAFAFA] border-2 outline-none px-2 focus:border-red-500 rounded-md">
                </div>
                <div class=" py-4">
                    <input placeholder=" Posisi" type="text"
                        class=" h-[58px] w-full bg-[#FAFAFA] border-2 outline-none px-2 focus:border-red-500 rounded-md">
                </div>
                <div class=" py-4">
                    <input placeholder=" Gaji Pokok" type="text"
                        class=" h-[58px] w-full bg-[#FAFAFA] border-2 outline-none px-2 focus:border-red-500 rounded-md">
                </div>
                <div class=" py-4">
                    <input placeholder=" Uang Makan" type="text"
                        class=" h-[58px] w-full bg-[#FAFAFA] border-2 outline-none px-2 focus:border-red-500 rounded-md">
                </div>
                <div class=" py-2">
                    <label for="tanggalMasuk" class="block mb-2 text-slate-400">Tanggal
                        Masuk</label>
                    <input placeholder=" Tahun Masuk" type="date"
                        class=" h-[58px] w-full bg-[#FAFAFA] border-2 outline-none px-2 focus:border-red-500 rounded-md">
                </div>
                <div class=" flex items-center gap-2 my-3">
                    <input type="radio" class=" w-[19px] h-[19px] bg-slate-300">
                    <span class=" text-[#A3A3A3] text-[15px]"> Aktif</span>
                </div>
                <div class=" flex items-center gap-2 my-3 pb-7">
                    <input type="radio" class=" rounded-md w-[19px] h-[19px] bg-slate-300">
                    <span class=" text-[#A3A3A3] text-[15px]">Tidak Aktif</span>
                </div>
                <button class=" bg-red-600 p-4 text-center w-full text-white">Simpan</button>
            </form>
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

const sideBar = useSidebarStore();

const tampilDetail = ref(false)

const tampil = () => {
    tampilDetail.value = true
}

//=====================================USEfETCH API ==========================
// const route = useRoute();
// const id_business = route.params.DetailKaryawan;

// const { data: karyawan } = await useFetch(`${import.meta.env.VITE_BASE_API_URL}/business/detail/${id_business}/employees`, {
//     method: "GET",
//     headers: {
//         'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk4MDQ0MzM4LCJpYXQiOjE2OTI4NDg0MTEsImp0aSI6IjJmMjQ0ODU2OTE1ODQ2Y2U5NWMxMjgzZDY5OWZlZWZjIiwidXNlcl9pZCI6MX0.VgqE4tN8lrZIPUGq8UjURZXigpdF7z5MvUsh5_cRqB0`,
//     },
// })

//=================================== UsefeFetch API =================================

const loading = ref(false);

import { useRoute } from 'vue-router';
const route = useRoute();
const id_bisnis = route.params.Usaha;
const karyawanDetail = ref([]);
const pageName = ref(null)

async function getBisnis() {
    loading.value = true;
    const token = localStorage.getItem("token");
    console.log(token)
    const url = `${import.meta.env.VITE_BASE_API_URL}/business/detail/${id_bisnis}/employees`;

    await useFetch(url, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => {
        setTimeout(() => {
            karyawanDetail.value = res.data.value.data;
            pageName.value = res.data.value.business;
            loading.value = false
            console.log(res.data)
        }, 1000)

    }).catch(err => {
        console.log(err)
    })
}

onBeforeMount(async () => {
    await getBisnis();
})

//==========================================BreadCrumb ==========================================
const links = ref([]);
const makeBreadcrumbs = () => {
    const routeName = useRoute().path;
    links.value = routeName.split("/").filter((i) => i !== "");
}

const generateLink = (index) => {
    const subLinks = links.value.slice(0, index + 1)
    console.log("links " + links)
    console.log("sublinks " + subLinks)
    return '/' + subLinks.join("/");
}

onMounted(() => {
    makeBreadcrumbs()
})

</script>
<style setup></style>