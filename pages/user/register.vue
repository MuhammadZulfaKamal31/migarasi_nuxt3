<template>
    <div class="h-full w-screen flex pt-5 md:items-center justify-center">
        <div class=" h-[600px] w-[350px] md:h-[90%] md:w-[427px] border border-[#EB666B] rounded-xl">
            <form @submit.prevent="register" method="POST" class=" font-inter md:w-[329px] mx-5 md:mx-12 relative">
                <h1 class=" text-2xl md:text-3xl text-center my-3 md:mt-10"> Wellcome to<span
                        class=" text-red-600">JRUHUB</span>
                </h1>
                <p class=" text-[12px] md:text-[14px] font-thin text-center"> Lorem ipsum dolor sit amet consectetur adipi
                    elit.
                    Autem culpa
                    veritatis sapiente
                    saepe dicta maiores saepe dicta maiores
                </p>
                <div class=" md:mb-7 md:mt-19">
                    <div class=" my-5">
                        <input v-model="username"
                            class="border-2 outline-none px-2 focus:border-red-500 rounded-md w-full  h-[55px] md:h-[60px] bg-[#FAFAFA] "
                            type="text" placeholder=" Username">
                    </div>
                    <div class=" my-5">
                        <input v-model="email"
                            class="border-2 outline-none px-2 focus:border-red-500 rounded-md w-full h-[55px] md:h-[60px] bg-[#FAFAFA]"
                            type="email" placeholder=" Email">
                    </div>
                    <div class=" my-5 relative">
                        <input v-model="password"
                            class="border-2 outline-none px-2 focus:border-red-500 rounded-md w-full h-[55px] md:h-[60px] bg-[#FAFAFA]"
                            :type="hiddenPassword ? 'password' : 'text'" placeholder=" Password">
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
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                    </div>
                    <div class=" my-5 relative">
                        <input v-model="password_confirm"
                            class=" border-2 outline-none px-2 focus:border-red-500 rounded-md w-full h-[55px] md:h-[60px] bg-[#FAFAFA]"
                            :type="true ? 'password' : 'text'" placeholder=" Confirm Password">
                        <!-- <div class=" absolute top-5 right-2 " @click="toggle">
                            <svg v-if="hiddenPassword" x-show="!show" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                            </svg>
                            <svg v-else="hiddenPassword" x-show="show" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div> -->
                    </div>
                    <p v-if="error" class=" text-red-600 text-center -my-2">{{ error }}</p>
                </div>
                <div class=" my-4 flex items-center">
                    <input class=" h-[20px] w-[20px] bg-[#FAFAFA]" type="checkbox">
                    <label class=" text-[11px] md:text-[13px] text-[#A3A3A3] mx-2">I agree with the terms and conditions
                        Register</label>
                </div>
                <div class=" md:mb-5 mt-9 md:mt-[50px]">
                    <button type="submit"
                        class=" border border-red-600 bg-red-600 w-full h-[50px] text-white text-[20px]">Login
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();

const username = ref("");
const email = ref("");
const password = ref("");
const password_confirm = ref("")
const error = ref("")

const hiddenPassword = ref(true);
const toggle = () => {
    hiddenPassword.value = !hiddenPassword.value
}

const register = async () => {
    if (password.value !== password_confirm.value) {
        error.value = "Password dan Confirm Password tidak sama"
    }
    else if (!username.value || !password.value) {
        error.value = "username dan password tidak boleh kosong"
    } else {
        try {
            const response = await useFetch(`${import.meta.env.VITE_BASE_API_URL}/user/signup`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username.value,
                    email: email.value,
                    password: password.value,
                    password_confirm: password_confirm.value
                }),
            })

            // console.log("response " + response);
            router.push({ path: "/user/login" })
        } catch (err) {
            error.value = " User dan Email Sudah terdaftar, Mohon periksa inputan anda"
            console.log(err)
        }
    }
};

</script>
<style></style>