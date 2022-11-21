<template>
    <div :class="classes.root">
        <slot></slot>
    </div>
</template>


<script lang="ts" setup>
/* IMPORTS */

import { computed } from 'vue';
//import  from '@/components/';
import {  } from './types';
import makeClasses from '@/helpers/makeClasses';
import ThemeSettings from '@/models/themeSettings';


/* INTERFACES */

interface IProps {
    themeSettings?: ThemeSettings<'root'>
}

interface IEmits {
}

interface IThemeProps extends Pick<IProps, 'themeSettings'>{

}

/* META */

const props = withDefaults(defineProps<IProps>(), {});
const emit = defineEmits<IEmits>();

/* VARS AND CUSTOM HOOKS */

const useClasses = makeClasses<IThemeProps>(() => ({
    root: ({ themeSettings }) => [themeSettings?.root,
        'px-3 py-4 rounded-[4px] bg-primary-100'
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
