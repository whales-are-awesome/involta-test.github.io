<template>
    <div :class="classes.root">
        <div :class="classes.inner">
            <BaseIcon
                :class="classes.hash"
                name="hash"
                width="12"
            />
            <slot></slot>
        </div>
    </div>
</template>


<script lang="ts" setup>
import { computed } from 'vue';
import  BaseIcon from '@/components/BaseIcon/BaseIcon.vue';
import makeClasses from '@/helpers/makeClasses';
import ThemeSettings from '@/types/themeSettings';

// META

interface IProps {
    themeSettings?: ThemeSettings<'root'>
}

const props = withDefaults(defineProps<IProps>(), {});

// CLASSES

interface IThemeProps extends Pick<IProps, 'themeSettings'>{}

const useClasses = makeClasses<IThemeProps>(() => ({
    root: ({ themeSettings }) => [themeSettings?.root,
    ],
    inner: 'py-[2px] px-1 flex items-center border border-surface-400 rounded-[2px] text-gray-500 text-xxs sm:!text-xxs leading-none uppercase tracking-[0.04px]',
    hash: 'mr-[2px] text-gray-400'
}));

const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({
        themeSettings: props.themeSettings
    });
});
</script>
