<template>
    <div :class="classes.root">
        <slot></slot>
    </div>
</template>


<script lang="ts" setup>
import { computed, defineProps } from 'vue';
import {  } from './types';
import makeClasses from '@/helpers/makeClasses';
import ThemeSettings from '@/types/themeSettings';


// META

interface IProps {
    themeSettings?: ThemeSettings<'root'>
}

const props = withDefaults(defineProps<IProps>(), {

});


// CLASSES

interface ThemeProps extends Pick<IProps, 'themeSettings'>{}

const useClasses = makeClasses<ThemeProps>(() => ({
    root: ({ themeSettings }) => [themeSettings?.root,
        'flex items-center text-xxs text-gray-400 tracking-[0.4px] uppercase before:w-10 before:h-px before:bg-current before:mr-2',
    ]
}));

const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({
        themeSettings: props.themeSettings
    });
});
</script>
