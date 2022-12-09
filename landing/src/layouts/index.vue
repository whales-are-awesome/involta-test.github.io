<template>
    <div class="default md:relative">
        <TheHeader class="w-full z-1 md:absolute md:left-0 md:top-0" />
        <HomePage />
        <Layers />
        <TheFooter />
    </div>
</template>

<script lang="ts" setup>
import Layers from '@/components/Layers/Layers.vue';
import HomePage from '@/views/home/index.vue';
import TheHeader from '@/components/TheHeader/TheHeader.vue';
import TheFooter from '@/components/TheFooter/TheFooter.vue';
</script>
