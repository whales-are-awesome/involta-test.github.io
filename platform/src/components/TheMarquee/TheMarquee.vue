<template>
    <div
        :class="classes.root"
    >
        <div :class="classes.inner">
            <MarqueeText :repeat="4">
            <span :class="classes.item">
                ОЛЯ РАБОТАТЬ
            </span>
                <span :class="classes.item">
                ДРИСТПАНК РАБОТАТЬ
            </span>
                <span :class="classes.item">
                ВСЕ РАБОТАТЬ
            </span>
            </MarqueeText>
        </div>
    </div>
</template>


<script lang="ts" setup>
/* IMPORTS */

import { computed } from 'vue';
import MarqueeText from 'vue-marquee-text-component'
import {  } from './types';
import makeClasses from '@/helpers/makeClasses';

/* CONSTANTS AND CUSTOM HOOKS */

const useClasses = makeClasses(() => ({
    root: ({ themeSettings }) => {
        return [themeSettings?.root, [
            'h-[36px] border-b-[2px] border-t-[2px] border-[#F5F5F7] overflow-hidden relative'
        ]];
    },
    inner: 'top-0 left-0 absolute flex items-center h-full w-full',
    item: 'text-gray-500 text-xs uppercase tracking-[0.12em] font-bold px-[30px]'
}));

/* COMPUTED */

const classes = computed((): ReturnType<typeof useClasses> => {
    return useClasses({

    });
});
</script>
