<template>
    <!-- loading -->
    <div v-if="loading" class=" w-[78%] h-[2000px] flex justify-center py-40 bg-slate-50 absolute">
        <div class="inline-block h-14 w-14 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status">
            <span
                class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
        </div>
    </div>
    <div class="w-full h-full flex justify-center items-center font-inter bg-slate-200"
        :class="sideBar.openSideBar ? ' duration-300' : 'duration-300'">
        <!-- pageName -->
        <div class=" h-[77px]  bg-white rounded-md flex items-center justify-start px-6 absolute md:top-36 invisible md:visible"
            :class="sideBar.openSideBar ? ' duration-300 md:w-[995px]' : 'duration-300 md:w-[1200px]'">
            <span class=" text-2xl font-[500]">Profile</span>
        </div>
        <div class="md:h-full w-[90%] md:w-[900px] border border-slate-300 rounded-md md:p-10 p-3 bg-white my-20">
            <form action="" @submit.prevent="update">
                <h1 class="text-2xl font-semibold pb-10">Update Profile</h1>
                <!-- Alamat -->
                <div class="flex flex-col py-2 gap-3">
                    <label for="" class="text-[18px] font-[500]">Alamat</label>
                    <input v-model="alamat" type="text" placeholder="Alamat"
                        class="h-12 bg-[#FAFAFA] text-[15px] border-2 outline-none px-2 focus:border-red-500 rounded-md">
                </div>
                <!-- Telephone -->
                <div class="flex flex-col py-2 gap-3">
                    <label for="" class="text-[18px] font-[500]">Nomor Telephone</label>
                    <input v-model="telephone" type="text" placeholder="No."
                        class="h-12 bg-[#FAFAFA] text-[15px] border-2 outline-none px-2 focus:border-red-500 rounded-md">
                </div>

                <!-- Profile Picture (Input Tipe File) -->
                <div class="flex flex-col py-2 gap-3">
                    <label for="" class="text-[18px] font-[500]">Profile Picture</label>
                    <input type="file" ref="fileInput" @change="handleFileUpload">
                </div>

                <!-- Nama Lengkap -->
                <div class="flex flex-col py-2 gap-3">
                    <label for="" class="text-[18px] font-[500]">Nama Lengkap</label>
                    <input v-model="namaLengkap" type="text" placeholder="Nama Lengkap"
                        class="h-12 bg-[#FAFAFA] text-[15px] border-2 outline-none px-2 focus:border-red-500 rounded-md">
                </div>

                <!-- Jenis Kelamin -->
                <div class="flex flex-col py-2 gap-3">
                    <label for="" class="text-[18px] font-[500]">Jenis Kelamin</label>
                    <select class="h-12 bg-[#FAFAFA] text-[16px] border outline-none" v-model="jenisKelamin">
                        <option value="L">Laki-laki</option>
                        <option value="P">Perempuan</option>
                    </select>
                </div>

                <!-- Tanggal Lahir -->
                <div class="flex flex-col py-2 gap-3">
                    <label for="" class="text-[18px] font-[500]">Tanggal Lahir</label>
                    <input v-model="tanggaLahir" type="date" placeholder="YYYY-MM-DD"
                        class="h-12 bg-[#FAFAFA] text-[15px] border-2 outline-none px-2 focus:border-red-500 rounded-md">
                </div>

                <!-- Tempat Lahir -->
                <div class="flex flex-col py-2 gap-3">
                    <label for="" class="text-[18px] font-[500]">Tempat Lahir</label>
                    <input v-model="tempatLahir" type="text" placeholder="Tempat Lahir"
                        class="h-12 bg-[#FAFAFA] text-[15px] border-2 outline-none px-2 focus:border-red-500 rounded-md">
                </div>

                <!-- NPWP -->
                <div class="flex flex-col py-2 gap-3">
                    <label for="" class="text-[18px] font-[500]">NPWP</label>
                    <input v-model="npwp" type="text" placeholder="NPWP"
                        class="h-12 bg-[#FAFAFA] text-[15px] border-2 outline-none px-2 focus:border-red-500 rounded-md">
                </div>

                <!-- No. KTP -->
                <div class="flex flex-col py-2 gap-3">
                    <label for="" class="text-[18px] font-[500]">No.Ktp</label>
                    <input v-model="noKtp" type="text" placeholder="No.Ktp"
                        class="h-12 bg-[#FAFAFA] text-[15px] border-2 outline-none px-2 focus:border-red-500 rounded-md">
                </div>
                {{ error }}

                <!-- Tombol Update -->
                <div class="flex justify-start pt-10">
                    <button type="submit" class="p-2 bg-red-600 text-white w-28 rounded-md">
                        Update
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
  
