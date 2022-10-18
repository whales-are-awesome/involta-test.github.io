<template>
    <div
        ref="root"
        :class="classes.root"
    >
        <div :class="classes.inner">
            <div :class="classes.top">
                <div :class="classes.topInner">
                    <img
                        :class="classes.logo"
                        :src="require('@/assets/images/common/placeholder.jpeg')"
                        alt="OuterCircle"
                    >
                    <div :class="classes.topInfo">
                        <div :class="classes.name">
                            DAO Name
                        </div>
                        <div
                            :class="classes.more"
                        >
                            <div :class="classes.moreCircle"></div>
                            <div :class="classes.moreCircle"></div>
                            <div :class="classes.moreCircle"></div>
                        </div>
                    </div>
                </div>
            </div>
            <template v-if="true">
                <TextSeparator :class="classes.subDaoTitle">
                    subDao
                </TextSeparator>
                <div :class="classes.subDaoItems">
                    <div
                        v-for="(item, index) in subDao"
                        :key="index"
                        :class="classes.subDaoItem"
                        @mouseenter="item.isHovered = true"
                        @mouseleave="item.isHovered = false"
                    >
                        <div
                            :class="[classes.subDaoItemInner, {
                                'border-b': index !== subDao.length - 1
                            }]"
                        >
                            <div :class="classes.subDaoItemMain">
                                <p :class="classes.subDaoItemTitle">
                                    {{ item.name }}
                                </p>
                                <BaseIcon
                                    v-if="item.items.length"
                                    :class="classes.subDaoItemIcon"
                                    name="triangle-right"
                                    width="6"
                                    height="4.5"
                                />
                                <SubDaoItemsPopup
                                    v-if="item.isHovered"
                                    :items="item.items"
                                />
                            </div>
                            <div
                                v-if="item.items.length"
                                :class="classes.subDaoItemSublist"
                            >
                                <SubDaoItemsPopup :items="subDao.items" />
                                <div
                                    v-for="(subDao, subDaoIndex) in item.items"
                                    :key="subDaoIndex"
                                    :class="classes.subDaoItemSublistItem"
                                >
                                    {{ subDao.name }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    :class="classes.addSubDao"
                    @click="layer.open('CreateSubDaoLayer')"
                >
                    + Add New SubDAO
                </div>
            </template>
        </div>
    </div>
</template>


<script lang="ts" setup>
/* IMPORTS */

import { computed, ref, defineExpose } from 'vue';
import { useRoute } from 'vue-router';
import SubDaoItemsPopup from '@/components/SubDaoItemsPopup/SubDaoItemsPopup.vue';
import BaseIcon from '@/components/BaseIcon.vue';
import TextSeparator from '@/components/TextSeparator/TextSeparator.vue';
import {  } from './types';
import makeClasses from '@/helpers/makeClasses';
import useLayer from '@/helpers/hooks/useLayer';

/* META */

const route = useRoute();
const layer = useLayer();

/* VARS AND CUSTOM HOOKS */

const root = ref(null);
let subDao = ref([
    {
        name: 'subDao_1',
        id: 1,
        items: []
    },
    {
        name: 'subDao_2',
        id: 2,
        items: [
            { name: 'subDao_2_1', id: 6, items: [] },
            { name: 'subDao_2_2', id: 7, items: [] },
            { name: 'subDao_2_3', id: 8, items: [] },
        ]
    },
    {
        name: 'subDao_3',
        id: 10,
        items: []
    }
]);
subDao.value = subDao.value.map(item => ({
    ...item,
    isHovered: false
}));

const useClasses = makeClasses(() => ({
    root: ({ themeSettings }) => {
        return [themeSettings?.root, [
            'w-[224px]',
        ]];
    },
    inner: 'w-[224px] h-screen bg-surface-200 pb-2 fixed top-0 left-[72px]',
    top: 'w-full mx-auto mb-6 bg-black',
    topInner: 'pb-[100%] relative',
    logo: 'absolute h-full min-w-full top-0 left-1/2 -translate-x-1/2 z-0 opacity-70',
    topInfo: 'absolute left-0 bottom-0 px-2 pb-[10px] w-full flex justify-between items-center',
    name: 'text-surface-100 text-white font-semibold',
    more: 'bg-[rgba(212,212,214,0.2)] rounded-full w-6 h-6 flex items-center justify-center flex-col space-y-px',
    moreCircle: 'bg-white rounded-full w-[3px] h-[3px]',
    subDaoTitle: 'mb-5 mt-9',
    subDaoItems: 'mb-[20px]',
    subDaoItem: 'pl-2 pr-[11px] text-sm text-gray-500 cursor-pointer relative',
    subDaoItemInner: 'border-secondary-200 py-2',
    subDaoItemMain: 'flex justify-between items-center',
    subDaoItemTitle: 'pr-2',
    subDaoItemIcon: 'text-gray-500',
    subDaoItemSublist: 'pl-4 pt-2',
    subDaoItemSublistItem: 'py-2 border-b border-secondary-200 last:border-none',
    addSubDao: 'text-xs underline-offset-1 underline pl-2 font-bold text-gray-500 cursor-pointer'
}));

/* DATA */



/* COMPUTED */

const classes = computed((): ReturnType<typeof useClasses> => {
    return useClasses({

    });
});

/* WATCH */



/* METHODS */

defineExpose({
    root
})
</script>
