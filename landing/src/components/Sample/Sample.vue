<template>
    <div
        :class="classes.root"
    >
    </div>
</template>


<script lang="ts" setup>
/* IMPORTS */

import { computed } from 'vue';
import {  } from './types';
import makeClasses, { makeThemeSettings } from '@/helpers/makeClasses';

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

/* CONSTANTS AND CUSTOM HOOKS */

const useClasses = makeClasses<IThemeProps>(() => ({
    root: ({ themeSettings }) => {
        return makeThemeSettings(themeSettings?.root, []);
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
