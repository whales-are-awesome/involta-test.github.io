<template>
    <Layout>
        <ErrorPage v-show="hasError" />
        <RouterView v-if="$route.name" :key="$route.path" v-show="!hasError" />
        <div v-if="!$route.name" class="-preloader !absolute inset-0 -z-1"></div>
    </Layout>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Layout from './layouts/index.vue';
import ErrorPage from '@/views/error.vue';
import { store } from '@/store';

const hasError = computed(() => !!store.state.error.status);
</script>
