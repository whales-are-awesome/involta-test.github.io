<template>
    <div :class="classes.root">
        <div :class="classes.inner">
            <div :class="classes.logoWrapper">
                <img
                    :class="classes.logo"
                    :src="require('@/assets/images/common/logo.png')"
                    alt="OuterCircle"
                    @click="router.push({ name: 'home' })"
                >
            </div>
            <div :class="classes.menuItems">
                <TheSidebarButton
                    icon="home"
                    icon-width="17"
                    :active="route.name === 'home'"
                    @click="router.push({ name: 'home' })"
                />
                <TheSidebarButton
                    icon="plus"
                    icon-width="17"
                    :active="isCreateDaoOpened"
                    @click="layer.open('CreateDaoLayer')"
                />
                <TheSidebarButton
                    :active="route.name === 'ui'"
                    @click="router.push({ name: 'ui' })"
                >
                    <div class="-translate-x-2">UI</div>
                </TheSidebarButton>
                <TheSidebarButton
                    :image="require('@/assets/images/common/logo.png')"
                    :active="route.name === 'dao-id'"
                    @click="router.push({ name: 'dao-id', params: { id: 2 } })"
                />
            </div>
        </div>
    </div>
</template>


<script lang="ts" setup>
/* IMPORTS */

import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import TheSidebarButton from './TheSidebarButton.vue';
import {  } from './types';
import makeClasses from '@/helpers/makeClasses';
import useLayer from '@//composables/useLayer';

/* META */

const route = useRoute();
const router = useRouter();

/* VARS AND CUSTOM HOOKS */

const layer = useLayer();

const useClasses = makeClasses(() => ({
    root: ({ themeSettings }) => {
        return [themeSettings?.root, [
            'w-[72px]',
        ]];
    },
    inner: ({ themeSettings }) => {
        return [themeSettings?.root, [
            'w-[72px] h-screen bg-surface-300 py-2 fixed top-0 left-0',
        ]];
    },
    logoWrapper: ({ themeSettings }) => {
        return [themeSettings?.root, [
            `w-11 mx-auto pb-[18px] mb-[18px] relative
            after:border-b-2 after:border-gray-200 after:top-full after:left-1/2 after:-translate-x-1/2 after:w-[28px] after:h-[2px] after:bg-gray-300 after:block after:absolute`,
        ]];
    },
    logo: ({ themeSettings, isHome }) => {
        return [themeSettings?.root, [
            {
                'cursor-pointer': !isHome
            }
        ]];
    },
    menuItems: ({ themeSettings }) => {
        return [themeSettings?.root, [
            'space-y-5',
        ]];
    }
}));

/* DATA */
/* COMPUTED */

const classes = computed((): ReturnType<typeof useClasses> => {
    return useClasses({
        isHome: route.name === 'home'
    });
});

const isCreateDaoOpened = computed<boolean>(() => {
    return !!layer.openedItems.value.find(item => item.id === 'CreateDaoLayer');
});

/* WATCH */
/* METHODS */
</script>
