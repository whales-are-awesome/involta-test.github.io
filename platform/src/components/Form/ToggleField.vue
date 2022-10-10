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
                <span v-if="view === Views.Switch || type === Types.Radio" :class="classes.fakeIcon"></span>
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

<script lang="ts">
enum Sizes {
    Lg = 'lg',
    Md = 'md'
}
enum Views {
    Primary = 'primary',
    Switch = 'switch'
}
enum Align {
    Center = 'center',
    Start = 'start',
}
enum Types {
    Checkbox = 'checkbox',
    Radio = 'radio'
}

enum Themes {
    Primary = 'primary'
}

enum Wrappers {
    Button = 'button'
}

export {}
</script>

<script lang="ts" setup>
import {computed} from 'vue';
import BaseIcon from '@/components/BaseIcon';
import makeClasses from '@/helpers/makeClasses';

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
}

interface IEmits {
    (e: 'update:modelValue', value: IProps['modelValue']): void
}

interface ThemeProps extends Pick<IProps, 'theme' | 'type' | 'align' | 'view' | 'disabled' | 'wrapper' | 'size'> {
    checked: boolean
}

const props = withDefaults(defineProps<IProps>(), {
    theme: Themes.Primary,
    align: Align.Center,
    size: Sizes.Md,
    type: Types.Checkbox,
    view: Views.Primary,
    disabled: false,
    reverse: false,
});
const emit = defineEmits<IEmits>();

const useClasses = makeClasses<ThemeProps>(
    () => ({
        root: ({ disabled, align }) => [
            'relative flex items-center transition-fast group',
            {
                'items-center': align === Align.Center,
                'pointer-events-none opacity-50': disabled
            }
        ],
        input: 'opacity-0 absolute inset-0 cursor-pointer w-full peer',
        label: ({ align, wrapper, checked }) => [
            'flex cursor-pointer select-none outline-none transition-fast',
            {
                'items-center': align === Align.Center,

                'px-3 py-2 border border-surface-100 rounded-lg hover:bg-surface-100': wrapper === Wrappers.Button,
                'bg-surface-100': wrapper === Wrappers.Button && checked
            }
        ],
        fake: ({ type, checked, view, disabled, size }) => [
            'relative transition-fast fill-current flex-shrink-0 border',
            {
                'text-white group-hover:border-surface-500': view === Views.Primary,
                'border-200': !checked && view === Views.Primary,

                'rounded-sm w-4 h-4': view === Views.Primary && type === Types.Checkbox,
                '!bg-surface-500': checked && type === Types.Checkbox,

                'rounded-full w-3 h-3': type === Types.Radio && view === Views.Primary,
                'border-surface-500': checked && !disabled && view === Views.Primary && type === Types.Radio,
                'bg-100 border-200': disabled && checked && view === Views.Primary && type === Types.Radio,

                'rounded-full bg-[#E3E3E5] border-[#D1D1D1]': view === Views.Switch,
                'bg-gray-200': !checked && view === Views.Switch,
                '!border-surface-600': checked && !disabled && view === Views.Switch,
                'w-6 h-3.5': view === Views.Switch && size === Sizes.Md,
                'w-11 h-6': view === Views.Switch && size === Sizes.Lg,

                'group-hover:border-surface-500 peer-focus-visible:border-surface-500 peer-focus-visible:shadow-[0_0_0_4px_rgba(78,70,180,0.2)]': [Types.Checkbox, Types.Radio].includes(type!) && view === Views.Primary,
                'opacity-[.12]': disabled && ((checked && type === Types.Checkbox) || (!checked && type === Types.Radio))
            }
        ],
        fakeIcon: ({ type, checked, view, disabled, size }) => [
            'absolute top-1/2 -translate-y-1/2 transition-fast',
            {
                'left-1/2 -translate-x-1/2': view === Views.Primary,

                'w-1.5 h-1.5 rounded-full': type === Types.Radio && view === Views.Primary,
                'bg-surface-500': checked && type === Types.Radio && view === Views.Primary,
                'bg-200': disabled && checked && type === Types.Radio && view === Views.Primary,

                'rounded-full bg-white left-[1px]': view === Views.Switch,
                'w-2.5 h-2.5': view === Views.Switch && size === Sizes.Md,
                'w-5 h-5': view === Views.Switch && size === Sizes.Lg,
                'bg-[#D1D1D1]': disabled && view === Views.Switch,
                'translate-x-2': checked && view === Views.Switch && size === Sizes.Md,
                'translate-x-5': checked && view === Views.Switch && size === Sizes.Lg
            }
        ],
        text: ({ checked, wrapper }) => [
            'ml-2 transition-fast text-base',
            {
                'text-200 group-hover:text-surface-500': wrapper !== Wrappers.Button,
                'text-surface-400 font-medium': wrapper === Wrappers.Button
            }
        ],
        cross: () => [
            'text-200 ml-auto z-10 cursor-pointer'
        ]
    })
);

const value = computed({
    get(): IProps['modelValue'] {
        return props.modelValue;
    },
    set(modelValue: IProps['modelValue']) {
        emit('update:modelValue', modelValue);
    }
});

const classes = computed((): ReturnType<typeof useClasses> => {
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
        checked: props.reverse ? !checked : checked
    });
});
</script>
