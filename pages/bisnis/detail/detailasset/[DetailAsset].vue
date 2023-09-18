<template >
    <div class=" h-full w-full p-7 pt-20 md:p-14 flex flex-col gap-8 bg-slate-200"
        :class="sideBar.openSideBar ? 'md:pr-[63px] duration-300 ' : ' md:px-24 duration-300'">
        <div class=" h-[77px]  bg-white rounded-md flex items-center justify-start px-6 absolute md:top-36 invisible md:visible"
            :class="sideBar.openSideBar ? ' duration-300 md:w-[1010px]' : 'duration-300  md:w-[1240px]'">
            <span class=" text-2xl font-[500]">{{ pageName }}</span>
        </div>
        <div class=" md:h-[855px] w-full flex flex-col md:flex-row gap-8">
            <!-- Asset -->
            <div class=" bg-white w-full md:h-[748px] p-10 md:px-20 rounded-md">
                <div class=" flex justify-between">
                    <h1 class=" text-[32px] font-semibold">Asset</h1>
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
                            <td class=" py-4 pt-8  flex items-center gap-3 text-red-600 text-[15px] font-[600]">
                                <img class=" w-[40px] h-[40px] rounded-full" :src="`${baseImageUrl}` + i.asset_photo"
                                    alt="">
                                {{ i.asset_name }}
                            </td>
                            <td class="text-[15px] font-[600] text-end">{{ i.asset_condition }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class=" w-full h-full bg-white rounded-md p-10">
                <!-- tambah asset -->
                <h1 class=" text-[32px] font-semibold mb-11"> Tambah Asset</h1>
                <form action="">
                    <div class=" py-3">
                        <input type="text" placeholder=" Nama Asset" alt=""
                            class=" h-[60px] w-full bg-[#FAFAFA] border-2 outline-none px-2 focus:border-red-500 rounded-md">
                    </div>
                    <div class=" py-3">
                        <input type="text" placeholder=" Jumlah Asset" alt=""
                            class=" h-[60px] w-full border-2 outline-none px-2 focus:border-red-500 rounded-md bg-[#FAFAFA]">
                    </div>
                    <div class=" py-3">
                        <input type="text" placeholder=" Tanggal Pembelian" alt=""
                            class=" h-[60px] w-full border-2 outline-none px-2 focus:border-red-500 rounded-md bg-[#FAFAFA]">
                    </div>
                    <div class=" py-3">
                        <input type="text" placeholder=" Kondisi Asset" alt=""
                            class=" h-[60px] w-full border-2 outline-none px-2 focus:border-red-500 rounded-md bg-[#FAFAFA]">
                    </div>
                    <div class=" py-3">
                        <input type="text" placeholder=" Nota Pembelian" alt=""
                            class=" h-[60px] w-full border-2 outline-none px-2 focus:border-red-500 rounded-md bg-[#FAFAFA]">
                    </div>
                    <div class=" py-3">
                        <input type="text" placeholder=" Pilih Gamabar Asset" alt=""
                            class=" h-[60px] w-full border-2 outline-none px-2 focus:border-red-500 rounded-md bg-[#FAFAFA]">
                    </div>
                    <div class=" flex items-center gap-2 py-3">
                        <input type="checkbox" class=" h-[17px] w-[17px]">
                        <span class=" text-[#A3A3A3] text-[13px] font-medium"> Aktif</span>
                    </div>
                    <div class=" flex items-center gap-2 py-3">
                        <input type="checkbox" class=" h-[17px] w-[17px]">
                        <span class=" text-[#A3A3A3] text-[13px] font-medium"> Tidak Aktif</span>
                    </div>

                    <button type=" submit" class=" mt-5 w-full p-3 bg-red-600 text-white text-[20px] font-semibold">
                        Login
                    </button>
                </form>
            </div>
        </div>
        <!-- Detail Asset -->
        <div class=" md:h-[744px] w-full bg-white rounded-md p-10">
            <h1 class=" text-[32px] font-semibold"> Detail Asset</h1>
            <div class=" h-full w-full flex gap-10">
                <div v-for="i in assetDetail" class=" w-full h-full">
                    <div class=" my-10 mb-[80px] md:mb-0">
                        <label for="" class=" text-[14px] font-semibold py-5"> Nama Asset</label>
                        <p class=" text-[29px] md:text-[32px] font-semibold"> {{ i.asset_name }}</p>
                    </div>
                    <div class=" my-10">
                        <label for="" class=" text-[14px] font-semibold py-5"> Kondisi</label>
                        <p class=" text-[29px] md:text-[32px] font-semibold"> {{ i.asset_condition }}</p>
                    </div>
                    <div class=" my-10">
                        <label for="" class=" text-[14px] font-semibold py-5"> Jumlah Asset</label>
                        <p class=" text-[29px] md:text-[32px] font-semibold"> {{ i.asset_quantity }} </p>
                    </div>
                    <div class=" my-10">
                        <label for="" class=" text-[14px] font-semibold py-5"> Tanggal Pembelian</label>
                        <p class=" text-[27px] md:text-[32px] font-semibold"> {{ i.asset_buy_date }}</p>
                    </div>
                </div>
                <div v-for="i in assetDetail" class=" h-full w-full">
                    <div>
                        <p class=" text-[14px] font-semibold my-9"> Foto Nota Pembelian</p>
                        <img :src="`${baseImageUrl}` + i.asset_receipt" alt="" class=" w-[170px] h-[125px]">
                    </div>
                    <div>
                        <p class=" text-[14px] font-semibold my-9"> Foto Asset</p>
                        <div class=" flex flex-wrap overflow-auto gap-10">
                            <img :src="`${baseImageUrl}` + i.asset_photo" alt="" class=" w-[170px] h-[125px]">
                            <img :src="`${baseImageUrl}` + i.asset_photo" alt="" class=" w-[170px] h-[125px]">
                            <img :src="`${baseImageUrl}` + i.asset_photo" alt="" class=" w-[170px] h-[125px]">
                            <img :src="`${baseImageUrl}` + i.asset_photo" alt="" class=" w-[170px] h-[125px]">
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
// import { onMounted } from 'vue';
import { useSidebarStore } from '../../stores/Store';
// const token = localStorage.getItem("token")

// import { useAssetBusines } from '../../stores/Bisnis/AssetBisnis'

const baseImageUrl = import.meta.env.VITE_BASE_IMAGE_URL;
const sideBar = useSidebarStore();

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
const route = useRoute();
const id_bisnis = route.params.DetailAsset;
const assetDetail = ref(null);
const pageName = ref([]);

async function getBisnis() {
    const token = localStorage.getItem("token");
    console.log(token);
    const url = `${import.meta.env.VITE_BASE_API_URL}/business/detail/${id_bisnis}/assets`;
    await useFetch(url, {
        method: "get",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => {
        setTimeout(() => {
            console.log(res.data)
            assetDetail.value = res.data.value.assets;
            pageName.value = res.data.value.business_id.business_name;
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