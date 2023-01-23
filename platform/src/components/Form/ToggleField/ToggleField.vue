<template>
    <div :class="classes.root">
        <label :class="classes.label">
            <input
                v-model="value"
                :value="fieldValue"
                :type="type"
                :class="classes.input"
            >
            <span :class="classes.fake">
                <span v-if="view === 'switch' || type === 'radio'" :class="classes.fakeIcon"></span>
                <BaseIcon v-else :class="classes.fakeIcon" name="check" width="10" height="7" />
            </span>
            <span v-if="'default' in $slots" :class="classes.text">
                <slot></slot>
            </span>
        </label>
        <BaseIcon
            v-if="cross"
            :class="classes.cross"
            name="cross"
            width="10"
        />
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';
import { Sizes, Views, Types, Themes, Align, Wrappers } from './types';
import makeClasses from '@/helpers/makeClasses';
import ThemeSettings from '@/types/themeSettings';


// META

interface IProps {
    theme?: Themes
    error?: string
    align?: Align
    size?: Sizes
    type?: Types
    view?: Views
    wrapper?: Wrappers
    disabled: boolean
    cross?: boolean
    modelValue?: boolean|string|any[]
    fieldValue?: string|boolean|object|number
    reverse?: boolean

    themeSettings?: ThemeSettings<'root'>
}

interface IEmits {
    (e: 'update:modelValue', value: IProps['modelValue']): void
}

const props = withDefaults(defineProps<IProps>(), {
    theme: 'primary',
    align: 'center',
    size: 'md',
    type: 'checkbox',
    view: 'primary',
    disabled: false,
    reverse: false,
});

const emit = defineEmits<IEmits>();


// CLASSES

interface ThemeProps extends Pick<IProps, 'theme' | 'type' | 'align' | 'view' | 'disabled' | 'wrapper' | 'size' | 'themeSettings'> {
    checked: boolean
}

const useClasses = makeClasses<ThemeProps>(
    () => ({
        root: ({ disabled, align, themeSettings }) => [themeSettings?.root,
            'relative flex items-center transition-fast group',
            {
                'items-center': align === 'center',
                'pointer-events-none opacity-50': disabled
            }
        ],
        input: 'opacity-0 absolute inset-0 cursor-pointer w-full peer',
        label: ({ align, wrapper, checked }) => [
            'flex cursor-pointer select-none outline-none transition-fast',
            {
                'items-center': align === 'center',

                'px-3 py-2 border border-surface-100 rounded-lg hover:bg-surface-100': wrapper === 'button',
                'bg-surface-100': wrapper === 'button' && checked
            }
        ],
        fake: ({ type, checked, view, disabled, size }) => [
            'relative transition-fast fill-current flex-shrink-0 border',

            view === 'primary' && [
                'text-white group-hover:border-surface-500',
                {
                    'border-[#8D8DD9]': !checked,
                },

                type === 'radio' && {
                    [`rounded-full w-3 h-3
                      group-hover:border-surface-500 peer-focus-visible:border-surface-500
                      peer-focus-visible:shadow-[0_0_0_4px_rgba(78,70,180,0.2)]`]: true,
                    'border-[#8D8DD9]': checked && !disabled,
                    'bg-100 border-200': disabled && checked,
                    'opacity-[.12]': disabled && !checked
                },
                type === 'checkbox' && {
                    [`rounded-sm w-4 h-4
                      group-hover:border-surface-500 peer-focus-visible:border-surface-500
                      peer-focus-visible:shadow-[0_0_0_4px_rgba(78,70,180,0.2)]`]: true,
                    'bg-surface-500': checked,
                    'opacity-[.12]': disabled && checked
                }
            ],

            view === 'switch' && {
                'rounded-full': true,
                'bg-gray-200 border-[#D1D1D1]': !checked,
                'bg-[#E3E3E5] border-surface-600': checked && !disabled,
                'w-6 h-3.5': size === 'md',
                'w-11 h-6': size === 'lg',
            }
        ],
        fakeIcon: ({ type, checked, view, disabled, size }) => [
            'absolute top-1/2 -translate-y-1/2 transition-fast',

            view === 'primary' && [
                'left-1/2 -translate-x-1/2',

                type === 'radio' && {
                    'w-1.5 h-1.5 rounded-full': true,
                    'bg-[#8D8DD9]': checked,
                    'bg-200': disabled && checked
                },
                type === 'checkbox' && {
                }
            ],

            view === 'switch' && {
                'rounded-full bg-white left-[1px]': true,
                'w-2.5 h-2.5': size === 'md',
                'w-5 h-5': size === 'lg',
                'bg-[#D1D1D1]': disabled,
                'translate-x-2': checked && size === 'md',
                'translate-x-5': checked && size === 'lg'
            }
        ],
        text: ({ wrapper }) => [
            'ml-2 transition-fast text-base',
            {
                'text-200 group-hover:text-surface-500': wrapper !== 'button',
                'text-surface-400 font-medium': wrapper === 'button'
            }
        ],
        cross: () => [
            'text-200 ml-auto z-10 cursor-pointer'
        ]
    })
);

const classes = computed<ReturnType<typeof useClasses>>(() => {
    const checked = props.fieldValue
        ? Array.isArray(props.modelValue)
            ? props.modelValue.includes(props.fieldValue)
            : props.modelValue === props.fieldValue
        : !!props.modelValue;

    return useClasses({
        theme: props.theme,
        type: props.type,
        view: props.view,
        size: props.size,
        wrapper: props.wrapper,
        disabled: props.disabled,
        align: props.align,
        themeSettings: props.themeSettings,
        checked: props.reverse ? !checked : checked
    });
});


// VALUE

const value = computed({
    get(): IProps['modelValue'] {
        return props.modelValue;
    },
    set(modelValue: IProps['modelValue']) {
        emit('update:modelValue', modelValue);
    }
});
</script>
