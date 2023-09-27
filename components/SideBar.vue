<template>
    <div class="fixed z-20">
        <div class=" bg-white h-screen md:h-screen font-inter md:z-0" id="SideBar"
            :class="dataOpenSideBar == true ? ' w-[150px] md:w-[300px]' : ' w-0'">
            <div class=" flex justify-center py-10">
                <nuxt-link to="/dashboard">
                    <img class=" w-[100px] h-[27px]" src="../assets/image1.png" alt="">
                </nuxt-link>
            </div>
            <!-- sidebar -->
            <div class="">
                <div class=" mx-5 my-5 text-[11px] w-[59px] text-[#A3A3A3] font-[500]">Dashboard</div>
                <div class=" my-3">
                    <router-link class=" mx-5 text-[14px] font-[600] flex flex-row items-center gap-1" to="/dashboard"
                        @click="aktifLink.setActive('/dashboard')"
                        :class="aktifLink.aktifLink === '/dashboard' ? 'bg-slate-200 text-slate-600 p-1 rounded-md' : ''">
                        <span class="fa-solid fa-gauge hidden md:block">
                        </span>
                        <span> Beranda</span>
                    </router-link>
                </div>
                <div class=" mx-5 my-5 text-[11px] w-[59px] text-[#A3A3A3] font-[500]">Businness
                </div>
                <div class=" my-3">
                    <router-link class=" mx-5 text-[14px] font-[600] flex flex-row items-center gap-1" to="/Bisnis"
                        @click="aktifLink.setActive('/bisnis')"
                        :class="aktifLink.aktifLink === '/bisnis' ? 'bg-slate-200 text-slate-600 p-1 rounded-md' : ''">
                        <i class="fa-solid fa-globe hidden md:block"></i>
                        <span>
                            Usaha Saya
                        </span>
                    </router-link>
                </div>
                <div class=" my-3">
                    <router-link class=" mx-5 text-[14px] font-[600] flex flex-row items-center gap-1" to="/Pendampingan"
                        @click="aktifLink.setActive('/pendamping')"
                        :class="aktifLink.aktifLink === '/pendamping' ? 'bg-slate-200 text-slate-600 p-1 rounded-md' : ''">
                        <i class="fa-solid fa-address-book hidden md:block"></i>
                        <span>
                            Pendampingan
                        </span>
                    </router-link>
                </div>
                <div class=" my-3">
                    <router-link class=" mx-5 text-[14px] font-[600] flex flex-row items-center gap-1" to="/circle"
                        @click="aktifLink.setActive('/circle')"
                        :class="aktifLink.aktifLink === '/circle' ? 'bg-slate-200 text-slate-600 p-1 rounded-md' : ''">
                        <i class="fa-solid fa-bullseye hidden md:block"></i>
                        <span>
                            Circle
                        </span>
                    </router-link>
                </div>
                <div class=" mx-5 my-5 text-[11px] w-[59px] text-[#A3A3A3] font-[500] flex flex-row items-center gap-1">
                    JRUHUB</div>
                <div class=" my-3">
                    <router-link class=" mx-5 text-[14px] font-[600] flex flex-row items-center gap-1" to="/Bisnis">
                        <i class="fa-solid fa-briefcase hidden md:block"></i>
                        <span>
                            JRUWAY
                        </span>
                    </router-link>
                </div>
                <div class=" my-3">
                    <router-link class=" mx-5 text-[14px] font-[600] flex flex-row items-center gap-1" to="/Bisnis"><span
                            class="fa-solid fa-gauge hidden md:block"></span>
                        <span>
                            JRU INSTITUT
                        </span>
                    </router-link>
                </div>
                <div class=" my-3">
                    <router-link class=" mx-5 text-[14px] font-[600] flex flex-row items-center gap-1" to="/Bisnis"><span
                            class="fa-solid fa-gauge hidden md:block"></span>
                        <span>
                            JRUWORK
                        </span>
                    </router-link>
                </div>
                <div class=" my-3">
                    <nuxt-link class=" mx-5 text-[14px] font-[600] flex flex-row items-center gap-1" to="/Bisnis"><span
                            class="fa-solid fa-gauge hidden md:block"></span>
                        <span>
                            JRUPOS
                        </span>
                    </nuxt-link>
                </div>
                <div class=" my-3">
                    <router-link class=" mx-5 text-[14px] font-[600] flex flex-row items-center gap-1" to="/Bisnis"><span
                            class="fa-solid fa-gauge hidden md:block"></span>
                        <span>
                            Stok Undangan
                        </span>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>

import { defineProps } from 'vue';
import { useAktifLinkStore } from '../stores/AktifLinkStore'
const props = defineProps({
    dataOpenSideBar: Boolean
});

const aktifLink = useAktifLinkStore();

//======================================================

// const setActive = (route) => {
//     localStorage.setItem('activeLink', route);
// };

// const isActive = (route) => {
//     return localStorage.getItem('activeLink') === route;
// };

// import { ref, onMounted } from 'vue';
// const aktifLink = ref('/dashboard');

// const setActive = (route) => {
//     if (process.client) {
//         sessionStorage.setItem('activeLink', route);
//         aktifLink.value = sessionStorage.getItem('activeLink');
//         console.log(coba.value);
//     }
// };

// const isActive = () => {
//     if (process.client) {
//         coba.value = sessionStorage.getItem('activeLink')
//     }
//     // return true; // Ini akan mencegah kesalahan ketika kode berjalan di sisi server
// };

// onMounted(() => {
//     isActive();
// })

//==================================================

</script>
<style>
#SideBar {
    overflow: hidden;
    transition: 300ms;
}

.SideBarVisible {
    width: 300px;
    position: fixed;
}

.SideBarClose {
    width: 0px;
}

.active {
    color: red;
}

.active1 {
    color: blue;
}

/* .active-link {
    background-color: #f1f1f1;
    color: #fff;
} */
</style>

<!-- <nuxt-link to="/Bisnis" :class="{ 'active-link': linkActive.isCurrentRoute('/Bisnis') }">
    <img class=" w-[100px] h-[27px]" src="../assets/image1.png" alt="">
</nuxt-link> -->