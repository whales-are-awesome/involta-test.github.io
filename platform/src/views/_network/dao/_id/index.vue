<template>
    <div>
        <DaoPageHeader
            v-if="pageData"
            class="mb-[33px]"
            :name="pageData?.name"
            :breadcrumbs="breadcrumbs"
            :owner="pageData?.owner"
            :link="pageData?.link"
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
                    <div
                        v-if="tagListValue === Sections.Proposals"
                        class="pointer-events-none opacity-30  px-2 mt-2.5 flex-shrink-0 sm:order-[-2] md:px-1.5 sm:px-[5px] sm:w-1/2"
                    >
                        <SelectField
                            v-model="formData.value.statusId"
                            :options="formProposalsInfo.statusesOptions"
                            :theme-settings="{
                                height: (isMobile.xl || isMobile.lg) ? 'h-[44px]' : 'h-[28px]'
                            }"
                        />
                    </div>
                    <div
                        v-if="tagListValue === Sections.Proposals"
                        class="pointer-events-none opacity-30 px-2 mt-2.5 flex-shrink-0 md:px-1.5 sm:px-[5px]"
                    >
                        <TagsButtonList
                            class="h-full sm:h-[28px]"
                            v-model="formData.value.voteId"
                            :items="formProposalsInfo.voteOptions"
                        />
                    </div>
                    <div
                        v-if="tagListValue === Sections.Apps"
                        class="px-2 mt-2.5 flex-shrink-0 sm:order-[-2] md:px-1.5 sm:px-[5px] sm:w-1/2"
                    >
                        <SelectField
                            v-model="formData.value.categoryId"
                            :options="formAppsInfo.categoryOptions"
                            :theme-settings="{
                                height: (isMobile.xl || isMobile.lg) ? 'h-[44px]' : 'h-[28px]'
                            }"
                        />
                    </div>
                    <div
                        v-if="tagListValue === Sections.Daos"
                        class="px-2 mt-2.5 flex-shrink-0 md:px-1.5 sm:px-[5px]"
                    >
                        <TagsButtonList
                            class="h-[44px] sm:h-[28px]"
                            v-model="formData.value.follower"
                            :items="formDaosInfo.daosOptions"
                        />
                    </div>
                    <div
                        v-if="tagListValue === Sections.Followers"
                        class="pointer-events-none opacity-30 px-2 mt-2.5 flex-shrink-0 md:px-1.5 sm:px-[5px]"
                    >
                        <TagsButtonList
                            class="h-full h-[44px] sm:h-[28px]"
                            v-model="formDataFollowers.type"
                            :items="formFollowersInfo.typeOptions"
                        />
                    </div>
                    <div class="!ml-auto"></div>
                    <BaseSearch
                        v-if="tagListValue !== Sections.Statistics && tagListValue !== Sections.Followers"
                        class="mx-2 mt-2.5 max-w-[414px] w-full z-[5] sm:max-w-[92px] md:mx-1.5 sm:mx-[5px]"
                        theme="white"
                        v-model="formData.value.name"
                    />
                    <div
                        v-if="createButton || tagListValue === Sections.Followers"
                        class="px-2 mt-2.5 flex-shrink-0 sm:order-[-1] sm:w-1/2 md:px-1.5 sm:px-[5px]"
                    >
                        <BaseButton
                            v-if="createButton"
                            class="w-full h-[44px]"
                            :class="(isMobile.xl || isMobile.lg) && '!h-full'"
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
                        <BaseButton
                            v-if="tagListValue === Sections.Followers"
                            class="w-full h-[44px]"
                            :class="(isMobile.xl || isMobile.lg) && '!h-full'"
                            theme="primary"
                            :size="(isMobile.lg || isMobile.xl) ? 'md': 'sm'"
                            :icon="{
                                name: 'share',
                                width: (isMobile.lg || isMobile.xl) ? 20 : 16,
                                prepend: true
                            }"
                            @click="invite"
                        >
                            Invite {{ !isMobile.sm ? 'member' : '' }}
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
                                proposals="TBA"
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
                                proposals="TBA"
                                category="category"
                            />
                        </div>
                    </div>
                </div>
                <div v-if="tagListValue === Sections.Followers">
                    <TextSeparator
                        v-if="+pageData?.followersAmountFormatted"
                        class="mb-[20px]"
                    >
                        {{ pageData?.followersAmountFormatted }} Follower{{ pageData?.followersAmountFormatted > 1 ? 's' : '' }}
                    </TextSeparator>
                    <div
                        v-if="followers.data?.items.length"
                        class="flex flex-wrap -mx-3 -mt-6 sm:-mx-[9px]"
                        :class="{
                            '-preloader -preloader_cover before:top-6': followers.pending
                        }"
                        v-scroll-at.bottom="addMoreFollowers"
                    >
                        <div
                            class="w-1/4 px-1.5 mt-3 lg:w-1/2 sm:w-full"
                            v-for="item in followers.data?.items"
                            :key="item.address"
                        >
                            <FollowersItem
                                :address="item.address"
                                :name="item.name"
                                :tokens="item.tokens"
                                :voting-power="item.votingPower"
                            />
                        </div>
                    </div>
                    <div v-else-if="followers.pending" class="-preloader -preloader_placeholder"></div>
                    <NotFound
                        v-else
                        class="!mt-[88px]"
                        title="No Followers found"
                        text="We couldn't find any followers matching your query. Try another query"
                    />
                </div>
                <div v-if="tagListValue === Sections.Treasury">
                    <div class="flex font-medium uppercase text-xxs text-gray-400 mb-4 pl-4 lg:hidden">
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
                    <div class="space-y-1">
                        <div
                            v-for="(item, key) in treasures.items"
                            :key="key"
                            class="flex items-center text-sm bg-white shadow-[0_4px_20px_rgba(108,108,125,.08)] border border-gray-100 rounded-[10px] p-4 overflow-hidden lg:block lg:space-y-6"
                        >
                            <div class="w-[200px] flex items-center lg:w-full">
                                <div class="w-[200px] font-medium uppercase text-xxs text-gray-400 pr-2 hidden lg:block lg:w-[100px]">
                                    Asset
                                </div>
                                <BaseIcon
                                    class="flex-shrink-0 mr-2"
                                    :name="item.icon"
                                    width="30"
                                />
                                {{ item.title }}
                            </div>
                            <div class="w-[200px] pr-2 lg:w-full lg:flex lg:items-center">
                                <div class="w-[200px] font-medium uppercase text-xxs text-gray-400 pr-2 hidden lg:block lg:w-[100px]">Balance</div> {{ treasures.balance }} {{ item.currency }}
                            </div>
                            <div class="w-[200px] pr-2 lg:w-full lg:flex lg:items-center">
                                <div class="w-[200px] font-medium uppercase text-xxs text-gray-400 pr-2 hidden lg:block lg:w-[100px]">Price</div> $ {{ item.price }}
                            </div>
                            <div class="w-[200px] pr-2 lg:w-full lg:flex lg:items-center">
                                <div class="w-[200px] font-medium uppercase text-xxs text-gray-400 pr-2 hidden lg:block lg:w-[100px]">Value</div> $ {{ item.price * treasures.balance }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="-preloader -preloader_placeholder"></div>
    </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref, watch, watchEffect } from 'vue';
