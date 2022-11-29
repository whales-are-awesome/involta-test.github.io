<template>
    <div :class="classes.root">
        <div
            v-for="(item, index) in items"
            :key="index"
            :class="classes.item"
            @mouseenter="item.isHovered = true"
            @mouseleave="item.isHovered = false"
        >
            <div
                :class="[classes.itemInner, {
                    'border-b': index !== items.length - 1
                }]"
            >
                <div
                    :class="classes.itemMain"
                    @click="$router.push(`/${ item.network }/dao/${ item.address }`)"
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
                    <!--                                <SubDaoItemsPopup-->
                    <!--                                    v-if="item.isHovered"-->
                    <!--                                    :items="item.items"-->
                    <!--                                />-->
                </div>
                <div
                    v-if="false"
                    :class="classes.itemSublist"
                >
                    <SubDaoItemsPopup :items="items" />
                    <div
                        v-for="(subDao, subDaoIndex) in items"
                        :key="subDaoIndex"
                        :class="classes.itemSublistItem"
                        @click="$router.push(`/${ subDao.network }/dao/${ subDao.address }`)"
                    >
                        {{ subDao.fullName }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script lang="ts" setup>
/* IMPORTS */

import { computed } from 'vue';
import SubDaoItemsPopup from '@/components/SubDaoItemsPopup/SubDaoItemsPopup.vue';
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';
import makeClasses from '@/helpers/makeClasses';
import ThemeSettings from '@/models/themeSettings';
import { INormalizedSubDaoItemAsDefault } from '@/models/services/DaoFactoryService';

/* INTERFACES */

interface IProps {
    themeSettings?: ThemeSettings<'root'>
    items: INormalizedSubDaoItemAsDefault[]
}

interface IThemeProps extends Pick<IProps, 'themeSettings'>{

}



/* META */

const props = withDefaults(defineProps<IProps>(), {});

/* VARS AND CUSTOM HOOKS */

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
}));

/* DATA */
/* COMPUTED */

const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({
        themeSettings: props.themeSettings
    });
});

/* WATCH */
/* METHODS */
</script>
