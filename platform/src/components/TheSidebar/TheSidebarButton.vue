<template>
    <div
        :class="classes.root"
        @click="emit('click')"
        @mouseenter="isHovered = true"
        @mouseleave="isHovered = false"
    >
        <div :class="classes.inner">
            <BaseIcon
                v-if="icon"
                :class="classes.angle"
                :width="iconWidth"
                :height="iconHeight"
                :name="icon"
            />
            <BaseAvatar
                v-else
                :class="classes.image"
                :src="image"
                size="md"
                rounded=""
                alt="OuterCircle"
            />
            <slot></slot>
        </div>
    </div>
</template>


<script lang="ts" setup>
import { computed, ref } from 'vue';
import {  } from './types';
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';
import { Icons } from '@/components/BaseIcon/types';
import BaseAvatar from '@/components/BaseAvatar/BaseAvatar.vue';
import makeClasses from '@/helpers/makeClasses';
import useIsMobile from '@/composables/useIsMobile';
import ThemeSettings from '@/types/themeSettings';


// META

interface IProps {
    icon?: Icons
    iconWidth?: string | number
    iconHeight?: string | number
    isDao?: boolean
    active: boolean
    image?: string
    themeSettings?: ThemeSettings<'root'>
}

interface IEmits {
    (e: 'click'): void
}

interface IThemeProps extends Pick<IProps, 'themeSettings'>{
    isDao: boolean
    isActive: boolean
    isHovered: boolean
    hasImage: boolean
}

const props = withDefaults(defineProps<IProps>(), {});

const emit = defineEmits<IEmits>();

const isMobile = useIsMobile();

// CLASSES

const useClasses = makeClasses<IThemeProps>(() => ({
    root: ({ themeSettings, isHovered, isActive }) => [themeSettings?.root,
        `
            relative flex justify-center
            before:absolute before:w-[12px] before:h-[12px] before:bg-primary-500 before:top-1/2 before:-translate-y-1/2
            before:left-0 before:rounded-[3px] before:-translate-x-full hover:before:left-[3px] before:transition-fast
          `,
        {
            'before:!delay-0': !isHovered,
            'before:!delay-200': isHovered,
            'before:!h-full before:!left-[3px]': isActive
        }
    ],
    inner: ({ isHovered, isActive, hasImage, isDao }) => [
        'w-[36px] h-[36px] text-[#7A78F3] overflow-hidden transition-fast relative flex items-center justify-center z-1 cursor-pointer sm:w-[28px] sm:h-[28px]',
        {
            'after:block after:inset-0 after:-z-1 after:bg-gray-200 after:rounded-[10px] after:absolute after:transition-fast after:scale-0 hover:after:scale-[1] bg-white rounded-[10px] sm:rounded-[5px]': !hasImage,
            'rounded-[100%]': (hasImage || isDao) && !isActive,
            'after:!delay-200': !isHovered,
            'after:!delay-0': isHovered,

            '!text-white after:!bg-[#7A78F3] after:!scale-[1]': isActive
        }
    ]
}));

const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({
        themeSettings: props.themeSettings,
        isActive: props.active,
        isHovered: isHovered.value,
        hasImage: !!props.image,
        isDao: !!props.isDao
    });
});


// HOVER

const isHovered = ref(false);
</script>
