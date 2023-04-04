<template>
    <DaoPageHeader
        v-if="pageData"
        class="mb-[33px]"
        :name="pageData?.name"
        :breadcrumbs="breadcrumbs"
        :followers-amount="pageData?.followersAmountFormatted"
        :description="pageData?.description"
    />
    <div v-else class="-preloader -preloader_placeholder"></div>
    <div v-if="pageData">
        <TagsList
            v-model="tagListValue"
            class="pt-[10px] mb-8 pl-[20px]"
            :items="tagListOptions"
            size="sm"
        />
        <div class="p-4 bg-surface-200 rounded-[10px] relative">
            <div
                v-if="tagListValue !== Sections.Treasury"
                class="flex -mx-2 -mt-2.5 relative mb-[30px] sm:flex-wrap"
            >
<!--                <div-->
<!--                    v-if="tagListValue === Sections.Proposals"-->
<!--                    class="px-2 mt-2.5 flex-shrink-0 sm:order-[-2] md:px-1.5 sm:px-[5px] sm:w-1/2"-->
<!--                >-->
<!--                    <SelectField-->
<!--                        v-model="formData.value.statusId"-->
<!--                        :options="formProposalsInfo.statusesOptions"-->
<!--                        :theme-settings="{-->
<!--                            height: (isMobile.xl || isMobile.lg) ? 'h-[44px]' : 'h-[28px]'-->
<!--                        }"-->
<!--                    />-->
<!--                </div>-->
<!--                <div-->
<!--                    v-if="tagListValue === Sections.Daos"-->
<!--                    class="px-2 mt-2.5 flex-shrink-0 sm:order-[-2] md:px-1.5 sm:px-[5px] sm:w-1/2"-->
<!--                >-->
<!--                    <SelectField-->
<!--                        v-model="formData.value.chainId"-->
<!--                        :options="formDaosInfo.chainOptions"-->
<!--                        :theme-settings="{-->
<!--                            height: (isMobile.xl || isMobile.lg) ? 'h-[44px]' : 'h-[28px]'-->
<!--                        }"-->
<!--                    />-->
<!--                </div>-->
<!--                <div-->
<!--                    v-if="tagListValue === Sections.Apps"-->
<!--                    class="px-2 mt-2.5 flex-shrink-0 sm:order-[-2] md:px-1.5 sm:px-[5px] sm:w-1/2"-->
<!--                >-->
<!--                    <SelectField-->
<!--                        v-model="formData.value.categoryId"-->
<!--                        :options="formAppsInfo.categoryOptions"-->
<!--                        :theme-settings="{-->
<!--                            height: (isMobile.xl || isMobile.lg) ? 'h-[44px]' : 'h-[28px]'-->
<!--                        }"-->
<!--                    />-->
<!--                </div>-->
<!--                <div-->
<!--                    v-if="tagListValue === Sections.Proposals"-->
<!--                    class="px-2 mt-2.5 flex-shrink-0 md:px-1.5 sm:px-[5px]"-->
<!--                >-->
<!--                    <TagsButtonList-->
<!--                        class="h-full sm:h-[28px]"-->
<!--                        v-model="formData.value.voteId"-->
<!--                        :items="formProposalsInfo.voteOptions"-->
<!--                    />-->
<!--                </div>-->
<!--                <div-->
<!--                    v-if="tagListValue === Sections.Daos"-->
<!--                    class="px-2 mt-2.5 flex-shrink-0 md:px-1.5 sm:px-[5px]"-->
<!--                >-->
<!--                    <TagsButtonList-->
<!--                        class="h-full sm:h-[28px]"-->
<!--                        v-model="formData.value.daosId"-->
<!--                        :items="formDaosInfo.daosOptions"-->
<!--                    />-->
<!--                </div>-->
                <div class="!ml-auto"></div>
