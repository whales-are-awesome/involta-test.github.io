<template>
    <a
        v-if="!to"
        :class="classes.root"
        v-bind="attrs"
        @click="emit('click')"
    >
        <slot></slot>
    </a>
    <RouterLink
        v-else
        :class="classes.root"
        :to="to"
        v-bind="attrs"
        @click="emit('click')"
    >
        <slot></slot>
    </RouterLink>
</template>


<script lang="ts" setup>
/* IMPORTS */

import { computed, useAttrs } from 'vue';
import { RouterLinkProps, RouterLink } from 'vue-router';
import { Themes } from './types';
import makeClasses from '@/helpers/makeClasses';
import IThemeSettings from '@/models/themeSettings';

/* INTERFACES */

interface IProps {
    to?: RouterLinkProps['to']
    theme: Themes
    themeSettings?: IThemeSettings<'root'>
}

interface IEmits {
    (e: 'click'): void
}

interface IThemeProps extends Pick<IProps, 'themeSettings' | 'theme'>{}

/* META */

const props = withDefaults(defineProps<IProps>(), {
    theme: 'primary'
});
const emit = defineEmits<IEmits>();
const attrs = useAttrs();

/* VARS AND CUSTOM HOOKS */

const useClasses = makeClasses<IThemeProps>(() => ({
    root: ({ themeSettings, theme }) => [themeSettings?.root,
        'transition-fast',
        {
            'text-primary-400 hover:text-primary-500': theme === 'primary',
            'text-gray-400 hover:text-gray-500': theme === 'secondary',
            'text-gray-500 hover:text-gray-600': theme === 'secondary-dark'
        }
    ],
}));

/* DATA */
/* COMPUTED */

const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({
        themeSettings: props.themeSettings,
        theme: props.theme
    });
});

/* WATCH */
/* METHODS */

</script>
