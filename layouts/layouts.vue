<template>
    <div class="w-full h-full flex bg-red-400" v-if="cekToken">
        <Sidebar :dataOpenSideBar="openSideBar.openSideBar" class=" z-10">
        </Sidebar>
        <div class="flex flex-row justify-end w-full">
            <div class="w-full flex flex-col justify-end pl-72">
                <div
                    class="sm:hidden md:flex md:w-[65%] xl:w-[77.5%] top-32 flex flex-row absolute justify-center px-50 px-5 ">
                    <div class="bg-white shadow-xl w-full h-28 rounded-xl flex flex-row justify-between items-center px-5">
                        <h2 class="text-2xl font-bold">{{ activeLink }}</h2>
                        <div class="flex flex-row space-x-2 font-semibold text-sm text-red-500">
                            <div v-for="(link, index) in links " :key="index">
                                <nuxt-link :to="generateLink(index)" class=" hover:text-black">
                                    {{ capitalizeFirstLetter(link) }}
                                    <span v-if="!(link === links[links.length - 1])" class=" ml-2">/</span>
                                </nuxt-link>
                            </div>
                        </div>
                    </div>
                </div>
                <TopBar class=" w-full" :toggleSideBar="openSideBar.toggleSideBar" :openSideBar="openSideBar.openSideBar"
                    :class="'w-full duration-300'" />
                <TopBarResponsif :toggleSideBar="openSideBar.toggleSideBar" :openSideBar="openSideBar.openSideBar"
                    class=" md:hidden "></TopBarResponsif>

                <div @click="toggleCloseBar">
                    <router-view></router-view>
                </div>
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
    // if (window.innerWidth < 768) {
    //     openSideBar.closeSideBar()
    // }
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
const links = ref([]);
const activeLink = ref('dashboard');
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
    makeBreadcrumbs();
    activeLink.value = sessionStorage.getItem('activeLink') ?? 'dashboard';
});

onUpdated(() => {
    activeLink.value = sessionStorage.getItem('activeLink') ?? 'dashboard';
    makeBreadcrumbs();
});


const makeBreadcrumbs = () => {
    const routeName = useRoute().path;
    links.value = routeName.split("/").filter((i) => i != "");
}

const generateLink = (index) => {
    const subLinks = links.value.slice(0, index + 1)
    console.log(subLinks)
    return '/' + subLinks.join("/");
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}



</script>
  
<style></style>
  