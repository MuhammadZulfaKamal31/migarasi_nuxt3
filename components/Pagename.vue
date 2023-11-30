<template>
    <div class=" hidden md:block">
        <div class="  md:flex top-36 flex flex-row absolute justify-center px-50 px-5" :class="{
            'ml-[2%] md:w-[70%] lg:w-[69%] xl:w-[74%] duration-300': dataOpenSideBar,
            ' ml-[5%] w-[90%] duration-300': !dataOpenSideBar
        }">
            <div
                class="bg-white shadow-xl w-full md:h-16 lg:h-20 rounded-xl flex flex-row justify-between items-center px-5">
                <h2 class="text-2xl font-bold">{{ activeLink }}</h2>
                <div class="flex flex-row space-x-2 font-semibold text-sm text-red-500">
                    <div v-for="(link, index) in links " :key="index">
                        <nuxt-link :to="generateLink(index)"
                            class=" hover:text-gray-800 hover:bg-gray-600 hover:bg-opacity-10 p-1 rounded-sm">
                            {{ capitalizeFirstLetter(link) }}
                        </nuxt-link>
                        <span v-if="!(link === links[links.length - 1])" class=" ml-1">/</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    dataOpenSideBar: Boolean,
    activeLink: String,
    links: Array,
    generateLink: Function,
    capitalizeFirstLetter: Function
})


// const generateLink = (index) => {
//     const subLinks = links.slice(0, index + 1);
//     return '/' + subLinks.join("/");
// };

// const capitalizeFirstLetter = (string) => {
//     return string.charAt(0).toUpperCase() + string.slice(1);
// };


</script>

<style lang="scss" scoped></style>