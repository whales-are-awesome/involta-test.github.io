<template>
    <div :class="classes.root">
        <div :class="classes.inner">
            <div :class="classes.logoWrapper">
                <BaseImage
                    :class="classes.logo"
                    :src="require('@/assets/images/common/logo.png')"
                    alt="OuterCircle"
                    @click="$router.push({ name: 'home' })"
                />
            </div>
            <div :class="classes.menuItems">
                <TheSidebarButton
                    icon="home"
                    icon-width="17"
                    :active="route.name === 'home'"
                    @click="$router.push({ name: 'home' })"
                />
                <TheSidebarButton
                    icon="plus"
                    icon-width="17"
                    :active="isCreateDaoOpened"
                    @click="layer.open('CreateDaoLayer')"
                />
                <TheSidebarButton
                    :active="route.name === 'ui'"
                    @click="$router.push({ name: 'ui' })"
                >
                    <div class="-translate-x-2">UI</div>
                </TheSidebarButton>
                <TheSidebarButton
                    :image="require('@/assets/images/common/placeholder.jpeg')"
                    :active="route.name === 'net-dao-id'"
                    @click="$router.push({ name: 'net-dao-id', params: { id: 2, net: 'goerly' } })"
                />
            </div>
        </div>
    </div>
</template>


<script lang="ts" setup>
/* IMPORTS */

import { computed } from 'vue';
import { useRoute } from 'vue-router';
import TheSidebarButton from './TheSidebarButton.vue';
import makeClasses from '@/helpers/makeClasses';
import useLayer from '@//composables/useLayer';
import { IProps } from '@/components/BlockInfo/BlockInfo.vue';

/* META */

const route = useRoute();

/* VARS AND CUSTOM HOOKS */

const layer = useLayer();

interface IThemeProps {
    isHome: boolean
}

const useClasses = makeClasses<IThemeProps>(() => ({
    root: 'w-[72px]',
    inner: 'w-[72px] h-screen bg-surface-300 py-2 fixed top-0 left-0',
    logoWrapper: `w-11 mx-auto pb-[18px] mb-[18px] relative
                  after:border-b-2 after:border-gray-200 after:top-full after:left-1/2 after:-translate-x-1/2 after:w-[28px] after:h-[2px] after:bg-gray-300 after:block after:absolute`,
    logo: ({ isHome }) => ({
        'cursor-pointer': !isHome
    }),
    menuItems: 'space-y-5'
}));

/* DATA */
/* COMPUTED */

const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({
        isHome: route.name === 'home'
    });
});

const isCreateDaoOpened = computed(() => {
    return !!layer.openedItems.value.find(item => item.id === 'CreateDaoLayer');
});

/* WATCH */
/* METHODS */
</script>
