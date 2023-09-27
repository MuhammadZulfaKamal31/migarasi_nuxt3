<template>
    <div class="w-full h-full flex" v-if="cekToken">
        <Sidebar :dataOpenSideBar="openSideBar.openSideBar" class=" z-10">
        </Sidebar>
        <div :class="{
            'md:ml-[300px] w-full duration-300': openSideBar.openSideBar,
            'w-full duration-300': !openSideBar.openSideBar
        }">
            <TopBar class=" hidden md:block" :toggleSideBar="openSideBar.toggleSideBar"
                :openSideBar="openSideBar.openSideBar"
                :class="openSideBar.openSideBar ? 'w-[1135px] duration-300' : 'w-[1425px] duration-300'" />
            <TopBarResponsif :toggleSideBar="openSideBar.toggleSideBar" :openSideBar="openSideBar.openSideBar"
                class=" md:hidden "></TopBarResponsif>

            <div @click="toggleCloseBar">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script setup>
import TopBar from '../../components/TopBar.vue'
import TopBarResponsif from '../../components/TopBarResponsif.vue';
import Sidebar from '../../components/SideBar.vue'
import { useSidebarStore } from '../stores/Store';

const openSideBar = useSidebarStore()

// menutup layar mobile satu arah saja
const toggleCloseBar = () => {
    if (window.innerWidth < 768) {
        openSideBar.closeSideBar()
    }
}

//ketika di reload gak tampil
// if (window.innerWidth < 768) {
//     openSideBar.openSideBar = false;
// }


//=========================================Protect Route ==========================================

import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const cekToken = ref(null);
const router = useRouter();
const cekRoute = () => {
    if (process.client) {
        const token = localStorage.getItem('token');
        if (token) {
            cekToken.value = true;
        } else {
            cekToken.value = false;
            router.push('user/login');
        }
    }
};

onMounted(() => {
    cekRoute();
});

</script>
  
<style></style>
  