<!--                <BaseSearch-->
<!--                    v-if="tagListValue !== Sections.Statistics"-->
<!--                    class="mx-2 mt-2.5 max-w-[414px] w-full z-[5] sm:max-w-[92px] md:mx-1.5 sm:mx-[5px]"-->
<!--                    v-model="formData.value.search"-->
<!--                />-->
                <div
                    v-if="createButton"
                    class="px-2 mt-2.5 flex-shrink-0 sm:order-[-1] sm:w-1/2 md:px-1.5 sm:px-[5px]"
                >
                    <BaseButton
                        class="w-full h-[44px]"
                        :class="(isMobile.xl || isMobile.lg) && '!h-ful'"
                        theme="primary"
                        :icon="{
                            name: 'plus',
                            width: (isMobile.xl || isMobile.lg) ? 14 : 8,
                            prepend: true
                        }"
                        :size="(isMobile.xl || isMobile.lg) ? 'md' : 'sm'"
                        @click="createButton.onClick"
                    >
                    <span class="whitespace-nowrap">
                        {{ createButton.text }}
                    </span>
                    </BaseButton>
                </div>
            </div
            >
            <div v-if="tagListValue === Sections.Proposals">
                <TextSeparator
                    v-if="proposalItems.data?.items.length"
                    class="mb-[10px]"
                >
                    {{ proposalItems.data?.total }} active proposal{{ proposalItems.data?.total > 1 ? 's' : '' }}
                </TextSeparator>
                <div
                    class="space-y-[18px]"
                    :class="{
                        '-preloader -preloader_cover': proposalItems.pending
                    }"
                    v-scroll-at.bottom="addMoreProposals"
                >
                    <template v-if="proposalItems.data?.items.length">
                        <ProposalCard
                            v-for="item in proposalItems.data?.items"
                            :key="item.id"
                            :to="{ name: 'network-dao-address-proposal-id', params: { ...$route.params, proposalId: item.id  } }"
                            :avatar="pageData?.image"
                            :name="pageData?.name"
                            :label-title="item.statusName"
                            :status="item.status"
                            :title="item.name"
                            :text="item.description"
                            :has-voting-power="!!pageData.votingPower"
                            :users="[{ id: 1, avatar: require('@/assets/images/common/placeholder.jpg') }, { id: 2, avatar: require('@/assets/images/common/placeholder.jpg') }, { id: 3, avatar: require('@/assets/images/common/placeholder.jpg') } ]"
                            :end-date="new Date(item.endTime)"
                        />
                    </template>
                    <div v-else-if="proposalItems.pending" class="-preloader -preloader_placeholder"></div>
                    <NotFound
                        v-else
                        class="!my-[88px]"
                        title="No Proposals found"
                        text="We couldn't find any proposals matching your query. Try another query"
                    />
                </div>
            </div>
            <div v-if="tagListValue === Sections.Daos">
                <TextSeparator
                    v-if="daoItems.data?.total"
                    class="mb-[10px]"
                >
                    {{ daoItems.data?.total }} SubDAO{{ daoItems.data?.total > 1 ? 's' : '' }}
                </TextSeparator>
                <div
                    v-if="daoItemsFiltered.length"
                    class="flex flex-wrap -mx-3 -mt-6 sm:-mx-[9px]"
                    :class="{
                        '-preloader -preloader_cover before:top-6': daoItems.pending
                    }"
                    v-scroll-at.bottom="addMoreDao"
                >
                    <div
                        class="w-1/4 px-3 mt-6 md:w-1/3 sm:w-1/2 sm:px-[9px]"
                        v-for="item in daoItemsFiltered"
                        :key="item"
                    >
                        <DaoCard
                            class="h-full"
                            :avatar="item.image"
                            :to="{ name: 'network-dao-address', params: { network: item.network, address: item.address } }"
                            :name="item.fullName"
                            :network="item.network"
                            :is-followed="item.isFollowed"
                            :address="item.address"
                            :followers-amount="item.followersAmount"
                            proposals="232"
                        />
                    </div>
                </div>
                <div v-else-if="daoItems.pending" class="-preloader -preloader_placeholder"></div>
                <NotFound
                    v-else
                    class="!mt-[88px]"
                    title="No Daos found"
                    text="We couldn't find any Daos matching your query. Try another query"
                />
            </div>
            <div v-if="tagListValue === Sections.Apps">
                <div class="absolute inset-0 z-50 bg-white bg-opacity-70 flex justify-center items-center">
                    <div class="title-h2 text-400">
                        WORK IN PROGRESS
                    </div>
                </div>
                <TextSeparator
                    v-if="proposalItems.data?.items.length"
                    class="mb-[10px]"
                >
                    {{ proposalItems.data?.total }} APPs
                </TextSeparator>
                <div class="flex flex-wrap -mx-3 -mt-6 mb-8">
                    <div
                        class="w-1/4 px-3 mt-6 md:w-1/3"
                        v-for="item in 12"
                        :key="item"
                    >
                        <DaoCard
                            class="h-full"
                            :avatar="require('@/assets/images/common/placeholder.jpg')"
                            :to="{ name: 'app' }"
                            name="DAO Name"
                            followers-amount="232"
                            proposals="232"
                            category="category"
                        />
                    </div>
                </div>
            </div>
            <div v-if="tagListValue === Sections.Treasury">
                <div class="flex font-medium uppercase text-xxs text-gray-400 mb-4 pl-4">
                    <div class="w-[200px]">
                        Asset
                    </div>
                    <div class="w-[200px] pr-2">
                        Price
                    </div>
                    <div class="w-[200px] pr-2">
                        Balance
                    </div>
                    <div class="w-[200px] pr-2">
                        Value
                    </div>
                </div>
                <div
                    v-for="(item, key) in treasures"
                    :key="key"
                    class="flex items-center text-sm bg-white shadow-[0_4px_20px_rgba(108,108,125,.08)] border border-gray-100 rounded-[10px] p-4 sm:pb-0 overflow-hidden"
                >
                    <div class="w-[200px] flex items-center">
                        <BaseIcon
                            class="flex-shrink-0 mr-2"
                            :name="item.icon"
                            width="30"
                        />
                        {{ item.title }}
                    </div>
                    <div class="w-[200px] pr-2">
                        {{ item.price }} $
                    </div>
                    <div class="w-[200px] pr-2">
                        {{ item.balance }} ETH
                    </div>
                    <div class="w-[200px] pr-2">
                        {{ item.price * item.balance }} $
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="-preloader -preloader_placeholder"></div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref, watch, watchEffect } from 'vue';
import { useTitle } from '@vueuse/core'
import { getEthPriceNow } from 'get-eth-price';
import { useRoute } from 'vue-router';

