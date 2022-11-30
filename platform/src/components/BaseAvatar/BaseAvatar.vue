<template>
    <div
        :class="classes.root"
    >
        <BaseImage
            v-if="!isIframe"
            :class="classes.image"
            :src="src"
            :alt="alt"
        />
        <iframe
            v-else
            :class="classes.image"
            :src="src"
            frameborder="0">
        </iframe>
        <slot></slot>
    </div>
</template>


<script lang="ts" setup>
/* IMPORTS */

import { computed, useSlots } from 'vue';
import { Rounded, Sizes } from './types';
import makeClasses from '@/helpers/makeClasses';
import ThemeSettings from '@/models/themeSettings';

/* INTERFACES */

interface IProps {
    src: string
    alt: string
    isIframe?: boolean
    size: Sizes
    rounded: Rounded
    themeSettings?: ThemeSettings<'root' | 'image'>
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
    root: ({ themeSettings }) => [themeSettings?.root,
        'flex items-center'
    ],
    image: ({ hasContent, size, rounded, themeSettings }) => [themeSettings?.image,
        'object-cover w-full h-full transition-fast',
        {
            'w-[16px] h-[16px]': size === 'tiny',
            'w-[20px] h-[20px]': size === 'xxs',
            'w-[24px] h-[24px] sm:w-4 sm:h-4': size === 'xs',
            'w-[28px] h-[28px] sm:w-[16px] sm:h-[16px]': size === 'sm',
            'w-[36px] h-[36px] md:w-[28px] md:h-[28px]': size === 'md',
            'w-[44px] h-[44px] md:w-[20px] md:h-[20px]': size === 'base',
            'w-[64px] h-[64px]': size === 'lg',
            'w-[96px] h-[96px] sm:w-16 sm:h-16': size === 'xl',

            'rounded-[5px]': rounded === 'xs',
            'rounded-[8px]': rounded === 'sm',
            'rounded-[10px]': rounded === 'md',
            'rounded-[16px]': rounded === 'lg',
            'rounded-[20px]': rounded === 'xl',
            'rounded-[100%]': rounded === 'full',

            'mr-2': hasContent
        }
    ]
}));

/* DATA */

const hasContent = computed<IThemeProps['hasContent']>(() => {
    return !!slots.default;
});

/* COMPUTED */
const classes = computed<ReturnType<typeof useClasses>>(() => {
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
