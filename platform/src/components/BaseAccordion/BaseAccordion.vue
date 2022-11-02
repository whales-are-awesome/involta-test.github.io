<template>
    <div
        :class="classes.root"
        @click="toggleVisibility"
    >
        <div :class="classes.top">
            <div
                v-if="title"
                :class="classes.info"
            >
                <p
                    :class="classes.title"
                >
                    {{ title }}
                </p>
                <p
                    v-if="description"
                    :class="classes.description"
                >
                    {{ description }}
                </p>
            </div>
            <slot name="top"></slot>
            <div :class="classes.iconWrapper">
                <BaseIcon
                    :class="classes.icon"
                    name="chevron-down"
                    width="15"
                />
            </div>
        </div>
        <BaseCollapse v-show="isVisibleLocal">
            <div
                :class="classes.collapseInner"
                @click.stop
            >
                <slot></slot>
            </div>
        </BaseCollapse>
    </div>
</template>


<script lang="ts" setup>
/* IMPORTS */

import { computed, ref } from 'vue';
import BaseCollapse  from '@/components/BaseCollapse/BaseCollapse.vue';
import BaseIcon  from '@/components/BaseIcon/BaseIcon.vue';
import {  } from './types';
import makeClasses from '@/helpers/makeClasses';

/* INTERFACES */

interface IProps {
    title?: string
    description?: string
    themeSettings?: any
    isVisible: boolean
}

interface IThemeProps extends Pick<IProps, 'themeSettings'>{
    isVisibleLocal: boolean
}

/* META */

const props = withDefaults(defineProps<IProps>(), {
    isVisible: false
});

/* VARS AND CUSTOM HOOKS */

const useClasses = makeClasses<IThemeProps>(() => ({
    root: ({ themeSettings, isVisibleLocal }) => {
        return [themeSettings?.root, [
            'px-3 py-4 rounded-[4px] cursor-pointer border',
            {
                'bg-primary-100 border-transparent': isVisibleLocal,
                'border-gray-300': !isVisibleLocal
            }
        ]];
    },
    top: 'flex items-center justify-between',
    title: 'text-gray-500 text-sm font-semibold',
    description: 'text-gray-500 text-xss',
    collapseInner: 'pt-6 cursor-default',
    iconWrapper: 'flex items-center justify-center w-9 h-9 border border-gray-200 rounded-[10px]',
    icon: ({ isVisibleLocal }) => [
        'text-gray-400',
        {
            'rotate-180': isVisibleLocal
        }
    ]
}));

/* DATA */

const isVisibleLocal = ref(props.isVisible);

/* COMPUTED */

const classes = computed((): ReturnType<typeof useClasses> => {
    return useClasses({
        themeSettings: props.themeSettings,
        isVisibleLocal: isVisibleLocal.value
    });
});

/* WATCH */
/* METHODS */

function toggleVisibility() {
    isVisibleLocal.value = !isVisibleLocal.value;
}

</script>
