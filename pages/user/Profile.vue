<template>
    <div class=" h-full md:max-h-full bg-slate-200">
        <!-- loading -->
        <div v-if="loading" class=" w-[78%] h-[78%] flex justify-center py-40 bg-slate-50 absolute">
            <div class="inline-block h-14 w-14 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status">
                <span
                    class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
            </div>
        </div>

        <div class=' flex flex-col gap-5 font-inter pr-[10%] pt-10 md:pt-2 '
            :class="sideBar.openSideBar ? 'md:px-[5%] md:pr-[7%] duration-300' : 'px-[6%] duration-300'">
            <!-- pageName -->
            <div class=" h-[77px]  bg-white rounded-md flex items-center justify-start px-6 absolute md:top-36 invisible md:visible"
                :class="sideBar.openSideBar ? ' duration-300 md:w-[995px]' : 'duration-300 md:w-[1200px]'">
                <span class=" text-2xl font-[500]">Profile</span>
            </div>
            <div class='flex md:flex-row flex-col md:h-[474px] mt-[40px] justify-between gap-6'>
                <!-- profile -->
                <div class=" h-full md:w-[70%] bg-[#FFFFFF] p-7 rounded-md">
                    <div class=" flex justify-between">
                        <h1 class=" text-[24px] font-[600]"> info Profil</h1>
                        <router-link to="/user/updateProfile" class="fa-solid fa-pen-to-square"></router-link>
                    </div>
                    <div class=" my-5">
                        <label class="text-gray-400 text-[13px]">Nama</label>
                        <p class=" text-[15px] font-[600]">{{ nama }}</p>
                    </div>
                    <div class=" my-5">
                        <label class="text-gray-400 text-[13px]">Email</label>
                        <p class=" text-[15px] font-[600]">{{ email }}</p>
                    </div>
                    <div class=" my-5">
                        <label class="text-gray-400 text-[13px]">Nomor Telepon</label>
                        <p class=" text-[15px] font-[600]">{{ noTelp }}</p>
                    </div>
                    <div class=" my-5">
                        <label class="text-gray-400 text-[13px]">Alamat</label>
                        <p class=" text-[13px] font-[400]">{{ alamat }}</p>
                    </div>
                    <div class=" my-5">
                        <label class="text-gray-400 text-[13px]">Tahun Lahir</label>
                        <p class=" text-[15px] font-[600]">{{ formatDate }}</p>
                    </div>
                </div>
                <div class=" h-full w-full flex flex-col  gap-6">
                    <div class=" flex flex-col md:flex-row gap-3 md:gap-10 md:h-[725px] w-full rounded-md">
                        <!-- lingkaran -->
                        <div class="  w-full h-[230px]  md:w-[90%] bg-white flex justify-center items-center rounded-md">
                            <img class=" h-[175px] w-[175px] rounded-full object-cover"
                                :src="`${baseImageUrl}` + fotoProfile" alt="">
                        </div>
                        <!-- pendapatan -->
                        <div class=" w-full px-3 md:px-10 bg-white py-3 md:p-6 rounded-md">
                            <div class=" flex justify-between">
                                <h1 class="text-xl">Pendapatan</h1>
                                <router-link to="/User/Pendapatan" class="fa-solid fa-up-right-from-square"></router-link>
                            </div>
                            <div class="m-1">
                                <label class=" font-[500] text-[13px] text-slate-400" for="">Gaji</label>
                                <p class=" text-[15px] font-[700]"> Rp {{ totalGaji }}</p>
                            </div>
                            <div class="m-1">
                                <label class=" font-[500] text-[13px] text-slate-400" for="">SHU</label>
                                <p class=" text-[15px] font-[700]">RP {{ shu }}</p>
                            </div>
                            <div class="m-1">
                                <label class=" font-[500] text-[13px] text-slate-400" for="">Total Pendapatan</label>
                                <p class=" text-[15px] font-[700]">RP {{ totalPendapatan }}</p>
                            </div>
                        </div>
                    </div>
                    <!-- circle -->
                    <div class=" h-full w-full bg-white mb-10 rounded-md p-6">
                        <h1 class=" text-2xl">Circle</h1>
                        <div class=" flex items-center my-3">
                            <img class=" h-[70px] w-[110px] rounded-full object-cover"
                                :src="`${baseImageUrl}` + fotoProfile" alt="">
                            <div class=" mx-3">
                                <h1 class=" text-xl mb-3">Komune</h1>
                                <p class=" text-[13px]">
                                    Jl. Tampomas Sel. No.54, RT.001/RW.002, Petompon, Kec. Gajahmungkur, Kota Semarang,
                                    Jawa
                                    Tengah 50131</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class=' h-[552px] w-full bg-white rounded-md'>
                <h1 class=" text-xl p-7">History</h1>
            </div> -->
        </div>
        <div class=" w-full text-start p-5 pl-[65px] shadow-sm py-10">
            <span> © 2023 <router-link to="/dashboard" class=" text-red-500 text-[14px]">jruhub.com.</router-link> All
                rights reserved.</span>
        </div>
    </div>
</template>


<script setup>
definePageMeta({
    layout: "layouts"
})

import { useSidebarStore } from '../../stores/Store';
import { useNow, useDateFormat } from '@vueuse/core'


const sideBar = useSidebarStore()

//=====================================GET UseFetch Api Profile======================================

const baseImageUrl = import.meta.env.VITE_BASE_IMAGE_URL;
const loading = ref(false)

const nama = ref(null);
const email = ref(null);
const noTelp = ref(null);
const alamat = ref(null);
const thnLahir = ref(null);
const formatDate = useDateFormat(thnLahir, "DD MMMM YYYY");
const fotoProfile = ref(null);

async function getProfile() {
    const token = localStorage.getItem("token");
    console.log(token)
    const url = `${import.meta.env.VITE_BASE_API_URL}/user/my-profile`;
    loading.value = true

    await useFetch(url, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => {
        setTimeout(() => {
            console.log(res.data)
            nama.value = res.data.value.data.user_full_name;
            email.value = res.data.value.data.user.email;
            noTelp.value = res.data.value.data.user_phone;
            alamat.value = res.data.value.data.user_address;
            thnLahir.value = res.data.value.data.user_birth_date;

            fotoProfile.value = res.data.value.data.user_profile_picture;
            loading.value = false
        }, 2000)

    }).catch(err => {
        console.log(err);
    })
}


//================================ Get Usefetch API Pendapatan====================

const totalGaji = ref(null);
const shu = ref(null);
const totalPendapatan = ref(null);

const getPendapatan = async () => {
    const token = localStorage.getItem("token");

    const url = `${import.meta.env.VITE_BASE_API_URL}/user/my-profile/income`

    await useFetch(url, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    }).then(res => {
        totalGaji.value = res.data.value.data.total_employee_salary;
        shu.value = res.data.value.data.total_shu;
        totalPendapatan.value = res.data.value.data.total_companion_salary;
    })
}

onBeforeMount(async () => {
    await getProfile();
    await getPendapatan();
})


</script>

<style></style>