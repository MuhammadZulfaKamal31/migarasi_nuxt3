<template>
    <div class="md:flex gap min-h-screen items-center">
        <div class=" md:w-[455px] m-[10%] ">
            <h1 class="text-2xl md:text-[40px] font-bold my-9">
                Lorem ipsum dolor sit amet consectetur
            </h1>
            <p class=" text-[14px]">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere,
                consequuntur enim. Accusantium ullam accusamus in maiores, ipsam saepe
                alias necessitatibus natus perferendis repellat, similique assumenda
                pariatur laborum facere culpa reprehenderit?
            </p>
        </div>
        <div class=" w-[100%] md:w-[50%]">
            <div class="">
                <Carousel :autoplay="3000" :wrap-around="true">
                    <Slide v-for="i in  gambar " :key="i.id">
                        <div
                            class=" w-[310px] h-[220px] md:w-[540px] md:h-[282px] bg-white rounded-2xl drop-shadow-md mt-[50px] border flex justify-between">
                            <div class="p-4">
                                <img class="md:w-[120px] my-[20px] border" :src="'../../assets/' + i.name" alt="" />
                                <p class=" text-gray-600 text-[8px] md:text-[12px]">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    Quisquam laudantium libero, ex reprehenderit delectus optio
                                    molestias pariatur. Pariatur sit, asperiores nisi dolorem
                                    debitis laborum consequatur blanditiis incidunt similique omnis
                                    praesentium.
                                    <span class="text-black font-bold">{{ i.name }}</span>.
                                </p>
                            </div>
                            <div
                                class="items-center md:w-[705px] w-[650px] h-[100px] md:h-[175px] rounded-2xl border m-[17px] my-12 md:my-8 bg-[#D9D9D9]">
                                <div class="w-full">
                                    <img class="" src="" alt="" />
                                </div>
                            </div>
                        </div>
                    </Slide>

                    <template #addons>
                        <!-- <Pagination /> -->
                    </template>
                </Carousel>
            </div>
        </div>
    </div>
</template>
<script setup>
import { defineComponent } from 'vue'
import { Carousel, Pagination, Slide } from 'vue3-carousel'

let gambar = [
    { id: 1, name: "Group11.png" },
    { id: 2, name: "Group12.png" },
    { id: 3, name: "Group13.png" },
    { id: 4, name: "Group11.png" },
    { id: 5, name: "Group12.png" }
];

</script>

<style>
/* .carousel__item {
    min-height: 200px;
    width: 70%;
    background-color: white;
    color: var(--vc-clr-white);
    font-size: 20px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
} */

.carousel__slide {
    padding: 10px;
}

.carousel__prev,
.carousel__next {
    box-sizing: content-box;
    border: 5px solid white;
}
</style>