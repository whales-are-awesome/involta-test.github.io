<template>
    <div :class="classes.root">
        <div :class="classes.top">
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
                v-if="tipTop"
                :class="classes.tip"
            >
                {{ tipTop }}
            </div>
        </div>
        <div
            ref="el"
            :class="classes.fieldWrapper"
        >
            <BaseLabel
                v-if="buttonTitle"
                :class="classes.button"
                view="simple"
                theme="primary"
                @click="emit('button-click')"
            >
                {{ buttonTitle }}
            </BaseLabel>
            <div
                v-if="insetLabel"
                :class="classes.insetLabel"
            >
                {{ insetLabel }}
            </div>
            <BaseIcon
                v-if="icon && icon.prepend"
                :class="[classes.icon, icon.class]"
                :name="icon.name"
                :width="icon.width"
                :height="icon.height"
            />
            <p :class="classes.placeholder">
                {{ placeholder }}
            </p>
            <input
                v-model="value"
                :class="classes.field"
                type="text"
                :maxlength="maxlength"
                @focus="onFocus"
                @blur="onBlur"
            >
            <BaseIcon
                v-if="icon && !icon.prepend"
                :class="[classes.icon, icon.class]"
                :name="icon.name"
                :width="icon.width"
                :height="icon.height"
            />
        </div>
        <div :class="classes.bottom">
            <template  v-if="hint">
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
            <div
                v-if="tipBottom"
                :class="classes.tip"
            >
                {{ tipBottom }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Sizes } from './types';
</script>

<script setup lang="ts">
/* IMPORTS */

import { computed, ref } from 'vue';
import { Icons } from '@/models/icons';
import BaseIcon from '@/components/BaseIcon.vue';
import BaseLabel from '@/components/BaseLabel/BaseLabel.vue';
import BaseTooltip from '@/components/BaseTooltip/BaseTooltip.vue';
import makeClasses from '@/helpers/makeClasses';

/* INTERFACES */

interface IProps {
    modelValue: string
    tooltip?: string
    placeholder?: string
    hint?: string
    label?: string
    insetLabel?: string
    required?: string
    tipTop?: string | number
    tipBottom?: string | number
    isBold?: boolean
    icon?: {
        name: keyof typeof Icons
        width?: string
        height?: string
        class?: string
        prepend?: boolean
    }
    buttonTitle?: string
    size?: Sizes
    disabled?: boolean
    error?: string
    maxlength?: number | string
}

interface IEmits {
    (e: 'update:modelValue', value: string): void
    (e: 'button-click'): void

}

/* META */

const props = withDefaults(defineProps<IProps>(), {
    size: Sizes.Md
});
const emit = defineEmits<IEmits>();

/* CONSTANTS AND CUSTOM HOOKS */

