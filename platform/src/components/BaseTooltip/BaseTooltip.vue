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
/* IMPORTS */

import { computed } from 'vue';
import Popper from 'vue3-popper';
import makeClasses from '@/helpers/makeClasses';

/* INTERFACES */

interface IProps {
    hover?: boolean
    placement?: string
    content?: string
}

interface ThemeProps {
}

/* META */

const props = withDefaults(defineProps<IProps>(), {
    hover: true,
    placement: 'top'
});

/* VARS AND CUSTOM HOOKS */

const useClasses = makeClasses<ThemeProps>(() => ({
    root: () => []
}));

/* DATA */
/* COMPUTED */

const classes = computed((): ReturnType<typeof useClasses> => {
    return useClasses({
    });
});

/* WATCH */
/* METHODS */

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
