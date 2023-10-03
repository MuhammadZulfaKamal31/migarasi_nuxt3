<template >
    <div class=" h-full w-full p-7 pt-20 md:p-14 flex flex-col gap-8 bg-slate-200"
        :class="sideBar.openSideBar ? 'md:pr-[63px] duration-300 ' : ' md:px-14 md lg:px-24 duration-300'">
        <!-- <div class=" h-[77px]  bg-white rounded-md flex items-center justify-between px-6 absolute md:top-36 invisible md:visible"
            :class="sideBar.openSideBar ? ' duration-300 md:w-[1010px]' : 'duration-300  md:w-[1240px]'">
            <span class=" text-2xl font-[500]">{{ pageName }}</span>
            <div class="flex flex-row space-x-2 font-semibold text-sm text-red-500">
                <div v-for="(link, index) in links ">
                    <nuxt-link :to="generateBreadcrumb(index)" class=" hover:text-black">
                        {{ link }}
                        <span v-if="!(link === links[links.length - 1])" class=" ml-2">/</span>
                    </nuxt-link>
                </div>
            </div>
        </div> -->
        <!-- loading -->
        <div v-if="loading" class=" h-screen lg:h-[450px] flex justify-center py-40 bg-slate-200"
            :class="sideBar.openSideBar ? ' w-full duration-300' : 'w-full duration-300'">
            <div class="inline-block h-14 w-14 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status">
                <span
                    class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
            </div>
        </div>

        <div v-else class=" h-full lg:h-[855px] w-full flex flex-col md:flex-row gap-5 lg:gap-8">
            <!-- //pageName Mobile -->
            <div v-show="loading == false" class="py-[30px] md:py-0 w-full md:w-0 md:mt-0 md:hidden">
                <div class="h-10 bg-white rounded-md flex items-center justify-between px-2  ">
                    <span class=" text-[15px] md:text-2xl font-[500]"> Update Profile</span>
                    <div class=" text-[0.7rem] md:text-[15px] flex flex-row space-x-2 font-semibold text-sm text-red-500">
                        <div v-for="(link, index) in links ">
                            <nuxt-link :to="generateBreadcrumb(index)" class=" hover:text-black">
                                {{ link }}
                                <span v-if="!(link === links[links.length - 1])" class=" ml-2">/</span>
                            </nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Asset -->
            <div class=" bg-white w-full md:h-[748px] p-8 lg:px-20 rounded-md">
                <div class=" flex justify-between">
                    <h1 class=" text-[21px] md:text-[25px] lg:text-[32px] font-[600]">Asset</h1>
                    <i class="fa-solid fa-up-right-from-square text-2xl"></i>
                </div>
                <table class="w-full mt-12">
                    <thead>
                        <tr class="">
                            <th class="text-[16px] font-[600] text-start ">Name</th>
                            <th class="text-[16px] font-[600] text-end">Kondisi</th>
                        </tr>
                    </thead>
                    <tbody v-for="i in assetDetail">
                        <tr class="">
                            <td @click="tampilkan"
                                class=" py-4 pt-8  flex items-center gap-3 text-red-600 text-[15px] font-[600] cursor-pointer">
                                <img class=" w-[40px] h-[40px] rounded-full" :src="`${baseImageUrl}` + i.asset_photo"
                                    alt="">
                                {{ i.asset_name }}
                            </td>
                            <td class="text-[15px] font-[600] text-end">{{ i.asset_condition }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class=" w-full h-full bg-white rounded-md p-7 lg:p-10">
                <!-- tambah asset -->
                <h1 class=" text-[21px] md:text-[25px] lg:text-[32px] font-[600] mb-11"> Tambah Asset</h1>
                <form action="">
                    <div class=" py-3">
                        <input type="text" placeholder=" Nama Asset" alt=""
                            class=" h-[60px] w-full bg-[#FAFAFA] border-2 outline-none px-2 focus:border-red-500 rounded-md">
                    </div>
                    <div class=" py-3">
                        <input type="number" placeholder=" Jumlah Asset" alt=""
                            class=" h-[60px] w-full border-2 outline-none px-2 focus:border-red-500 rounded-md bg-[#FAFAFA]">
                    </div>
                    <div class=" py-3">
                        <label for="tanggalPembelian" class="block mb-2 text-slate-400">Tanggal
                            Pembelian</label>
                        <input type="date" id="tanggalPembelian" name="tanggalPembelian" class="h-[60px] w-full border-2 outline-none px-2 focus:border-red-500 rounded-md bg-[#FAFAFA]
        placeholder-slate-300 text-black focus:text-black">
                    </div>
                    <div class=" py-3">
                        <select class="h-12 w-full bg-[#FAFAFA] text-[16px] border outline-none" placeholder="Kondisi">
                            <option disabled value="">Pilih Kondisi</option>
                            <option selected value="L">Bagus</option>
                            <option value="P">Kurang Bagus</option>
                        </select>
                        <!-- <input type="text" placeholder=" Kondisi Asset" alt=""
                            class=" h-[60px] w-full border-2 outline-none px-2 focus:border-red-500 rounded-md bg-[#FAFAFA]"> -->
                    </div>
                    <div class=" py-3">
                        <input type="text" placeholder=" Nota Pembelian" alt=""
                            class=" h-[60px] w-full border-2 outline-none px-2 focus:border-red-500 rounded-md bg-[#FAFAFA]">
                    </div>
                    <div class=" py-3">
                        <input type="file" placeholder=" Pilih Gambar Asset" alt="">
                    </div>
                    <div class=" flex items-center gap-2 py-2 lg:py-3">
                        <input type="radio" class=" h-[17px] w-[17px]">
                        <span class=" text-[#A3A3A3] text-[13px] font-medium"> Aktif</span>
                    </div>
                    <div class=" flex items-center gap-2 py-3">
                        <input type="radio" class=" h-[17px] py-2 w-[17px]">
                        <span class=" text-[#A3A3A3] text-[13px] font-medium"> Tidak Aktif</span>
                    </div>

                    <button type=" submit" class=" mt-5 w-full p-3 bg-red-600 text-white text-[20px] font-semibold">
                        Tambahkan
                    </button>
                </form>
            </div>
        </div>
        <!-- Detail Asset -->
        <div v-show="tampilDetail" class=" md:h-full w-full bg-white rounded-md p-5 lg:p-10">
            <h1 class=" text-[21px] md:text-[25px] lg:text-[32px] font-[600]"> Detail Asset</h1>
            <div class=" h-full w-full flex justify-between md:gap-10">
                <div v-for="i in assetDetail" class=" w-full h-full">
                    <div class=" my-10 mb-[80px] md:mb-0">
                        <label for="" class=" text-[14px] font-semibold py-5"> Nama Asset</label>
                        <p class=" text-[25px] md:text-[32px] font-semibold"> {{ i.asset_name }}</p>
                    </div>
                    <div class=" my-10">
                        <label for="" class=" text-[14px] font-semibold py-5"> Kondisi</label>
                        <p class=" text-[25px] md:text-[32px] font-semibold"> {{ i.asset_condition }}</p>
                    </div>
                    <div class=" my-10">
                        <label for="" class=" text-[14px] font-semibold py-5"> Jumlah Asset</label>
                        <p class=" text-[25px] md:text-[32px] font-semibold"> {{ i.asset_quantity }} </p>
                    </div>
                    <div class=" my-10">
                        <label for="" class=" text-[14px] font-semibold py-5"> Tanggal Pembelian</label>
                        <p class=" text-[19px] md:text-[27px] lg:text-[32px] font-semibold"> {{ formatDate }}
                        </p>
                    </div>
                </div>
                <div v-for="i in assetDetail" class=" h-full w-full">
                    <div>
                        <p class=" text-[14px] font-semibold my-9"> Foto Nota Pembelian</p>
                        <img :src="`${baseImageUrl}` + i.asset_receipt" alt=""
                            class="w-[140px] h-[90px] md:w-[160px] md:h-[120px] lg:w-[170px] lg:h-[125px]">
                    </div>
                    <div>
                        <p class=" text-[14px] font-semibold my-9"> Foto Asset</p>
                        <div class=" flex flex-wrap overflow-auto gap-7 lg:gap-10">
                            <img :src="`${baseImageUrl}` + i.asset_photo" alt=""
                                class=" w-[100px] h-[70px] md:w-[155px] md:h-[105px] lg:w-[170px] lg:h-[125px]">
                            <img :src="`${baseImageUrl}` + i.asset_photo" alt=""
                                class=" w-[100px] h-[70px] md:w-[155px] md:h-[105px] lg:w-[170px] lg:h-[125px]">
                            <img :src="`${baseImageUrl}` + i.asset_photo" alt=""
                                class=" w-[100px] h-[70px] md:w-[155px] md:h-[105px] lg:w-[170px] lg:h-[125px]">
                            <img :src="`${baseImageUrl}` + i.asset_photo" alt=""
                                class=" w-[100px] h-[70px] md:w-[155px] md:h-[105px] lg:w-[170px] lg:h-[125px]">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class=" w-full text-start p-5 pl-[60px] md:pl-[65px] shadow-sm bg-slate-200">
            <span> © 2023 <router-link to="/dashboard" class=" text-red-500 text-[14px]">jruhub.com.</router-link> All
                rights reserved.</span>
        </div>
    </div>
</template>
<script setup>
definePageMeta({
    layout: "layouts"
})
import { useSidebarStore } from '../../stores/Store';
import { useDateFormat } from '@vueuse/core'



const baseImageUrl = import.meta.env.VITE_BASE_IMAGE_URL;
const sideBar = useSidebarStore();

const tanggalPembelian = ref(null);
const formatDate = useDateFormat(tanggalPembelian, 'DD MMMM YYYY');

//menyembunykan Detail
const tampilDetail = ref(false);
const tampilkan = () => {
    tampilDetail.value = true
}

//===================================== useFetch API =====================================

// const id_business = route.params.DetailAsset;

// const { data: asset } = await useFetch(`${import.meta.env.VITE_BASE_API_URL}/business/detail/${id_business}/assets`, {
//     method: "GET",
//     headers: {
//         'Authorization': `Bearer ${localStorage.getItem('token')}`
//     }
// });

//================================= useFetch Api =============================================
import { useRoute } from 'vue-router';
const loading = ref(null)
const route = useRoute();
const id_bisnis = route.params.Usaha;
const assetDetail = ref(null);
const pageName = ref([]);

async function getBisnis() {
    const token = localStorage.getItem("token");
    loading.value = true;
    console.log(token);
    const url = `${import.meta.env.VITE_BASE_API_URL}/business/detail/${id_bisnis}/assets`;
    await useFetch(url, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => {
        setTimeout(() => {
            assetDetail.value = res.data.value.data;
            pageName.value = res.data.value.business;
            tanggalPembelian.value = res.data.value.data.map(item => item.asset_buy_date)
            loading.value = false
        }, 1000);

    }).catch(err => {
        console.log(err);
    })
}

onBeforeMount(async () => {
    await getBisnis();
});

//=========================================BreadCrumb =============================

import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const currentPath = router.currentRoute.value.path;
console.log("cureant " + currentPath);
const breadcrumb = ref(currentPath.split("/").filter((i) => i != ""));
console.log("hiya hiya " + breadcrumb)

const generateBreadcrumb = (index) => {
    let link = "";
    for (let i = 0; i <= index; i++) {
        link += `/${breadcrumb.value[i]}`;
    }
    return link;
};

const links = computed(() => breadcrumb.value);



</script>
<style></style>