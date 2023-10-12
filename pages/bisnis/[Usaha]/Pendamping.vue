<template>
    <div class=" h-full w-full md:pb-28 md:h-full lg:h-full pt-14 md:pt-0 px-7  gap-6 flex flex-col bg-slate-200 "
        :class="sideBar.openSideBar ? ' md:px-12: lg:pl-12 lg:pr-16 duration-300' : ' md:px-14 lg:px-24 duration-300'">
        <!-- <div class=" h-[77px]  bg-white rounded-md flex items-center justify-between px-6 absolute md:top-36 invisible md:visible"
            :class="sideBar.openSideBar ? ' duration-300 md:w-[1010px]' : 'duration-300  md:w-[1245px]'">
            <span class=" text-2xl font-[500]">{{ pageName }}</span>
            <div class="flex flex-row space-x-2 font-semibold text-sm text-red-500">
                <div v-for="(link, index) in links ">
                    <nuxt-link :to="generateLink(index)" class=" hover:text-black">
                        {{ link }}
                        <span v-if="!(link === links[links.length - 1])" class=" ml-2">/</span>
                    </nuxt-link>
                </div>
            </div>
        </div> -->
        <!-- loading -->
        <div v-if="loading" class="h-screen lg:h-[440px] flex justify-center py-40 bg-slate-200"
            :class="sideBar.openSideBar ? ' w-full duration-300' : 'w-full duration-300'">
            <div class="inline-block h-14 w-14 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status">
                <span
                    class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
            </div>
        </div>
        <!-- //pageName Mobile -->
        <div v-show="loading == false" class="py-[30px] md:py-0 w-full md:w-0 md:mt-0">
            <div class="h-10 bg-white rounded-md flex items-center justify-between px-2 md:invisible ">
                <span class=" text-[15px] md:text-2xl font-[500]"> {{ pageName }}</span>
                <div class=" text-[70%]  flex flex-row space-x-1 font-semibold text-sm text-red-500">
                    <div v-for="(link, index) in links" :key="index">
                        <nuxt-link :to="generateLink(index)"
                            class="hover:text-gray-800 hover:bg-gray-800 hover:bg-opacity-10 p-1 rounded-sm">
                            {{ link }}</nuxt-link>
                        <span v-if="!(link === links[links.length - 1])" class="">/</span>
                    </div>
                </div>
            </div>
        </div>

        <div v-show="loading == false" class=" md:h-[487px] w-full flex flex-col md:flex-row gap-7 lg:gap-10">
            <!-- Pendamping -->
            <div class="h-full  w-full bg-white p-5 lg:p-8 rounded-md">
                <div class=" flex justify-between">
                    <h1 class=" text-[21px] md:text-[25px] lg:text-[32px] font-[600]">Pendamping</h1>
                    <!-- <i class="fa-solid fa-up-right-from-square text-xl"></i> -->
                </div>
                <table class="w-full mt-9">
                    <thead>
                        <tr class=" py-10">
                            <th class="text-[16px] font-[600] text-start ">Name</th>
                            <th class="text-[16px] font-[600] text-start">Pendamping</th>
                        </tr>
                    </thead>
                    <tbody v-for="i in pendamping">
                        <tr class="">
                            <td @click="tampilkan"
                                class=" py-4 pt-6  flex items-center gap-3 text-red-600 text-[15px] font-[600]">
                                <img class=" w-[40px] h-[40px] rounded-full"
                                    :src="`${baseImageUrl}` + i.companion_user.user_profile_picture" alt="">
                                <span @click="indexTampil(i.id)" class=" cursor-pointer ">
                                    {{ i.companion_user.user_full_name }}
                                </span>
                            </td>
                            <td class="text-[15px] font-[600]">{{ i.companion_as.name }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- Tambah Pendamping -->
            <div class=" h-full w-full bg-white p-5 lg:p-8 rounded-md">
                <h1 class=" text-[21px] md:text-[25px] lg:text-[32px] font-[600]"> Tambah Pendamping</h1>
                <form action="">
                    <div class=" py-4 pt-12">
                        <input @input="onInputChange" v-model="searchQuery" type="text" placeholder=" Pilih User"
                            class="h-[58px] w-full bg-[#FAFAFA] border-2 outline-none px-2 focus:border-red-500 rounded-md">
                        <ul v-if="showUserList" class=" mt-2 absolute md:w-60 w-lg:w-[550px] z-10">
                            <li class=" bg-opacity-70 bg-black text-white rounded-b-sm p-2 cursor-pointer"
                                v-for=" user in filteredUsers" :key="user.id" @click="selectUser(user)">
                                {{ user.name }}
                            </li>
                        </ul>
                    </div>
                    <div class=" py-4">
                        <input type="text" placeholder=" Pilih User"
                            class="h-[58px] w-full bg-[#FAFAFA] border-2 outline-none px-2 focus:border-red-500 rounded-md">
                    </div>
                    <div class=" flex items-center gap-2 py-1 md:py-2 lg:py-3">
                        <input type="radio" class=" h-[17px] w-[17px]">
                        <span class=" text-[#A3A3A3] text-[13px] font-medium"> Aktif</span>
                    </div>
                    <div class=" flex items-center gap-2 py-1 md:py-2 lg:py-3">
                        <input type="radio" class=" h-[17px] w-[17px]">
                        <span class=" text-[#A3A3A3] text-[13px] font-medium"> Tidak Aktif</span>
                    </div>

                    <button type=" submit" class=" mt-5 w-full p-3 bg-red-600 text-white text-[20px] font-semibold">
                        Tambahkan
                    </button>
                </form>
            </div>
        </div>
        <!-- Detail Pendamping -->
        <div v-show="tampilDetail" class=" flex md:w-[48%] h-[600px] gap-10" ref="section">
            <div class=" h-full w-full bg-white p-8 rounded-md">
                <div class=" flex flex-col items-center">
                    <h1 class=" text-[21px] md:text-[25px] lg:text-[32px] font-[600]">Detail Pendamping</h1>
                    <div class=" py-5">
                        <div class=" h-[200px] w-[200px] lg:h-[241px] lg:w-[241px] bg-[#D9D9D9] rounded-full">
                            <img :src="`${baseImageUrl}` + detailGambarPendamping" alt=""
                                class=" rounded-full h-[200px] w-[200px] lg:h-[241px] lg:w-[241px] object-cover">
                        </div>
                    </div>
                    <div class=" flex flex-col items-center pt-6">
                        <h1 class=" text-[29px] md:text-[32px]  font-semibold">
                            {{ detailNamaPendamping }}
                        </h1>
                        <p class=" text-[20px]">
                            {{ detailSebagaiPendamping }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class=" w-full text-start p-5 pl-[60px] md:pl-[65px] shadow-sm bg-slate-200 pt-16">
        <span> © 2023 <router-link to="/dashboard" class=" text-red-500 text-[14px]">jruhub.com.</router-link> All rights
            reserved.</span>
    </div>
</template>
<script setup>

definePageMeta({
    layout: "layouts"
});

import { useSidebarStore } from '../../stores/Store';

const sideBar = useSidebarStore();
const baseImageUrl = import.meta.env.VITE_BASE_IMAGE_URL;

//memnyembunyikan dan menapilkan detail
const tampilDetail = ref(false);
const section = ref(null)
const tampilkan = () => {
    tampilDetail.value = true;
    if (section.value) {
        section.value.scrollIntoView({ behavior: 'smooth' });
    }
}

//============================= Search Filter List ==================================
const users = ref([
    { id: 1, name: 'Muhammad Zulfa Kamal' },
    { id: 2, name: 'Muhammad aufil lana kamalsyahsdsad' },
    { id: 3, name: 'Mutiara dewi' },
    { id: 4, name: 'Abdul Aziz' },
    { id: 5, name: 'Spongebob' },
]);

const searchQuery = ref('');
const showUserList = ref(false);

const filteredUsers = computed(() => {
    return users.value.filter(user => {
        return user.name.toLowerCase().includes(searchQuery.value.toLowerCase()
        )
    }
    )
})

const selectUser = (user) => {
    searchQuery.value = user.name;
    showUserList.value = false
}

const onInputChange = () => {
    showUserList.value = !!searchQuery.value;
}


//===================================useFetch Api ===================================

const loading = ref(false)
import { useRoute } from 'vue-router';
const route = useRoute();
const id_bisnis = route.params.Usaha;
const pendamping = ref([]);
const pendampingDetail = ref(null);
const pageName = ref(null);

async function getBisnis() {
    const token = localStorage.getItem("token");
    console.log(token);
    const url = `${import.meta.env.VITE_BASE_API_URL}/business/detail/${id_bisnis}/companion`;
    loading.value = true;

    await useFetch(url, {
        method: "get",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => {
        setTimeout(() => {
            console.log(res.data)
            pendampingDetail.value = res.data.value;
            pendamping.value = res.data.value.data
            pageName.value = res.data.value.business;
            loading.value = false
        }, 700);

    }).catch(err => {
        console.log(err);
    })
}

onBeforeMount(async () => {
    setTimeout(() => getBisnis(), 500)
});

//====================Get detail Pendampiing ===================================================
const detailNamaPendamping = ref(null);
const detailSebagaiPendamping = ref(null)
const detailGambarPendamping = ref(null);

const indexTampil = (id) => {
    pendamping.value.map(element => {
        if (element.id === id) {
            detailNamaPendamping.value = element.companion_user.user_full_name;
            detailGambarPendamping.value = element.companion_user.user_profile_picture
            detailSebagaiPendamping.value = element.companion_as.name
        }
    }
    )
}

//==========================================BreadCrumb ==========================================
const links = ref([]);
const makeBreadcrumbs = () => {
    const routeName = useRoute().path;
    links.value = routeName.split("/").filter((i) => i !== "");
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
<style ></style>