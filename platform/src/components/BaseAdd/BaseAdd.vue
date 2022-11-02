<template>
    <BaseBlock :class="classes.root">
        <BaseButton
            size="icon"
            rounded="icon"
            view="outlined"
            theme="primary-200"
            :icon="{
                name: 'plus',
                width: '17.5'
            }"
        />
        <slot></slot>
    </BaseBlock>
</template>


<script lang="ts" setup>
/* IMPORTS */

import { computed } from 'vue';
import BaseBlock  from '@/components/BaseBlock/BaseBlock.vue';
import BaseButton  from '@/components/BaseButton/BaseButton.vue';
import {  } from './types';
import makeClasses from '@/helpers/makeClasses';

/* INTERFACES */

interface IProps {
    themeSettings?: any
}

interface IEmits {
}

interface IThemeProps extends Pick<IProps, 'themeSettings'>{

}

/* META */

const props = withDefaults(defineProps<IProps>(), {});
const emit = defineEmits<IEmits>();

/* VARS AND CUSTOM HOOKS */

const useClasses = makeClasses<IThemeProps>(() => ({
    root: ({ themeSettings }) => {
        return [themeSettings?.root,  [
            'flex'
        ]];
    }
}));

/* DATA */
/* COMPUTED */

const classes = computed((): ReturnType<typeof useClasses> => {
    return useClasses({
        themeSettings: props.themeSettings
    });
});

/* WATCH */
/* METHODS */
</script>
