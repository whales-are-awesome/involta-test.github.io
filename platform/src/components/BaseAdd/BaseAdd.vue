<template>
    <BaseBlock :class="classes.root">
        <BaseButton
            size="icon"
            rounded="icon"
            view="outlined"
            theme="primary-200"
            :icon="{
                name: 'plus',
                width: '17.5'
            }"
        />
        <slot></slot>
    </BaseBlock>
</template>


<script lang="ts" setup>
import { computed } from 'vue';
import BaseBlock  from '@/components/BaseBlock/BaseBlock.vue';
import BaseButton  from '@/components/BaseButton/BaseButton.vue';
import makeClasses from '@/helpers/makeClasses';
import ThemeSettings from '@/types/themeSettings';


// META

interface IProps {
    themeSettings?: ThemeSettings<'root'>
}

interface IEmits {
}

const props = withDefaults(defineProps<IProps>(), {});

const emit = defineEmits<IEmits>();


// CLASSES

interface IThemeProps extends Pick<IProps, 'themeSettings'>{

}

const useClasses = makeClasses<IThemeProps>(() => ({
    root: ({ themeSettings }) => [themeSettings?.root,
        'flex'
    ]
}));

const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({
        themeSettings: props.themeSettings
    });
});
</script>
