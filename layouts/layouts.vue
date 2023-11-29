<template>
    <div class="w-full h-full flex" v-if="cekToken">
        <Sidebar :dataOpenSideBar="openSideBar.openSideBar" class="z-10">
        </Sidebar>
        <!-- :class="{
            ' md:ml-[200px] lg:ml-[300px] w-full duration-300': openSideBar.openSideBar,
            'w-full duration-300': !openSideBar.openSideBar
        }" -->
        <div
            :class="openSideBar.openSideBar == true ? 'md:ml-[200px] lg:ml-[300px] w-full duration-300' : 'w-full duration-300'">
            <div class=" hidden md:block">
                <div class="  md:flex top-36 flex flex-row absolute justify-center px-50 px-5" :class="{
                    'ml-[2%] md:w-[70%] lg:w-[69%] xl:w-[74%] duration-300': openSideBar.openSideBar,
                    ' ml-[5%] w-[90%] duration-300': !openSideBar.openSideBar
                }">
                    <div
                        class="bg-white shadow-xl w-full md:h-16 lg:h-20 rounded-xl flex flex-row justify-between items-center px-5">
                        <h2 class="text-2xl font-bold">{{ activeLink }}</h2>
                        <div class="flex flex-row space-x-2 font-semibold text-sm text-red-500">
                            <div v-for="( link, index ) in  links  " :key="index">
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

//menutup tampilan sidebar Mobile
if (process.client) {
    if (window.innerWidth < 768) {
        openSideBar.openSideBar = false;
    }
}

//=========================================Protect Route ==========================================
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const links = ref([]);
const activeLink = ref('Dashboard');

const cekToken = ref(null);
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

//=====================breadCrumb=====================================
const makeBreadcrumbs = () => {
    const routeName = useRoute().path;
    links.value = routeName.split("/").filter((i) => i != "");
}

const generateLink = (index) => {
    const subLinks = links.value.slice(0, index + 1)
    // console.log(subLinks)
    return '/' + subLinks.join("/");
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

onMounted(() => {
    cekRoute();
    makeBreadcrumbs();
    activeLink.value = sessionStorage.getItem('activeLink') ?? 'Dashboard';
});
onUpdated(() => {
    activeLink.value = sessionStorage.getItem('activeLink') ?? 'Dashboard';
    makeBreadcrumbs();
});


</script>

<style></style>