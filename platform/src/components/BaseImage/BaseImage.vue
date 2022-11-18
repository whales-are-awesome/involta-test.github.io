<template>
    <v-lazy-image
        v-if="show"
        :src-placeholder="require('@/assets/images/common/image-placeholder.jpg')"
        v-bind="attrs"
    />
</template>


<script lang="ts" setup>
/* IMPORTS */

import { useAttrs, computed, ref, onMounted } from 'vue';
//@ts-ignore
import { until } from '@vueuse/core';
import VLazyImage from 'v-lazy-image';
import makeClasses from '@/helpers/makeClasses';
import IThemeSettings from '@/models/themeSettings';

/* INTERFACES */

interface IProps {
    themeSettings?: IThemeSettings<'root'>
}


interface IThemeProps extends Pick<IProps, 'themeSettings'>{

}

/* META */

const props = withDefaults(defineProps<IProps>(), {});
const attrs = useAttrs();
// const emit = defineEmits<IEmits>();

/* VARS AND CUSTOM HOOKS */

const useClasses = makeClasses<IThemeProps>(() => ({
    root: ({ themeSettings }) => [themeSettings?.root,

    ]
}));

/* DATA */

const show = ref(false);

/* COMPUTED */

const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({
        themeSettings: props.themeSettings
    });
});

/* WATCH */
/* METHODS */

onMounted(async () => {
    await until(() => document.readyState === 'complete')
        .toBe(true);
    show.value = true;
});
</script>

<style>
.v-lazy-image {
    filter: blur(4px);
    transition: filter 0.4s;
    will-change: filter;
}

.v-lazy-image-loaded {
    filter: blur(0);
}
</style>
