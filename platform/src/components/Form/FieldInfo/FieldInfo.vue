<template>
    <div :class="classes.root">
        <div
            v-if="tooltip || label || required"
            :class="classes.top"
        >
            <div
                v-if="label"
                :class="classes.label"
            >
                {{ label }}
            </div>
            <BaseIcon
                v-if="required"
                :class="classes.requiredIcon"
                name="required"
                width="6"
            />
            <BaseTooltip
                v-if="tooltip"
                :content="tooltip"
            >
                <BaseIcon
                    :class="classes.tooltipIcon"
                    name="warning-circle"
                    width="9"
                />
            </BaseTooltip>
            <div
                v-if="tip"
                :class="classes.tip"
            >
                {{ tip }}
            </div>
        </div>
        <slot></slot>
        <div
            v-if="hint || error"
            :class="classes.bottom"
        >
            <template v-if="hint">
                <BaseIcon
                    :class="classes.warningIcon"
                    name="warning"
                    width="10"
                />
                <div
                    :class="classes.hint"
                >
                    {{ hint }}
                </div>
            </template>
            <template v-if="error">
                <BaseIcon
                    :class="classes.errorIcon"
                    name="warning-circle"
                    width="12"
                />
                <div
                    :class="classes.error"
                >
                    {{ error }}
                </div>
            </template>
            <div
                v-if="tip"
                :class="classes.tip"
            >
                {{ tip }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
/* IMPORTS */

import { computed, useSlots } from 'vue';
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';
import BaseTooltip from '@/components/BaseTooltip/BaseTooltip.vue';
import makeClasses from '@/helpers/makeClasses';

/* INTERFACES */

interface IProps {
    tooltip?: string
    label?: string
    required?: boolean
    tip?: string | number
    hint?: string
    error?: string
    disabled?: boolean
}

interface IEmits {
    (e: 'update:modelValue', value: string): void
    (e: 'button-click'): void
}

/* META */

const props = withDefaults(defineProps<IProps>(), {
});
const emit = defineEmits<IEmits>();

/* VARS AND CUSTOM HOOKS */

const useClasses = makeClasses(() => {
    return {
        top: () => [
            'flex items-center mb-1'
        ],
        label: ({ disabled }) => [
            'text-gray-500 text-sm font-bold',
            {
                '!text-disabled-text': disabled,
            }
        ],
        requiredIcon: ({ disabled }) => [
            'text-status-error self-start ml-1 translate-y-1',
            {
                '!text-disabled-text': disabled,
            }
        ],
        tooltipIcon: ({ disabled }) => [
            'text-300 ml-[5px]',
            {
                '!text-disabled-text': disabled,
            }
        ],
        tip: ({ disabled }) => [
            'ml-auto text-gray-500 text-xs',
            {
                '!text-disabled-text': disabled,
            }
        ],
        bottom: ({ error }) => [
            'mt-1 flex items-center',
            {
                'absolute w-full top-full left-0 z-10': error
            }
        ],
        warningIcon: ({ disabled }) => [
            'text-gray-500 mr-2',
            {
                '!text-disabled-text': disabled,
            }
        ],
        hint: ({ disabled }) => [
            'text-gray-500 text-xs font-bold',
            {
                '!text-disabled-text': disabled,
            }
        ],
        errorIcon: () => [
            'text-[#CB101D] mr-2'
        ],
        error: () => [
            'text-[#CB101D] text-xs font-bold'
        ]
    };
});

/* DATA */

/* COMPUTED */


const classes = computed((): ReturnType<typeof useClasses> => {
    return useClasses({
        disabled: props.disabled
    });
});

/* WATCH */
/* METHODS */
</script>

<style scoped>

</style>