const useClasses = makeClasses(() => {
    return {
        fieldWrapper: ({ isFilled, isFocus, hasError, disabled, size, isBig }) => {
            const states = {
                default: !hasError && !isFocus && !disabled,
                defaultFocus: !hasError && isFocus && !disabled,
                error: hasError && !isFocus && !disabled,
                errorFocus: hasError && isFocus && !disabled,
                disabled
            };

            return [
                'px-3 py-2.5 border rounded-[4px] relative transition-fast group',
                {
                    'border-surface-300 hover:border-surface-500 hover:shadow-[0_0_0_2px_rgba(103,71,232,.24)]': states.default,
                    'border-surface-500 shadow-[0_0_0_2px_rgba(103,71,232,.38)]': states.defaultFocus,
                    'border-[#BB4840] hover:shadow-[0_0_0_2px_rgba(187,72,64,0.24)]': states.error,
                    'border-[#BB4840] shadow-[0_0_0_2px_rgba(187,72,64,0.38)]': states.errorFocus,
                    'pointer-events-none border-[#E3E4E6]': states.disabled,

                    'h-12': !isBig,
                    'h-[56px]': isBig
                }
            ];
        },
        field: ({ isFilled, size, hasLeftIcon, isBold, isBig }) => {
            return [
                'absolute inset-0 rounded-[4x] transition-fast',
                {
                    'font-bold': isBold,
                    'pl-[13px]': !hasLeftIcon,
                    'pl-8': hasLeftIcon,
                    'text-200 group-hover:text-400': !isFilled,
                    'text-400': isFilled,
                    'pt-[14px]': isFilled && isBig,

                    'text-xs': size === Sizes.Sm
                }
            ]
        },
        placeholder: ({ isFilled, isBig, hasLeftIcon }) => {
            return [
                'text-300 absolute z-10 transition-fast pointer-events-none',
                {
                    'left-8': hasLeftIcon,
                    'text-200 group-hover:text-400': !isFilled,
                    'top-[12px]': !isFilled && !isBig,
                    'top-[16px]': !isFilled && isBig,
                    'hidden': !isBig && isFilled,
                    'text-400 text-xss top-[8px] left-[13px] font-semibold': isFilled,
                }
            ]
        },
        error: () => [
            'absolute left-0 top-full leading-none pt-2 text-sm text-[#BB4840]'
        ],
        icon: ({ isFilled, hasLeftIcon, isBig }) => [
            'absolute -translate-y-1/2 top-1/2 text-gray-300 z-10 pointer-events-none transition-fast',
            {
                'left-[13px]': hasLeftIcon,
                'right-[13px]': !hasLeftIcon,
                'mt-[8px]': isFilled && isBig
            }
        ],
        top: ({ isFilled, hasLeftIcon }) => [
            'flex items-center mb-1',
            {
                'left-[13px]': hasLeftIcon,
                'right-[13px]': !hasLeftIcon
            }
        ],
        label: ({ isFilled, hasLeftIcon }) => [
            'text-gray-500 text-sm font-bold'
        ],
        requiredIcon: ({ isFilled, hasLeftIcon }) => [
            'text-status-error self-start ml-1 translate-y-1'
        ],
        tooltipIcon: ({ isFilled, hasLeftIcon }) => [
            'text-300 ml-[5px]'
        ],
        tip: ({ isFilled, hasLeftIcon }) => [
            'ml-auto text-gray-500 text-xs'
        ],
        insetLabel: ({ isFilled, hasLeftIcon }) => [
            'absolute font-bold top-1 right-3 z-10 text-gray-500'
        ],
        bottom: ({ isFilled, hasLeftIcon }) => [
            'flex items-center mt-1',
            {
                'left-[13px]': hasLeftIcon,
                'right-[13px]': !hasLeftIcon
            }
        ],
        warningIcon: ({ isFilled, hasLeftIcon }) => [
            'text-gray-500 mr-2'
        ],
        hint: ({ isFilled, hasLeftIcon }) => [
            'text-gray-500 text-xs font-bold'
        ],
        button: ({ isFilled, hasLeftIcon }) => [
            'absolute top-2.5 right-3 z-10 cursor-pointer'
        ],
    };
});

/* DATA */

const isFocus = ref(false);

/* COMPUTED */

const value = computed({
    get() {
        return props.modelValue;
    },
    set(value: string) {
        if (!props.maxlength || value.length <= +props.maxlength ) {
            emit('update:modelValue', value)
        }
    }
});


const classes = computed((): ReturnType<typeof useClasses> => {
    return useClasses({
        isFocus: isFocus.value,
        hasError: !!props.error,
        size: props.size,
        disabled: props.disabled,
        isFilled: !!value.value,
        hasLeftIcon: !!props.icon?.prepend,
        hasRightIcon: !props.icon?.prepend,
        isBold: props.isBold,
        isBig: !!props.insetLabel || props.buttonTitle
    });
});

/* METHODS */

function onFocus(): void {
    isFocus.value = true;
}

function onBlur(): void {
    isFocus.value = false;
}
</script>

<style scoped>

</style>
