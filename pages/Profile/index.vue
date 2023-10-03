<template>
    <div class=" h-full md:h-screen lg:max-h-full bg-slate-200 lg:pt-4">
        <div class=' flex flex-col gap-5 font-inter pr-[10%]  md:pt-2 '
            :class="sideBar.openSideBar ? ' px-[6%] md:px-[2%] md:pr-[6%] lg:px-[3%] lg:pr-[6%] duration-300' : 'px-[6%] md:px-[5%] md:pr-[8%] lg:px-[6%] duration-300'">

            <!-- pageName -->
            <!-- <div class=" md:h-[77px] h-8 bg-white rounded-md flex w-[85%] items-center justify-between px-2 md:px-6 fixed md:absolute top-14 md:top-36 md:z-0 z-10 shadow-xl md:shadow-none"
                :class="sideBar.openSideBar ? ' duration-300 md:w-[1000px]' : 'duration-300  md:w-[1200px]'">
                <span class=" text-[14px] md:text-2xl font-[500]">Profile</span>
                <div class=" text-[0.6rem] md:text-[15px] flex flex-row space-x-2 font-semibold text-sm text-red-500">
                    <div v-for="(link, index) in links ">
                        <nuxt-link :to="generateLink(index)" class=" hover:text-black">
                            {{ link }}
                            <span v-if="!(link === links[links.length - 1])" class=" ml-2">/</span>
                        </nuxt-link>
                    </div>
                </div>
            </div> -->

            <!-- loading -->
            <div v-if="loading" class=" w-full h-[700px] md:h-[510px] flex justify-center py-40 bg-slate-200">
                <div class="inline-block h-14 w-14 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status">
                    <span
                        class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                </div>
            </div>
            <div v-else class='flex md:flex-row flex-col md:h-[474px] md:mt-[40px] justify-between gap-6 md:pt-0'>
                <!-- //pageName Mobile -->
                <div v-show="loading == false" class="py-[30px] md:py-0 w-full md:w-0 mt-14 md:mt-0">
                    <div class="h-10 bg-white rounded-md flex items-center justify-between px-2 md:invisible ">
                        <span class=" text-[15px] md:text-2xl font-[500]"> Update Profile</span>
                        <div
                            class=" text-[0.7rem] md:text-[15px] flex flex-row space-x-2 font-semibold text-sm text-red-500">
                            <div v-for="(link, index) in links" :key="index">
                                <nuxt-link :to="generateLink(index)" class="hover:text-black">{{ link }}</nuxt-link>
                                <span v-if="!(link === links[links.length - 1])" class="ml-2">/</span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- profile -->
                <div class=" h-full lg:w-[70%] bg-[#FFFFFF] p-7 rounded-md">
                    <div class=" flex justify-between">
                        <h1 class=" text-[21px] md:text-[25px] lg:text-[32px] font-[600]"> info Profil</h1>
                        <router-link to="/Profile/updateProfile" class="fa-solid fa-pen-to-square"></router-link>
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
                        <p class=" text-[13px] font-[500]">{{ alamat }}</p>
                    </div>
                    <div class=" my-5">
                        <label class="text-gray-400 text-[13px]">Tahun Lahir</label>
                        <p class=" text-[15px] font-[600]">{{ formatDate }}</p>
                    </div>
                </div>
                <div class=" h-full w-full flex flex-col  gap-6">
                    <div class=" flex flex-col lg:flex-row gap-3 md:gap-10 md:h-[725px] w-full rounded-md">
                        <!-- lingkaran -->
                        <div class="  w-full h-[230px]  lg:w-[90%] bg-white flex justify-center items-center rounded-md">
                            <img class=" h-[175px] w-[175px] rounded-full object-cover"
                                :src="`${baseImageUrl}` + fotoProfile" alt="">
                        </div>
                        <!-- pendapatan -->
                        <div class=" w-full px-3 md:p-5 bg-white py-3 lg:p-6 rounded-md">
                            <div class=" flex justify-between">
                                <h1 class="text-[21px] md:text-[22px] lg:text-[32px] font-[600]">Pendapatan</h1>
                                <nuxt-link to="/Profile/Pendapatan" class="fa-solid fa-up-right-from-square"></nuxt-link>
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
                    <div class=" h-full w-full bg-white mb-10 rounded-md p-4 lg:p-6">
                        <h1 class=" text-[21px] md:text-[25px] lg:text-[32px] font-[600]">Circle</h1>
                        <div class=" flex items-center my-3 justify-between">
                            <div class="h-[90px] w-[190px] md:hidden lg:block">
                                <img class=" h-[70px] w-[70px] rounded-full object-cover"
                                    :src="`${baseImageUrl}` + circleLogo" alt="">
                            </div>
                            <div class=" mx-2 lg:mx-3">
                                <h1 class=" text-xl mb-3">{{ circleName }}</h1>
                                <p class=" text-[13px] font-[500]">
                                    {{ circleAlamat }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class=' h-[552px] w-full bg-white rounded-md'>
                <h1 class=" text-xl p-7">History</h1>
            </div> -->
        </div>
    </div>
    <div class=" w-full text-start p-5 pl-[65px] shadow-sm py-10 bg-slate-200">
        {{ circleName }}
        <span> © 2023 <router-link to="/dashboard" class=" text-red-500 text-[14px]">jruhub.com.</router-link> All
            rights reserved.</span>
    </div>
</template>


<script setup>
definePageMeta({
    layout: "layouts",
    // middleware: ["auth"]
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

const circleName = ref(null)
const circleAlamat = ref(null)
const circleLogo = ref(null)

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

            //circle
            circleName.value = res.data.value.circle.circle_id.circle_name;
            circleAlamat.value = res.data.value.circle.circle_id.circle_address;
            circleLogo.value = res.data.value.circle.circle_id.circle_logo;

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

//=====================================BreadCrumbs ==================================

import { useRoute } from '#vue-router';

const links = ref([]);
const makeBreadcrumbs = () => {
    const routeName = useRoute().name;
    links.value = routeName.split("-");
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

<style></style>