import TagsList from '@/components/TagsList/TagsList.vue';
import TagsButtonList from '@/components/TagsButtonList/TagsButtonList.vue';
import ProposalCard from '@/components/ProposalCard/ProposalCard.vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import TextSeparator from '@/components/TextSeparator/TextSeparator.vue';
import DaoPageHeader from '@/components/DaoPageHeader/DaoPageHeader.vue';
import SelectField from '@/components/Form/SelectField/SelectField.vue';
import NotFound from '@/components/NotFound/NotFound.vue';
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';
import DaoCard from '@/components/DaoCard/DaoCard.vue';
import { IBreadcrumb } from '@/components/BaseBreadcrumbs/types';

import useLayer from '@/composables/useLayer';
import useError from '@/composables/useError';
import useDao from '@/composables/fetch/useDao';
import useProposalItems from '@/composables/fetch/useProposalItems'
import useDaoItems from '@/composables/fetch/useDaoItems';

import emitter from '@/plugins/mitt';

import { Statuses } from '@/types/statuses';
import API from '@/helpers/api';

import getQueryParam from '@/helpers/getQueryParam';
import useQueryUpdates from '@/composables/useQueryUpdates';
import useIsMobile from '@/composables/useIsMobile';
import followDao from '@/helpers/followDao';
import DaoService from '@/services/DaoService';



// META

const { alert, open } = useLayer();

const route = useRoute();
const { query } = route;

const isMobile = useIsMobile();


// TAG LIST _ COMMON

enum Sections {
    Proposals = 'proposals' as any,
    Statistics = 'statistics' as any,
    Daos = 'daos' as any,
    Apps = 'apps' as any,
    Treasury = 'treasury' as any,
}

const tagListOptions = [
    { id: Sections.Proposals, title: 'Proposals' },
    // { id: Sections.Statistics, title: 'Statistics' },
    // { id: Sections.Daos, title: 'SubDAOs' },
    { id: Sections.Apps, title: 'APPs' },
    { id: Sections.Treasury, title: 'Treasury' },
    { title: 'Followers', to: { name: 'network-dao-address-followers', params: route.params  } },
];

const tagListValue = ref(getQueryParam<Sections>(query.section, tagListOptions));

const tagListData = computed(() => ({
    section: tagListValue.value
}));

useQueryUpdates(tagListData, ['section']);


// META:PAGE

const [ page, fetchDao ] = useDao({
    address: route.params.address as string
}, {
    saveInStorage: true
});

const pageData = computed(() => page.value.data);

emitter.on('daoFollowed', fetchDao);

watchEffect(() => {
    page.value.error && useError(404);
    if (pageData.value?.name) {
        useTitle( 'OuterCircle | ' + pageData.value.name);
    }
});

onUnmounted(() => {
    emitter.off('daoFollowed', fetchDao);
});


// PROPOSALS

const formProposalsInfo = {
    voteOptions: [
        { id: 0, title: 'Need My Vote' },
        { id: 1, title: 'Participated' }
    ],
    statusesOptions: [
        { id: Statuses.Active, title: Statuses[Statuses.Active] },
        { id: Statuses.Stopped, title: Statuses[Statuses.Stopped] },
        { id: Statuses.Closed, title: Statuses[Statuses.Closed] },
    ]
};

const formDataProposals = ref({
    voteId: getQueryParam<number>(query.voteId, formProposalsInfo.voteOptions),
    statusId: getQueryParam<number>(query.statusId, formProposalsInfo.statusesOptions),
    search: route.query.search || '',
    limit: 20,
    offset: 0
});

