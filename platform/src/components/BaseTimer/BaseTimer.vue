<template>
    <div :class="classes.root">
        <div :class="classes.inner">
            <BaseIcon
                :class="classes.icon"
                name="timer"
                width="15"
                height="17"
            />
            {{ timer.hours }}:{{ timer.minutes }}:{{ timer.seconds }} left
        </div>
    </div>
</template>


<script lang="ts" setup>
/* IMPORTS */

import { computed } from 'vue';
import {  } from './types';
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';
import { useTimer } from '@//composables/useTimer';
import makeClasses from '@/helpers/makeClasses';
import IThemeSettings from '@/models/themeSettings';

/* INTERFACES */

interface IProps {
    endDate: Date
    themeSettings?: IThemeSettings<'root'>
}

interface IThemeProps extends Pick<IProps, 'themeSettings'>{}

/* META */

const props = withDefaults(defineProps<IProps>(), {});

/* VARS AND CUSTOM HOOKS */

const timer = useTimer(props.endDate);
const useClasses = makeClasses<IThemeProps>(() => ({
    root: ({ themeSettings }) => [themeSettings?.root],
    inner: 'flex items-center text-400 text-sm',
    icon: 'mr-2'
}));

/* DATA */
/* COMPUTED */
const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({
        themeSettings: props.themeSettings
    });
});

/* WATCH */
/* METHODS */

</script>
