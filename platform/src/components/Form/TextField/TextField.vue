<template>
    <div :class="classes.root">
        <div
            v-if="label || required || tooltip || tipTop"
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
                v-if="tipTop"
                :class="classes.tip"
            >
                {{ tipTop }}
            </div>
        </div>
        <div :class="classes.main">
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
                <div
                    v-if="insetLeftLabel"
                    :class="classes.insetLeftLabel"
                >
                    {{ insetLeftLabel }}
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
                    v-if="!textarea"
                    v-model="value"
                    :class="classes.field"
                    type="text"
                    :maxlength="maxlength"
                    @focus="onFocus"
                    @blur="onBlur"
                >
                <textarea
                    v-else
                    v-model="value"
                    :class="classes.field"
                    type="text"
                    :maxlength="maxlength"
                    @focus="onFocus"
                    @blur="onBlur"
                />
                <BaseIcon
                    v-if="icon && !icon.prepend"
                    :class="[classes.icon, icon.class]"
                    :name="icon.name"
                    :width="icon.width"
                    :height="icon.height"
                />
                <slot
                    name="append-inner-right"
                    v-bind="{ classes: classes.innerRight }"
                ></slot>
            </div>
            <slot name="append-main"></slot>
        </div>
        <div
            v-if="hint || error || tipBottom"
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
                v-if="tipBottom"
                :class="classes.tip"
            >
                {{ tipBottom }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
/* IMPORTS */

import { computed, ref, useSlots } from 'vue';
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';
import BaseLabel from '@/components/BaseLabel/BaseLabel.vue';
import BaseTooltip from '@/components/BaseTooltip/BaseTooltip.vue';
import { Icons } from '@/components/BaseIcon/types';
import { Sizes } from './types';
import makeClasses from '@/helpers/makeClasses';

/* INTERFACES */

interface IProps {
    modelValue: string
    textarea?: boolean
    tooltip?: string
    placeholder?: string
    hint?: string
    label?: string
    insetLabel?: string
    insetLeftLabel?: string
    required?: boolean
    tipTop?: string | number
    tipBottom?: string | number
    isBold?: boolean
    isBig?: boolean
    isWrapped?: boolean
    icon?: {
        name: Icons
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
    size: 'md'
});
const emit = defineEmits<IEmits>();

/* VARS AND CUSTOM HOOKS */

const useClasses = makeClasses(() => {
    return {
        root: ({ isFilled, isFocus, hasError, disabled, size, isBig, isTextarea, isWrapped }) => [
            'relative',
            {
                'bg-white px-2 py-3 rounded-[4px]': isWrapped
            }
        ],
        main: 'flex',
        fieldWrapper: ({ isFilled, isFocus, hasError, disabled, size, isBig, isTextarea }) => {
            const states = {
                default: !hasError && !isFocus && !disabled,
                defaultFocus: !hasError && isFocus && !disabled,
                filled: !hasError && !isFocus && !disabled && isFilled,
                error: hasError && !isFocus && !disabled,
                errorFocus: hasError && isFocus && !disabled,
                disabled
            };

            return [
                'bg-white px-3 py-2.5 border rounded-[4px] relative transition-fast group flex-grow',
                {
                    'border-surface-300 hover:bg-primary-100': states.default,
                    'border-surface-500 border-primary-400 shadow-[0_0_0_3px_#D4D4FC,0_2px_2px_-1px_rgba(0,0,0,0.12)]': states.defaultFocus,
                    'border-gray-300e': states.filled,
                    'border-[#CB101D]': states.error,
                    'border-[#CB101D] ': states.errorFocus,
                    'pointer-events-none border-disabled-dark bg-disabled-light': states.disabled,

                    'h-[62px]': size === 'xl',
                    'h-12': !isBig && !isTextarea,
                    'h-[56px]': isBig && !isTextarea,
                    'h-[96px]': isTextarea,
                }
            ];
        },
        field: ({ isFilled, size, hasLeftIcon, isBold, isBig, isTextarea, disabled, insetLeftLabel }) => {
            return [
                'absolute inset-0 rounded-[4px] transition-fast resize-none bg-transparent text-500',
                {
                    'font-bold': isBold,
                    'pl-[13px]': !hasLeftIcon,
                    'pl-8': hasLeftIcon,
                    'text-200': !isFilled,
                    'text-400': isFilled,
                    'pt-[14px]': isFilled && isBig,
                    'p-3': isTextarea,
                    '!text-disabled-text': disabled,
                    'pt-[17px]': !!insetLeftLabel,

                    'text-xs': size === 'sm'
                }
            ]
        },
        placeholder: ({ isFilled, isBig, hasLeftIcon, disabled, insetLeftLabel }) => {
            return [
                'text-300 absolute z-10 transition-fast pointer-events-none',
                {
                    'left-8': hasLeftIcon,
                    'text-200': !isFilled,
                    'top-[12px]': !isFilled && !isBig,
                    'top-[16px]': !isFilled && isBig,
                    'hidden': !isBig && isFilled,
                    'text-400 text-xxs top-[8px] left-[13px] font-semibold': isFilled,
                    '!text-disabled-text': disabled,
                    'pt-[16px]': !!insetLeftLabel,
                }
            ]
        },
        icon: ({ isFilled, hasLeftIcon, isBig, isBold, disabled }) => [
            'absolute -translate-y-1/2 top-1/2 z-10 pointer-events-none transition-fast',
            {
                'text-gray-300': !isBold || !isFilled,
                'text-gray-500': isBold && isFilled,
                'left-[13px]': hasLeftIcon,
                'right-[13px]': !hasLeftIcon,
                'mt-[8px]': isFilled && isBig,
                '!text-disabled-text': disabled,
            }
        ],
        top: () => [
            'flex items-center mb-1'
        ],
        label: ({ isFilled, hasLeftIcon, disabled }) => [
            'text-gray-500 text-sm font-bold',
            {
                '!text-disabled-text': disabled,
            }
        ],
        requiredIcon: ({ isFilled, hasLeftIcon, disabled }) => [
            'text-status-error self-start ml-1 translate-y-1',
            {
                '!text-disabled-text': disabled,
            }
        ],
        tooltipIcon: ({ isFilled, hasLeftIcon, disabled }) => [
            'text-300 ml-[5px]',
            {
                '!text-disabled-text': disabled,
            }
        ],
        tip: ({ isFilled, hasLeftIcon, disabled }) => [
            'ml-auto text-gray-500 text-xs',
            {
                '!text-disabled-text': disabled,
            }
        ],
        insetLabel: ({ isFilled, hasLeftIcon, disabled }) => [
            'absolute font-bold top-1 right-3 z-10 text-gray-500',
            {
                '!text-disabled-text': disabled,
            }
        ],
        insetLeftLabel: ({ themeSettings }) => {
            return [themeSettings?.insetLeftLabel,  [
                'absolute left-3 top-3 text-gray-500 text-xxs font-semibold leading-1'
            ]];
        },
        bottom: ({ isFilled, hasLeftIcon, error }) => [
            'mt-1 flex items-center',
            {
                'absolute w-full top-full left-0 z-10': error
            }
        ],
        warningIcon: ({ isFilled, hasLeftIcon, disabled }) => [
            'text-gray-500 mr-2',
            {
                '!text-disabled-text': disabled,
            }
        ],
        hint: ({ isFilled, hasLeftIcon, disabled }) => [
            'text-gray-500 text-xs font-bold',
            {
                '!text-disabled-text': disabled,
            }
        ],
        errorIcon: ({ isFilled, hasLeftIcon }) => [
            'text-[#CB101D] mr-2'
        ],
        error: () => [
            'text-[#CB101D] text-xs font-bold'
        ],
        button: ({ isFilled, hasLeftIcon, disabled }) => [
            'absolute top-2.5 right-3 z-10 cursor-pointer',
            {
                '!text-disabled-text !border-disabled-dark !bg-disabled-light': disabled,
            }
        ],
        innerRight: ({ isFilled, hasLeftIcon, disabled }) => [
            'absolute top-2.5 right-3'
        ]
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
        insetLeftLabel: props.insetLeftLabel,
        isBold: props.isBold,
        isTextarea: props.textarea,
        isWrapped: props.isWrapped,
        isBig: props.isBig
    });
});

/* WATCH */
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
