<template>
    <div
        :class="classes.root"
        @click="emit('click')"
    >
        <BaseIcon
            name="trash"
            width="24"
        />
    </div>
</template>


<script lang="ts" setup>
import { computed } from 'vue';
import BaseIcon  from '@/components/BaseIcon/BaseIcon.vue';
import { Themes }  from './types';
import makeClasses from '@/helpers/makeClasses';
import ThemeSettings from '@/types/themeSettings';


// META

interface IProps {
    theme: Themes
    themeSettings?: ThemeSettings<'root'>
}

interface IEmits {
    (e: 'click'): void
}

const props = withDefaults(defineProps<IProps>(), {
    theme: 'surface-200'
});

const emit = defineEmits<IEmits>();


// CLASSES

interface IThemeProps extends Pick<IProps, 'themeSettings' | 'theme'>{}

const useClasses = makeClasses<IThemeProps>(() => ({
    root: ({ themeSettings, theme }) => [themeSettings?.root,
        'w-8 h-8 rounded-[2px] flex items-center justify-center text-[#FF3E3E] cursor-pointer',
        {
            'bg-surface-200': theme === 'surface-200',
            'bg-surface-300': theme === 'surface-300'
        }
    ]
}));

const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({
        theme: props.theme,
        themeSettings: props.themeSettings,
    });
});
</script>
