<template>
    <footer :class="classes.root">
        <div :class="classes.container">
            <div :class="classes.inner">
                <div>
                    <p :class="classes.title">
                        OuterCircle
                    </p>
                    <div
                        :class="classes.linkList"
                    >
                        <div
                            v-for="(item, index) in items"
                            :key="index"
                            :class="classes.link"
                        >
                            {{ item.title }}
                        </div>
                    </div>
                </div>
                <div>
                    <div :class="classes.bgWrapper">
                        <img
                            :class="classes.bg"
                            :src="require('@/assets/images/components/the-footer/bg.png')"
                            alt="bg"
                        />
                    </div>
                    <img
                        :class="classes.image"
                        :src="require('@/assets/images/components/the-footer/image.png')"
                        alt="image"
                    />
                </div>
            </div>
        </div>
    </footer>
</template>

<script lang="ts" setup>
/* IMPORTS */

import { computed } from 'vue';
import { IThemeProps } from './types';
import makeClasses from '@/helpers/makeClasses';

const useClasses = makeClasses<IThemeProps>(() => ({
    root: 'relative z-1 pt-[64px] pb-[128px] pl-[64px] md:pt-[50px] md:pb-[106px] md:pl-0',
    container: 'container',
    inner: '',
    title: 'text-xl text-primary-500 font-bold mb-4 md:text-lg sm:mb-3',
    linkList: 'space-y-3 sm:space-y-2',
    link: 'text-primary-400 md:text-base',
    bgWrapper: 'absolute inset-0 -z-1 max-w-none overflow-hidden',
    bg: 'absolute w-full min-h-full',
    image: 'absolute right-0 bottom-0 max-h-[400px]'
}));

const items = [
    { title: 'Beta-List', link: '' },
    { title: 'Discord', link: '' },
    { title: 'Twitter', link: '' },
    { title: 'Gitbook', link: '' }
];

const classes = computed((): ReturnType<typeof useClasses> => {
    return useClasses({
    });
});

</script>

<style scoped>

</style>
