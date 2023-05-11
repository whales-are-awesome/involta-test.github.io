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
import { Sections, Positions } from './types';
import makeClasses from '@/helpers/makeClasses';
import ThemeSettings from '@/types/themeSettings';
import { NetworksType } from '@/types/networks';

// META

interface IProps {
    network: NetworksType
    section: Sections
    position?: Positions
    themeSettings?: ThemeSettings<'root'>
}


const props = withDefaults(defineProps<IProps>(), {
    position: 'right-top'
});


// CLASSES

interface IThemeProps extends Pick<IProps, 'themeSettings' | 'section' | 'position'>{}

const useClasses = makeClasses<IThemeProps>(() => ({
    root: ({ themeSettings, section, position }) => [themeSettings?.root,
        'flex bg-white',

        {
            'w-[25px] h-[25px] rounded-bl-[12px]': section === 'dao-card',
            'w-[35px] h-[35px] rounded-bl-[10px] md:rounded-bl-[10px]': section === 'dao-sidebar',
            'w-[20px] h-[20px] rounded-[3px]': section === 'sidebar',

            'items-start justify-end': position === 'right-top',
            'items-center justify-center': position === 'center',
        }
    ]
}));

const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({
        themeSettings: props.themeSettings,
        section: props.section,
        position: props.position,
    });
});


// SIZE

const size = computed(() => {
    switch (props.section) {
        case 'dao-card':
            return 20;
        case 'dao-sidebar':
            return 30;
        case 'sidebar':
            return 20;
        default:
            return 10;
    }
});
</script>
