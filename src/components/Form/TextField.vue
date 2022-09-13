<template>
    <div
        ref="el"
        :class="classes.root"
    >
        <input
            v-model="value"
            :class="classes.field"
            type="text"
            :placeholder="placeholder"
            :maxlength="maxlength"
            @focus="onFocus"
            @blur="onBlur"
        >
        <div
            v-if="error"
            :class="classes.error"
        >
            {{ error }}
        </div>
        <template v-if="slots.append">
            <div :class="classes.append">
                <slot name="append"></slot>
            </div>
        </template>
    </div>
</template>

<script lang="ts">
    enum Sizes {
        Md = 'md',
        Sm = 'sm',
    }
</script>

<script setup lang="ts">
import { computed, ref, useSlots } from 'vue';
import makeClasses from '@/helpers/makeClasses';

interface IProps {
    modelValue: string
    placeholder?: string
    size?: Sizes
    success?: boolean
    disabled?: boolean
    error?: string
    maxlength?: number | string
}

interface IEmits {
    (e: 'update:modelValue', value: string): void
}

const props = withDefaults(defineProps<IProps>(), {
    size: Sizes.Md
});
const emit = defineEmits<IEmits>();
const slots = useSlots();

const isFocus = ref(false);

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
const useClasses = makeClasses(() => {
    return {
        root: ({ isFilled, isFocus, hasError, success, disabled, size }) => {
            const states = {
                default: !hasError && !success && !isFocus && !disabled,
                defaultFocus: !hasError && !success && isFocus && !disabled,
                error: hasError && !isFocus && !disabled,
                errorFocus: hasError && isFocus && !disabled,
                success: success && !isFocus && !disabled,
                successFocus: success && isFocus && !disabled,
                disabled
            };

            return [
                'w-full rounded-[40px] shadow-[10px_10px_50px_3px_rgba(157,157,167,0.2)] border border-primary-200 relative transition-fast group',
                {
                    'border-primary-200 hover:border-primary-500 hover:shadow-[0_0_0_2px_rgba(103,71,232,.24)]': states.default,
                    'border-primary-500 shadow-[0_0_0_2px_rgba(103,71,232,.38)]': states.defaultFocus,
                    'border-[#BB4840] hover:shadow-[0_0_0_2px_rgba(187,72,64,0.24)]': states.error,
                    'border-[#BB4840] shadow-[0_0_0_2px_rgba(187,72,64,0.38)]': states.errorFocus,
                    'border-[#66AE44] hover:shadow-[0_0_0_2px_rgba(102,174,68,.24)]': states.success,
                    'border-[#66AE44] shadow-[0_0_0_2px_rgba(102,174,68,.38)]': states.successFocus,
                    'pointer-events-none border-[#E3E4E6]': states.disabled,

                    'h-[64px] md:h-[48px]': size === Sizes.Md,
                    'h-8': size === Sizes.Sm
                }
            ];
        },
        field: ({ isFilled }) => {
            return [
                'absolute inset-0 px-8 rounded-[40px] text-base md:text-tiny',
                {
                    'text-text-200 group-hover:text-text-400 ': !isFilled,
                    'text-text-400 text-base': isFilled,
                }
            ]
        },
        error: () => [
            'absolute left-0 top-full leading-none pt-2 text-sm text-[#BB4840] md:text-tiny'
        ],
        append: () => [
            'absolute right-7 top-1/2 -translate-y-1/2'
        ]
    };
});

const classes = computed((): ReturnType<typeof useClasses> => {
    return useClasses({
        isFocus: isFocus.value,
        hasError: !!props.error,
        success: props.success,
        size: props.size,
        disabled: props.disabled,
        isFilled: !!value.value
    });
});

function onFocus(): void {
    isFocus.value = true;
}

function onBlur(): void {
    isFocus.value = false;
}
</script>

<style scoped>

</style>
