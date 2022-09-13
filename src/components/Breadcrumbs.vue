<template>
    <div class="space-x-2 flex">
        <div
            v-for="(item, index) in resultItems"
            :key="index"
            class="flex items-center text-xs"
            :class="[item.link ? 'text-text-200' : 'text-text-600 font-bold']"
        >
            <RouterLink
                v-if="item.link"
                class="border-b border-transparent hover:border-current transition-fast"
                :to="item.link"
            >
                {{ item.title }}
            </RouterLink>
            <template v-else>
                {{ item.title }}
            </template>
            <BaseIcon
                v-if="+index !== resultItems.length - 1"
                class="pointer-events-none ml-2 flex-shrink-0"
                width="7"
                name="arrow-right"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import {computed, defineProps} from 'vue';
import {useStore} from '@/store';
import {IBreadcrumb} from '@/models/components/breadcrumbs';
import BaseIcon from '@/components/BaseIcon';

interface IProps {
    items?: IBreadcrumb[]
}

const props = defineProps<IProps>();

const store = useStore();
const items = computed(() => store.state.breadcrumbs.items);

const resultItems = computed(() => props.items || items.value);
</script>
