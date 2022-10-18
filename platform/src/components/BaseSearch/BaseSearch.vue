<template>
    <div
        :class="classes.root"
    >
        <BaseIcon
            :class="classes.icon"
            name="search"
            width="12"
        />
        <input
            v-model="value"
            :class="classes.input"
            type="text"
            placeholder="Search"
        >
    </div>
</template>


<script lang="ts" setup>
/* IMPORTS */

import { computed } from 'vue';
import BaseIcon from '@/components/BaseIcon.vue'
import {  } from './types';
import makeClasses from '@/helpers/makeClasses';

/* INTERFACES */

interface IProps {
    modelValue: string
    themeSettings?: any
}

interface IEmits {
    (e: 'update:modelValue', value: IProps['modelValue']): void
}

interface IThemeProps extends Pick<IProps, 'themeSettings'>{

}

/* META */

const props = withDefaults(defineProps<IProps>(), {});
const emit = defineEmits<IEmits>();

/* VARS AND CUSTOM HOOKS */

const useClasses = makeClasses<IThemeProps>(() => ({
    root: ({ themeSettings }) => {
        return [themeSettings?.root, [
            'h-[40px] bg-surface-300 rounded-[40px] p-[14px] relative overflow-hidden'
        ]];
    },
    icon: ({ themeSettings }) => {
        return [themeSettings?.root, [
            'text-300 pointer-events-none'
        ]];
    },
    input: ({ themeSettings }) => {
        return [themeSettings?.root, [
            'h-full absolute left-[0] top-0 w-full bg-transparent placeholder:text-300 text-sm pl-[36px]'
        ]];
    },
}));

/* DATA */



/* COMPUTED */

const value = computed({
    get() {
        return props.modelValue;
    },
    set(value: string) {
        emit('update:modelValue', value)
    }
});

const classes = computed((): ReturnType<typeof useClasses> => {
    return useClasses({
        themeSettings: props.themeSettings
    });
});

/* WATCH */



/* METHODS */



</script>
