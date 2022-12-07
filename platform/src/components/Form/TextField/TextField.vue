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
                <div
                    ref="el"
                    :class="classes.fieldWrapper"
                    @click="onClick"
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
                        v-if="view !== 'textarea'"
                        ref="input"
                        v-model="value"
                        :class="classes.field"
                        type="text"
                        :maxlength="maxlength"
                        @focus="onFocus"
                        @blur="onBlur"
                    >
                    <textarea
                        v-else
                        ref="input"
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
            </div>
        </BlockInfo>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';
import BaseLabel from '@/components/BaseLabel/BaseLabel.vue';
import BlockInfo, { IProps as IBlockInfoProps } from '@/components/BlockInfo/BlockInfo.vue';
import { Icons } from '@/components/BaseIcon/types';
import { Sizes, Views } from './types';
import makeClasses from '@/helpers/makeClasses';
import ThemeSettings from '@/types/themeSettings';


// META

interface IProps {
    modelValue: string
    placeholder?: string
    insetLabel?: string
    insetLeftLabel?: string
    isBold?: boolean
    isWrapped?: boolean
    icon?: {
        name: Icons
        width?: string
        height?: string
        class?: string
        prepend?: boolean
    }
    buttonTitle?: string
    size: Sizes
    view: Views
    maxlength?: number | string
    themeSettings?: ThemeSettings<'root'>

    title?: IBlockInfoProps['title']
    tooltip?: IBlockInfoProps['tooltip']
    required?: IBlockInfoProps['required']
    tip?: IBlockInfoProps['tip']
    hint?: IBlockInfoProps['hint']
    error?: IBlockInfoProps['error']
    description?: IBlockInfoProps['description']
    tipBottom?: IBlockInfoProps['tipBottom']
    disabled?: IBlockInfoProps['disabled']
}

interface IEmits {
    (e: 'update:modelValue', value: string): void
    (e: 'button-click'): void
}

const props = withDefaults(defineProps<IProps>(), {
    size: 'md',
    view: 'default'
});

const emit = defineEmits<IEmits>();


// CLASSES

interface IThemeProps extends Pick<IProps, 'size' | 'view' | 'disabled' | 'isBold' | 'isWrapped' | 'themeSettings'> {
    isFocus: boolean
    hasError: boolean
    isFilled: boolean
    hasLeftIcon: boolean
    hasRightIcon: boolean
    hasInsetLeftLabel: boolean
}

