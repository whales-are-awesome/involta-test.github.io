<template>
    <div :class="classes.root">
        <div :class="classes.inner">
            <p :class="classes.title">
                {{ title }}
            </p>
            <p :class="classes.text">
                {{ text }}
            </p>
            <BaseButton
                size="lg"
                theme="surface"
            >
                Explore Apps
            </BaseButton>
        </div>
    </div>
</template>


<script lang="ts" setup>
/* IMPORTS */

import { computed } from 'vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import {  } from './types';
import makeClasses from '@/helpers/makeClasses';
import ThemeSettings from '@/models/themeSettings';

/* INTERFACES */

interface IProps {
    title: string
    text: string
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

    ],
    inner: 'flex flex-col items-center text-center',
    title: 'title-h4 text-500 mb-3',
    text: 'text-400 max-w-[440px] text-lg mb-11'
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
