<template>
    <div
        :class="classes.root"
    >
        <input
            :class="classes.field"
            v-model="value"
            :placeholder="placeholder"
            type="text"
        >
        <BaseButton
            :class="classes.button"
            icon="search"
            icon-width="12"
            size
            rounded="full"
        />
    </div>
</template>


<script lang="ts" setup>
import { computed } from 'vue';
import makeClasses from '@/helpers/makeClasses';
import BaseButton from '@/components/BaseButton/BaseButton.vue';

interface IProps {
    modelValue: string
    placeholder?: string
}

interface IEmits {
    (e: 'update:modelValue', value: string): void
}

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();
const value = computed({
    get() {
        return props.modelValue;
    },
    set(value: string) {
        emit('update:modelValue', value)
    }
})
const useClasses = makeClasses(() => ({
    root: () => [
        `max-w-[344px] w-full h-[48px] bg-white shadow-[0_4px_8px_0_rgba(221, 224, 231, 0.4)]
         hover:shadow-[0_4px_8px_0_#DDE0E7] rounded-[30px] border border-surface-300 relative
         overflow-hidden transition-fast`
    ],
    field: () => [
        'absolute inset-0 bg-transparent pl-5 placeholder:text-300 text-sm font-semibold placeholder:font-normal'
    ],
    button: () => [
        'w-8 h-8 !absolute top-[8px] right-[8px]'
    ]
}));

const classes = computed((): ReturnType<typeof useClasses> => {
    return useClasses({
    });
});
</script>
