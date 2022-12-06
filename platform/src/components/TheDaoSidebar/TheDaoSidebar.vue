<template>
    <div
        ref="root"
        :class="classes.root"
    >
        <div :class="classes.inner">
            <div :class="classes.content">
                <div v-if="currentDao.pending || subDaoItems.pending || rootDao.pending || parentDao.pending" class="-preloader -preloader_cover"></div>
                <template v-else>
                    <div :class="classes.top">
                        <TextSeparator :class="classes.currentDaoTitle">
                            {{ currentDao.data?.fullName }}
                        </TextSeparator>
                        <div :class="classes.logoWrapper">
                            <img
                                :class="classes.logo"
                                :src="currentDao.data?.image"
                                alt="OuterCircle"
                            />
                        </div>
                        <div :class="classes.topInfo">
                            <BaseButton
                                :class="classes.topInfoJoin"
                                theme="primary-400"
                                size="sm"
                            >
                                Join DAO
                            </BaseButton>
                            <BaseTooltip content="Pin to favourite">
                                <BaseButton
                                    theme=""
                                    view=""
                                    size=""
                                    :theme-settings="{
                                        root: 'text-primary-300 hover:text-primary-400 w-[32px] h-[32px]',
                                        bg: 'border border-primary-400 bg-primary-400 bg-opacity-20 group-hover:bg-opacity-40',
                                        container: ''
                                    }"
                                    :icon="{
                                        name: 'pin',
                                        width: 14
                                    }"
                                />
                            </BaseTooltip>
                        </div>
                    </div>
                    <TextSeparator :class="classes.subDaoTitle">
                        PARENT DAOS
                    </TextSeparator>
                    <SubDaoMenu
                        :class="classes.subDaoItems"
                        :total-items="currentDao.data?.path.length"
                        :items="currentDao.data?.path.reverse()"
                    />
                    <template v-if="subDaoItems.data?.items.length">
                        <TextSeparator :class="classes.subDaoTitle">
                            current DAO
                        </TextSeparator>
                        <div :class="classes.subDaoDaoTitle">
                            {{ currentDao.data?.fullName }}
                        </div>
                        <SubDaoMenu
                            :class="classes.subDaoItems"
                            :total-items="subDaoItems.data?.total"
                            :items="subDaoItems.data?.items"
                            @more-dao="formDataSubDao.limit = formDataSubDao.limit + DEFAILT_ADD_LIMIT"
                        />
                    </template>
                    <div
                        :class="classes.addSubDao"
                        @click="layer.open('CreateSubDaoLayer')"
                    >
                        + Add New SubDAO
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>


<script lang="ts" setup>
/* IMPORTS */

import { computed, ref, defineExpose, watch } from 'vue';
import SubDaoMenu from '@/components/SubDaoMenu/SubDaoMenu.vue';
import TextSeparator from '@/components/TextSeparator/TextSeparator.vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import BaseTooltip from '@/components/BaseTooltip/BaseTooltip.vue';
import makeClasses from '@/helpers/makeClasses';
import useLayer from '@//composables/useLayer';
import { store } from '@/store';
import useSubDaoItems from '@/composables/fetch/useSubDaoItems';
import useDao from '@/composables/fetch/useDao';
import { DEFAULT_LIMIT, DEFAILT_ADD_LIMIT } from './types';

/* INTERFACES */

/* META */

const layer = useLayer();

/* REFS */

const root = ref<HTMLElement | null>(null);

/* DATA */

const useClasses = makeClasses(() => ({
    root: 'w-[224px] sm:w-[220px] md:flex md:justify-center md:overflow-hidden',
    inner: 'w-[224px] h-screen bg-surface-200 fixed top-0 left-[72px] p-2 pb-0 md:w-full md:static',
    content: 'w-full pb-2 rounded-[12px]',
    top: 'bg-surface-300 rounded-[20px] p-2 pb-4 mb-6 md:px-3',
    topInfo: 'flex',
    topInfoJoin: 'flex-grow mr-2',
    currentDaoTitle: 'mb-[12px] ml-2 sm:text-xxs',
    logoWrapper: 'pb-[100%] relative bg-black overflow-hidden mb-3 rounded-[16px] md:rounded-[4px]',
    logo: 'absolute h-full min-w-full top-0 left-1/2 -translate-x-1/2 z-0 opacity-70',
    subDaoTitle: 'mb-[13px] mt-9 sm:text-xxs',
    subDaoItems: 'mb-[20px]',
    addSubDao: 'text-xs underline-offset-1 underline pl-2 font-bold text-gray-500 cursor-pointer',
    subDaoDaoTitle: 'text-sm font-semibold mb-2 text-gray-600'
}));

const formDataSubDao = ref({
    limit: DEFAULT_LIMIT,
    offset: 0
});


/* COMPUTED */

const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({

    });
});

const currentDao = computed(() => store.state.dao);

const formRootDaoData = computed(() => ({ address: currentDao.value.data?.rootDao }));
const formParentDaoData = computed(() => ({ address: currentDao.value.data?.parentDao }));
const formDataSubDaoParams = computed(() => ({
    parentAddress: currentDao.value.data?.address,
    ...formDataSubDao.value
}));

const subDaoItems = useSubDaoItems(formDataSubDaoParams);
const parentDao = useDao(formParentDaoData);
const rootDao = useDao(formRootDaoData);

/* WATCH */

watch(currentDao.value, (val) => {
    if (val.pending) {
        return;
    }

    formDataSubDao.value.limit = DEFAULT_LIMIT;
});

/* METHODS */

defineExpose({
    root
})
</script>
