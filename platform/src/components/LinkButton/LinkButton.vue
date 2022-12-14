<template>
    <a
        :class="classes.root"
        :href="href"
        target="_blank"
    >
        <BaseIcon
            :class="[classes.icon, iconClass]"
            :name="iconName"
            :width="iconWidth"
            :height="iconHeight"
        />
    </a>
</template>


<script lang="ts" setup>
import { computed } from 'vue';
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';
import { Icons } from '@/components/BaseIcon/types';
import {  } from './types';
import makeClasses from '@/helpers/makeClasses';
import ThemeSettings from '@/types/themeSettings';

// META

interface IProps {
    href: string
    iconName: Icons
    iconWidth?: string
    iconHeight?: string
    iconClass?: string
    themeSettings?: ThemeSettings<'root'>
}

const props = withDefaults(defineProps<IProps>(), {});


// CLASSES

interface IThemeProps extends Pick<IProps, 'themeSettings'>{}

const useClasses = makeClasses<IThemeProps>(() => ({
    root: ({ themeSettings }) => [themeSettings?.root,
        'w-8 h-8 flex items-center justify-center bg-primary-100 rounded-[5px] text-gray-500'
    ],
    icon: ''
}));

const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({
        themeSettings: props.themeSettings
    });
});
</script>
