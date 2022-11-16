<template>
    <div :class="classes.root">
        <slot></slot>
    </div>
</template>


<script lang="ts" setup>
/* IMPORTS */

import { computed, defineProps } from 'vue';
import {  } from './types';
import makeClasses from '@/helpers/makeClasses';
import IThemeSettings from '@/models/themeSettings';

/* INTERFACES */

interface IProps {
    themeSettings?: IThemeSettings<'root'>
}
interface ThemeProps extends Pick<IProps, 'themeSettings'>{}

/* META */
const props = withDefaults(defineProps<IProps>(), {

});
/* VARS AND CUSTOM HOOKS */

const useClasses = makeClasses<ThemeProps>(() => ({
    root: ({ themeSettings }) => [themeSettings?.root,
        'flex items-center text-xxs text-gray-400 tracking-[0.4px] uppercase before:w-10 before:h-px before:bg-current before:mr-2',
    ]
}));

/* DATA */
/* COMPUTED */

const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({
        themeSettings: props.themeSettings
    });
});

/* WATCH */
/* METHODS */
</script>
