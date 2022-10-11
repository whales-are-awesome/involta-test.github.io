<template>
    <div
        :class="classes.root"
        @click="emit('click')"
    >
        <BaseIcon
            :class="classes.icon"
            :name="icon"
            width="36"
        />
        <p :class="classes.name">
            {{ name }}
        </p>
    </div>
</template>


<script lang="ts" setup>
/* IMPORTS */

import { computed } from 'vue';
import BaseIcon from '@/components/BaseIcon.vue';
import { Icons }  from '@/models/icons';
import {  } from './types';
import makeClasses from '@/helpers/makeClasses';

/* INTERFACES */

interface IProps {
    icon: Icons.Ledger | Icons.Metamask | Icons.ConnectWallet | Icons.TrustWallet
    name: string
    isSelected?: boolean
    isDisabled?: string
    themeSettings?: any
}

interface IEmits {
    (e: 'click'): void
}

interface IThemeProps extends Pick<IProps, 'themeSettings' | 'isSelected' | 'isDisabled'>{
}

/* META */

const props = withDefaults(defineProps<IProps>(), {});
const emit = defineEmits<IEmits>();

/* CONSTANTS AND CUSTOM HOOKS */

const useClasses = makeClasses<IThemeProps>(() => ({
    root: ({ themeSettings, isSelected, isDisabled }) => {
        return [themeSettings?.root, [
            'transition-fast px-4 py-3 rounded-[10px] border font-medium text-text-500 flex items-center',
            {
                'bg-white border-surface-300 hover:bg-primary-100 cursor-pointer': !isSelected && !isDisabled,
                'bg-primary-100 border-primary-400': isSelected,
                '!bg-disabled-light !border-disabled-dark !text-disabled-text': isDisabled,
            }
        ]];
    },
    icon: 'mr-3'
}));

/* DATA */



/* COMPUTED */

const classes = computed((): ReturnType<typeof useClasses> => {
    return useClasses({
        themeSettings: props.themeSettings,
        isSelected: props.isSelected,
        isDisabled: props.isDisabled,
    });
});

/* WATCH */



/* METHODS */



</script>
