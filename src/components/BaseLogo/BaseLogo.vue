<template>
    <div
        :class="classes.root"
    >
        <img
            :class="classes.icon"
            :src="require('@/assets/images/common/logo.jpeg')"
            alt="logo"
        />
        <div :class="classes.text">
            OuterCircle.
        </div>
    </div>
</template>


<script lang="ts" setup>
/* IMPORTS */

import { computed } from 'vue';
import BaseIcon from '@/components/BaseIcon.vue';
import makeClasses, { makeThemeSettings } from '@/helpers/makeClasses';

/* INTERFACES */

interface IProps {
    modelValue: string
    themeSettings?: any
}

interface IThemeProps extends Pick<IProps, 'themeSettings'> {
}

/* META */

const props = withDefaults(defineProps<IProps>(), {});

/* CONSTANTS AND CUSTOM HOOKS */

const useClasses = makeClasses<IThemeProps>(() => ({
    root: ({ themeSettings }) => {
        return makeThemeSettings(themeSettings?.root, [
            'flex items-center'
        ]);
    },
    icon: ({ themeSettings }) => {
        return makeThemeSettings(themeSettings?.text, [
            'mr-3 w-11 md:w-[28px]'
        ]);
    },
    text: ({ themeSettings }) => {
        return makeThemeSettings(themeSettings?.text, [
            'text-[#26283C] font-bold'
        ]);
    },
}));

/* COMPUTED */

const classes = computed((): ReturnType<typeof useClasses> => {
    return useClasses({
        themeSettings: props.themeSettings
    });
});
</script>

