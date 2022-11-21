<template>
    <div
        :class="classes.root"
        @click="emit('click')"
    >
        <div :class="classes.iconWrapper">
            <BaseIcon
                :class="classes.icon"
                :name="icon"
                width="36"
            />
            <BaseIcon
                :class="classes.iconMobile"
                :name="icon"
                width="28"
            />
        </div>
        <p :class="classes.name">
            {{ name }}
        </p>
    </div>
</template>


<script lang="ts" setup>
/* IMPORTS */

import { computed } from 'vue';
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';
import { Icons } from '@/components/BaseIcon/types';
import {  } from './types';
import makeClasses from '@/helpers/makeClasses';
import ThemeSettings from '@/models/themeSettings';

/* INTERFACES */
interface IProps {
    icon: Extract<Icons, 'ledger' | 'injected-wallet' | 'connect-wallet' | 'trust-wallet'>
    name: string
    isSelected?: boolean
    isDisabled?: boolean
    themeSettings?: ThemeSettings<'root'>
}

interface IEmits {
    (e: 'click'): void
}

interface IThemeProps extends Pick<IProps, 'themeSettings' | 'isSelected' | 'isDisabled'>{
}

/* META */

const props = withDefaults(defineProps<IProps>(), {});
const emit = defineEmits<IEmits>();

/* VARS AND CUSTOM HOOKS */

const useClasses = makeClasses<IThemeProps>(() => ({
    root: ({ themeSettings, isSelected, isDisabled }) => [themeSettings?.root,
        'transition-fast px-4 py-3 rounded-[10px] border border-surface-500 font-medium text-text-500 flex items-center sm:p-2 sm:text-xxs',
        {
            'bg-white border-surface-300 hover:bg-primary-100 cursor-pointer': !isSelected && !isDisabled,
            'bg-primary-100 border-primary-400': isSelected,
            '!bg-disabled-light !border-disabled-dark !text-disabled-text': isDisabled,
        }
    ],
    icon: 'mr-3 flex-shrink-0 sm:hidden',
    iconMobile: 'mr-1 flex-shrink-0 hidden sm:block',
}));

/* DATA */
/* COMPUTED */

const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({
        themeSettings: props.themeSettings,
        isSelected: props.isSelected,
        isDisabled: props.isDisabled,
    });
});

/* WATCH */
/* METHODS */
</script>
