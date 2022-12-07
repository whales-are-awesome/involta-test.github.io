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
import { computed } from 'vue';
import {  } from './types';
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';
import { useTimer } from '@/composables/useTimer';
import makeClasses from '@/helpers/makeClasses';
import ThemeSettings from '@/types/themeSettings';


// META

interface IProps {
    endDate: Date
    themeSettings?: ThemeSettings<'root'>
}

const props = withDefaults(defineProps<IProps>(), {});


// CLASSES

interface IThemeProps extends Pick<IProps, 'themeSettings'>{}

const useClasses = makeClasses<IThemeProps>(() => ({
    root: ({ themeSettings }) => [themeSettings?.root],
    inner: 'flex items-center text-400 text-sm',
    icon: 'mr-2'
}));

const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({
        themeSettings: props.themeSettings
    });
});


// TIMER

const timer = useTimer(props.endDate);
</script>
