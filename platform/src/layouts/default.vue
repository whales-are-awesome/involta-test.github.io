<template>
    <div class="default">
        <div class="flex">
            <TheSidebar class="flex-shrink-0" />
            <TheDaoSidebar
                class="flex-shrink-0 transition-main min-h-screen"
                :class="{
                    '!w-0': route.name !== 'dao-id'
                }"
            />
            <div class="flex-grow flex flex-col">
                <TheHeader />
                <TheMarquee />
                <div class="px-8 pb-9 flex-grow">
                    <slot></slot>
                </div>
            </div>
        </div>
        <Layers />
    </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import Layers from '@/components/Layers/Layers.vue';
import TheHeader from '@/components/TheHeader/TheHeader.vue';
import TheMarquee from '@/components/TheMarquee/TheMarquee.vue';
import TheSidebar from '@/components/TheSidebar/TheSidebar.vue';
import TheDaoSidebar from '@/components/TheDaoSidebar/TheDaoSidebar.vue';
import { useStore } from '@/store';
import { computed } from 'vue';

const store = useStore();
const route = useRoute();
const breadcrumbs = computed(() => store.state.breadcrumbs.items);
</script>
