<template>
    <div
        :class="classes.root"
        @click="emit('click')"
    >
        <BaseIcon
            :class="classes.cross"
            name="cross"
            :width="width"
        />
    </div>
</template>


<script lang="ts" setup>
import { computed } from 'vue';
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';
import { Themes } from './types';
import makeClasses from '@/helpers/makeClasses';
import ThemeSettings from '@/types/themeSettings';


// META

interface IProps {
    width?: number | string
    theme?: Themes
    themeSettings?: ThemeSettings<'root' | 'color'>
}

interface IEmits {
    (e: 'click'): void
}

const props = withDefaults(defineProps<IProps>(), {
    width: 16,
    theme: 'gray'
});

const emit = defineEmits<IEmits>();


// CLASSES

interface IThemeProps extends Pick<IProps, 'theme' | 'themeSettings'>{

}

const useClasses = makeClasses<IThemeProps>(() => ({
    root: ({ themeSettings, theme }) => [themeSettings?.root,
        'transition-fast cursor-pointer rounded-[4px] p-1',
        themeSettings?.color || {
            'text-[#B6B6BE] hover:text-[#777781] active:shadow-[0_0_0_4px_rgba(169,169,250,.25)]': theme === 'gray',
            'text-primary-400 hover:text-primary-500 active:shadow-[0_0_0_4px_rgba(169,169,250,.25)]': theme === 'primary'
        }
    ]
}));


const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({
        themeSettings: props.themeSettings,
        theme: props.theme
    });
});
</script>
