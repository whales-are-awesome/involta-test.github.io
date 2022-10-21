<template>
    <div
        :class="classes.root"
        @click="value = !value"
    >
        <p :class="classes.text">
            {{ value ? 'Show less' :  'Show More' }}
        </p>
        <BaseIcon
            :class="classes.icon"
            name="chevron-down"
            width="6"
            height="3"
        />
    </div>
</template>


<script lang="ts" setup>
/* IMPORTS */

import { computed } from 'vue';
import BaseIcon  from '@/components/BaseIcon/BaseIcon.vue';
import {  } from './types';
import makeClasses from '@/helpers/makeClasses';

/* INTERFACES */

interface IProps {
    modelValue: boolean
    themeSettings?: any
}

interface IEmits {
    (e: 'update:modelValue', value: IProps['modelValue']): void
}

interface IThemeProps extends Pick<IProps, 'themeSettings'>{
    isOpen: IProps['modelValue']
}

/* META */

const props = withDefaults(defineProps<IProps>(), {});
const emit = defineEmits<IEmits>();

/* VARS AND CUSTOM HOOKS */

const useClasses = makeClasses<IThemeProps>(() => ({
    root: ({ themeSettings }) => {
        return [themeSettings?.root,  [
            'flex items-center text-gray-400 cursor-pointer uppercase'
        ]];
    },
    text: 'tracking-[0.4px]  text-tiny underline underline-offset-1 mr-3',
    icon: ({ themeSettings, isOpen }) => {
        return [themeSettings?.icon,  [
            'transition-fast',
            {
                'rotate-180': isOpen
            }
        ]];
    },
}));

/* DATA */
/* COMPUTED */

const value = computed({
    get() {
        return props.modelValue;
    },
    set(value: IProps['modelValue']) {
        emit('update:modelValue', value)
    }
});

const classes = computed((): ReturnType<typeof useClasses> => {
    return useClasses({
        themeSettings: props.themeSettings,
        isOpen: value.value
    });
});

/* WATCH */
/* METHODS */
</script>
