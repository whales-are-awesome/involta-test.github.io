<template>
    <div
        :class="classes.root"
    >
        <BaseIcon
            :class="classes.icon"
            name="search"
            width="13"
        />
        <input
            v-model="value"
            :class="classes.input"
            type="text"
            placeholder="Search"
            @focus="onFocus"
            @blur="onBlur"
        >
    </div>
</template>


<script lang="ts" setup>
/* IMPORTS */

import { computed, ref } from 'vue';
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue'
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
    isFocus: boolean
    isFilled: boolean
}

/* META */

const props = withDefaults(defineProps<IProps>(), {});
const emit = defineEmits<IEmits>();

/* VARS AND CUSTOM HOOKS */

const useClasses = makeClasses<IThemeProps>(() => ({
    root: ({ themeSettings, isFocus, isFilled }) => {
        return [themeSettings?.root, [
            'h-[40px] bg-surface-300 rounded-[40px] p-[14px] relative overflow-hidden transition-fast',
            {
                'md:w-[40px]': !isFocus && !isFilled,
                'md:w-full': isFocus || isFilled
            }
        ]];
    },
    icon: ({ themeSettings }) => {
        return [themeSettings?.icon, [
            'text-300 pointer-events-none'
        ]];
    },
    input: ({ themeSettings, isFocus, isFilled }) => {
        return [themeSettings?.input, [
            'h-full absolute left-0 top-0 w-full bg-transparent placeholder:text-300 text-sm pl-[36px]',
            {
                'md:opacity-0': !isFocus && !isFilled
            }
        ]];
    },
}));

/* DATA */

const isFocus = ref(false);

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
        themeSettings: props.themeSettings,
        isFocus: isFocus.value,
        isFilled: !!value.value
    });
});

/* WATCH */
/* METHODS */

function onFocus(): void {
    isFocus.value = true;
}

function onBlur(): void {
    isFocus.value = false;
}
</script>