<script setup>
definePageMeta({
    layout: "layouts"
})

//========================================UseFetch Api=============================================
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useSidebarStore } from '../../stores/Store';
import { useNow, useDateFormat } from '@vueuse/core'

const sideBar = useSidebarStore();

import Swal from 'sweetalert2'

//======================================= Post useFectc Data Profile ==========================

const alamat = ref("");
const telephone = ref("");
const namaLengkap = ref("");
const jenisKelamin = ref("");
const tanggaLahir = ref("");
// const formatDate = useDateFormat(tanggaLahir, "dddd MMMM D YYYY");
const tempatLahir = ref("");
const npwp = ref("");
const noKtp = ref("");
const error = ref("");
const router = useRouter();

const loading = ref(null)

const fileInput = ref(null);

const handleFileUpload = () => {
    const selectedFile = fileInput.value.files[0]; // Mengambil file yang dipilih
    if (selectedFile) {
        console.log('File yang dipilih:', selectedFile);
    }
};

// Metode untuk menghandle pembaruan profil
const update = async () => {
    try {
        const shouldUpdate = await new Promise((resolve) => {
            Swal.fire({
                title: 'Do you want to save the changes?',
                showDenyButton: true,
                confirmButtonText: 'Save',
                denyButtonText: `Cancel`,
                confirmButtonColor: "#3085d6",
                //         showCancelButton: true,

            }).then((result) => {
                if (result.isConfirmed) {
                    resolve(true);
                    Swal.fire({
                        title: 'Your work has been saved',
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                    }).then(() => {
                        // Navigasi ke halaman "/user/Profile" setelah tombol "OK" pada alert kedua diklik
                        router.push({ path: "/user/Profile" });
                    });
                } else if (result.isDenied) {
                    Swal.fire({
                        title: 'Changes are not saved',
                        icon: 'info',
                        confirmButtonColor: '#f00749',
                    });
                    resolve(false); // Pengguna memilih "Don't save", batalkan pembaruan
                }
            });
        });
        if (shouldUpdate) {

            const formData = new FormData();
            // Tambahkan data ke formData
            formData.append('user_address', alamat.value);
            formData.append('user_phone', telephone.value);
            formData.append('user_full_name', namaLengkap.value);
            formData.append('user_gender', jenisKelamin.value);
            formData.append('user_birth_date', tanggaLahir.value);
            formData.append('user_birth_place', tempatLahir.value);
            formData.append('user_npwp', npwp.value);
            formData.append('user_ktp', noKtp.value);

            const selectedFile = fileInput.value.files[0]; // Mengambil file yang dipilih
            if (selectedFile) {
                // Menambahkan file ke formData dengan nama yang sesuai di sisi server
                formData.append('user_profile_picture', selectedFile);

                const token = localStorage.getItem('token');

                const response = await useFetch(`${import.meta.env.VITE_BASE_API_URL}/user/my-profile/update`, {
                    method: "POST",
                    body: formData,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        // 'Content-Type': 'multipart/form-data'
                    },
                });
                console.log('Response:', response);
            } else {
                console.error('Tidak ada file yang dipilih');
            }
        } else {
            console.log('Data tidak berubah karena pengguna memilih "Don\'t save"');

        }
        // router.push({ path: "/user/Profile" })
    } catch (err) {
        error.value = "ada yang salah mohon di sesuaikan"
        console.error('Error:', err);
    }
}

//================================================= Get useFecthData Profile ============================

const getDataProfile = async () => {
    const token = localStorage.getItem("token");
    const url = `${import.meta.env.VITE_BASE_API_URL}/user/my-profile`;
    loading.value = true;

    await useFetch(url, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => {
        setTimeout(() => {
            namaLengkap.value = res.data.value.data.user_full_name;
            telephone.value = res.data.value.data.user_phone;
            alamat.value = res.data.value.data.user_address;
            tanggaLahir.value = res.data.value.data.user_birth_date;
            npwp.value = res.data.value.data.user_npwp;
            noKtp.value = res.data.value.data.user_ktp;
            jenisKelamin.value = res.data.value.data.user_gender;
            tempatLahir.value = res.data.value.data.user_birth_place;

            loading.value = false;
        }, 1000)
    }).catch(err => {
        console.log(err);
    })
}



onBeforeMount(() => {
    getDataProfile();
})

</script>

<style></style>
