<template >
    <div class=" h-[2000px] md:h-full w-full gap-7 font-inter p-7 md:p-12 lg:p-14 bg-slate-200"
        :class="sideBar.openSideBar ? ' md:px-[7%] lg:px-[5%] lg:pr-[6%] duration-300' : ' md:px-[8%] lg:px-[7%] duration-300'">
        <!-- pageName -->
        <!-- <div class=" h-[77px]  bg-white rounded-md flex items-center justify-between px-6 absolute md:top-36 invisible md:visible"
            :class="sideBar.openSideBar ? ' duration-300 md:w-[1037px]' : 'duration-300 md:w-[1235px]'">
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
        <!-- //pageName Mobile -->
        <!-- {{ loading }} -->
        <div v-show="loading == false" class="py-[30px] md:py-0 w-full md:w-0 mt-7 md:mt-0">
            <div class="h-10 bg-white rounded-md flex items-center justify-between px-2 md:hidden ">
                <span class=" text-[15px] md:text-2xl font-[500]"> Update Profile</span>
                <div class=" text-[0.7rem] md:text-[15px] flex flex-row space-x-2 font-semibold text-sm text-red-500">
                    <div v-for="(link, index) in links" :key="index">
                        <nuxt-link :to="generateLink(index)" class="hover:text-black">{{ link }}</nuxt-link>
                        <span v-if="!(link === links[links.length - 1])" class="ml-2">/</span>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="loading" class=" h-screen xl:h-[460px] flex justify-center py-40 bg-slate-200"
            :class="sideBar.openSideBar ? ' w-full duration-300' : 'w-full duration-300'">
            <div class="inline-block h-14 w-14 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status">
                <span
                    class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
            </div>
        </div>

        <div v-else class="  md:h-[487px] gap-5 md:gap-7 lg:gap-10 flex flex-col md:flex-row mb-6 pt-2 md:pt-0">
            <!-- chart -->
            <div class="  h-[250px]  md:w-full lg:h-full bg-white flex items-center justify-center rounded-md">
                <div class=" ">
                    <div>
                        <DoughnutChart :chart-data="data" :options="options" css-classes="chart-container"
                            class=" h-[210px] md:h-[200px] lg:h-[400px]" />
                    </div>
                </div>
            </div>
            <!-- <div class="  h-[250px]  md:w-full lg:h-full bg-white flex items-center justify-center rounded-md">
                <div>
                    <DoughnutChart :chart-data="data" :options="options" css-classes="chart-container"
                        class=" h-[210px] md:h-[200px] lg:h-[400px]" />
                </div>
            </div> -->
            <!-- form isi -->
            <div class=" w-full md:h-full bg-white p-8 rounded-md ">
                <form action="">
                    <h1 class=" text-[21px] md:text-[25px] lg:text-[32px] font-[600]">Tambah Pemilik</h1>
                    <div class=" my-8 md">
                        <input @input="onInputChange" v-model="searchQuery" placeholder=" Pilih User" type="text"
                            class=" border-2 outline-none px-2 focus:border-red-500 rounded-md w-full h-[57px] bg-[#FAFAFA]">
                        <ul v-if="showUserList" class=" mt-2 absolute w-[450px] z-10">
                            <li class=" bg-opacity-70 bg-black text-white rounded-b-sm p-2 cursor-pointer"
                                v-for="user in filteredUsers" :key="user.id" @click="selectUser(user)">{{ user.name }}
                            </li>
                        </ul>
                    </div>
                    <div class=" my-8 -z-10">
                        <input placeholder=" Pesentase Kepemilikan" type="text"
                            class="border-2 outline-none px-2 focus:border-red-500 rounded-md w-full h-[57px] bg-[#FAFAFA]">
                    </div>
                    <div class=" flex items-center gap-2 my-3">
                        <input type="radio" class=" w-[17px] h-[17px] bg-slate-300">
                        <span class=" text-[#A3A3A3] text-[15px]"> Aktif</span>
                    </div>
                    <div class=" flex items-center gap-2 lg:my-3">
                        <input type="radio" class=" rounded-md w-[17px] h-[17px] bg-slate-300">
                        <span class=" text-[#A3A3A3] text-[15px]">Tidak Aktif</span>
                    </div>
                    <button type="submit" class=" bg-red-600 p-3 w-full text-center text-[20px] text-white my-10">
                        Tambahkan
                    </button>
                </form>
            </div>
        </div>
        <div v-if="!loading" class="  w-full h-[691px] gap-5 lg:gap-10 flex flex-col md:flex-row">
            <!-- Pemilik -->
            <div class=" md:w-full h-[487px] bg-white p-7 lg:p-10 rounded-md">
                <div class=" flex justify-between">
                    <h1 class=" text-[21px] md:text-[25px] lg:text-[32px] font-[600]">Pemilik</h1>
                    <i class="fa-solid fa-up-right-from-square text-[20px] md:text-[25px]"></i>
                </div>
                <div>
                    <table class=" w-full mt-10">
                        <thead>
                            <tr class="">
                                <td class=" py-5 text-[17px] font-[600]">Name</td>
                                <td class=" text-[17px] font-[600]">Share</td>
                            </tr>
                        </thead>
                        <tbody v-for=" i in owner">
                            <tr class="">
                                <td @click="tampilkan" class=" py-3 text-red-600 text-[15px] font-[600]">
                                    <span @click=" indexTampil(i.id)" class=" cursor-pointer">
                                        {{ i.owner_user.user_full_name }}
                                    </span>
                                </td>
                                <td class=" font-[600] text-[15px]">{{ i.owner_shares }}%</td>
                                <td>
                                    <span class="fa-solid fa-pen-to-square"></span>
                                </td>
                                <td>
                                    <i class="fa-solid fa-trash"></i>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <!-- Detail pemilik -->
            <div v-show="tampilDetail" class=" lg:w-[108%] h-full bg-white p-7 lg:p-10 rounded-md" ref="scroll">
                <h1 class=" text-[21px] md:text-[25px] lg:text-[32px] font-[600]">Detail Pemilik</h1>
                <div class=" lg:pl-10 mt-14 flex flex-col items-center md:items-start ">
                    <div class=" w-[200px] h-[200px] lg:w-[241px] lg:h-[241px] rounded-full bg-[#D9D9D9]">
                        <img :src="`${baseImageUrl}` + detailGambarPemilik" alt=""
                            class=" w-[200px] h-[200px] lg:w-[241px] lg:h-[241px] rounded-full">
                    </div>
                    <div class=" flex justify-start">
                        <div class=" py-10 flex flex-col items-center">
                            <h2 class=" text-[25px] md:text-[29px] font-[500] py-2">
                                {{ detailNamaPemilik }}
                            </h2>
                            <p class="text-[13px] font-[500]">
                                {{ detailEmailPemilik }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <div class=" w-full text-start p-5 pl-[60px] md:pl-[65px] shadow-sm bg-slate-200">
        <span> © 2023 <router-link to="/dashboard" class=" text-red-500 text-[14px]">jruhub.com.</router-link> All rights
            reserved.</span>
    </div>
</template>

<script setup>
definePageMeta({
    layout: "layouts"
})
import { ref, computed, onMounted } from "vue"
import { DoughnutChart } from "vue-chart-3"
import { Chart, DoughnutController, ArcElement, Title, Tooltip } from "chart.js"

//memnyembunyikan dan menampilakan detail
const tampilDetail = ref(false);
const scroll = ref(null);
const tampilkan = () => {
    tampilDetail.value = true;
    if (scroll.value) {
        scroll.value.scrollIntoView({ behavior: 'smooth' });
    }
}





//=======================penyesuaian tampilan=======================================
import { useSidebarStore } from '../../stores/Store';
const sideBar = useSidebarStore()
const baseImageUrl = import.meta.env.VITE_BASE_IMAGE_URL;

//========================chart js =================================================
// Mendaftarkan modul Chart.js yang dibutuhkan
Chart.register(DoughnutController, ArcElement, Title, Tooltip)
// Data nilai-nilai
const dataValues = ref([]);
const colors = ["#ff7f50", "#ff7350", "#ff6450", "#ff5f50", "#ff6d50"];
const lastColor = "#ffffff";
// Menyiapkan data untuk grafik Donut
const data = computed(() => ({
    labels: dataValues.value.map(value => `${value}%`),
    datasets: [
        {
            data: dataValues.value,
            backgroundColor: colors.slice(0, dataValues.value.length - 1).concat(lastColor)
        }
    ],
}));
// Opsi grafik
const options = ref({
    plugins: {
        title: {
            // text: "Doughnut"
        }
    }
})
//==================================== search filter ==============================
const users = ref([
    { id: 1, name: 'Muhammad Zulfa Kamal' },
    { id: 2, name: 'Muhammad aufil lana' },
    { id: 3, name: 'Mutiara dewi' },
    { id: 4, name: 'Abdul Aziz' },
    { id: 5, name: 'Spongebob' },
]);

const searchQuery = ref('');
const showUserList = ref(false);

// Membuat komputed property untuk melakukan filter user berdasarkan searchQuery
const filteredUsers = computed(() => {
    return users.value.filter(user => {
        return user.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    });
});

const selectUser = (user) => {
    searchQuery.value = user.name;
    showUserList.value = false; // Menyembunyikan daftar user setelah memilih user
};

const onInputChange = () => {
    showUserList.value = !!searchQuery.value; //search query di sini mengahasilkan tanda false 
};

//===========================================useFetch Api=========================================
import { useAktifLinkStore } from "~/stores/AktifLinkStore";
const aktifLink = useAktifLinkStore();

const loading = ref(false)

import { useRoute } from 'vue-router';
const route = useRoute();
const id_bisnis = route.params.Usaha;
const owner = ref();
const ownerCoba = ref([])

const namaBisnis = ref([]);
const deskripsiBisnis = ref([])
const gambarBisnis = ref([]);
// const pageName = ref([]);

async function getBisnis() {
    loading.value = true;
    const token = localStorage.getItem("token");
    console.log(token);
    const url = `${import.meta.env.VITE_BASE_API_URL}/business/detail/${id_bisnis}/owners`;
    await useFetch(url, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => {
        // console.log(res.status)
        if (res.status.value == 'success') {
            // console.log(res.data)
            console.log("Berhasil masuk success")
            loading.value = false
            console.log(res.data.value.data)
            owner.value = res.data.value.data
            gambarBisnis.value = res.data.value;
            namaBisnis.value = res.data.value.data;
            deskripsiBisnis.value = res.data.value;
            aktifLink.setActive(res.data._rawValue.business);

            //dougnut chart
            dataValues.value = res.data.value.data.map(owner => parseFloat(owner.owner_shares));
            dataValues.value.push(parseFloat(res.data.value.empty_shares));
        }

    }).catch(err => {
        console.log(err);
    })
}
onBeforeMount(async () => {

});

//=====================Get Detail Pemilik ==============================
const detailNamaPemilik = ref(null);
const detailEmailPemilik = ref(null);
const detailGambarPemilik = ref(null);


const indexTampil = (id) => {
    owner.value.map(element => {
        if (element.id === id) {
            detailNamaPemilik.value = element.owner_user.user_full_name;
            detailEmailPemilik.value = element.owner_user.user.email;
            detailGambarPemilik.value = element.owner_user.user_profile_picture;

        }
    });
}

//==========================================BreadCrumb ==========================================
const links = ref([]);
const makeBreadcrumbs = () => {
    const routeName = useRoute().path;
    links.value = routeName.split("/").filter((i) => i !== "");
}

const generateLink = (index) => {
    const subLinks = links.value.slice(0, index + 1)
    return '/' + subLinks.join("/");
}
onMounted(() => {
    setTimeout(() => getBisnis(), 200)
    makeBreadcrumbs()
});


</script>

<style></style>