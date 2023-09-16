<template >
    <div class=" h-[2000px] md:h-full w-full gap-7 font-inter p-7 md:p-12 bg-slate-200"
        :class="sideBar.openSideBar ? 'md:px-10 md:pr-[25%] duration-300' : 'md:px-[7%] duration-300'">
        <div class=" h-[77px]  bg-white rounded-md flex items-center justify-start px-6 absolute md:top-36 invisible md:visible"
            :class="sideBar.openSideBar ? ' duration-300 md:w-[1037px]' : 'duration-300  md:w-[1235px]'">
            <span class=" text-2xl font-[500]">{{ pageName }}</span>
        </div>
        <div class="  md:h-[487px] gap-10 flex flex-col md:flex-row mb-6 pt-14 md:pt-0">
            <!-- chart -->
            <div class="  h-[250px]  md:w-full md:h-full bg-white flex items-center justify-center rounded-md">
                <div class="">
                    <DoughnutChart :chart-data="data" :options="options" css-classes="chart-container"
                        class=" h-[210px] md:h-[400px]" />
                </div>
            </div>
            <!-- form isi -->
            <div class=" w-full md:h-full bg-white p-8 rounded-md ">
                <form action="">
                    <h1 class=" text-[32px] font-[700] mb-5">Tambah Pemilik</h1>
                    <div class=" my-8">
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
                        <input type="checkbox" class=" w-[19px] h-[19px] bg-slate-300">
                        <span class=" text-[#A3A3A3] text-[15px]"> Aktif</span>
                    </div>
                    <div class=" flex items-center gap-2 my-3">
                        <input type="checkbox" class=" rounded-md w-[19px] h-[19px] bg-slate-300">
                        <span class=" text-[#A3A3A3] text-[15px]">Tidak Aktif</span>
                    </div>
                    <button type="submit" class=" bg-red-600 p-3 w-full text-center text-[20px] text-white my-10">
                        Login
                    </button>
                </form>
            </div>
        </div>

        <div class="  w-full h-[691px] gap-10 flex flex-col md:flex-row">
            <!-- Pemilik -->
            <div class=" md:w-[92%] h-[487px] bg-white p-10 rounded-md">
                <div class=" flex justify-between">
                    <h1 class=" text-[32px] font-[600]">Pemilik</h1>
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
                                <td class=" py-3 text-red-600 text-[15px] font-[600]">{{ i.owner_user.user_full_name }}</td>
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
            <!-- nama pemilik -->
            <div class=" w-full h-full bg-white p-10 rounded-md">
                <h1 class=" text-[27px] md:text-[30px] font-[600]">Nama Bisnis</h1>
                <div class=" md:pl-10 mt-14 flex flex-col items-center md:items-start ">
                    <div class=" w-[200px] h-[200px] md:w-[241px] md:h-[241px] rounded-full bg-[#D9D9D9]">
                        <img :src="`${baseImageUrl}` + gambarBisnis" alt="">
                    </div>
                    <div class=" flex justify-start">
                        <div class=" py-10 flex flex-col items-center">
                            <h2 class=" text-[25px] md:text-[29px] font-[500] py-2">{{ namaBisnis }}
                            </h2>
                            <p class="text-[13px] font-[500]">{{ deskripsiBisnis }}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>
    <div class=" w-full text-start p-5 pl-[60px] md:pl-[65px] shadow-sm bg-slate-200">
        <span> © 2023 <span class=" text-red-500 text-[14px]">jruhub.com.</span> All rights reserved.</span>
    </div>
</template>

<script setup>
definePageMeta({
    layout: "layouts"
})
import { ref, computed, onMounted } from "vue"
// import { useOwnerBusines } from "../../stores/Bisnis/Owner";
import { DoughnutChart } from "vue-chart-3"
import { Chart, DoughnutController, ArcElement, Title, Tooltip } from "chart.js"

//=======================penyesuaian tampilan=======================================
import { useSidebarStore } from '../../stores/Store';
const sideBar = useSidebarStore()
const baseImageUrl = import.meta.env.VITE_BASE_IMAGE_URL;

//========================chart js =================================================
// Mendaftarkan modul Chart.js yang dibutuhkan
Chart.register(DoughnutController, ArcElement, Title, Tooltip)
// Data nilai-nilai
const dataValues = ref([])
// Menyiapkan data untuk grafik Donut
const data = computed(() => ({
    labels: dataValues.value.map(value => `${value}%`),
    datasets: [
        {
            data: dataValues.value,
            backgroundColor: ["#ff7f50", "#ffffff", "#f5afa3"]
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

import { useRoute } from 'vue-router';
const route = useRoute();
const id_bisnis = route.params.DetailPemilik;
const owner = ref([]);

const namaBisnis = ref([]);
const deskripsiBisnis = ref([])
const gambarBisnis = ref([]);
const pageName = ref(null)

async function getBisnis() {
    const token = localStorage.getItem("token");
    console.log(token);
    const url = `${import.meta.env.VITE_BASE_API_URL}/business/detail/${id_bisnis}/owners`;
    await useFetch(url, {
        method: "get",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => {
        setTimeout(() => {
            console.log(res.data)
            owner.value = res.data.value.owners;
            gambarBisnis.value = res.data.value.business_id.business_logo
            namaBisnis.value = res.data.value.business_id.business_name;
            deskripsiBisnis.value = res.data.value.business_id.business_name;
            pageName.value = res.data.value.business_id.business_name;
            //dougnut chart
            dataValues.value = res.data.value.owners.map(owner => parseFloat(owner.owner_shares));
            dataValues.value.push(parseFloat(res.data.value.empty_shares));

        }, 1000);
    }).catch(err => {
        console.log(err);
    })
}

onBeforeMount(async () => {
    await getBisnis();
});


</script>

<style></style>