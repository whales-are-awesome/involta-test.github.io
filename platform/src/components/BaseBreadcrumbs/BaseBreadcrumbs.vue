<template>
    <div :class="classes.root">
        <BaseIcon
            v-if="firstAngle"
            :class="classes.chevron"
            width="5"
            height="9"
            name="chevron-right"
        />
        <div :class="classes.items">
            <div
                v-for="(item, index) in resultItems"
                :key="index"
                :class="classes.item"
            >
                <ActionLink
                    v-if="item.link"
                    :class="classes.itemLink"
                    :to="item.link"
                    :theme="view"
                >
                    <BaseIcon
                        v-if="hash"
                        :class="classes.itemHash"
                        name="hash"
                        width="12"
                    />
                    {{ item.title }}
                </ActionLink>
                <template v-else>
                    <BaseIcon
                        v-if="hash"
                        :class="classes.itemHash"
                        name="hash"
                        width="12"
                    />
                    <span
                        v-if="item.title"
                        :class="classes.itemTitle"
                    >
                        {{ item.title }}
                    </span>
                </template>
                <div
                    v-if="item.dots"
                    :class="classes.dots"
                >
                    ...
                </div>
                <BaseIcon
                    v-if="+index !== resultItems.length - 1"
                    :class="classes.itemChevron"
                    width="5"
                    height="9"
                    name="chevron-right"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
/* IMPORTS */

import {computed, defineProps} from 'vue';
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';
import ActionLink from '@/components/ActionLink/ActionLink.vue';
import {useStore} from '@/store';
import { IBreadcrumb, Views } from './types';
import makeClasses from '@/helpers/makeClasses';

/* INTERFACES */

interface IProps {
    items?: IBreadcrumb[]
    hash: boolean
    firstAngle: boolean
    view: Views
}

interface IThemeProps extends Pick<IProps, 'view'> {

}

/* META */

const props = withDefaults(defineProps<IProps>(), {
    hash: true,
    firstAngle: true,
    view : 'secondary'
});
const store = useStore();

/* VARS AND CUSTOM HOOKS */

const useClasses = makeClasses<IThemeProps>(() => ({
    root: 'flex items-center overflow-hidden',
    chevron: 'mr-2 text-gray-400 flex-shrink-0',
    items: 'space-x-2 flex flex-shrink-0',
    item: ({ view }) => [
        'flex items-center',
        {
            '!font-normal': view === 'secondary',
            'text-xs': view === 'primary'
        }
    ],
    itemLink: 'transition-fast inline-flex items-center',
    itemChevron: 'pointer-events-none text-gray-400 ml-[3px] flex-shrink-0',
    itemHash: 'mr-[6px] inline-block text-gray-400',
    dots: 'text-gray-400 leading-none self-start ml-2.5 mr-4',
    itemTitle: ({ view }) => [
        {
            'text-gray-400 font-medium': view === 'primary',
            'text-gray-500 font-semibold': view === 'secondary'
        }
    ]
}));

/* COMPUTED */

const items = computed(() => store.state.breadcrumbs.items);

const resultItems = computed(() => props.items || items.value);

const classes = computed((): ReturnType<typeof useClasses> => {
    return useClasses({
        view: props.view
    });
});
</script>
