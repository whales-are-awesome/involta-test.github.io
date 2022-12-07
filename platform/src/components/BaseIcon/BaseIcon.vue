<template>
    <SvgSprite
        class="transition-fast"
        :symbol="name"
        :size="size"
        @click="emit('click')"
    />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { SvgSprite } from 'vue-svg-sprite';
import { Icons } from './types';

// META

export interface IProps {
    name: Icons
    width: number | string
    height?: number | string
}

const props = withDefaults(defineProps<IProps>(), {
    width: 16
});

const emit = defineEmits(['click']);


// SIZE

const size = computed(() => `${ +props.width } ${ (props.height && +props.height) || +props.width }`);
</script>