const [proposalItems, fetchProposal] = useProposalItems(formDataProposals);

emitter.on('proposalCreated', fetchProposal);

onUnmounted(() => {
    emitter.off('proposalCreated', fetchDao);
});

useQueryUpdates(formDataProposals, ['section']);

function addMoreProposals() {
    if (proposalItems.value.data?.items.length !== proposalItems.value.data?.total) {
        formDataProposals.value.offset += formDataProposals.value.limit;
    }
}


// DAOS

const formDaosInfo = {
    daosOptions: [
        { id: 0, title: 'All Daos' },
        { id: 1, title: 'My Daos' }
    ],
    chainOptions: [
        { id: 'all', title: 'All chains' },
        { id: 'goerli', title: 'Goerli' }
    ]
};

const formDataDaos = ref({
    chainId: getQueryParam<string>(query.chainId, formDaosInfo.chainOptions),
    daosId: getQueryParam<number>(query.daosId, formDaosInfo.daosOptions),
    search: query.search || '',
    limit: 20,
    offset: 0
});

const [daoItems, fetchDaoItems] = useDaoItems(formDataDaos);

const daoItemsFiltered = computed(() => {
    return daoItems.value.data?.items || [];
});

emitter.on('daoCreated', fetchDaoItems);
emitter.on('accountChanged',fetchDaoItems);

onUnmounted(() => {
    emitter.off('daoCreated', fetchDaoItems);
    emitter.off('accountChanged',fetchDaoItems);
});

useQueryUpdates(formDataDaos, ['section']);

function addMoreDao() {
    if (daoItems.value.data?.items.length !== daoItems.value.data?.total) {
        formDataDaos.value.offset += formDataDaos.value.limit;
    }
}


// APPS

const formAppsInfo = {
    categoryOptions: [
        { id: 0, title: 'Category 1' },
        { id: 1, title: 'Category 2' }
    ],
};

const formDataApps = ref({
    categoryId: getQueryParam<number>(query.categoryId, formAppsInfo.categoryOptions),
    search: '',
    limit: 20,
    offset: 0
});

useQueryUpdates(formDataApps, ['section']);


// CREATE BUTTON

const createButton = computed(() => {
    return {
        [Sections.Proposals]: {
            text: 'Create Proposal',
            onClick: () => open('CreateProposalLayer', { parentDaoAddress: route.params.address })
        },
        [Sections.Daos]: {
            text: 'Create SubDAO',
            onClick: () => open('CreateDaoLayer', { parentAddress: route.params.address })
        },
        [Sections.Apps]: {
            text: 'Create App',
            onClick: () => {}
        },
        [Sections.Statistics]: null,
        [Sections.Treasury]: null,
    }[tagListValue.value];
});


// FORM DATA

const formData = computed(() => {
    return {
        [Sections.Proposals]: formDataProposals,
        [Sections.Daos]: formDataDaos,
        [Sections.Apps]: formDataApps,
        [Sections.Treasury]: formDataApps,
        [Sections.Statistics]: '',
    }[tagListValue.value];
});


// BREADCRUMBS

const breadcrumbs = computed(() => {
    if (!pageData.value?.path.length) return [];

    const data: IBreadcrumb[] = [...pageData.value?.path].reverse().map(item => ({
        title: item.name,
        link: { name: 'network-dao-address', params: { network: route.params.network, address: item.address } }
    }));

    data.push({ title: pageData.value?.fullName });

    return data;
});


// FOLLOW

let showFollow = false;

watch(pageData, async () => {
    if (pageData.value?.isFollowed === false && query.invitation && !showFollow) {
        const { network, address } = route.params;

        const isFollow = await alert({
            title: 'Follow dao?',
            text: 'Do you want to follow this dao?',
            buttonText: 'Yes',
            status: 'unknown'
        });

        if (isFollow) {
            const [_, error] = await followDao(pageData.value?.name, address as string, network as string, alert, false);
        }
    }

    if (pageData.value !== null && !showFollow) {
        showFollow = true;
    }
});

// TREASURES

const treasures = ref({
    ethereum: {
        title: 'Ethereum',
        icon: 'ethereum',
        balance: 0,
        price: 0
    }
});

const ethPriceInt = setInterval(setEthPrice, 1000);

setEthPrice();
setEthBalance();

async function setEthPrice() {
    const ETHPrice = await getEthPriceNow() as number;
    treasures.value.ethereum.price = Object.values(ETHPrice)[0].ETH.USD;
}

async function setEthBalance() {
    treasures.value.ethereum.balance = await API.provider.getBalance(route.params.address) as number;
}

onUnmounted(() => {
    clearInterval(ethPriceInt);
});
</script>
