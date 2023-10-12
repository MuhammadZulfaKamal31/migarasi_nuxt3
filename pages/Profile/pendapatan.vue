<template>
    <div class="  flex flex-col gap-4 md:py-[2%] font-inter px-5 bg-slate-200"
        :class="sideBar.openSideBar ? 'md:pl-6 lg:pr-[37px] pr-[8%] duration-300' : 'md:px-[7%] duration-300'">
        <!-- <div class=" h-[77px]  bg-white rounded-md flex items-center justify-between px-6 absolute md:top-36 invisible md:visible"
            :class="sideBar.openSideBar ? ' duration-300 md:ml-7 md:w-[1010px]' : 'duration-300 md:w-[1200px]'">
            <span class=" text-2xl font-[500]">Pendapatan</span>
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
        <div v-if="loading" class=" w-full h-screen lg:h-[450px] flex justify-center py-40 bg-slate-200">
            <div class="inline-block h-14 w-14 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status">
                <span
                    class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
            </div>
        </div>
        <div v-else>
            <!-- //pageName Mobile -->
            <div v-show="loading == false" class="py-[30px] md:py-0 w-full md:w-0 mt-14 md:mt-0">
                <div class="h-10 bg-white rounded-md flex items-center justify-between px-2 md:invisible ">
                    <span class=" text-[15px] md:text-2xl font-[500]"> Update Profile</span>
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
            <div
                class=" flex md:flex-row flex-col justify-around gap-5 lg:gap-10 md:gap-5 md:h-[180px] w-full md:pt-0 lg:px-7">
                <div class=" flex justify-center items-center w-full h-full bg-white rounded">
                    <div>
                        <label class=" text-[21px] md:text-[22px] lg:text-[25px] font-[500] text-gray-500">Total
                            Gaji</label>
                        <p class=" my-4 md:my-6 text-[24px] font-[600]">{{ formatIdr(totalGaji) }}</p>
                    </div>
                </div>
                <div class=" flex justify-center items-center w-full h-full bg-white rounded">
                    <div>
                        <label class="text-[21px] md:text-[22px] lg:text-[25px] font-[500] text-gray-500">Total SHU</label>
                        <p class=" my-4 md:my-6 text-[24px] font-[600]">{{ formatIdr(totalShu) }}</p>
                    </div>
                </div>
                <div class=" flex justify-center items-center w-full h-full bg-white rounded">
                    <div>
                        <label class=" text-[21px] md:text-[22px] lg:text-[25px] font-[500] text-gray-500">Total
                            Pendamping</label>
                        <p class=" my-4 md:my-6 text-[24px] font-[600]"> {{ formatIdr(totalPendamping) }}</p>
                    </div>
                </div>
                <div class=" flex justify-center items-center w-full h-full bg-white rounded">
                    <div>
                        <label class=" text-[21px] md:text-[22px] lg:text-[25px] font-[500] text-gray-500">Total
                            Pendapatan</label>
                        <p class=" my-4 md:my-6 text-[24px] font-[600]"> {{ formatIdr(totalPendapatan) }}</p>
                    </div>
                </div>

            </div>
            <div class=" flex flex-col md:flex-row gap-5 lg:gap-12 md:h-[500px] w-full mt-8 lg:px-10">
                <!-- gaji Pendamping -->
                <div class="h-full w-full bg-white p-4 lg:p-7 lg::px-11 rounded-md">
                    <h1 class=" text-[21px] md:text-[25px] lg:text-[32px] font-[600] mb-4">Gaji Pendamping</h1>
                    <table class="w-full md:mt-9">
                        <thead>
                            <tr class=" py-3 md:py-4">
                                <!-- <th class="  text-[16px] font-600 text-start md:hidden lg:inline">Sumber</th> -->
                                <th class="  text-[16px] font-600 text-start "> Bisnis</th>
                                <th class="text-[16px] font-600 text-start">Jumlah</th>
                            </tr>
                        </thead>
                        <tbody v-for=" i in gaji">
                            <tr>
                                <td
                                    class=" py-3 md:py-4  flex items-center  md:gap-3 text-red-600 text-[15px] font-[600] md:hidden lg:inline">
                                    <img class=" h-[30px] w-[30px] md:w-[40px] md:h-[40px] rounded-full inline"
                                        :src="`${baseImageUrl}` + i.business_id.business_logo" alt="">
                                    <span class=" text-[13px] md:text-[15px] px-1">
                                        {{ i.business_id.business_name }}
                                    </span>
                                </td>
                                <!-- <td class=" text-[13px] md:text-[15px] font-[600]">{{ i.business_id.business_name }}</td> -->
                                <td class=" text-[13px] md:text-[15px] font-[600]"> {{ formatIdr(i.companion_salary) }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!-- SHU -->
                <div class="h-full w-full bg-white p-4  lg:px-11 rounded-md">
                    <h1 class=" text-[21px] md:text-[25px] lg:text-[32px] font-[600] mb-4">SHU</h1>
                    <table class="w-full md:mt-9">
                        <thead>
                            <tr class=" py-3 md:py-4">
                                <!-- <th class="  text-[16px] font-600 text-start md:hidden lg:inline">Sumber</th> -->
                                <th class="  text-[16px] font-600 text-start ">Bisnis</th>
                                <th class="text-[16px] font-600 text-start"> SHU</th>
                            </tr>
                        </thead>
                        <tbody v-for=" i in shu">
                            <tr class="">
                                <td
                                    class=" py-3 md:py-4  flex items-center gap-1 md:gap-3 text-red-600 text-[15px] font-[600] md:hidden lg:inline">
                                    <img class=" h-[30px] w-[30px] md:w-[40px] md:h-[40px] rounded-full inline"
                                        :src="`${baseImageUrl}` + i.business_id.business_logo" alt="">
                                    <span class=" text-[13px] md:text-[15px] overflow-auto px-1">
                                        {{ i.business_id.business_name }}
                                    </span>
                                </td>
                                <!-- <td class=" text-[13px] md:text-[15px] font-[600]">
                                    {{ i.business_id.business_name }}
                                </td> -->
                                <td class=" text-[13px] md:text-[15px] font-[600]">
                                    {{ formatIdr(menghitungPersen(i.owner_shares, i.business_id.business_shu)) }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class=" flex flex-col md:flex-row gap-5 lg:gap-12 md:h-[500px] w-full mt-8 lg:px-10">
                <!-- Gaji Karyawan -->
                <div class="h-full w-full bg-white p-4 lg:p-7 lg::px-11 rounded-md">
                    <h1 class=" text-[21px] md:text-[25px] lg:text-[32px] font-[600] mb-4">Gaji Karyawan</h1>
                    <table class="w-full md:mt-9">
                        <thead>
                            <tr class=" py-3 md:py-4">
                                <!-- <th class="  text-[16px] font-600 text-start md:hidden lg:inline">Sumber</th> -->
                                <th class="  text-[16px] font-600 text-start ">Bisnis</th>
                                <th class="text-[16px] font-600 text-start">Jumlah</th>
                            </tr>
                        </thead>
                        <tbody v-for="i in gajiKaryawan">
                            <tr>
                                <td
                                    class=" py-3 md:py-4  flex items-center gap-1 md:gap-3 text-red-600 text-[15px] font-[600] md:hidden lg:inline">
                                    <img class=" h-[30px] w-[30px] md:w-[40px] md:h-[40px] rounded-full inline"
                                        :src="`${baseImageUrl}` + i.business_id.business_logo" alt="">
                                    <span class=" text-[13px] md:text-[15px] px-1">
                                        {{ i.business_id.business_name }}
                                    </span>
                                </td>
                                <!-- <td class=" text-[13px] md:text-[15px] font-[600]">
                                    {{ i.business_id.business_name }}
                                </td> -->

                                <td class=" text-[13px] md:text-[15px] font-[600]">
                                    {{ formatIdr(i.employee_salary) }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="h-full w-full bg-slate-200 p-4  lg:px-11 rounded-md">
                </div>
            </div>
        </div>
    </div>
    <div class=" w-full text-start p-5 pl-[60px] lg:pl-[65px] shadow-sm bg-slate-200">
        <span>
            © 2023 <router-link to="/dashboard" class=" text-red-500 text-[14px]">jruhub.com.</router-link> All rights
            reserved.</span>
    </div>
</template>
<script setup>
definePageMeta({
    layout: "layouts"
})
import { useSidebarStore } from '../../stores/Store';


//========================================useFetch Api Pendapatan=====================
const sideBar = useSidebarStore();

const baseImageUrl = `${import.meta.env.VITE_BASE_IMAGE_URL}`
const loading = ref(false);

const totalGaji = ref(null);
const totalShu = ref(null);
const totalPendamping = ref(null);
const totalPendapatan = ref(null);

const gaji = ref([]);
const gajiKaryawan = ref([]);
const shu = ref([]);

const formatIdr = (value) => {
    return parseFloat(value).toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR',
    });
};

const menghitungPersen = (persen, shu) => {
    console.log("persen " + persen, " shu " + shu)
    const hasil = (persen / 100) * shu;
    return hasil;
};
//-------------------------------------Get Pendapatan -------------------------------
const getPendapatan = async () => {
    const token = localStorage.getItem("token");
    const url = `${import.meta.env.VITE_BASE_API_URL}/user/my-profile/income`;
    loading.value = true;

    await useFetch(url, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => {
        setTimeout(() => {
            totalGaji.value = res.data.value.data.total_employee_salary;
            totalShu.value = res.data.value.data.total_shu;
            totalPendamping.value = res.data.value.data.total_companion_salary;
            totalPendapatan.value = res.data.value.data.total_income;

            //gaji Pendamping
            gaji.value = res.data.value.data.companion_salaries;
            //Shu
            shu.value = res.data.value.data.owners_shares;

            //Gaji Karyawan
            gajiKaryawan.value = res.data.value.data.employee_salaries;
            loading.value = false;
        }, 1000)
    })
}
onBeforeMount(() => {
    setTimeout(() => {
        getPendapatan();
    }, 200)
})

//=====================================BreadCrumbs ==================================
import { useRoute } from '#vue-router'

const links = ref([]);
const makeBreadcrumbs = () => {
    const routeName = useRoute().name;
    links.value = routeName.split("-");
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
<style></style>