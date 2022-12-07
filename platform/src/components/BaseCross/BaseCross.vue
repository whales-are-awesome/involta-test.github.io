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
import makeClasses from '@/helpers/makeClasses';
import ThemeSettings from '@/types/themeSettings';


// META

interface IProps {
    width: number | string
    themeSettings?: ThemeSettings<'root'>
}

interface IEmits {
    (e: 'click'): void
}

const props = withDefaults(defineProps<IProps>(), {
    width: 16
});

const emit = defineEmits<IEmits>();


// CLASSES

interface IThemeProps extends Pick<IProps, 'themeSettings'>{

}

const useClasses = makeClasses<IThemeProps>(() => ({
    root: ({ themeSettings }) => [themeSettings?.root,
        'text-[#B6B6BE] hover:text-[#777781] active:shadow-[0_0_0_4px_rgba(169,169,250,.25)] transition-fast cursor-pointer rounded-[4px] bg-white p-1'
    ]
}));


const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({
        themeSettings: props.themeSettings
    });
});
</script>
