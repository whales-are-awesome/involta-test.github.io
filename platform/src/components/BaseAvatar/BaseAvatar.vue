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
    size: keyof typeof Sizes
    rounded: keyof typeof Rounded
}


interface IThemeProps extends Pick<IProps, 'size' | 'rounded'>{
    hasContent: boolean
}

/* META */

const props = withDefaults(defineProps<IProps>(), {
    size: Sizes.Base,
    rounded: Rounded.Sm,
});

/* CONSTANTS AND CUSTOM HOOKS */

const slots = useSlots();
const useClasses = makeClasses<IThemeProps>(() => ({
    root: ({ size }) => [
        'flex items-center overflow-hidden',
        {
            'text-h3': size === Sizes.Xl,
        }
    ],
    image: ({ hasContent, size, rounded }) => [
        'object-cover w-full h-full',
        {
            'w-[24px] h-[24px]': size === Sizes.Xs,
            'w-[28px] h-[28px]': size === Sizes.Sm,
            'w-[36px] h-[36px]': size === Sizes.Md,
            'w-[44px] h-[44px]': size === Sizes.Base,
            'w-[64px] h-[64px]': size === Sizes.Lg,
            'w-[96px] h-[96px] text-h3': size === Sizes.Xl,

            'rounded-[5px]': rounded === Rounded.Sm && size === Sizes.Sm,
            'rounded-[8px]': rounded === Rounded.Sm && size === Sizes.Md,
            'rounded-[10px]': rounded === Rounded.Sm && size === Sizes.Base,
            'rounded-[16px]': rounded === Rounded.Sm && size === Sizes.Lg,
            'rounded-[20px]': rounded === Rounded.Sm && size === Sizes.Xl,
            'rounded-full': rounded === Rounded.Lg,

            'mr-2': hasContent
        },
    ]
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
        hasContent: hasContent.value
    });
});

/* WATCH */



/* METHODS */



</script>
