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
import { computed } from 'vue';
import BaseIcon  from '@/components/BaseIcon/BaseIcon.vue';
import {  } from './types';
import makeClasses from '@/helpers/makeClasses';
import ThemeSettings from '@/types/themeSettings';


// META

interface IProps {
    modelValue: boolean
    themeSettings?: ThemeSettings<'root' | 'icon'>
}

interface IEmits {
    (e: 'update:modelValue', value: IProps['modelValue']): void
}

const props = withDefaults(defineProps<IProps>(), {});

const emit = defineEmits<IEmits>();


// CLASSES

interface IThemeProps extends Pick<IProps, 'themeSettings'>{
    isOpen: IProps['modelValue']
}

const useClasses = makeClasses<IThemeProps>(() => ({
    root: ({ themeSettings }) => [themeSettings?.root,
        'flex items-center text-gray-400 cursor-pointer uppercase'
    ],
    text: 'tracking-[0.4px]  text-tiny underline underline-offset-1 mr-3',
    icon: ({ isOpen }) => [
        'transition-fast',
        {
            'rotate-180': isOpen
        }
    ]
}));

const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({
        themeSettings: props.themeSettings,
        isOpen: value.value
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
