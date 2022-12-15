<template>
    <div class="default">
        <div
            class="flex items-start"
            @click="showMobileSidebar = false"
        >
            <div
                ref="sidebars"
                class="flex bg-surface-300 min-h-screen sticky top-[0] min-h-screen overflow-hidden transition-main flex-shrink-0 md:z-[100] md:fixed md:left-0"
                @click.stop
                :class="{
                    'md:-translate-x-full': !showMobileSidebar
                }"
            >
                <TheSidebar
                    ref="sidebar"
                    class="flex-shrink-0 z-[505]"
                />
                <TheDaoSidebar
                    v-if="$route.name"
                    ref="daoSidebar"
                    class="z-[500] flex-shrink-0"
                    :class="{
                        '!w-0': !(showDaoSidebar && currentDao)
                    }"
                />
            </div>
            <div
                class="flex-grow flex flex-col overflow-hidden sm:min-h-screen transition-main"
                :style="`transform: translateX(${ !isMobile.xl ? sidebarWidth + daoSidebarWidth : 0 }px )`"
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
import { computed, onMounted, nextTick, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import TheHeader from '@/components/TheHeader/TheHeader.vue';
import TheMarquee from '@/components/TheMarquee/TheMarquee.vue';
import TheSidebar from '@/components/TheSidebar/TheSidebar.vue';
import TheDaoSidebar from '@/components/TheDaoSidebar/TheDaoSidebar.vue';
import { store } from '@/store';
import useIsMobile from '@/composables/useIsMobile';


// META

const route = useRoute();

const isMobile = useIsMobile();

const showDaoSidebar = computed(() => ['network-dao-address', 'network-dao-address-followers', 'network-dao-address-subdao', 'proposal-id'].includes(route.name as string));

const daoSidebar = ref<InstanceType<typeof TheDaoSidebar> | null>(null);
const sidebar = ref<InstanceType<typeof TheSidebar> | null>(null);

const showMobileSidebar = ref(false);

const sidebarWidth = ref(0);
const daoSidebarWidth = ref(0);

const currentDao = computed(() => store.state.dao.data);


onMounted(async () => {
    await nextTick();
});

watch([showMobileSidebar, showDaoSidebar], () => {
    let width = sidebar.value?.root.offsetWidth || 0;

    width += showDaoSidebar.value ? daoSidebar.value?.inner.offsetWidth : 0;

    sidebarWidth.value = showMobileSidebar.value ? width : 0;
});
</script>
