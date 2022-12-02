<template>
    <div class="default">
        <div
            class="flex"
            @click="showMobileSidebar = false"
        >
            <div
                ref="sidebar"
                class="flex md:z-[100] md:fixed md:top-0 md:left-0 md:bg-surface-300 md:overflow-hidden md:transition-main md:max-w-full"
                :class="{
                    'md:!max-w-0': !showMobileSidebar
                }"
                @click.stop
            >
                <TheSidebar
                    class="flex-shrink-0 z-[505]"
                />
                <TheDaoSidebar
                    v-if="$route.name"
                    ref="daoSidebar"
                    class="z-[500] flex-shrink-0 transition-[width] duration-[0.25s] ease-[cubic-bezier(0.645, 0.045, 0.355, 1)] min-h-screen [clip-path:polygon(0_0%,100%_0,100%_100%,0%_100%)] md:[clip-path:none]"
                    :class="{
                        '!w-0 md:w-auto md:-translate-x-full': !(showDaoSidebar && currentDao)
                    }"
                />
            </div>
            <div
                class="flex-grow flex flex-col overflow-hidden sm:min-h-screen"
                :style="`transform: translateX(${ sidebarWidth}px )`"
            >
                <TheHeader
                    @click.stop="showMobileSidebar = !showMobileSidebar"
                />
                <TheMarquee />
                <div class="px-8 pb-9 relative flex-grow sm:px-6">
                    <slot></slot>
                </div>
            </div>
        </div>
        <Layers />
    </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, nextTick, ref } from 'vue';
import { useRoute } from 'vue-router';
import Layers from '@/components/Layers/Layers.vue';
import TheHeader from '@/components/TheHeader/TheHeader.vue';
import TheMarquee from '@/components/TheMarquee/TheMarquee.vue';
import TheSidebar from '@/components/TheSidebar/TheSidebar.vue';
import TheDaoSidebar from '@/components/TheDaoSidebar/TheDaoSidebar.vue';
import { store } from '@/store';
import useIsMobile from '@/composables/useIsMobile';

const route = useRoute();
const showDaoSidebar = computed(() => ['network-dao-address', 'network-dao-address-subdao', 'proposal-id'].includes(route.name?.toString()))
const daoSidebar = ref<InstanceType<typeof TheDaoSidebar> | null>(null);
const sidebar = ref(null);
const showMobileSidebar = ref(false);
const sidebarWidth = ref(0);

const currentDao = computed(() => store.state.dao.data);

const isMobile = useIsMobile();

onMounted(async () => {
    await nextTick();

    daoSidebar.value?.root?.addEventListener('transitionstart', addCrop);
    daoSidebar.value?.root?.addEventListener('transitionend', removeCrop);
    watchSidebarChangeOnMobile();
});

onUnmounted(() => {
    daoSidebar.value?.root?.removeEventListener('transitionstart', addCrop);
    daoSidebar.value?.root?.removeEventListener('transitionend', removeCrop);
});

function addCrop() {
    if (route.name === 'network-dao-address') {
        daoSidebar.value?.root?.classList.add('[clip-path:polygon(0_0%,100%_0,100%_100%,0%_100%)]');
    }
}

function removeCrop() {
    if (route.name === 'network-dao-address') {
        daoSidebar.value?.root?.classList.remove('[clip-path:polygon(0_0%,100%_0,100%_100%,0%_100%)]');
    }
}

function watchSidebarChangeOnMobile() {
    function outputsize() {
        sidebarWidth.value = (isMobile.value.md || isMobile.value.sm) ? sidebar.value.offsetWidth : 0;
    }
    outputsize()

    new ResizeObserver(outputsize).observe(sidebar.value);
}

</script>
