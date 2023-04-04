<template>
    <Layout
        v-if="$route.name"
    >
        <ErrorPage v-show="hasError" />
        <template v-if="!hasError">
            <RouterView :key="$route.path + viewKeyCounter" />
        </template>
    </Layout>
    <div v-if="!$route.name" class="-preloader inset-0 -z-1"></div>
    <Layers />
    <BaseNotifications />
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import Layers from '@/components/Layers/Layers.vue';
import BaseNotifications from '@/components/BaseNotifications/BaseNotifications.vue';
import Layout from './layouts/index.vue';
import ErrorPage from '@/views/error/index.vue';
import { store } from '@/store';
import { alert } from '@/composables/useLayer';

import useWatchForCreatedDaos from '@/composables/useWatchForCreatedDaos';
import useWatchForCreatedProposals from '@/composables/useWatchForCreatedProposals';

const hasError = computed(() => !!store.state.error.status);

const viewKeyCounter = computed(() => store.state.app.viewKey);

const watchForCreatedDaos = useWatchForCreatedDaos();
const watchForCreatedProposals = useWatchForCreatedProposals();

watchForCreatedDaos.watch();
watchForCreatedProposals.watch();

onMounted(() => {
    alert({
        title: 'Welcome to <br>OuterCircle Alpha!',
        text: `This application is currently under development and should only be used for demonstration purposes.
               <br><br>Use at your own risk. <br><br>All created DAOs must be manually migrated to the OuterCircle Beta when it will released.`,
        buttonText: 'Accept',
        cancelButtonText: '',
        status: 'unknown',
        themeSettings: {
            text: 'text-left'
        }
    });
});
</script>
