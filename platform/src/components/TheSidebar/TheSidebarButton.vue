<template>
    <div
        :class="classes.root"
        @click="emit('click')"
        @mouseenter="isHovered = true"
        @mouseleave="isHovered = false"
    >
        <div :class="classes.inner">
            <BaseIcon
                v-if="!image"
                :class="classes.angle"
                :width="iconWidth"
                :height="iconHeight"
                :name="icon"
            />
            <BaseAvatar
                v-if="image"
                :class="classes.image"
                :src="image"
                size="md"
                :rounded="active ? 'sm' : 'full'"
                alt="OuterCircle"
            />
            <slot></slot>
        </div>
    </div>
</template>


<script lang="ts" setup>
/* IMPORTS */

import { computed, ref } from 'vue';
import {  } from './types';
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';
import BaseAvatar from '@/components/BaseAvatar/BaseAvatar.vue';
import makeClasses from '@/helpers/makeClasses';
import ThemeSettings from '@/models/themeSettings';

/* INTERFACES */

interface IProps {
    icon?: string
    iconWidth?: string | number
    iconHeight?: string | number
    active: boolean
    image?: string
    themeSettings?: ThemeSettings<'root'>
}

interface IEmits {
    (e: 'click'): void
}

interface IThemeProps extends Pick<IProps, 'themeSettings'>{
    isActive: boolean
    isHovered: boolean
    hasImage: boolean
}

/* META */

const props = withDefaults(defineProps<IProps>(), {});
const emit = defineEmits<IEmits>();

/* VARS AND CUSTOM HOOKS */

const useClasses = makeClasses<IThemeProps>(() => ({
    root: ({ themeSettings, isHovered, isActive }) => [themeSettings?.root,
        `
            relative flex justify-center
            before:absolute before:w-[12px] before:h-[12px] before:bg-300 before:top-1/2 before:-translate-y-1/2
            before:left-0 before:rounded-[3px] before:-translate-x-full hover:before:left-[3px] before:transition-fast
          `,
        {
            'before:!delay-0': !isHovered,
            'before:!delay-200': isHovered,
            'before:!h-full before:!left-[3px]': isActive
        }
    ],
    inner: ({ isHovered, isActive, hasImage }) => [
        `w-[36px] h-[36px] text-[#7A78F3] relative flex items-center justify-center z-1 cursor-pointer
            `,
        {
            'after:block after:inset-0 after:-z-1 after:bg-gray-200 after:rounded-[10px] after:absolute after:transition-fast after:scale-0 hover:after:scale-[1] bg-white rounded-[10px]': !hasImage,
            'rounded-full': hasImage,
            'after:!delay-200': !isHovered,
            'after:!delay-0': isHovered,

            '!text-white after:!bg-[#7A78F3] after:!scale-[1]': isActive
        }
    ]
}));

/* DATA */

const isHovered = ref(false);

/* COMPUTED */

const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({
        themeSettings: props.themeSettings,
        isActive: props.active,
        isHovered: isHovered.value,
        hasImage: props.image
    });
});

/* WATCH */
/* METHODS */
</script>
