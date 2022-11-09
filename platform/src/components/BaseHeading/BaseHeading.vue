<template>
    <div :class="classes.root">
        <div :class="classes.top">
            <div
                v-if="title"
                :class="classes.title"
            >
                {{ title }}
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
        <div :class="classes.content">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
/* IMPORTS */

import { computed } from 'vue';
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';
import BaseTooltip from '@/components/BaseTooltip/BaseTooltip.vue';
import makeClasses from '@/helpers/makeClasses';

/* INTERFACES */

interface IProps {
    tooltip?: string
    title?: string
    required?: boolean
    tip?: string | number
    disabled?: boolean
}

interface IEmits {
}

/* META */

const props = withDefaults(defineProps<IProps>(), {
});
const emit = defineEmits<IEmits>();

/* VARS AND CUSTOM HOOKS */

const useClasses = makeClasses(() => {
    return {
        top: () => [
            'flex items-center'
        ],
        title: ({ disabled }) => [
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
        content: ({ disabled }) => [
            'text-gray-500 text-xxs',
            {
                '!text-disabled-text': disabled,
            }
        ],
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
