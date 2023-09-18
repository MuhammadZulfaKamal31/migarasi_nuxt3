<template>
    <div class="fixed z-20">
        <div class=" bg-white h-screen md:h-screen font-inter md:z-0" id="SideBar"
            :class="dataOpenSideBar == true ? ' w-[150px] md:w-[300px]' : ' w-0'">
            <div class=" flex justify-center py-10">
                <nuxt-link to="/Bisnis" :class="{ 'active-link': isCurrentRoute('/Bisnis') }">
                    <img class=" w-[100px] h-[27px]" src="../assets/image1.png" alt="">
                </nuxt-link>
            </div>
            <!-- sidebar -->
            <div class="">
                <div class=" mx-5 my-5 text-[11px] w-[59px] text-[#A3A3A3] font-[500]">Dashboard</div>
                <div class=" my-3">
                    <my-custom-link class=" mx-5 text-[14px] font-[600] flex flex-row items-center gap-1" to="/Dashboard">
                        <span class="fa-solid fa-gauge hidden md:block">
                        </span>
                        <span> Beranda</span>
                    </my-custom-link>
                </div>
                <div class=" mx-5 my-5 text-[11px] w-[59px] text-[#A3A3A3] font-[500]">Businness
                </div>
                <div class=" my-3">
                    <my-custom-link class=" mx-5 text-[14px] font-[600] flex flex-row items-center gap-1" to="/Bisnis">
                        <i class="fa-solid fa-globe"></i>
                        <span>
                            Usaha Saya
                        </span>
                    </my-custom-link>
                </div>
                <div class=" my-3">
                    <router-link class=" mx-5 text-[14px] font-[600] flex flex-row items-center gap-1"
                        to="/Pendampingan/Pendampingan">
                        <i class="fa-solid fa-address-book"></i>
                        <span>
                            Pendampingan
                        </span>
                    </router-link>
                </div>
                <div class=" my-3">
                    <router-link class=" mx-5 text-[14px] font-[600] flex flex-row items-center gap-1" to="/Circle">
                        <i class="fa-solid fa-bullseye"></i>
                        <span>
                            Circle
                        </span>
                    </router-link>
                </div>
                <div class=" mx-5 my-5 text-[11px] w-[59px] text-[#A3A3A3] font-[500] flex flex-row items-center gap-1">
                    JRUHUB</div>
                <div class=" my-3">
                    <router-link class=" mx-5 text-[14px] font-[600] flex flex-row items-center gap-1" to="/Bisnis">
                        <i class="fa-solid fa-briefcase"></i>
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
                    <router-link class=" mx-5 text-[14px] font-[600] flex flex-row items-center gap-1" to="/Bisnis"><span
                            class="fa-solid fa-gauge hidden md:block"></span>
                        <span>
                            JRUPOS
                        </span>
                    </router-link>
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
// import { ref } from 'vue';

const props = defineProps({
    dataOpenSideBar: Boolean
});

import MyCustomLink from '~/components/MyCustomLink.vue';
//======================================================

import { useRoute } from 'vue-router';

const route = useRoute();

function isCurrentRoute(routeName) {
    return route.path === routeName;

}

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

.active-link {
    background-color: #007bff;
    /* Atur warna latar belakang untuk tautan yang aktif */
    color: #fff;
    /* Atur warna teks untuk tautan yang aktif */
}
</style>