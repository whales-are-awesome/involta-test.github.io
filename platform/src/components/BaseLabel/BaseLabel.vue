<template>
    <span
        :class="classes.root"
        @click="emit('click')"
    >
        <slot></slot>
    </span>
</template>


<script lang="ts" setup>
import { computed, defineEmits } from 'vue';
import { Rounded, Themes, Views } from './types';
import makeClasses from '@/helpers/makeClasses';
import ThemeSettings from '@/types/themeSettings';


// META

interface IProps {
    view: Views
    theme: Themes
    rounded: Rounded
    uppercase: boolean
    themeSettings?: ThemeSettings<'root'>
}

interface IEmits {
    (e: 'click'): void
}

const props = withDefaults(defineProps<IProps>(), {
    rounded: 'base',
    uppercase: true
});

const emit = defineEmits<IEmits>();

// CLASSES

interface IThemeProps extends Pick<IProps, 'view' | 'theme' | 'rounded' | 'themeSettings' | 'uppercase'>{}

const useClasses = makeClasses<IThemeProps>(() => ({
    root: ({ themeSettings, theme, view, rounded, uppercase }) => {
        const notViewSimple = 'text-xs font-bold tracking-[.08em] sm:!text-xs' + (uppercase ? ' uppercase' : '');
        const notViewRoundedOrSimple = 'px-4 py-[6px]';

        return [themeSettings?.root, [
            'inline-flex items-center justify-center',
            {
                'text-xs font-bold tracking-[.08em] sm:!text-xs': view !== 'simple',

                'rounded-[5px]': rounded === 'base',
                'rounded-[20px]': rounded === 'lg' && view !== 'rounded'
            },

            view === 'filled' && {
                'bg-[#078549] text-white': theme === 'positive',
                'bg-[#F2D058] text-[#424243]': theme === 'warning',
                'bg-[#5A58F2] text-white': theme === 'primary',
                'bg-[#DA0000] text-white': theme === 'critical',
                'bg-gray-600 text-white': theme === 'neutral',
                [notViewRoundedOrSimple]: true,
                [notViewSimple]: true
            },

            view === 'faded' && {
                'bg-[#E6FEF3] text-[#05751F]': theme === 'positive',
                'bg-[#FDF8E7] text-[#755605]': theme === 'warning',
                'bg-[#E8E7FD] text-[#4D4BE7]': theme === 'primary',
                'bg-[#FDE7E9] text-[#CB101D]': theme === 'critical',
                'bg-surface-400 text-gray-600': theme === 'neutral',
                [notViewRoundedOrSimple]: true,
                [notViewSimple]: true
            },

            view === 'outlined' && {
                'border border-[#05751F] text-[#05751F]': theme === 'positive',
                'border border-[#755605] text-[#755605]': theme === 'warning',
                'border border-[#4D4BE7] text-[#4D4BE7]': theme === 'primary',
                'border border-[#CB101D] text-[#CB101D]': theme === 'critical',
                'border border-gray-600 text-gray-600': theme === 'neutral',
                [notViewRoundedOrSimple]: true,
                [notViewSimple]: true
            },

            view === 'rounded' && {
                'bg-[#078549]': theme === 'positive',
                'bg-[#F2D058]': theme === 'warning',
                'bg-[#5A58F2]': theme === 'primary',
                'bg-[#DA0000]': theme === 'critical',
                'bg-gray-600': theme === 'neutral',

                'p-[6px] rounded-full': rounded === 'lg',
                'p-2': rounded === 'base',
                [notViewSimple]: true
            },

            view === 'simple' && [
                'py-[2px] px-1',
                'border border-primary-300 bg-primary-100 text-primary-500 rounded-[2px]',
                'text-xxs tracking-[.04em]'
            ]
        ]];
    },
}));

const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({
        view: props.view,
        theme: props.theme,
        uppercase: props.uppercase,
        rounded: props.rounded,
        themeSettings: props.themeSettings
    });
});
</script>
