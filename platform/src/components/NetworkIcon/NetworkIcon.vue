<template>
    <div
        :class="classes.root"
    >
        <BaseIcon
            :name="`network-${ network }`"
            :width="props.size === 'md' ? 20 : 30"
        />
    </div>
</template>


<script lang="ts" setup>
import { computed } from 'vue';
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';
import { Sizes } from './types';
import makeClasses from '@/helpers/makeClasses';
import ThemeSettings from '@/types/themeSettings';
import { NetworksType } from '@/types/networks';

// META

interface IProps {
    network: NetworksType
    size: Sizes
    themeSettings?: ThemeSettings<'root'>
}


const props = withDefaults(defineProps<IProps>(), {});


// CLASSES

interface IThemeProps extends Pick<IProps, 'themeSettings' | 'size'>{}

const useClasses = makeClasses<IThemeProps>(() => ({
    root: ({ themeSettings, size }) => [themeSettings?.root,
        'flex items-start justify-end bg-white',

        {
            'w-[25px] h-[25px] rounded-bl-[12px]': size === 'md',
            'w-[35px] h-[35px] rounded-bl-[10px] md:rounded-bl-[10px]': size === 'xl'
        }
    ]
}));

const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({
        themeSettings: props.themeSettings,
        size: props.size,
    });
});
</script>
