<template>
    <div class="w-full h-full flex" v-if="cekToken">
        <Sidebar :dataOpenSideBar="openSideBar.openSideBar" class="z-10">
        </Sidebar>
        <Main :dataOpenSideBar="openSideBar?.openSideBar" :generateLink="generateLink"
            :capitalizeFirstLetter="capitalizeFirstLetter" :links="links" :activeLink="activeLink">
        </Main>
    </div>
</template>

<script setup>

import Sidebar from '../../components/SideBar.vue'
import { useSidebarStore } from '../stores/Store';

const openSideBar = useSidebarStore()

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
const makeBreadcrumbs = async () => {
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

const onMountedAsync = async () => {
    cekRoute();
    await makeBreadcrumbs();
    activeLink.value = sessionStorage.getItem('activeLink') ?? 'Dashboard';
};

onMountedAsync();

onUpdated(() => {
    makeBreadcrumbs();
    activeLink.value = sessionStorage.getItem('activeLink') ?? 'Dashboard';
});


</script>

<style></style>