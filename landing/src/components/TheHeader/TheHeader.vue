<template>
    <header :class="classes.root">
        <div :class="classes.container">
            <div :class="classes.inner">
                <BaseButton
                    :class="classes.linkWrapper"
                    size="sm"
                    view="ghost"
                    href="https://docs.outercircle.io/"
                >
                    Documentation
                </BaseButton>
                <BaseLogo :class="classes.logo" />
                <BaseButton
                    :class="classes.linkWrapper"
                    size="sm"
                    view="ghost"
                    href="https://t.me/OuterCircleCommunity"
                >
                    Contacts
                </BaseButton>
            </div>
        </div>
    </header>
</template>

<script lang="ts" setup>
/* IMPORTS */

import { computed } from 'vue';
import { IThemeProps } from './types';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import BaseLogo from '@/components/BaseLogo/BaseLogo.vue';
import makeClasses from '@/helpers/makeClasses';

const useClasses = makeClasses<IThemeProps>(() => ({
    root: 'md:bg-white md:bg-opacity-20',
    container: 'container',
    inner: 'flex h-[76px] items items-center justify-between md:justify-center md:h-[52px]',
    linkWrapper: 'md:hidden'
}));

const classes = computed((): ReturnType<typeof useClasses> => {
    return useClasses({
    });
});
</script>

<style scoped>

</style>
