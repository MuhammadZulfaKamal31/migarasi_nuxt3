<template>
    <div class=" flex flex-col gap-4 py-[5%] font-inter px-5 bg-slate-200"
        :class="sideBar.openSideBar ? 'md:pr-[37px] pr-[8%] duration-300' : 'md:px-[7%] duration-300'">
        <div class=" h-[77px]  bg-white rounded-md flex items-center justify-start px-6 absolute md:top-36 invisible md:visible"
            :class="sideBar.openSideBar ? ' duration-300 md:ml-7 md:w-[1010px]' : 'duration-300 md:w-[1200px]'">
            <span class=" text-2xl font-[500]">Pendapatan</span>
        </div>
        <div class=" flex md:flex-row flex-col justify-around gap-10 md:gap-20 md:h-[180px] w-full pt-20 md:pt-0 px-7">
            <div class=" flex justify-center items-center w-full h-full bg-white rounded">
                <div>
                    <label class=" text-[24px] font-[500] text-gray-500">Total Gaji</label>
                    <p class=" my-4 md:my-6 text-[24px] font-[600]">Rp {{ totalGaji }}</p>
                </div>
            </div>
            <div class=" flex justify-center items-center w-full h-full bg-white rounded">
                <div>
                    <label class=" text-[24px] font-[500] text-gray-500">Total SHU</label>
                    <p class=" my-4 md:my-6 text-[24px] font-[600]">Rp {{ totalShu }}</p>
                </div>
            </div>
            <div class=" flex justify-center items-center w-full h-full bg-white rounded">
                <div>
                    <label class=" text-[24px] font-[500] text-gray-500">Total Pendapatan</label>
                    <p class=" my-4 md:my-6 text-[24px] font-[600]">Rp {{ totalPendapatan }}</p>
                </div>
            </div>

        </div>
        <div class=" flex flex-col md:flex-row gap-12 md:h-[500px] w-full mt-8 px-8">
            <!-- gaji -->
            <div class="h-full w-full bg-white p-4 px-5 md:p-7 md:px-11 rounded-md">
                <h1 class=" text-2xl md:text-4xl font-bold mb-4">Gaji</h1>
                <table class="w-full md:mt-9">
                    <thead>
                        <tr class=" py-3 md:py-4">
                            <th class="  text-[16px] font-600 text-start ">Sumber</th>
                            <th class="text-[16px] font-600 text-start">Jumlah</th>
                        </tr>
                    </thead>
                    <tbody v-for=" i in gaji">
                        <tr class="">
                            <td class=" py-3 md:py-4  flex items-center gap-1 md:gap-3 text-red-600 text-[15px] font-[600]">
                                <img class=" h-[30px] w-[30px] md:w-[40px] md:h-[40px] rounded-full"
                                    :src="`${baseImageUrl}` + i.companion_user.user_profile_picture" alt="">
                                <span class=" text-[13px] md:text-[15px]">
                                    {{ i.companion_user.user_full_name }}
                                </span>
                            </td>
                            <td class=" text-[13px] md:text-[15px] font-[600]">Rp {{ i.companion_salary }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- SHU -->
            <div class="h-full w-full bg-white p-4 px-5 md:p-7 md:px-11 rounded-md">
                <h1 class=" text-2xl md:text-4xl font-bold mb-4">SHU</h1>
                <table class="w-full md:mt-9">
                    <thead>
                        <tr class=" py-3 md:py-4">
                            <th class="  text-[16px] font-600 text-start ">Sumber</th>
                            <th class="text-[16px] font-600 text-start"> SHARE</th>
                        </tr>
                    </thead>
                    <tbody v-for=" i in shu">
                        <tr class="">
                            <td class=" py-3 md:py-4  flex items-center gap-1 md:gap-3 text-red-600 text-[15px] font-[600]">
                                <img class=" h-[30px] w-[30px] md:w-[40px] md:h-[40px] rounded-full"
                                    :src="`${baseImageUrl}` + i.owner_user.user_profile_picture" alt="">
                                <span class=" text-[13px] md:text-[15px] overflow-auto">
                                    {{ i.owner_user.user_full_name }}
                                </span>
                            </td>
                            <td class=" text-[13px] md:text-[15px] font-[600]">
                                {{ i.owner_shares }} %
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <div class=" w-full text-start p-5 pl-[60px] md:pl-[65px] shadow-sm bg-slate-200">
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

const sideBar = useSidebarStore();

//========================================Get useFetch Api Pendapatan==================

const baseImageUrl = `${import.meta.env.VITE_BASE_IMAGE_URL}`

const totalGaji = ref(null);
const totalShu = ref(null);
const totalPendapatan = ref(null)

const gaji = ref([]);

const shu = ref([])

const getPendapatan = async () => {
    const token = localStorage.getItem("token");
    const url = `${import.meta.env.VITE_BASE_API_URL}/user/my-profile/income`;

    await useFetch(url, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => {
        setTimeout(() => {
            totalGaji.value = res.data.value.data.total_employee_salary;
            totalShu.value = res.data.value.data.total_shu;
            totalPendapatan.value = res.data.value.data.total_companion_salary;

            gaji.value = res.data.value.data.companion_salaries;

            shu.value = res.data.value.data.owners_shares;

        })
    })
}

onBeforeMount(() => {
    getPendapatan();
})

</script>
<style></style>