<template>
    <div @click="toHome">
        <BaseIcon
            :class="!isHome ? 'cursor-pointer' : ''"
            name="logo"
            width="96"
            height="32"
        />
    </div>
</template>


<script lang="ts" setup>
import { computed } from 'vue';
import {useRoute, useRouter} from 'vue-router';
import BaseIcon from '@/components/BaseIcon';

const router = useRouter();
const route = useRoute();
const isHome = computed(() => route.name === 'home');

function toHome() {
    if (isHome.value) return;

    router.push({ name: 'home' });
}
</script>

