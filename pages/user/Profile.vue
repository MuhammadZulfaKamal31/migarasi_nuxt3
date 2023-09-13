<template>
    <div class=" h-[1900px] md:h-[1160px] bg-slate-200">
        <div class=' flex flex-col gap-5 font-inter pr-[10%] pt-10 md:pt-2 '
            :class="sideBar.openSideBar ? 'md:px-[5%] md:pr-[26%] duration-300' : 'px-[7%] duration-300'">
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
                        <p class=" text-[15px] font-[600]">{{ thnLahir }}</p>
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
                                <p class=" text-[15px] font-[700]">RP5.000.000</p>
                            </div>
                            <div class="m-1">
                                <label class=" font-[500] text-[13px] text-slate-400" for="">SHU</label>
                                <p class=" text-[15px] font-[700]">RP5.000.000</p>
                            </div>
                            <div class="m-1">
                                <label class=" font-[500] text-[13px] text-slate-400" for="">Total Pendapatan</label>
                                <p class=" text-[15px] font-[700]">RP10.000.000</p>
                            </div>
                        </div>
                    </div>
                    <!-- circle -->
                    <div class=" h-full w-full bg-white mb-10 rounded-md p-6">
                        <h1 class=" text-2xl">Circle</h1>
                        <div class=" flex items-center my-3">
                            <img class=" h-[70px] w-[70px] rounded-full object-cover" :src="`${baseImageUrl}` + fotoProfile"
                                alt="">
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
            <div class=' h-[552px] w-full bg-white rounded-md'>
                <h1 class=" text-xl p-7">History</h1>
                {{ userProfil }}
            </div>
        </div>
        <div class=" w-full text-start p-5 pl-[65px] shadow-sm">
            {{ circle }}
            <span> © 2023 <span class=" text-red-500 text-[14px]">jruhub.com.</span> All rights reserved.</span>
        </div>
    </div>
</template>
<script setup>
definePageMeta({
    layout: "layouts"
})

import { useSidebarStore } from '../../stores/Store';

const sideBar = useSidebarStore()

//=====================================UseFetch Api======================================
const baseImageUrl = import.meta.env.VITE_BASE_IMAGE_URL;

const nama = ref(null);
const email = ref(null);
const noTelp = ref(null);
const alamat = ref(null);
const thnLahir = ref(null);

const fotoProfile = ref(null)

async function getProfile() {
    const token = localStorage.getItem("token");
    console.log(token)
    const url = `${import.meta.env.VITE_BASE_API_URL}/user/my-profile`;

    await useFetch(url, {
        method: "get",
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
        }, 1000)

    }).catch(err => {
        console.log(err)
    })
}

onBeforeMount(async () => {
    await getProfile();
})

</script>

<style></style>