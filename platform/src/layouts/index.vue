<template>
    <Component
        :is="currentLayout"
        :key="currentLayout"
    >
        <slot></slot>
    </Component>
</template>

<script setup langs="ts">
import DefaultLayout from './default';

import { computed } from 'vue';
import { useRoute } from 'vue-router'

const currentLayout = computed(() => {
    const name = (useRoute()).meta.layout || 'default';
    const componentName = name[0].toUpperCase() + name.slice(1) + 'Layout';
    const components = {
        DefaultLayout
    };

    return components[componentName];
});
</script>
