<template>
    <div :class="classes.root">
        <BlockInfo
            :title="title"
            :tooltip="tooltip"
            :required="required"
            :tip="tip"
            :hint="hint"
            :error="error"
            :tip-bottom="tipBottom"
            :disabled="disabled"
            :description="description"
        >
            <div :class="classes.main">
                <slot></slot>
            </div>
        </BlockInfo>
    </div>
</template>


<script lang="ts" setup>
import { computed } from 'vue';
import BlockInfo, { IProps as IBlockInfoProps } from '@/components/BlockInfo/BlockInfo.vue';
import makeClasses from '@/helpers/makeClasses';
import ThemeSettings from '@/types/themeSettings';


// META

interface IProps {
    title?: IBlockInfoProps['title']
    tooltip?: IBlockInfoProps['tooltip']
    required?: IBlockInfoProps['required']
    tip?: IBlockInfoProps['tip']
    hint?: IBlockInfoProps['hint']
    error?: IBlockInfoProps['error']
    description?: IBlockInfoProps['description']
    tipBottom?: IBlockInfoProps['tipBottom']
    disabled?: IBlockInfoProps['disabled']

    themeSettings?: ThemeSettings<'root'>
}

interface IEmits {
}

const props = defineProps<IProps>();

const emit = defineEmits<IEmits>();


// CLASSES

interface ThemeProps extends Pick<IProps, 'error' | 'themeSettings'> {}

const useClasses = makeClasses<ThemeProps>(() => ({
    root: ({ themeSettings }) => [themeSettings?.root,
        'flex shadow-[0px_4px_8px_rgba(133,134,134,0.04)] rounded-[8px]'
    ],
    main: () => [
        'flex shadow-[0px_4px_8px_rgba(133,134,134,0.04)] rounded-[8px]'
    ]
}));

const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({
        error: props.error,
        themeSettings: props.themeSettings
    });
});
</script>
