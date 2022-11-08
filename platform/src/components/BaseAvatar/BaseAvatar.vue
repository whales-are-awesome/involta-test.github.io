<template>
    <div
        :class="classes.root"
    >
        <img
            :class="classes.image"
            :src="src"
            :alt="alt"
        >
        <slot></slot>
    </div>
</template>


<script lang="ts" setup>
/* IMPORTS */

import { computed, useSlots } from 'vue';
import { Rounded, Sizes } from './types';
import makeClasses from '@/helpers/makeClasses';

/* INTERFACES */

interface IProps {
    src: string
    alt: string
    size: Sizes
    rounded: Rounded
    themeSettings?: any
}


interface IThemeProps extends Pick<IProps, 'size' | 'rounded' | 'themeSettings'>{
    hasContent: boolean
}

/* META */

const props = withDefaults(defineProps<IProps>(), {
    size: 'base',
    rounded: 'sm'
});

/* VARS AND CUSTOM HOOKS */

const slots = useSlots();
const useClasses = makeClasses<IThemeProps>(() => ({
    root: ({ size }) => [
        'flex items-center overflow-hidden',
        {
            'text-h3': size === 'xl'
        }
    ],
    image: ({ hasContent, size, rounded, themeSettings }) => {
        return [themeSettings?.image, [
            'object-cover w-full h-full',
            {
                'w-[16px] h-[16px]': size === 'tiny',
                'w-[20px] h-[20px]': size === 'xss',
                'w-[24px] h-[24px]': size === 'xs',
                'w-[28px] h-[28px]': size === 'sm',
                'w-[36px] h-[36px]': size === 'md',
                'w-[44px] h-[44px]': size === 'base',
                'w-[64px] h-[64px]': size === 'lg',
                'w-[96px] h-[96px] text-h3': size === 'xl',

                'rounded-[5px]': rounded === 'sm' && size === 'xs',
                'rounded-[8px]': (rounded === 'sm' && size === 'sm') || (rounded === 'xs' && size === 'md'),
                'rounded-[10px]': rounded === 'sm' && size === 'md',
                'rounded-[16px]': rounded === 'sm' && size === 'base',
                'rounded-[20px]': rounded === 'sm' && ['lg', 'xl'].includes(size),
                'rounded-full': rounded === 'lg',

                'mr-2': hasContent
            },
        ]]
    }
}));

/* DATA */

const hasContent = computed((): IThemeProps['hasContent'] => {
    return !!slots.default;
});

/* COMPUTED */
const classes = computed((): ReturnType<typeof useClasses> => {
    return useClasses({
        size: props.size,
        rounded: props.rounded,
        hasContent: hasContent.value,
        themeSettings: props.themeSettings,
    });
});

/* WATCH */
/* METHODS */

</script>
