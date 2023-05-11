<template>
    <div
        ref="root"
        :class="classes.root"
    >
        <div
            ref="inner"
            :class="classes.inner"
        >
            <div :class="classes.content">
                <div v-if="currentDao.pending || subDaoItems.pending || isPendingParentDaos" class="-preloader"></div>
                <template v-if="currentDao.data">
                    <div :class="classes.top">
                        <div :class="classes.logoWrapper">
                            <BaseImage
                                :class="classes.logo"
                                :src="currentDao.data?.image"
                                alt="OuterCircle"
                            />
                            <NetworkIcon
                                :class="classes.networkIcon"
                                section="dao-sidebar"
                                :network="currentDao.data?.network"
                            />
                        </div>
                        <div :class="classes.topInfo">
                            <BaseButton
                                :class="classes.topInfoJoin"
                                theme="primary"
                                size="sm"
                                :loading="isFollowing"
                                :icon="{
                                    name: 'pin',
                                    width: 14,
                                    prepend: true
                                }"
                                @click="follow"
                            >
                                <span class="whitespace-nowrap">
                                    {{ currentDao.data?.isFollowed ? 'Unfollow DAO' : 'Follow DAO' }}
                                </span>
                            </BaseButton>
                        </div>
                    </div>
                    <template v-if="parentDaos.length">
                        <TextSeparator
                            :class="classes.parentDaoTitle"
                        >
                            PARENT DAOS
                        </TextSeparator>
                        <SubDaoMenu
                            :class="classes.parentDaoItems"
                            :total-items="currentDao.data?.path.length"
                            :items="parentDaos"
                            :network="currentDao.data?.network"
                            @more-dao="addParentDaos"
                        />
                    </template>
                    <template v-if="subDaoItems.data?.items.length">
                        <TextSeparator :class="classes.subDaoTitle">
                            current DAO
                        </TextSeparator>
                        <div :class="classes.subDaoItemsTitle">
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
                        @click="layer.open('CreateDaoLayer', { parentAddress: $route.params.address, network: $route.params.network })"
                    >
                        + Add New SubDAO
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>


<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { store } from '@/store';
import SubDaoMenu from '@/components/SubDaoMenu/SubDaoMenu.vue';
import TextSeparator from '@/components/TextSeparator/TextSeparator.vue';
import NetworkIcon from '@/components/NetworkIcon/NetworkIcon.vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import makeClasses from '@/helpers/makeClasses';
import followDao from '@/helpers/followDao';
import DaoService from '@/services/DaoService';
import useLayer from '@/composables/useLayer';
import useDaoSubDaoItems from '@/composables/fetch/useDaoSubDaoItems';
import { DEFAULT_LIMIT, DEFAILT_ADD_LIMIT, INormalizedDaoAsDefault } from './types';
import { NetworksType } from '@/types/networks';

// META

const route = useRoute();

const layer = useLayer();

const currentDao = computed(() => store.state.dao);


// CLASSES

const useClasses = makeClasses(() => ({
    root: 'w-[224px] no-scrollbar transition-main bg-surface-300 md:flex md:justify-center md:overflow-hidden sm:w-[180px]',
    inner: 'min-w-[224px] sm:min-w-[180px] p-2 pr-4 h-screen',
    content: 'w-full min-h-full relative overflow-hidden p-2 rounded-[18px] bg-surface-200',
    top: 'rounded-[20px] mb-9 md:px-3',
    topInfo: 'flex',
    topInfoJoin: 'flex-grow',
    logoWrapper: 'pb-[100%] relative bg-black overflow-hidden mb-3 rounded-[10px] md:rounded-[4px]',
    logo: 'absolute h-full min-w-full top-0 left-1/2 -translate-x-1/2 z-0 opacity-70',
    networkIcon: 'absolute right-0 top-0',
    parentDaoTitle: 'sm:text-xxs',
    parentDaoItems: 'mb-[24px]',
    subDaoTitle: 'mb-[20px] sm:text-xxs',
    subDaoItemsTitle: 'pl-2 text-sm font-semibold mb-2 text-gray-600',
    subDaoItems: 'mb-[20px] pl-4',
    addSubDao: 'text-xs underline-offset-1 underline pl-2 font-bold text-gray-500 cursor-pointer',
}));

const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({

    });
});


// FOLLOW

const isFollowing = ref(false);


async function follow() {
    isFollowing.value = true;

    const { address, network, isFollowed } = currentDao.value.data!;

    const [_, error] = await followDao(currentDao.value?.data?.name || '', address, network, layer.alert, isFollowed);

    isFollowing.value = false;
}


// PARENT DAO

const moreParentDaos = ref<INormalizedDaoAsDefault['path']>([]);

const isPendingParentDaos = ref(false);

const parentDaos = computed(() => {
    const items = currentDao.value.data?.path || [];

    return [...items, ...moreParentDaos.value].reverse()
});


async function addParentDaos() {
    const lastParentAddress = currentDao.value.data!.path.slice(-1)[0].address;

    isPendingParentDaos.value = true;

    const [data] = await DaoService.fetchDaoAsDefault({
        address: lastParentAddress,
        network: route.params.network as NetworksType
    });

    if (data) {
        moreParentDaos.value.push(...data.path);
    }

    isPendingParentDaos.value = false;
}


// SUBDAO DAO

const formDataSubDao = ref({
    limit: DEFAULT_LIMIT,
    offset: 0
});

const formDataSubDaoParams = computed(() => ({
    parentAddress: currentDao.value.data?.address,
    network: currentDao.value.data?.network,
    ...formDataSubDao.value
}));

const [subDaoItems] = useDaoSubDaoItems(formDataSubDaoParams);

watch(currentDao.value, (val) => {
    if (val.pending) {
        formDataSubDao.value.limit = DEFAULT_LIMIT;
    }
});


// ROOT

const root = ref<HTMLElement | null>(null);


// INNER

const inner = ref<HTMLElement | null>(null);


// DEFINE EXPOSE

defineExpose({
    root,
    inner
});
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}
</style>
