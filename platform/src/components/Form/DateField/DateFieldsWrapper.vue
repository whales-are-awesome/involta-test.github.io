<template>
    <div :class="classes.root">
        <FieldInfo
            v-if="tooltip || label || required"
            :tooltip="tooltip"
            :label="label"
            :hint="hint"
            :required="required"
            :tip="tip"
            :error="error"
        >
            <div :class="classes.main">
                <slot></slot>
            </div>
        </FieldInfo>
    </div>
</template>


<script lang="ts" setup>
/* IMPORTS */

import { computed } from 'vue';
import FieldInfo from '@/components/Form/FieldInfo/FieldInfo.vue';
import makeClasses from '@/helpers/makeClasses';

/* INTERFACES */

interface IProps {
    tooltip?: string
    hint?: string
    label?: string
    required?: boolean
    tip?: string | number
    error?: string
    disabled?: boolean
}

interface IEmits {
}

interface ThemeProps extends Pick<IProps, 'error'> {
}

/* META */

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();

/* VARS AND CUSTOM HOOKS */

const useClasses = makeClasses<ThemeProps>(() => ({
    main: () => [
        'flex shadow-[0px_4px_8px_rgba(133,134,134,0.04)] rounded-[8px]'
    ]
}));

/* DATA */
/* COMPUTED */

const classes = computed((): ReturnType<typeof useClasses> => {
    return useClasses({
        error: props.error
    });
});

/* WATCH */
/* METHODS */
</script>