import { notify } from '@kyvg/vue3-notification';
import { useTitle } from '@vueuse/core'
import { getEthPriceNow } from 'get-eth-price';
import { useRoute, useRouter } from 'vue-router';

import TagsList from '@/components/TagsList/TagsList.vue';
import TagsButtonList from '@/components/TagsButtonList/TagsButtonList.vue';
import ProposalCard from '@/components/ProposalCard/ProposalCard.vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import BaseSearch from '@/components/BaseSearch/BaseSearch.vue';
import TextSeparator from '@/components/TextSeparator/TextSeparator.vue';
import DaoPageHeader from '@/components/DaoPageHeader/DaoPageHeader.vue';
import FollowersItem from '@/components/FollowersItem/FollowersItem.vue';
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
import useQueryUpdates from '@/composables/useQueryUpdates';
import useCheckPageNetwork from '@/composables/useCheckPageNetwork';
import useIsMobile from '@/composables/useIsMobile';
import { useFetchDataWithTotal } from '@/composables/useFetchData';

import emitter from '@/plugins/mitt';

import { Statuses } from '@/types/statuses';

import API from '@/helpers/api';
import getQueryParam from '@/helpers/getQueryParam';
import getNetworkPrice from '@/helpers/getNetworkPrice';
import copy from '@/helpers/copy';
import followDao from '@/helpers/followDao';

import { IFollower } from '@/types/services/DaoService';
import { NetworksType } from '@/types/networks';

import DaoService from '@/services/DaoService';
import useDaoSubDaoItems from '@/composables/fetch/useDaoSubDaoItems';
import { store } from '@/store';


// META

const { alert, open } = useLayer();

const route = useRoute();
const router = useRouter();
const { query } = route;

const isMobile = useIsMobile();


// META:TAG LIST

enum Sections {
    Proposals = 'proposals' as any,
    Statistics = 'statistics' as any,
    Daos = 'daos' as any,
    Apps = 'apps' as any,
    Treasury = 'treasury' as any,
    Followers = 'followers' as any,
}

