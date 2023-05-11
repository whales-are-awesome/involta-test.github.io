<template>
    <BaseTooltip
        :distance="10"
    >
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
                    :src="image"
                    size="md"
                    rounded=""
                    alt="OuterCircle"
                />
                <slot></slot>
            </div>
        </div>
        <template
            v-if="network"
            #content
        >
            <div class="flex items-center p-2">
                <NetworkIcon
                    :class="classes.networkIcon"
                    section="sidebar"
                    position="center"
                    :network="network"
                />
                <div class="pl-2 text-sm">
                    {{ name }}
                </div>
            </div>
        </template>
    </BaseTooltip>
</template>


<script lang="ts" setup>
import { computed, ref } from 'vue';
import {  } from './types';
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';
import { Icons } from '@/components/BaseIcon/types';
import BaseAvatar from '@/components/BaseAvatar/BaseAvatar.vue';
import BaseTooltip from '@/components/BaseTooltip/BaseTooltip.vue';
import NetworkIcon from '@/components/NetworkIcon/NetworkIcon.vue';
import makeClasses from '@/helpers/makeClasses';
import useIsMobile from '@/composables/useIsMobile';
import ThemeSettings from '@/types/themeSettings';
import { NetworksType } from '@/types/networks';


// META

interface IProps {
    icon?: Icons
    iconWidth?: string | number
    iconHeight?: string | number
    isDao?: boolean
    name?: string
    active: boolean
    image?: string
    network?: NetworksType
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
            before:absolute before:w-[12px] before:bg-primary-500 before:top-1/2 before:-translate-y-1/2
            before:rounded-[3px] before:-translate-x-full hover:before:left-[3px] before:transition-fast
          `,
        {
            'before:!delay-0': !isHovered,
            'before:!delay-200': isHovered,

            'before:h-[12px] before:left-0': !isActive,
            'before:h-full before:left-[3px]': isActive,
        }
    ],
    inner: ({ isHovered, isActive, hasImage, isDao }) => [
        'w-[36px] h-[36px] overflow-hidden transition-fast relative flex items-center justify-center z-1 cursor-pointer md:w-[28px] md:h-[28px]',
        {
            'after:block after:inset-0 after:-z-1 after:bg-gray-200 after:rounded-[10px] after:absolute after:transition-fast hover:after:scale-[1] bg-white md:rounded-[5px]': !hasImage,
            'rounded-[100%]': (hasImage || isDao) && !isActive,
            'rounded-[10px]': !((hasImage || isDao) && !isActive),
            'after:!delay-200': !isHovered,
            'after:!delay-0': isHovered,

            'text-white after:bg-[#7A78F3] after:scale-[1]': isActive,
            'text-[#7A78F3] after:bg-gray-200 after:scale-0': !isActive,
        }
    ],
    networkIconWrapper: 'absolute inset-0 left-[60px] flex justify-center items-center pointer-events-none z-10',
    networkIcon: 'flex-shrink-0'
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
