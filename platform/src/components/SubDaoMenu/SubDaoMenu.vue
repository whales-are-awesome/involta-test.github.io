<template>
    <div :class="classes.root">
        <template
            v-for="(item, index) in items"
            :key="index"
        >
            <div
                :class="classes.item"
                @mouseenter="item.isHovered = true"
                @mouseleave="item.isHovered = false"
            >
                <div
                    :class="[classes.itemInner, {
                        'border-b': (totalItems !== 1) && (index !== items.length - 1) && !(index === 0 && totalItems !== items.length)
                    }]"
                >
                    <div
                        :class="classes.itemMain"
                        @click="$router.push(`/${ item.network || network }/dao/${ item.address }`)"
                    >
                        <p :class="classes.itemTitle">
                            {{ item.fullName }}
                        </p>
                        <BaseIcon
                            v-if="false"
                            :class="classes.itemIcon"
                            name="triangle-right"
                            width="6"
                            height="4.5"
                        />
                    </div>
                </div>
            </div>
            <div
                v-if="index === 0 && totalItems !== items.length"
                :class="classes.moreDaos"
                @click="emit('more-dao')"
            >
                <div :class="classes.moreDaosLine"></div>
                <div :class="classes.moreDaosLine"></div>
                <div :class="classes.moreDaosLine"></div>
                <div :class="classes.moreDaosLine"></div>
                <div :class="classes.moreDaosInner">
                    {{ totalItems - items.length }} more DAOs
                    <BaseIcon
                        :class="classes.moreDaosIcon"
                        name="more-dao-angle"
                        width="6"
                    />
                </div>
                <div :class="classes.moreDaosLine"></div>
                <div :class="classes.moreDaosLine"></div>
                <div :class="classes.moreDaosLine"></div>
                <div :class="classes.moreDaosLine"></div>
            </div>
        </template>
    </div>
</template>


<script lang="ts" setup>
import { computed } from 'vue';
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';
import makeClasses from '@/helpers/makeClasses';
import ThemeSettings from '@/types/themeSettings';
import { INormalizedSubDaoItemAsDefault, IDao } from '@/types/services/DaoService';


// META

interface IProps {
    themeSettings?: ThemeSettings<'root'>
    totalItems?: number
    network?: IDao['network']
    items: INormalizedSubDaoItemAsDefault[]
}

interface IEmits {
    (e: 'more-dao'): void
}

const props = withDefaults(defineProps<IProps>(), {});

const emit = defineEmits<IEmits>()


// CLASSES

interface IThemeProps extends Pick<IProps, 'themeSettings'>{}

const useClasses = makeClasses<IThemeProps>(() => ({
    root: ({ themeSettings }) => [themeSettings?.root,

    ],
    item: 'pl-2 pr-[11px] text-sm text-gray-500 cursor-pointer relative transition-fast hover:bg-secondary-200',
    itemInner: 'border-secondary-200 py-2',
    itemMain: 'flex justify-between items-center',
    itemTitle: 'pr-2 overflow-hidden overflow-ellipsis',
    itemIcon: 'text-gray-500 flex-shrink-0',
    itemSublist: 'pl-4 pt-2',
    itemSublistItem: 'py-2 border-b border-secondary-200 last:border-none overflow-hidden overflow-ellipsis',
    moreDaos: 'flex justify-center text-tiny font-semibold items-center space-x-[2px] px-2 cursor-pointer',
    moreDaosInner: 'bg-gray-500 rounded-[20px] text-gray-100 flex px-1.5 py-[2px] items-center',
    moreDaosIcon: 'ml-[3px] text-gray-300',
    moreDaosLine: 'bg-gray-300 rounded-[1px] first:flex-grow last:flex-grow h-px w-[2px]',
}));

const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({
        themeSettings: props.themeSettings
    });
});
</script>
