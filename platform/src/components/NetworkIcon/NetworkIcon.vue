<template>
    <div
        :class="classes.root"
    >
        <BaseIcon
            :name="`network-${ network }`"
            :width="size"
        />
    </div>
</template>


<script lang="ts" setup>
import { computed } from 'vue';
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';
import {  } from './types';
import makeClasses from '@/helpers/makeClasses';
import ThemeSettings from '@/types/themeSettings';
import { NetworksType } from '@/types/networks';

// META

interface IProps {
    network: NetworksType
    size: number | string
    themeSettings?: ThemeSettings<'root'>
}


const props = withDefaults(defineProps<IProps>(), {});


// CLASSES

interface IThemeProps extends Pick<IProps, 'themeSettings'>{}

const useClasses = makeClasses<IThemeProps>(() => ({
    root: ({ themeSettings }) => [themeSettings?.root,
        'flex items-start justify-end bg-white w-[25px] h-[25px] rounded-bl-[12px]',
    ]
}));

const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({
        themeSettings: props.themeSettings
    });
});
</script>
