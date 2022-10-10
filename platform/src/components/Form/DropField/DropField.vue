<template>
    <div
        :class="classes.root"
    >
        <BaseIcon
            :class="classes.icon"
            name="drag"
            width="43"
        />
        <p :class="classes.text">
            Drag your file here to start uploading:
            <br>
            jpg, png, svx 300x300px
        </p>
        <p :class="classes.max">
            Maximum file size 5(MB)
        </p >
        <div :class="classes.delimiter"></div>
        <BaseButton
            theme="primary"
            rounded="sm"
            :icon="{
                name: 'upload',
                width: 20,
                prepend: true
            }"
        >
            Browse File
        </BaseButton>
    </div>
</template>


<script lang="ts" setup>
/* IMPORTS */

import { computed } from 'vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import BaseIcon from '@/components/BaseIcon.vue';
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

/* CONSTANTS AND CUSTOM HOOKS */

const useClasses = makeClasses<IThemeProps>(() => ({
    root: ({ themeSettings }) => {
        return [themeSettings?.root, [
            'p-8 bg-primary-100 rounded-[10px] text-center border border-dashed border-gray-300'
        ]];
    },
    icon: 'text-primary-500 mx-auto mb-4',
    delimiter: 'w-[180px] h-px bg-gray-300 mx-auto mb-5',
    text: 'text-gray-600 font-bold mb-2',
    max: 'text-gray-500 text-xs mb-5',
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
