<template>
    <nuxt-link :to="to" :class="{ 'text-red-500 font-bold': isActive, 'text-green-900 font-medium': isExactActive }">
        <slot>
        </slot>
    </nuxt-link>
</template>
  
<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();

const props = defineProps({
    to: String,
});

const isActive = route.path === props.to;
const isExactActive = route.path === props.to;
</script>
  