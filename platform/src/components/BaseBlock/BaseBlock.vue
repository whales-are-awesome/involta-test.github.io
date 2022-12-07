<template>
    <div :class="classes.root">
        <slot></slot>
    </div>
</template>


<script lang="ts" setup>
import { computed } from 'vue';
//import  from '@/components/';
import {  } from './types';
import makeClasses from '@/helpers/makeClasses';
import ThemeSettings from '@/types/themeSettings';


// META

interface IProps {
    themeSettings?: ThemeSettings<'root'>
}

interface IEmits {
}

const props = withDefaults(defineProps<IProps>(), {});

const emit = defineEmits<IEmits>();


// CLASSES

interface IThemeProps extends Pick<IProps, 'themeSettings'>{}

const useClasses = makeClasses<IThemeProps>(() => ({
    root: ({ themeSettings }) => [themeSettings?.root,
        'px-3 py-4 rounded-[4px] bg-primary-100'
    ]
}));

const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({
        themeSettings: props.themeSettings
    });
});
</script>
