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
                    :to="item.link"
                    :theme="view"
                    :theme-settings="{
                        root: classes.itemLink
                    }"
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
import { computed } from 'vue';
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';
import ActionLink from '@/components/ActionLink/ActionLink.vue';
import { store } from '@/store';
import { IBreadcrumb, Views } from './types';
import makeClasses from '@/helpers/makeClasses';
import ThemeSettings from '@/types/themeSettings';


// META

interface IProps {
    items?: IBreadcrumb[]
    hash: boolean
    firstAngle: boolean
    view: Views
    themeSettings?: ThemeSettings<'root'>
}

const props = withDefaults(defineProps<IProps>(), {
    hash: true,
    firstAngle: true,
    view : 'secondary'
});


// CLASSES

interface IThemeProps extends Pick<IProps, 'view' | 'themeSettings'> {}

const useClasses = makeClasses<IThemeProps>(() => ({
    root: ({ themeSettings }) => [themeSettings?.root,
        'flex items-center overflow-hidden'
    ],
    chevron: 'mr-2 text-gray-400 flex-shrink-0 sm:scale-[.6] sm:mr-1',
    items: 'space-x-2 flex flex-shrink-0',
    item: ({ view }) => [
        'flex items-center',
        {
            'sm:text-xxs': view === 'secondary',
            'text-xs sm:text-tiny font-medium': view === 'primary'
        }
    ],
    itemLink: 'inline-flex items-center',
    itemChevron: ({ view }) => [
        'pointer-events-none text-gray-400 flex-shrink-0 sm:scale-[.6]',
        {
            'ml-2': view === 'primary',
            'ml-[3px]': view === 'secondary'
        }
    ],
    itemHash: 'mr-[6px] inline-block text-gray-400',
    dots: 'text-gray-400 leading-none self-start ml-2.5 mr-4',
    itemTitle: ({ view }) => [
        {
            'text-gray-400 font-medium': view === 'primary',
            'text-gray-500 font-semibold': view === 'secondary'
        }
    ]
}));

const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({
        view: props.view,
        themeSettings: props.themeSettings
    });
});


// ITEMS

const items = computed(() => store.state.breadcrumbs.items);

const resultItems = computed(() => props.items || items.value);
</script>
