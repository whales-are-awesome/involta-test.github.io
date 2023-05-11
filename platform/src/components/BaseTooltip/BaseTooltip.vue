<template>
    <VDropdown
        :distance="distance"
        :triggers="['hover', 'touch']"
        placement="right"
    >
        <slot></slot>
        <template
            #popper
        >
            <slot name="content"></slot>
        </template>
    </VDropdown>
</template>


<script lang="ts" setup>
import { computed } from 'vue';
//import  from '@/components/';
import {  } from './types';
import { Dropdown as VDropdown } from 'floating-vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import 'floating-vue/dist/style.css'
import makeClasses from '@/helpers/makeClasses';
import ThemeSettings from '@/types/themeSettings';

// META

interface IProps {
    distance: number
    themeSettings?: ThemeSettings<'root'>
}

const props = withDefaults(defineProps<IProps>(), {});



// CLASSES

interface IThemeProps extends Pick<IProps, 'themeSettings'>{}

const useClasses = makeClasses<IThemeProps>(() => ({
    root: ({ themeSettings }) => [themeSettings?.root,

    ]
}));

const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({
        themeSettings: props.themeSettings
    });
});
</script>

<style>
    .v-popper__arrow-container {
        display: none;
    }
</style>
