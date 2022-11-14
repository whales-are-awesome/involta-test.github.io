<template>
    <Layout>
        <RouterView/>
        <div v-if="!$route.name" class="-preloader !absolute inset-0 -z-1"></div>
    </Layout>
</template>

<script setup lang="ts">
import Layout from './layouts/index.vue';
</script>
