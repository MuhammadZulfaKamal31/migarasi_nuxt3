<template>
    <div :class="dataOpenSideBar ? 'md:ml-[200px] lg:ml-[300px] w-full duration-300' : 'w-full duration-300'">
        <div class=" hidden md:block">
            <div class="  md:flex top-36 flex flex-row absolute justify-center px-50 px-5" :class="{
                'ml-[2%] md:w-[70%] lg:w-[69%] xl:w-[74%] duration-300': dataOpenSideBar,
                ' ml-[5%] w-[90%] duration-300': !dataOpenSideBar
            }">
                <div
                    class="bg-white shadow-xl w-full md:h-16 lg:h-20 rounded-xl flex flex-row justify-between items-center px-5">
                    <h2 class="text-2xl font-bold">{{ activeLink }}</h2>
                    <div class="flex flex-row space-x-2 font-semibold text-sm text-red-500">
                        <div v-for="(link, index) in links " :key="index">
                            <nuxt-link :to="generateLink(index)"
                                class=" hover:text-gray-800 hover:bg-gray-600 hover:bg-opacity-10 p-1 rounded-sm">
                                {{ capitalizeFirstLetter(link) }}
                            </nuxt-link>
                            <span v-if="!(link === links[links.length - 1])" class=" ml-1">/</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- :openSideBar="openSideBar.openSideBar" -->
        <TopBar class=" hidden md:block" :toggleSideBar="openSideBar.toggleSideBar"
            :class="openSideBar.openSideBar ? 'w-[1135px] duration-300' : 'w-[1425px] duration-300'" />
        <TopBarResponsif :toggleSideBar="openSideBar.toggleSideBar" :openSideBar="openSideBar.openSideBar"
            class=" md:hidden "></TopBarResponsif>

        <div @click="toggleCloseBar">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    dataOpenSideBar: Boolean,
    generateLink: Function,
    // capitalizeFirstLetter: Function,
    links: null,
    activeLink: String
});

import { useSidebarStore } from '../stores/Store';
const openSideBar = useSidebarStore()

// menutup layar mobile satu arah saja
const toggleCloseBar = () => {
    if (window.innerWidth < 768) {
        openSideBar.closeSideBar()
    }
}

//menutup tampilan sidebar Mobile
if (process.client) {
    if (window.innerWidth < 768) {
        openSideBar.openSideBar = false;
    }
}

</script>

<style lang="scss" scoped></style>