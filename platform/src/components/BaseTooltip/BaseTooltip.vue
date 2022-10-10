<template>
    <Popper
        :class="classes.root"
        :content="content"
        :hover="hover"
        :placement="placement"
    >
        <slot></slot>
    </Popper>
</template>


<script lang="ts" setup>
import { computed } from 'vue';
import Popper from 'vue3-popper';
import makeClasses from '@/helpers/makeClasses';

interface IProps {
    hover?: boolean
    placement?: string
    content?: string
}

interface IEmits {
    (e: 'update:modelValue', value: string): void
}

interface ThemeProps {
}

const props = withDefaults(defineProps<IProps>(), {
    hover: true,
    placement: 'top'
});
const emit = defineEmits<IEmits>();

const useClasses = makeClasses<ThemeProps>(() => ({
    root: () => []
}));

const classes = computed((): ReturnType<typeof useClasses> => {
    return useClasses({
    });
});
</script>

<style>
:root {
    --popper-theme-background-color: theme('colors.500');
    --popper-theme-background-color-hover: theme('colors.500');
    --popper-theme-text-color: #ffffff;
    --popper-theme-border-width: 0px;
    --popper-theme-border-style: solid;
    --popper-theme-border-radius: 6px;
    --popper-theme-padding: 0.25rem;
}
</style>
<style scoped>
:deep(.popper) {
    @apply bg-500 p-1 rounded-sm text-sm font-normal;
    background: theme('colors.500');
    color: #fff;
}
</style>
