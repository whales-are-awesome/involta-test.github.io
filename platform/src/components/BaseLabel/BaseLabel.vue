<template>
    <span
        :class="classes.root"
        @click="emit('click')"
    >
        <slot></slot>
    </span>
</template>


<script lang="ts" setup>
/* IMPORTS */

import { computed, defineEmits } from 'vue';
import { Rounded, Themes, Views } from './types';
import makeClasses from '@/helpers/makeClasses';

/* INTERFACES */

interface IProps {
    view: keyof typeof Views
    theme: keyof typeof Themes
    rounded: keyof typeof Rounded
    themeSettings?: any
}

interface IEmits {
    (e: 'click'): void
}



interface IThemeProps extends Pick<IProps, 'view' | 'theme' | 'rounded' | 'themeSettings'>{}

/* META */

const props = withDefaults(defineProps<IProps>(), {
    rounded: Rounded.Base
});
const emit = defineEmits<IEmits>();

/* VARS AND CUSTOM HOOKS */

const useClasses = makeClasses<IThemeProps>(() => ({
    root: ({ themeSettings, theme, view, rounded }) => {
        return [themeSettings?.root, [
            'inline-flex items-center',
            {
                'uppercase text-xs font-bold tracking-[.12em]': view !== Views.Simple,
                'text-xss tracking-[.04em]': view === Views.Simple,

                'px-4 py-[6px]': ![Views.Rounded, Views.Simple].includes(view),
                'py-[2px] px-1': view === Views.Simple,
                'p-[6px]': view === Views.Rounded && rounded === Rounded.Lg,
                'p-2': view === Views.Rounded && rounded === Rounded.Base,

                'rounded-[5px]': rounded === Rounded.Base,
                'rounded-[20px]': rounded === Rounded.Lg && view !== Views.Rounded,
                'rounded-full': rounded === Rounded.Lg && view === Views.Rounded,
            },
            {
                'bg-[#078549] text-white': theme === Themes.Positive && view === Views.Filled,
                'bg-[#E6FEF3] text-[#05751F]': theme === Themes.Positive && view === Views.Faded,
                'border border-[#05751F] text-[#05751F]': theme === Themes.Positive && view === Views.Outlined,
                'bg-[#078549]': theme === Themes.Positive && view === Views.Rounded,

                'bg-[#F2D058] text-[#424243]': theme === Themes.Warning && view === Views.Filled,
                'bg-[#FDF8E7] text-[#755605]': theme === Themes.Warning && view === Views.Faded,
                'border border-[#755605] text-[#755605]': theme === Themes.Warning && view === Views.Outlined,
                'bg-[#F2D058]': theme === Themes.Warning && view === Views.Rounded,

                'bg-[#5A58F2] text-white': theme === Themes.Primary && view === Views.Filled,
                'bg-[#E8E7FD] text-[#4D4BE7]': theme === Themes.Primary && view === Views.Faded,
                'border border-[#4D4BE7] text-[#4D4BE7]': theme === Themes.Primary && view === Views.Outlined,
                'bg-[#5A58F2]': theme === Themes.Primary && view === Views.Rounded,

                'bg-[#DA0000] text-white': theme === Themes.Critical && view === Views.Filled,
                'bg-[#FDE7E9] text-[#CB101D]': theme === Themes.Critical && view === Views.Faded,
                'border border-[#CB101D] text-[#CB101D]': theme === Themes.Critical && view === Views.Outlined,
                'bg-[#DA0000]': theme === Themes.Critical && view === Views.Rounded,

                'bg-gray-600 text-white': theme === Themes.Neutral && view === Views.Filled,
                'bg-surface-400 text-gray-600': theme === Themes.Neutral && view === Views.Faded,
                'border border-gray-600 text-gray-600': theme === Themes.Neutral && view === Views.Outlined,
                'bg-gray-600': theme === Themes.Neutral && view === Views.Rounded,

                'border border-primary-300 bg-primary-100 text-primary-500 rounded-[2px]': view === Views.Simple
            }
        ]];
    },
}));

/* COMPUTED */
const classes = computed((): ReturnType<typeof useClasses> => {
    return useClasses({
        view: props.view,
        theme: props.theme,
        rounded: props.rounded,
        themeSettings: props.themeSettings
    });
});
</script>
