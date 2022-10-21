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
    view: Views
    theme: Themes
    rounded: Rounded
    themeSettings?: any
}

interface IEmits {
    (e: 'click'): void
}



interface IThemeProps extends Pick<IProps, 'view' | 'theme' | 'rounded' | 'themeSettings'>{}

/* META */

const props = withDefaults(defineProps<IProps>(), {
    rounded: 'base'
});
const emit = defineEmits<IEmits>();

/* VARS AND CUSTOM HOOKS */

const useClasses = makeClasses<IThemeProps>(() => ({
    root: ({ themeSettings, theme, view, rounded }) => {
        return [themeSettings?.root, [
            'inline-flex items-center justify-center',
            {
                'uppercase text-xs font-bold tracking-[.12em]': view !== 'simple',
                'text-xss tracking-[.04em]': view === 'simple',

                'px-4 py-[6px]': !['rounded', 'simple'].includes(view),
                'py-[2px] px-1': view === 'simple',
                'p-[6px]': view === 'rounded' && rounded === 'lg',
                'p-2': view === 'rounded' && rounded === 'base',

                'rounded-[5px]': rounded === 'base',
                'rounded-[20px]': rounded === 'lg' && view !== 'rounded',
                'rounded-full': rounded === 'lg' && view === 'rounded',
            },
            {
                'bg-[#078549] text-white': theme === 'positive' && view === 'filled',
                'bg-[#E6FEF3] text-[#05751F]': theme === 'positive' && view === 'faded',
                'border border-[#05751F] text-[#05751F]': theme === 'positive' && view === 'outlined',
                'bg-[#078549]': theme === 'positive' && view === 'rounded',

                'bg-[#F2D058] text-[#424243]': theme === 'warning' && view === 'filled',
                'bg-[#FDF8E7] text-[#755605]': theme === 'warning' && view === 'faded',
                'border border-[#755605] text-[#755605]': theme === 'warning' && view === 'outlined',
                'bg-[#F2D058]': theme === 'warning' && view === 'rounded',

                'bg-[#5A58F2] text-white': theme === 'primary' && view === 'filled',
                'bg-[#E8E7FD] text-[#4D4BE7]': theme === 'primary' && view === 'faded',
                'border border-[#4D4BE7] text-[#4D4BE7]': theme === 'primary' && view === 'outlined',
                'bg-[#5A58F2]': theme === 'primary' && view === 'rounded',

                'bg-[#DA0000] text-white': theme === 'critical' && view === 'filled',
                'bg-[#FDE7E9] text-[#CB101D]': theme === 'critical' && view === 'faded',
                'border border-[#CB101D] text-[#CB101D]': theme === 'critical' && view === 'outlined',
                'bg-[#DA0000]': theme === 'critical' && view === 'rounded',

                'bg-gray-600 text-white': theme === 'neutral' && view === 'filled',
                'bg-surface-400 text-gray-600': theme === 'neutral' && view === 'faded',
                'border border-gray-600 text-gray-600': theme === 'neutral' && view === 'outlined',
                'bg-gray-600': theme === 'neutral' && view === 'rounded',

                'border border-primary-300 bg-primary-100 text-primary-500 rounded-[2px]': view === 'simple'
            }
        ]];
    },
}));


/* DATA */
/* COMPUTED */
const classes = computed((): ReturnType<typeof useClasses> => {
    return useClasses({
        view: props.view,
        theme: props.theme,
        rounded: props.rounded,
        themeSettings: props.themeSettings
    });
});

/* WATCH */
/* METHODS */
</script>
