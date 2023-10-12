<template>
    <div>
        <div class=" flex justify-between items-center w-screen h-[65px] bg-red-600 px-9 fixed z-10">
            <div class=" flex items-center gap-6">
                <i @click="toggleSideBar" class="fa-solid fa-bars text-white text-xl"></i>
                <input type="text" class=" h-6 w-[80%] outline-none px-2 focus:border-red-400 focus:rounded-sm rounded-sm">
            </div>

            <div @click="toggleDropDown" class="h-[35px] w-[35px] bg-white flex items-center rounded-full">
                <img :src="`${baseImageUrl}` + fotoProfile" alt="" class=" rounded-full h-[35px] w-[35px] object-cover" />
            </div>
        </div>
        <!-- profile dropdown -->
        <div v-show="showDropDown" class=" fixed right-[40px] top-[3.5rem] z-50 mt-2 md:w-[119px] origin-top-right rounded-md bg-white shadow-lg ring-1
                    ring-black ring-opacity-5 focus:outline-none">
            <div class="py-1 text-left">
                <a href="/Profile" class=" block px-4 py-2 text-sm" role="menuitem" id=" menu-item-2">
                    <i class="fa-solid fa-user"></i> Pofile</a>
                <form @submit.prevent="logout" method="POST" action="" role="none">
                    <button type="submit" class=" block w-full px-4 py-2 text-left text-sm" role="menuitem" tabindex="-1"
                        id="menu-item-3"><i class="fa-solid fa-power-off"></i> Log Out</button>
                </form>
            </div>
        </div>
    </div>
</template>
<script setup>

import { defineProps, ref } from 'vue';

const props = defineProps({
    toggleSideBar: Function
})
const showDropDown = ref(false);

const toggleDropDown = () => {
    showDropDown.value = !showDropDown.value;
};

//=========================== get useFetch Profile ============================================

const baseImageUrl = import.meta.env.VITE_BASE_IMAGE_URL;
const fotoProfile = ref(null);

async function getProfile() {
    const token = localStorage.getItem("token");
    const url = `${import.meta.env.VITE_BASE_API_URL}/user/my-profile`;

    await useFetch(url, {
        method: "get",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => {
        setTimeout(() => {
            fotoProfile.value = res.data.value.data.user_profile_picture
        }, 800)
    }).catch(err => {
        console.log(err)
    })
}

//=======================================logout ======================================
import { useRouter } from 'vue-router'
const router = useRouter();

const logout = () => {
    localStorage.removeItem('token');
    router.push("/user/login")
}

onBeforeMount(() => {
    setTimeout(() => {
        getProfile();
    }, 300)
});

</script>
<style></style>