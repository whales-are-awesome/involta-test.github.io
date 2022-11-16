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
/* IMPORTS */

import { computed } from 'vue';
import BlockInfo, { IProps as IBlockInfoProps } from '@/components/BlockInfo/BlockInfo.vue';
import makeClasses from '@/helpers/makeClasses';
import IThemeSettings from '@/models/themeSettings';

/* INTERFACES */

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

    themeSettings?: IThemeSettings<'root'>
}

interface IEmits {
}

interface ThemeProps extends Pick<IProps, 'error' | 'themeSettings'> {
}

/* META */

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();

/* VARS AND CUSTOM HOOKS */

const useClasses = makeClasses<ThemeProps>(() => ({
    root: ({ themeSettings }) => [themeSettings?.root,
        'flex shadow-[0px_4px_8px_rgba(133,134,134,0.04)] rounded-[8px]'
    ],
    main: () => [
        'flex shadow-[0px_4px_8px_rgba(133,134,134,0.04)] rounded-[8px]'
    ]
}));

/* DATA */
/* COMPUTED */

const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({
        error: props.error,
        themeSettings: props.themeSettings
    });
});

/* WATCH */
/* METHODS */
</script>
