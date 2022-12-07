<template>
    <div
        :class="classes.root"
    >
    </div>
</template>


<script lang="ts" setup>
import { computed } from 'vue';
//import  from '@/components/';
import {  } from './types';
import makeClasses from '@/helpers/makeClasses';
import ThemeSettings from '@/types/themeSettings';

// META

interface IProps {
    modelValue: string
    themeSettings?: ThemeSettings<'root'>
}

interface IEmits {
    (e: 'update:modelValue', value: IProps['modelValue']): void
}

const props = withDefaults(defineProps<IProps>(), {});

const emit = defineEmits<IEmits>();


// CLASSES

interface IThemeProps extends Pick<IProps, 'themeSettings'>{}

const useClasses = makeClasses<IThemeProps>(() => ({
    root: ({ themeSettings }) => [themeSettings?.root,

    ]
}));

const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({
        themeSettings: props.themeSettings
    });
});


// VALUE

const value = computed({
    get() {
        return props.modelValue;
    },
    set(value: IProps['modelValue']) {
        emit('update:modelValue', value)
    }
});
</script>