const tagListOptions = [
    { id: Sections.Proposals, title: 'Proposals' },
    // { id: Sections.Statistics, title: 'Statistics' },
    { id: Sections.Daos, title: 'SubDAOs' },
    { id: Sections.Apps, title: 'APPs' },
    { id: Sections.Treasury, title: 'Treasury' },
    { id: Sections.Followers, title: 'Followers' },
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
emitter.on('daoEdited', fetchDao);

watchEffect(() => {
    page.value.error && useError(404);
    if (pageData.value?.name) {
        useTitle( 'OuterCircle | ' + pageData.value.name);
    }
});

onUnmounted(() => {
    emitter.off('daoFollowed', fetchDao);
    emitter.off('daoEdited', fetchDao);
});


// META:ADDRESS

const addressOrName = computed(() => store.getters['wallet/addressOrName']);
const address = computed(() => store.state.wallet.address);


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
    name: route.query.name || '',
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
        { id: null, title: 'All Daos' },
        { id: address.value, title: 'My Daos' }
    ],
};

const formDataDaos = ref({
    parentAddress: route.params.address,
    network: route.params.network,
    follower: getQueryParam<string | null>(query.follower, formDaosInfo.daosOptions),
    name: query.name || '',
    limit: 20,
    offset: 0
});

const [daoItems, fetchDaoItems] = useDaoSubDaoItems(formDataDaos);

const daoItemsFiltered = computed(() => {
    return daoItems.value.data?.items || [];
});

emitter.on('daoCreated', fetchDaoItems);
emitter.on('accountChanged',fetchDaoItems);

onUnmounted(() => {
    emitter.off('daoCreated', fetchDaoItems);
    emitter.off('accountChanged',fetchDaoItems);
});

useQueryUpdates(formDataDaos, ['section'], ['parentAddress', 'network']);

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
    name: '',
    limit: 20,
    offset: 0
});

useQueryUpdates(formDataApps, ['section']);


// CREATE BUTTON

const createButton = computed(() => {
    return {
        [Sections.Proposals]: {
            text: 'Create Proposal',
            onClick: () => open('CreateProposalLayer', { parentDaoAddress: route.params.address, network: route.params.network })
        },
        [Sections.Daos]: {
            text: 'Create SubDAO',
            onClick: () => open('CreateDaoLayer', { parentAddress: route.params.address, network: route.params.network })
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
    balance: 0,
    items: {
        goerli: {
            title: 'GoerliETH',
            icon: 'network-goerli',
            price: 0,
            currency: 'GoerliETH'
        },
        polygon: {
            title: 'MATIC',
            icon: 'network-polygon',
            price: 0,
            currency: 'MATIC'
        }
    }
});

const pricesInt = setInterval(setPrices, 5000);

setPrices();
setBalance();
filterItems();

async function filterItems() {
    treasures.value.items = {
        [route.params.network as NetworksType]: treasures.value.items[route.params.network as NetworksType]
    };
}

async function setPrices() {
    if (route.params.network === 'polygon') {
        treasures.value.items.polygon.price = await getNetworkPrice('polygon');
    }
}

async function setBalance() {
    treasures.value.balance = await API.provider.getBalance(route.params.address) as number;
}

onUnmounted(() => {
    clearInterval(pricesInt);
});


// FOLLOWERS

const followers = useFetchDataWithTotal<IFollower>();

const formFollowersInfo = {
    typeOptions: [
        { id: 'voters', title: 'Voters' },
        { id: 'followers', title: 'Followers' }
    ],
};

const formDataFollowers = ref({
    type: getQueryParam<string>(query.type, formFollowersInfo.typeOptions),
    limit: 20,
    offset: 0
});

fetchFollowers();

emitter.on('daoFollowed', fetchFollowers);

onUnmounted(() => {
    emitter.off('daoFollowed', fetchDao);
});

async function fetchFollowers() {
    followers.value.pending = true;
    followers.value.cancel();

    const [data, error, cancel] = await DaoService.followerItems.fetch(
        {
            network: route.params.network as NetworksType,
            address: route.params.address as string
        },
        {
            offset: 0,
            limit: 15
        }
    ).raw();

    followers.value = { data, cancel, pending: false };
}

function addMoreFollowers() {
    if (followers.value.data?.items.length !== followers.value.data?.total) {
        formDataFollowers.value.offset += formDataFollowers.value.limit;
    }
}


// INVITE MEMBER

function invite() {
    const link = window.location.search
                    ? window.location.origin + window.location.pathname + window.location.search + '&invitation=true'
                    : window.location.origin + window.location.pathname + '?invitation=true';
    notify({
        title: 'Link copied',
    });
    copy(link);
}
</script>
