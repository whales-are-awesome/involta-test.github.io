<template>
    <Layout
        v-if="routeName"
    >
        <ErrorPage v-show="hasError" />
        <template v-if="!hasError">
            <RouterView class="w-full" :key="$route.path + viewKeyCounter" />
        </template>
    </Layout>
    <div v-if="!routeName" class="-preloader inset-0 -z-1"></div>
    <Layers />
    <BaseNotifications />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Layers from '@/components/Layers/Layers.vue';
import BaseNotifications from '@/components/BaseNotifications/BaseNotifications.vue';
import Layout from './layouts/index.vue';
import ErrorPage from '@/views/error/index.vue';
import { store } from '@/store';
import useWatchForCreatedDaos from '@/composables/useWatchForCreatedDaos';
import useWatchForCreatedProposals from '@/composables/useWatchForCreatedProposals';
import useLayer from '@/composables/useLayer';


// META

const route = useRoute();

const hasError = computed(() => !!store.state.error.status);

const viewKeyCounter = computed(() => store.state.app.viewKey);

const watchForCreatedDaos = useWatchForCreatedDaos();
const watchForCreatedProposals = useWatchForCreatedProposals();

useLayer();

watchForCreatedDaos.watch();
watchForCreatedProposals.watch();



// ROUTE NAME

const routeName = computed(() => route.name);
</script>
