<template>
    <div
        :class="classes.root"
    >
        {{ cutAddress(value) }}
    </div>
</template>


<script lang="ts" setup>
/* IMPORTS */

import { computed } from 'vue';
//import  from '@/components/';
import {  } from './types';
import makeClasses from '@/helpers/makeClasses';
import cutAddress from '@/helpers/cutAddress';


/* INTERFACES */

interface IProps {
    value: string
    themeSettings?: any
}

interface IThemeProps extends Pick<IProps, 'themeSettings'>{

}

/* META */

const props = withDefaults(defineProps<IProps>(), {});

/* CONSTANTS AND CUSTOM HOOKS */

const useClasses = makeClasses<IThemeProps>(() => ({
    root: ({ themeSettings }) => {
        return [themeSettings?.root, [
            'bg-surface-300 text-gray-500 rounded-[30px] text-sm px-4 py-2.5'
        ]];
    },
    circle: 'w-7 h-7 ml-3 bg-surface-500 rounded-full shrink-0'
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
