<template>
    <div :class="dataOpenSideBar ? 'md:ml-[200px] lg:ml-[300px] w-full duration-300' : 'w-full duration-300'">
        <Pagename :dataOpenSideBar="dataOpenSideBar" :activeLink="activeLink" :links="links" :generateLink="generateLink"
            :capitalizeFirstLetter="capitalizeFirstLetter" />
        <!-- :openSideBar="openSideBar.openSideBar" -->
        <TopBar class=" hidden md:block" :toggleSideBar="openSideBar.toggleSideBar" :openSideBar="openSideBar.openSideBar"
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
    activeLink: String,
    // generateLink: Function,
    // capitalizeFirstLetter: Function,
    // links: Array,
});

import { useSidebarStore } from '../stores/Store';
const openSideBar = useSidebarStore();

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