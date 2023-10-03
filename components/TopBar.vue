<template>
    <div class=" md:w-[100%] lgw-[100%] xl:w-[100%]">
        <!-- topbar -->
        <div class=" h-[190px] bg-red-500 pt-7 md:px-6 lg:px-10 ">
            <div class=" w-max mb-14 flex justify-between mx-7">
                <div class=" flex md:gap-5 lg:gap-10 items-center">
                    <i @click="toggleSideBar" class="fa-solid fa-bars text-white text-2xl"></i>
                    <input type="text"
                        class="md:w-[300px] lg:w-[375px] md:h-[50px] lg:h-[55px] border-2 outline-none px-2 focus:border-red-400 focus:rounded-md "
                        placeholder="Search">
                </div>
                <!-- profile -->
                <div @click="toggleDropDown"
                    class="md:h-[60px] md:w-[60px] lg:h-[73px] lg:w-[73px] bg-white rounded-full flex items-center justify-center mr-[38px] absolute right-7">
                    <img :src="`${baseImageUrl}` + fotoProfile" alt=""
                        class="md:h-[60px] md:w-[60px] lg:h-[73px] lg:w-[73px] rounded-full object-cover" />
                </div>
            </div>
            <div>
            </div>
        </div>
        <!-- dropdown profile -->
        <div v-show="showDropDown" class=" absolute right-[40px] top-[6.5rem] z-10 mt-2 w-[119px] origin-top-right rounded-md bg-white shadow-lg ring-1
                ring-black ring-opacity-5 focus:outline-none">
            <div class="py-1 text-left">
                <a href="/Profile" class=" block px-4 py-2 text-sm" role="menuitem" id=" menu-item-2">
                    <i class="fa-solid fa-user"></i> Pofile</a>
                <form @submit.prevent="logout" action="" role="none">
                    <button type="submit" class=" block w-full px-4 py-2 text-left text-sm" role="menuitem" tabindex="-1"
                        id="menu-item-3"><i class="fa-solid fa-power-off"></i> Log Out</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, ref } from 'vue';
// import { useRoute } from 'vue-router';

const props = defineProps({
    toggleSideBar: Function,
    openSideBar: Boolean
});

const showDropDown = ref(false);

const toggleDropDown = () => {
    showDropDown.value = !showDropDown.value;
};

//================================useFetch Api =======================================
const baseImageUrl = import.meta.env.VITE_BASE_IMAGE_URL;
const fotoProfile = ref(null);

async function getCircle() {
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
        }, 700)
    }).catch(err => {
        console.log(err)
    })
}
//==================================logout =============================================
import { useRouter } from 'vue-router';

const router = useRouter();

const logout = () => {
    localStorage.removeItem('token')
    router.push('/user/login'); // Jika Anda menggunakan Vue Router
}

onBeforeMount(async () => {
    await getCircle();
})

</script>


<style ></style>