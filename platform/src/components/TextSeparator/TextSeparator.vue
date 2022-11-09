<template>
    <div :class="classes.root">
        <slot></slot>
    </div>
</template>


<script lang="ts" setup>
/* IMPORTS */

import { computed } from 'vue';
import {  } from './types';
import makeClasses from '@/helpers/makeClasses';

/* INTERFACES */
/* META */
/* VARS AND CUSTOM HOOKS */

const useClasses = makeClasses(() => ({
    root: ({ themeSettings }) => {
        return [themeSettings?.root,  [
            'flex items-center text-xxs text-gray-400 tracking-[0.4px] uppercase before:w-10 before:h-px before:bg-current before:mr-2',
        ]];
    },
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