const useClasses = makeClasses<IThemeProps>(() => {
    return {
        root: ({ isWrapped, themeSettings }) => [themeSettings?.root,
            'relative',
            {
                'bg-white px-2 py-3 rounded-[4px]': isWrapped
            }
        ],
        fieldWrapper: ({ isFilled, isFocus, hasError, disabled, size, view }) => {
            const states = {
                default: !hasError && !isFocus && !disabled,
                defaultFocus: !hasError && isFocus && !disabled,
                filled: !hasError && !isFocus && !disabled && isFilled,
                error: hasError && !isFocus && !disabled,
                errorFocus: hasError && isFocus && !disabled,
                disabled
            };

            return [
                'bg-white px-3 py-2.5 border rounded-[4px] relative transition-fast group',
                {
                    'border-surface-300 hover:bg-primary-100': states.default,
                    'border-surface-500 border-primary-400 shadow-[0_0_0_3px_#D4D4FC,0_2px_2px_-1px_rgba(0,0,0,0.12)]': states.defaultFocus,
                    'border-gray-300': states.filled,
                    'border-[#CB101D]': states.error,
                    'border-[#CB101D] ': states.errorFocus,
                    'pointer-events-none border-disabled-dark bg-disabled-light': states.disabled,
                },

                view === 'default' && {
                    'h-[62px]': size === 'xl',
                    'h-12 sm:h-8': size === 'md',
                },

                view === 'floating-placeholder' && {
                    'h-[56px]': size === 'md',
                },

                view === 'textarea' && {
                    'h-[96px] sm:h-[88px]': size === 'md',
                },

                view === 'swap' && {
                    'h-[66px]': size === 'md',
                    'h-[106px]': size === 'xl',
                },
            ];
        },
        field: ({ isFilled, size, isBold, view, disabled, hasInsetLeftLabel, hasRightIcon, hasLeftIcon }) => {
            const notViewSwap =  'inset-0';

            return [
                'absolute rounded-[4px] transition-fast resize-none bg-transparent text-500',
                {

                    'font-bold': isBold,
                    '!text-disabled-text': disabled,

                    'px-3 sm:px-2': !hasRightIcon && !hasLeftIcon,
                    'pl-3 pr-8 sm:pl-2': hasRightIcon,
                    'pl-8 pr-3 sm:pr-2': hasLeftIcon,
                    'pt-[17px]': hasInsetLeftLabel,

                    'text-200': !isFilled,
                    'text-400': isFilled,

                    'text-xs': size === 'sm',
                    'sm:text-xs': size === 'md'
                },

                view === 'default' && [
                    notViewSwap
                ],

                view === 'floating-placeholder' && {
                    [notViewSwap]: true,
                    'pt-[14px]': isFilled
                },

                view === 'textarea' && [
                    notViewSwap,
                    'p-3'
                ],

                view === 'swap' && [
                    'left-0 top-[13px] w-10/12'
                ],
            ]
        },
        placeholder: ({ isFilled, view, hasRightIcon, hasLeftIcon, disabled, hasInsetLeftLabel, size }) => {
            return [
                'text-300 absolute z-10 transition-fast pointer-events-none',
                {
                    'left-3 sm:left-2': (!hasRightIcon && !hasLeftIcon) || hasRightIcon,
                    'left-8': hasLeftIcon,

                    'text-200': !isFilled,
                    '!text-disabled-text': disabled,
                    'pt-[16px]': !!hasInsetLeftLabel,


                    'text-xs': size === 'sm',
                    'sm:text-xs': size === 'md'
                },

                view !== 'floating-placeholder' && {
                    'hidden': isFilled,
                    'top-[13px] sm:top-[7px]': !isFilled,
                },

                view === 'floating-placeholder' && {
                    'top-[16px]': view === 'floating-placeholder' && !isFilled,
                    'text-400 text-xxs top-[8px] left-[13px] font-semibold': isFilled,
                }
            ]
        },
        icon: ({ isFilled, hasRightIcon, hasLeftIcon, view, isBold, disabled }) => [
            'absolute -translate-y-1/2 top-1/2 z-10 pointer-events-none transition-fast',
            {
                'text-gray-300': !isBold || !isFilled,
                'text-gray-500': isBold && isFilled,
                'left-[13px]': hasLeftIcon,
                'right-[13px]': hasRightIcon,
                '!text-disabled-text': disabled,
            },

            view === 'floating-placeholder' && {
                'mt-[8px]': isFilled
            }
        ],
        insetLabel: ({ disabled }) => [
            'absolute font-bold top-1 right-3 z-10 text-gray-500',
            {
                '!text-disabled-text': disabled,
            }
        ],
        insetLeftLabel: 'absolute left-3 top-3 text-gray-500 text-xxs font-semibold leading-1',
        button: ({ disabled }) => [
            'absolute top-2.5 right-3 z-10 cursor-pointer',
            {
                '!text-disabled-text !border-disabled-dark !bg-disabled-light': disabled,
            }
        ],
        innerRight: 'absolute top-2.5 right-3'
    };
});

const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({
        isFocus: isFocus.value,
        hasError: !!props.error,
        size: props.size,
        view: props.view,
        disabled: props.disabled,
        isFilled: !!value.value,
        hasLeftIcon: !!props.icon && !!props.icon.prepend,
        hasRightIcon: !!props.icon && !props.icon.prepend,
        hasInsetLeftLabel: !!props.insetLeftLabel,
        isBold: props.isBold,
        isWrapped: props.isWrapped,

        themeSettings: props.themeSettings
    });
});


// FOCUS

const isFocus = ref(false);

function onFocus(): void {
    isFocus.value = true;
}

function onBlur(): void {
    isFocus.value = false;
}


// VALUE

const value = computed({
    get() {
        return props.modelValue;
    },
    set(value: IProps['modelValue']) {
        if (!props.maxlength || value.length <= +props.maxlength ) {
            emit('update:modelValue', value)
        }
    }
});


// INPUT

const input = ref<HTMLElement | null>(null);

function onClick(): void {
    input.value?.focus();
}
</script>
