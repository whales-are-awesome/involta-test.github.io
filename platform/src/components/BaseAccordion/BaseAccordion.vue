<template>
    <div
        :class="classes.root"
        @click="toggleVisibility"
    >
        <div :class="classes.top">
            <p :class="classes.title">
                {{ title }}
            </p>
            <div :class="classes.iconWrapper">
                <BaseIcon
                    :class="classes.icon"
                    name="chevron-down"
                    width="15"
                />
            </div>
        </div>
        <BaseCollapse v-show="isVisible">
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
import BaseIcon  from '@/components/BaseIcon.vue';
import {  } from './types';
import makeClasses from '@/helpers/makeClasses';

/* INTERFACES */

interface IProps {
    title?: string
    themeSettings?: any
}

interface IEmits {
}

interface IThemeProps extends Pick<IProps, 'themeSettings'>{
    isVisible: boolean
}

/* META */

const props = withDefaults(defineProps<IProps>(), {});
const emit = defineEmits<IEmits>();

/* VARS AND CUSTOM HOOKS */

const useClasses = makeClasses<IThemeProps>(() => ({
    root: ({ themeSettings }) => {
        return [themeSettings?.root, [
            'px-3 py-4 bg-primary-100 rounded-[4px] cursor-pointer'
        ]];
    },
    top: 'flex items-center justify-between',
    title: 'text-gray-500 text-sm font-semibold',
    collapseInner: 'pt-6 cursor-default',
    iconWrapper: 'flex items-center justify-center w-9 h-9 border border-gray-200 rounded-[10px]',
    icon: ({ themeSettings, isVisible }) => [
        'text-gray-400',
        {
            'rotate-180': isVisible
        }
    ]
}));

/* DATA */

const isVisible = ref(false);

/* COMPUTED */

// const value = computed({
//     get() {
//         return props.modelValue;
//     },
//     set(value: string) {
//         emit('update:modelValue', value)
//     }
// });

const classes = computed((): ReturnType<typeof useClasses> => {
    return useClasses({
        themeSettings: props.themeSettings,
        isVisible: isVisible.value
    });
});

/* WATCH */



/* METHODS */

function toggleVisibility() {
    isVisible.value = !isVisible.value;
}

</script>
