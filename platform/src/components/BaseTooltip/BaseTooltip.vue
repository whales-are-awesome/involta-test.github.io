<template>
    <Popper
        ref="root"
        :class="classes.root"
        :content="content"
        :hover="hover"
        :placement="placement"
        :show="isShown"
        @mouseenter="isShown = true"
        @mouseleave="isShown = false"
        @close="isShown = false"
    >
        <slot></slot>
        <template
            v-if="$slots.content"
            #content="{ close }"
        >
            <slot name="content" v-bind="{ close }"></slot>
        </template>
    </Popper>
</template>


<script lang="ts" setup>
import { computed, useSlots, ref, defineExpose } from 'vue';
import Popper from 'vue3-popper';
import makeClasses from '@/helpers/makeClasses';
import ThemeSettings from '@/types/themeSettings';


// META

interface IProps {
    hover?: boolean
    placement?: string
    content?: string
    themeSettings?: ThemeSettings<'root'>
}

const props = withDefaults(defineProps<IProps>(), {
    hover: true,
    placement: 'top'
});

const slots = useSlots();

const root = ref<InstanceType<typeof Popper> | null>(null);


// CLASSES

interface ThemeProps extends Pick<IProps, 'themeSettings'> {
    hasContent: boolean
}

const useClasses = makeClasses<ThemeProps>(() => ({
    root: ({ hasContent, themeSettings }) => [themeSettings?.root,
        'popper-root',
        {
            'no-style': hasContent
        }
    ]
}));

const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({
        hasContent: !!slots.content,
        themeSettings: props.themeSettings
    });
});


// SHOWN

const isShown = ref(false)

defineExpose({
    isShown
});
</script>

<style>
:root {
    --popper-theme-background-color: transparent;
    --popper-theme-background-color-hover: transparent;
    --popper-theme-text-color: currentColor;
    --popper-theme-border-width: 0px;
    --popper-theme-border-style: solid;
    --popper-theme-border-radius: initial;
    --popper-theme-padding: 0.25rem;
}
</style>
<style scoped>
.popper-root:not(.no-style) {
    :deep(.popper) {
        @apply bg-500 p-1 rounded-sm text-sm font-normal text-white ;
    }
}
</style>
