<template>
    <div
        ref="root"
        :class="classes.root"
    >
        <div :class="classes.inner">
            <div v-if="currentDao.pending || subDaoItems.pending" class="-preloader -preloader_cover"></div>
            <div
                v-if="!currentDao.pending"
                :class="classes.top"
            >
                <TextSeparator :class="classes.topTextSeparator">
                    DAO WAY
                </TextSeparator>
                <div :class="classes.topMain">
                    <BaseImage
                        :class="classes.logo"
                        :src="currentDao.data?.image"
                        alt="OuterCircle"
                    />
                    <div :class="classes.topInfo">
                        <div :class="classes.name">
                            {{ currentDao.data?.fullName }}
                        </div>
                    </div>
                </div>
            </div>
            <SubDaoMenu
                v-if="rootDao.data"
                :class="classes.subDaoItems"
                :items="[rootDao.data]"
            />
            <template  v-if="!currentDao.pending && !subDaoItems.pending && subDaoItems.data?.items.length">
                <TextSeparator :class="classes.subDaoTitle">
                    subDaoS
                </TextSeparator>
                <SubDaoMenu
                    :class="classes.subDaoItems"
                    :items="subDaoItems.data?.items"
                />
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
import SubDaoMenu from '@/components/SubDaoMenu/SubDaoMenu.vue';
import TextSeparator from '@/components/TextSeparator/TextSeparator.vue';
import makeClasses from '@/helpers/makeClasses';
import useLayer from '@//composables/useLayer';
import { store } from '@/store';
import useSubDaoItems from '@/composables/fetch/useSubDaoItems';
import useDao from '@/composables/fetch/useDao';

/* INTERFACES */

/* META */

const layer = useLayer();

/* REFS */

const root = ref<HTMLElement | null>(null);

/* DATA */

const useClasses = makeClasses(() => ({
    root: 'w-[224px] sm:w-[220px] md:flex md:justify-center md:overflow-hidden',
    inner: 'w-[224px] h-screen bg-surface-200 pb-2 fixed top-0 left-[72px] md:w-full md:rounded-[12px] md:bg-surface-200 md:py-2.5 md:static md:mt-2 md:mx-2',
    top: 'w-full mx-auto mb-6 md:px-3',
    topMain: 'pb-[100%] relative bg-black overflow-hidden md:rounded-[4px]',
    topTextSeparator: 'mb-[22px] ml-2.5 hidden md:flex sm:text-xxs',
    logo: 'absolute h-full min-w-full top-0 left-1/2 -translate-x-1/2 z-0 opacity-70',
    topInfo: 'absolute left-0 bottom-0 px-2 pb-[10px] w-full flex justify-between items-center',
    name: 'text-surface-100 text-white font-semibold text-lg overflow-hidden overflow-ellipsis',
    subDaoTitle: 'mb-[13px] mt-9 sm:text-xxs',
    subDaoItems: 'mb-[20px]',
    addSubDao: 'text-xs underline-offset-1 underline pl-2 font-bold text-gray-500 cursor-pointer'
}));


/* COMPUTED */

const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({

    });
});

const currentDao = computed(() => store.state.dao);

const formRootDaoData = computed(() => ({
    address: currentDao.value.data?.rootDao
}));
const formDataSubDao = computed(() => ({
    parentAddress: currentDao.value.data?.address,
    limit: 20,
    offset: 0
}));

const subDaoItems = useSubDaoItems(formDataSubDao);
const rootDao = useDao(formRootDaoData);

/* WATCH */
/* METHODS */

defineExpose({
    root
})
</script>
