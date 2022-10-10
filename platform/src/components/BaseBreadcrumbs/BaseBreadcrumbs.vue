<template>
    <div :class="classes.root">
        <BaseIcon
            :class="classes.angle"
            width="5"
            height="9"
            name="chevron-right"
        />
        <div :class="classes.items">
            <div
                v-for="(item, index) in resultItems"
                :key="index"
                :class="[item.link ? 'text-gray-400' : 'text-gray-500 font-semibold', classes.item]"
            >
                <RouterLink
                    v-if="item.link"
                    :class="classes.itemLink"
                    :to="item.link"
                >
                <span :class="classes.itemHash">
                    #
                </span>
                    {{ item.title }}
                </RouterLink>
                <template v-else>
                <span :class="classes.itemHash">
                    #
                </span>
                    {{ item.title }}
                </template>
                <BaseIcon
                    v-if="+index !== resultItems.length - 1"
                    :class="classes.itemAngle"
                    width="5"
                    height="9"
                    name="chevron-right"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {computed, defineProps} from 'vue';
import BaseIcon from '@/components/BaseIcon';
import {useStore} from '@/store';
import { IBreadcrumb } from './types';
import makeClasses from '@/helpers/makeClasses';

interface IProps {
    items?: IBreadcrumb[]
}

const props = defineProps<IProps>();
const store = useStore();

const useClasses = makeClasses(() => ({
    root: 'flex items-center',
    angle: 'mr-3 text-gray-400',
    items: 'space-x-2 flex',
    item: 'flex items-center hover:text-gray-500',
    itemLink: 'border-b border-transparent transition-fast',
    itemAngle: 'pointer-events-none ml-2 flex-shrink-0',
    itemHash: 'mr-2 inline-block text-gray-400 font-normal'
}));

const items = computed(() => store.state.breadcrumbs.items);

const resultItems = computed(() => props.items || items.value);

const classes = computed((): ReturnType<typeof useClasses> => {
    return useClasses({

    });
});
</script>
