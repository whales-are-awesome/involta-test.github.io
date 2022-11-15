<template>
    <div
        :class="classes.root"
    >
        <div :class="classes.top">
            <div :class="classes.iconWrapper">
                <BaseIcon
                    :class="classes.icon"
                    name="search"
                    width="11"
                />
            </div>
            <input
                v-model="value"
                :class="classes.input"
                type="text"
                placeholder="Search"
                :maxlength="20"
                @focus="onFocus"
                @blur="onBlur"
            >
        </div>
        <BaseCollapse>
            <div
                v-show="!!value"
                :class="classes.dropdown"
            >
                <div :class="classes.dropdownItem">
                    <BaseIcon
                        :class="classes.dropdownItemIcon"
                        name="search"
                        width="7"
                    />
                    <div :class="classes.dropdownItemLeft">
                        {{ value }}
                    </div>
                    <div :class="classes.dropdownItemSearch">
                        - Search
                    </div>
                </div>
                <div :class="classes.dropdownItem">
                    <BaseIcon
                        :class="classes.dropdownItemIcon"
                        name="search"
                        width="7"
                    />
                    <div :class="classes.dropdownItemLeft">
                        <BaseAvatar
                            class="border border-surface-200 rounded-full"
                            :src="require('@/assets/images/common/placeholder.jpeg')"
                            alt="DAO"
                            rounded="full"
                            size="tiny"
                        />
                    </div>
                    <div :class="classes.dropdownItemRight">
                        SOME TEXT
                    </div>
                </div>
            </div>
        </BaseCollapse>
    </div>
</template>


<script lang="ts" setup>
/* IMPORTS */

import { computed, ref } from 'vue';
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue'
import BaseAvatar from '@/components/BaseAvatar/BaseAvatar.vue'
import BaseCollapse from '@/components/BaseCollapse/BaseCollapse.vue'
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
    root: ({ themeSettings }) => {
        return [themeSettings?.root, [
            'border border-primary-100 bg-white rounded-[8px] relative'
        ]];
    },
    top: ({ themeSettings }) => {
        return [themeSettings?.top, [
            'px-2 py-2 relative'
        ]];
    },
    iconWrapper: ({ themeSettings }) => {
        return [themeSettings?.iconWrapper, [
            'w-[20px] h-[20px] bg-primary-300 rounded-full text-white pointer-events-none flex items-center justify-center'
        ]];
    },
    input: ({ themeSettings, isFocus, isFilled }) => {
        return [themeSettings?.input, [
            'text-500 h-full absolute left-0 top-0 w-full bg-transparent placeholder:text-300 text-sm pl-[36px]',
            {
                'md:opacity-0': !isFocus && !isFilled
            }
        ]];
    },
    dropdownItem: ({ themeSettings }) => {
        return [themeSettings?.dropdownItem, [
            `text-500 text-sm flex items-center border-left border-transparent transition-fast relative overflow-hidden px-[15px] py-2.5 text-500 cursor-pointer hover:bg-secondary-100
            after:block after:h-full after:w-[2px] after:left-0 after:top-0 after:bg-primary-300 after:absolute after:transition-fast after:scale-y-0 hover:after:scale-y-[1]
            `
        ]];
    },
    dropdownItemLeft: ({ themeSettings }) => {
        return [themeSettings?.dropdownItem, [
            'min-w-[24px] pr-2'
        ]];
    },
    dropdownItemSearch: ({ themeSettings }) => {
        return [themeSettings?.dropdownItemFieldValue, [
            'text-200 font-medium'
        ]];
    },
    dropdownItemIcon: ({ themeSettings }) => {
        return [themeSettings?.dropdownItemIcon, [
            'mr-4 flex-shrink-0 text-200'
        ]];
    },
    dropdownItemCoincidence: ({ themeSettings }) => {
        return [themeSettings?.dropdownItemCoincidence, [
            'text-400'
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
