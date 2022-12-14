<template>
    <Layout v-if="$route.name">
        <ErrorPage v-show="hasError" />
        <RouterView :key="$route.path" v-show="!hasError" />
    </Layout>
    <div v-if="!$route.name" class="-preloader inset-0 -z-1"></div>
    <Layers />
    <BaseNotifications />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Layers from '@/components/Layers/Layers.vue';
import BaseNotifications from '@/components/BaseNotifications/BaseNotifications.vue';
import Layout from './layouts/index.vue';
import ErrorPage from '@/views/error/index.vue';
import { store } from '@/store';

import useWatchForCreatedDaos from '@/composables/useWatchForCreatedDaos';

const hasError = computed(() => !!store.state.error.status);

const watchForCreatedDaos = useWatchForCreatedDaos();

watchForCreatedDaos.watch();
</script>
