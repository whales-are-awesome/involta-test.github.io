<template>
    <div :class="classes.root">
        <div :class="classes.inner">
            <div :class="classes.top">
                <div :class="classes.topInner">
                    <img
                        :class="classes.logo"
                        :src="require('@/assets/images/common/placeholder.jpeg')"
                        alt="OuterCircle"
                    >
                    <div :class="classes.topInfo">
                        <div :class="classes.name">
                            DAO Name
                        </div>
                        <div
                            :class="classes.more"
                        >
                            <div :class="classes.moreCircle"></div>
                            <div :class="classes.moreCircle"></div>
                            <div :class="classes.moreCircle"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script lang="ts" setup>
/* IMPORTS */

import { computed, ref } from 'vue';
import {  } from './types';
import makeClasses from '@/helpers/makeClasses';

/* META */

/* CONSTANTS AND CUSTOM HOOKS */

const useClasses = makeClasses(() => ({
    root: ({ themeSettings }) => {
        return [themeSettings?.root, [
            'w-[224px] [clip-path:polygon(0_0%,100%_0,100%_100%,0%_100%)]',
        ]];
    },
    inner: 'w-[224px] h-screen bg-surface-200 pb-2 fixed top-0 left-[72px]',
    top: 'w-full mx-auto mb-6 bg-black',
    topInner: 'pb-[100%] relative',
    logo: 'absolute h-full min-w-full top-0 left-1/2 -translate-x-1/2 z-0 opacity-70',
    topInfo: 'absolute left-0 bottom-0 px-2 pb-[10px] w-full flex justify-between items-center',
    name: 'text-surface-100 text-white font-semibold',
    more: 'bg-[rgba(212,212,214,0.2)] rounded-full w-6 h-6 flex items-center justify-center flex-col space-y-px',
    moreCircle: 'bg-white rounded-full w-[3px] h-[3px]',
}));

/* DATA */



/* COMPUTED */

const classes = computed((): ReturnType<typeof useClasses> => {
    return useClasses({

    });
});

/* WATCH */



/* METHODS */
</script>
