<template>
    <div v-if="loading" class="h-screen bg-white">
        <div class="flex justify-center items-center h-full">
            <img class="h-16 w-16" src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif" alt="">
        </div>
    </div>
    <div v-else class="h-full w-screen flex justify-between items-center">
        <div class=" mt-[100px]">
            <div class=" border border-red-600 md:border-none m-7 md:m-0 p-5 md:p-0">
                <!-- form -->
                <form @submit.prevent="login" method="POST" class=" font-inter w-full md:w-[329px] md:mx-16 ">
                    <h1 class=" text-center md:text-start text-2xl md:text-3xl my-5"> Wellcome to <span
                            class=" text-red-600">JRUHUB</span></h1>
                    <p class=" text-center text-[12px] md:text-[14px] font-thin"> Lorem ipsum dolor sit amet consectetur
                        adipisicing
                        elit. Autem
                        culpa
                        veritatis sapiente
                        saepe dicta maiores
                    </p>
                    <div class=" mb-7 mt-19">
                        <div class=" my-8">
                            <input v-model="userName"
                                class="w-full md:w-[329px] h-[60px] bg-[#FAFAFA] border-2 outline-none px-2 focus:border-red-500 rounded-md"
                                type="text" placeholder=" Username">
                        </div>
                        <div class=" relative">
                            <div>
                                <input v-model="password"
                                    class=" border-2 outline-none px-2 focus:border-red-500 rounded-md w-full md:w-[329px] h-[60px] bg-[#FAFAFA]"
                                    :type="hiddenPassword ? 'password' : 'text'" placeholder=" Password">
                            </div>
                            <div class=" absolute top-5 right-2 " @click="toggle">
                                <svg v-if="hiddenPassword" x-show="!show" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                </svg>
                                <svg v-else="hiddenPassword" x-show="show" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <p v-if="error" class=" text-red-600">{{ error }}</p>
                    <div class="mb-16">
                        <input type="checkbox">
                        <label class=" text-[14px] text-[#A3A3A3] mx-2">Remember Me</label>
                    </div>
                    <div class=" md:flex flex-col md:flex-row md:justify-between md:items-center">
                        <div class=" text-end py-5 md:py-0">
                            <a class="text-center text-red-400 text-[15px]" href="#">Forget Password ?</a>
                        </div>
                        <button type="submit"
                            class=" border border-red-600 bg-red-600 w-full p-2 md:w-[154px] text-white text-[20px]">
                            Login
                        </button>
                    </div>
                </form>
            </div>
            <div class=" w-full text-center md:pt-24 py-7 shadow-sm text-[14px]">
                <span> © 2023 <router-link to="/" class=" text-red-500 text-[13px]">jruhub.com.</router-link> All
                    rights reserved.</span>
            </div>
        </div>
        <div class=" hidden md:block md:w-[1220px]">
            <img src="../../public/Rectangle12.png" class="w-full h-full object-contain" alt="">
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';


const router = useRouter();
const userName = ref("");
const password = ref("");
const error = ref("");

const loading = ref(false);

onMounted(() => {
    console.log("Check Mounted")
    console.log("token", localStorage.getItem('token'))
    if (localStorage.getItem('token')) {
        console.log("token", localStorage.getItem('token'))
        router.push({ path: "/dashboard" });
    }
});

const login = async () => {
    console.log("login", import.meta.env.VITE_BASE_API_URL)
    if (!userName.value || !password.value) {
        error.value = "Username dan Password harus di isi";
    } else {
        try {
            loading.value = true
            const response = await useFetch(`${import.meta.env.VITE_BASE_API_URL}/user/signin`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: userName.value,
                    password: password.value,
                })
            });

            const token = response.data._rawValue.access;
            console.log(token)
            localStorage.setItem('token', token);

            //loading
            setTimeout(() => {
                router.push({ path: "/dashboard" });
            }, 3000)

        } catch (err) {
            loading.value = false
            error.value = "Login gagal. Periksa username dan password Anda.";
            console.error(err);
        }
    }
}

//tampilkan password
const hiddenPassword = ref(true);
const toggle = () => {
    hiddenPassword.value = !hiddenPassword.value
}
</script>

<style></style>
<!-- const token = response.data._rawValue.access; -->
