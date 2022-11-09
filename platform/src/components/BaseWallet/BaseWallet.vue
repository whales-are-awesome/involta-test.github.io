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

/* VARS AND CUSTOM HOOKS */

const useClasses = makeClasses<IThemeProps>(() => ({
    root: ({ themeSettings }) => {
        return [themeSettings?.root, [
            'bg-surface-300 text-gray-500 text-xs rounded-[30px] px-4 py-2.5 sm:rounded-[30px] sm:py-1.5 sm:px-2 sm:!text-xxs'
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
