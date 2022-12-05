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
import makeClasses from '@/helpers/makeClasses';
import ThemeSettings from '@/models/themeSettings';

/* INTERFACES */

interface IProps {
    modelValue: string
    themeSettings?: ThemeSettings<'root'>
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
    root: ({ themeSettings, isFocus, isFilled }) => [themeSettings?.root,
        'h-[44px] bg-primary-100 rounded-[5px] py-[16px] px-[18px] relative overflow-hidden transition-fast',
        {
            'md:w-[40px]': !isFocus && !isFilled,
            'md:w-full': isFocus || isFilled
        }
    ],
    icon: 'text-300 pointer-events-none',
    input: ({ isFocus, isFilled }) => [
        'h-full absolute left-0 top-0 w-full bg-transparent placeholder:text-grey-400 pl-[36px] font-500',
        {
            'md:opacity-0': !isFocus && !isFilled
        }
    ]
}));

/* DATA */

const isFocus = ref(false);

/* COMPUTED */

const value = computed({
    get: () => props.modelValue,
    set: (value: string) => emit('update:modelValue', value)
});

const classes = computed<ReturnType<typeof useClasses>>(() => {
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
