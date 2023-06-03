<template>
    <v-lazy-image
        v-if="show"
        :class="classes.root"
        :src-placeholder="require('@/assets/images/common/placeholder.jpg')"
        v-bind="attrs"
        :src="attrs.src || ''"
    />
    <div
        v-else
        :class="classes.placeholder"
        v-bind="attrs"
    >
    </div>
</template>

<script lang="ts">
export default {
    inheritAttrs: false
}
</script>

<script lang="ts" setup>
import { useAttrs, computed, ref, onMounted } from 'vue';
//@ts-ignore
import { until } from '@vueuse/core';
import VLazyImage from 'v-lazy-image';
import makeClasses from '@/helpers/makeClasses';
import wait from '@/helpers/wait';
import ThemeSettings from '@/types/themeSettings';


// META

interface IProps {
    themeSettings?: ThemeSettings<'root'>
}

const props = withDefaults(defineProps<IProps>(), {});

const attrs = useAttrs();


// CLASSES


interface IThemeProps extends Pick<IProps, 'themeSettings'>{
}

const useClasses = makeClasses<IThemeProps>(() => ({
    root: ({ themeSettings }) => [themeSettings?.root,

    ],
    placeholder: 'opacity-0'
}));

const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({
        themeSettings: props.themeSettings
    });
});


// SHOW

const show = ref(false);

onMounted(async () => {
    await wait(() => document.readyState === 'complete');
    show.value = true;
});
</script>
