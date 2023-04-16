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
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Layers from '@/components/Layers/Layers.vue';
import BaseNotifications from '@/components/BaseNotifications/BaseNotifications.vue';
import Layout from './layouts/index.vue';
import ErrorPage from '@/views/error/index.vue';
import { store } from '@/store';
import { alert } from '@/composables/useLayer';
import API from '@/helpers/api';

import useWatchForCreatedDaos from '@/composables/useWatchForCreatedDaos';
import useWatchForCreatedProposals from '@/composables/useWatchForCreatedProposals';
import * as net from 'net';


// META

const route = useRoute();

const hasError = computed(() => !!store.state.error.status);

const viewKeyCounter = computed(() => store.state.app.viewKey);

const watchForCreatedDaos = useWatchForCreatedDaos();
const watchForCreatedProposals = useWatchForCreatedProposals();

watchForCreatedDaos.watch();
watchForCreatedProposals.watch();

// onMounted(async () => {
//     await alert({
//         title: 'Welcome to <br>OuterCircle Alpha!',
//         text: `This application is currently under development and should only be used for demonstration purposes.
//                <br><br>Use at your own risk. <br><br>All created DAOs must be manually migrated to the OuterCircle Beta when it will released.`,
//         buttonText: 'Accept',
//         cancelButtonText: '',
//         status: 'unknown',
//         closeOnClickOutside: false,
//         themeSettings: {
//             text: 'text-left'
//         }
//     });
//
//     const network = await API.getNetwork();
//
//     if (network !== 'polygon' && network !== 'goerli') {
//         const isChangeNetwork = await alert({
//             title: 'Wrong network',
//             text: `This application currently supports only two networks: goerli and polygon. Please switch you network.`,
//             buttonText: 'Polygon',
//             cancelButtonText: 'Goerli',
//             status: 'error',
//             closeOnClickOutside: false
//         });
//
//         if (typeof isChangeNetwork === 'boolean') {
//             window.ethereum.request({
//                 method: 'wallet_switchEthereumChain',
//                 params: [{ chainId: isChangeNetwork ? '0x89' : '0x5' }]
//             });
//         }
//     }
// });


// ROUTE NAME

const routeName = computed(() => route.name);
</script>
