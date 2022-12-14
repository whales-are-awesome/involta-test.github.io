<template>
    <div
        ref="root"
        :class="classes.root"
    >
        <div :class="classes.inner">
            <div :class="classes.content">
                <div v-if="currentDao.pending || subDaoItems.pending || isPendingParentDaos" class="-preloader"></div>
                <template v-if="currentDao.data && subDaoItems.data">
                    <div :class="classes.top">
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
                                :loading="isFollowing"
                                @click="followDao"
                            >
                                Follow DAO
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
import { computed, ref, defineExpose, watch } from 'vue';
import { useRoute } from 'vue-router';
import SubDaoMenu from '@/components/SubDaoMenu/SubDaoMenu.vue';
import TextSeparator from '@/components/TextSeparator/TextSeparator.vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import makeClasses from '@/helpers/makeClasses';
import sign from '@/helpers/sign';
import DaoFactoryService from '@/services/DaoFactoryService';
import useLayer from '@/composables/useLayer';
import { store } from '@/store';
import useSubDaoItems from '@/composables/fetch/useSubDaoItems';
import { DEFAULT_LIMIT, DEFAILT_ADD_LIMIT, INormalizedDaoAsDefault } from './types';

// META

const route = useRoute();

const layer = useLayer();

const currentDao = computed(() => store.state.dao);


// CLASSES

const useClasses = makeClasses(() => ({
    root: 'w-[224px] sm:w-[180px] md:flex md:justify-center md:overflow-hidden',
    inner: 'inner w-[224px] h-screen overflow-auto [scrollbar-width:none] fixed top-0 left-[72px] p-2 pr-4 md:w-full md:static',
    content: 'w-full min-h-full relative overflow-hidden p-2 rounded-[18px] bg-surface-200',
    top: 'rounded-[20px] mb-9 md:px-3',
    topInfo: 'flex',
    topInfoJoin: 'flex-grow mr-2',
    logoWrapper: 'pb-[100%] relative bg-black overflow-hidden mb-3 rounded-[10px] md:rounded-[4px]',
    logo: 'absolute h-full min-w-full top-0 left-1/2 -translate-x-1/2 z-0 opacity-70',
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


async function followDao() {
    isFollowing.value = true;

    const { address, network } = currentDao.value.data!;
    const [signInfo, err] = await sign('Hello World');

    if (err) {
        isFollowing.value = false;

        return;
    }

    const [response, error] = await DaoFactoryService.followDao(
    {
            address,
            network
        },
        {
            account: store.state.wallet.address as string
        },
    {
            headers: {
                'Auth-Hash': signInfo!.hash,
                'Auth-Signature': signInfo!.sign
            }
        }
    );

    if (error) {
        layer.alert({
            title: 'Warning message!',
            text: 'Something go wrong',
            buttonText: 'OK',
            status: 'error'
        })
    }

    isFollowing.value = false;
}

async function leaveDao() {
    const isLeave = layer.confirm({
        title: 'Leave DAO?',
        message: 'All tokens, followerships of DAO and its SubDAOs will be lost.',
        theme: 'alert',
        acceptButtonCaption: 'Leave',
        declineButtonCaption: 'Cancel',
    });

    if (!isLeave) {
        return;
    }

    isFollowing.value = true;

    const { address, network } = currentDao.value.data!;

    const [response, error] = await DaoFactoryService.followDao({
        address,
        network
    }, {
        headers: {
            account_address: store.state.wallet.address as string
        }
    });

    if (error) {
        layer.alert({
            title: 'Warning message!',
            text: 'Something go wrong',
            buttonText: 'OK',
            status: 'error'
        })
    }

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

    const [data] = await DaoFactoryService.fetchDaoAsDefault({
        address: lastParentAddress,
        network: route.params.network as string
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

const [subDaoItems] = useSubDaoItems(formDataSubDaoParams);

watch(currentDao.value, (val) => {
    if (val.pending) {
        formDataSubDao.value.limit = DEFAULT_LIMIT;
    }
});


// ROOT

const root = ref<HTMLElement | null>(null);

defineExpose({
    root
});
</script>

<style scoped>
.inner::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}
</style>
