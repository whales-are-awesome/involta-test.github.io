<template>
    <div :class="classes.root">
        <BaseIcon
            v-if="firstAngle"
            :class="classes.angle"
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
                <span
                    v-if="hash"
                    :class="classes.itemHash"
                >
                    #
                </span>
                    {{ item.title }}
                </ActionLink>
                <template v-else>
                    <span
                        v-if="hash"
                        :class="classes.itemHash"
                    >
                        #
                    </span>
                    <span :class="classes.itemTitle">
                        {{ item.title }}
                    </span>
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
    angle: 'mr-3 text-gray-400 flex-shrink-0',
    items: 'space-x-2 flex flex-shrink-0',
    item: ({ view }) => [
        'flex items-center',
        {
            '!font-normal': view === 'secondary',
            'text-xs': view === 'primary'
        }
    ],
    itemLink: 'transition-fast',
    itemAngle: 'pointer-events-none text-gray-400 ml-2 flex-shrink-0',
    itemHash: 'mr-2 inline-block text-gray-400 font-normal',
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
