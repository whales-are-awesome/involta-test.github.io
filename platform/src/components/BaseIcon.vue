<template>
    <SvgSprite
        class="transition-fast"
        :symbol="name"
        :size="size"
        @click="emit('click')"
    />
</template>

<script lang="ts">
import { Icons } from '@/models/icons';
</script>

<script setup lang="ts">
import {computed} from 'vue';
import { SvgSprite } from 'vue-svg-sprite';

interface Props {
    name: keyof typeof Icons
    width: number | string
    height?: number | string
}

const props = withDefaults(defineProps<Props>(), {
    width: '16'
})
const emit = defineEmits(['click']);

const size = computed(() => {
    return `${ +props.width } ${ (props.height && +props.height) || +props.width }`
});
</script>
