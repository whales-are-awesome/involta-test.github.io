<template>
    <div class="default">
        <div class="flex">
            <TheSidebar
                class="flex-shrink-0 sm:hidden"
            />
            <TheDaoSidebar
                ref="daoSidebar"
                class="z-[1000] flex-shrink-0 transition-[width] duration-[0.25s] ease-[cubic-bezier(0.645, 0.045, 0.355, 1)] min-h-screen [clip-path:polygon(0_0%,100%_0,100%_100%,0%_100%)] md:hidden"
                :class="{
                    '!w-0 ': !showDaoSidebar
                }"
            />
            <div class="flex-grow flex flex-col overflow-hidden sm:min-h-screen">
                <TheHeader />
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
import emitter from '@/plugins/mitt';

const route = useRoute();
const showDaoSidebar = computed(() => ['dao-id', 'dao-id-subdao', 'proposal-id'].includes(route.name))
const daoSidebar = ref(null);
let el: HTMLElement  = document.createElement('div');

onMounted(async () => {
    await nextTick();

    el = daoSidebar.value.root;

    el.addEventListener('transitionstart', addCrop);
    el.addEventListener('transitionend', removeCrop);
});

onUnmounted(() => {
    el.removeEventListener('transitionstart', addCrop);
    el.removeEventListener('transitionend', removeCrop);
});

function addCrop() {
    if (route.name === 'dao-id') {
        el.classList.add('[clip-path:polygon(0_0%,100%_0,100%_100%,0%_100%)]');
    }
}

function removeCrop() {
    if (route.name === 'dao-id') {
        el.classList.remove('[clip-path:polygon(0_0%,100%_0,100%_100%,0%_100%)]');
    }
}
</script>
