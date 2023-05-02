<template>
    <div class="mt-[94px] sm:mt-[62px]">
        <BaseAvatar
            class="mb-[46px] md:mb-[35px] sm:mb-[38px]"
            alt="image"
            :hexheads="address"
            size="xl"
            rounded="xl"
            :theme-settings="{
                image: 'sm:rounded-[16px]'
            }"
        >
            <p class="title-h3 text-gray-800 ml-7 sm:ml-2">
                Welcome,
                <br>
                {{ addressOrName }}
            </p>
        </BaseAvatar>
        <TagsList
            v-model="tagListValue"
            class="pt-[8px] mr-[42px] mb-[36px] sm:mb-[45px] md:pt-[14px]"
            :items="tagListOptions"
        />
        <div class="relative">
            <div class="flex z-50 -mx-2 -mt-2.5 relative mb-5 sm:flex-wrap">
<!--                <div-->
<!--                    v-if="tagListValue === MainSections.Proposals"-->
<!--                    class="px-2 mt-2.5 flex-shrink-0 sm:order-[-2] md:px-1.5 sm:px-[5px] sm:w-1/2"-->
<!--                >-->
<!--                    <SelectField-->
<!--                        v-model="formData.value.statusId"-->
<!--                        theme="primary"-->
<!--                        :options="formProposalsInfo.statusesOptions"-->
<!--                        :theme-settings="{-->
<!--                            height: (isMobile.xl || isMobile.lg) ? 'h-[44px]' : 'h-[28px]'-->
<!--                        }"-->
<!--                    />-->
<!--                </div>-->
<!--                <div-->
<!--                    v-if="tagListValue === MainSections.Daos"-->
<!--                    class="px-2 mt-2.5 flex-shrink-0 sm:order-[-2] md:px-1.5 sm:px-[5px] sm:w-1/2"-->
<!--                >-->
<!--                    <SelectField-->
<!--                        v-model="formData.value.chainId"-->
<!--                        theme="primary"-->
<!--                        :options="formDaosInfo.chainOptions"-->
<!--                        :theme-settings="{-->
<!--                            height: (isMobile.xl || isMobile.lg) ? 'h-[44px]' : 'h-[28px]'-->
<!--                        }"-->
<!--                    />-->
<!--                </div>-->
<!--                <div-->
<!--                    v-if="tagListValue === MainSections.Apps"-->
<!--                    class="px-2 mt-2.5 flex-shrink-0 sm:order-[-2] md:px-1.5 sm:px-[5px] sm:w-1/2"-->
<!--                >-->
<!--                    <SelectField-->
<!--                        v-model="formData.value.categoryId"-->
<!--                        theme="primary"-->
<!--                        :options="formAppsInfo.categoryOptions"-->
<!--                        :theme-settings="{-->
<!--                            height: (isMobile.xl || isMobile.lg) ? 'h-[44px]' : 'h-[28px]'-->
<!--                        }"-->
<!--                    />-->
<!--                </div>-->
<!--                <div-->
<!--                    v-if="tagListValue === MainSections.Proposals"-->
<!--                    class="px-2 mt-2.5 flex-shrink-0 md:px-1.5 sm:px-[5px]"-->
<!--                >-->
<!--                    <TagsButtonList-->
<!--                        class="h-full"-->
<!--                        v-model="formData.value.voteId"-->
<!--                        :items="formProposalsInfo.voteOptions"-->
<!--                    />-->
<!--                </div>-->
<!--                <div-->
<!--                    v-if="tagListValue === MainSections.Daos"-->
<!--                    class="px-2 mt-2.5 flex-shrink-0 md:px-1.5 sm:px-[5px]"-->
<!--                >-->
<!--                    <TagsButtonList-->
<!--                        class="h-full"-->
<!--                        v-model="formData.value.daosId"-->
<!--                        :items="formDaosInfo.daosOptions"-->
<!--                    />-->
<!--                </div>-->
                <div class="!ml-auto"></div>
<!--                <BaseSearch-->
<!--                    v-if="tagListValue !== MainSections.Statistics"-->
<!--                    class="mx-2 mt-2.5 max-w-[414px] w-full z-[5] sm:max-w-[92px] md:mx-1.5 sm:mx-[5px]"-->
<!--                    v-model="formData.value.search"-->
<!--                />-->
                <div
                    v-if="tagListValue !== MainSections.Statistics"
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
            </div>
<!--            <div-->
<!--                v-if="tagListValue === MainSections.Proposals"-->
<!--                class="space-y-[18px] sm:space-y-[24px]"-->
<!--            >-->
<!--                <template v-if="proposalItems.data?.length">-->
<!--                    <ProposalCard-->
<!--                        v-for="item in 3"-->
<!--                        :key="item"-->
<!--                        :avatar="require('@/assets/images/common/placeholder.jpg')"-->
<!--                        name="DAO Name"-->
<!--                        label-title="Active"-->
<!--                        title="Proposal Name"-->
<!--                        :users="[{ id: 1, avatar: require('@/assets/images/common/placeholder.jpg') }, { id: 2, avatar: require('@/assets/images/common/placeholder.jpg') }, { id: 3, avatar: require('@/assets/images/common/placeholder.jpg') } ]"-->
<!--                        text="Early Birds Early Birds  Early Birds Early Birds мEarly Birds Early Birds Early Birds Early Birds Early Birds Early Birds Early Birds Early Birds Early Birds Early Birds Early Birds Early Birds Early Birds Early Birds"-->
<!--                        :end-date="new Date((new Date).setHours(23))"-->
<!--                    />-->
<!--                </template>-->
<!--                <div v-else-if="proposalItems.pending" class="-preloader -preloader_placeholder"></div>-->
<!--                <NotFound-->
<!--                    v-else-->
<!--                    class="!mt-[88px]"-->
<!--                    title="No Proposals found"-->
<!--                    text="We couldn't find any proposals matching your query. Try another query"-->
<!--                />-->
<!--            </div>-->
            <div v-if="tagListValue === MainSections.Daos">
                <div
                    v-if="daoItemsFiltered.length"
                    class="flex flex-wrap -mx-3 -mt-6 sm:-mx-[9px]"
                    :class="{
                        '-preloader -preloader_cover': daoItems.pending
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
                            :to="{ name: 'network-dao-address', params: { network: item.network, address: item.address } }"
                            :avatar="item.image"
                            :name="item.fullName"
                            :is-followed="item.isFollowed"
                            :network="item.network"
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
            <div v-if="tagListValue === MainSections.Apps">
                <div class="absolute inset-0 z-50 bg-white bg-opacity-70 flex justify-center items-center">
                    <div class="title-h2 text-400">
                        WORK IN PROGRESS
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 -mt-6 sm:-mx-[9px]">
                    <div
                        class="w-1/4 px-3 mt-6 md:w-1/3 sm:w-1/2 sm:px-[9px]"
                        v-for="item in 12"
                        :key="item"
                    >
                        <DaoCard
                            class="h-full"
                            :to="{ name: 'app' }"
                            :avatar="require('@/assets/images/common/placeholder.jpg')"
                            name="DAO Name"
                            followers-amount="232"
                            proposals="TBA"
                            category="category"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, onUnmounted } from 'vue';
import { useTitle } from '@vueuse/core'
import { useRoute } from 'vue-router';
import BaseAvatar from '@/components/BaseAvatar/BaseAvatar.vue';
import TagsList from '@/components/TagsList/TagsList.vue';
import TagsButtonList from '@/components/TagsButtonList/TagsButtonList.vue';
import DaoCard from '@/components/DaoCard/DaoCard.vue';
import ProposalCard from '@/components/ProposalCard/ProposalCard.vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import BaseSearch from '@/components/BaseSearch/BaseSearch.vue';
import SelectField from '@/components/Form/SelectField/SelectField.vue';
import NotFound from '@/components/NotFound/NotFound.vue';
import { store } from '@/store';
import wait from '@/helpers/wait';
import { Statuses } from '@/types/statuses';
import useIsMobile from '@/composables/useIsMobile';
import useLayer from '@/composables/useLayer';
import useDaoItems from '@/composables/fetch/useDaoItems';
import useProposalItems from '@/composables/views/home/useProposalItems';
import useQueryUpdates from '@/composables/useQueryUpdates';
import { MainSections } from '@/types/statuses'
import emitter from '@/plugins/mitt';
import getQueryParam from '@/helpers/getQueryParam';


// META

const route = useRoute();
const { query } = route;

const isMobile = useIsMobile();

const { open } = useLayer();

useTitle('OuterCircle');


// META:TAG LIST

const tagListOptions = [
    // { id: MainSections.Proposals, title: 'Proposals' },
    // { id: MainSections.Statistics, title: 'Statistics' },
    { id: MainSections.Daos, title: 'DAOs' },
    { id: MainSections.Apps, title: 'APPs' }
];

const tagListValue = ref(getQueryParam<MainSections>(query.section, tagListOptions));

const tagListData = computed(() => ({
    section: tagListValue.value
}));

useQueryUpdates(tagListData, ['section']);


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

const [proposalItems] = useProposalItems(formDataProposals);

useQueryUpdates(formDataProposals, ['section']);


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
    emitter.off('accountChanged', fetchDaoItems);
});


useQueryUpdates(formDataDaos, ['section']);

async function addMoreDao() {
    if (daoItems.value.data?.items.length && daoItems.value.data?.total) {
        const prev = daoItems.value.data.items.length;

        if (daoItems.value.data.items.length < daoItems.value.data.total) {
            formDataDaos.value.offset += formDataDaos.value.limit;
        }

        return wait(() => daoItems.value.data.items.length !== prev);
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
        [MainSections.Proposals]: {
            text: 'Create Proposal',
            onClick: () => open('CreateProposalLayer')
        },
        [MainSections.Daos]: {
            text: 'Create Dao',
            onClick: () => open('CreateDaoLayer')
        },
        [MainSections.Apps]: {
            text: 'Create App',
            onClick: () => {}
        },
        [MainSections.Statistics]: '',
    }[tagListValue.value];
});


// FORM DATA

const formData = computed(() => {
    return {
        [MainSections.Proposals]: formDataProposals,
        [MainSections.Daos]: formDataDaos,
        [MainSections.Apps]: formDataApps,
        [MainSections.Statistics]: '',
    }[tagListValue.value];
});


// ADDRESS

const addressOrName = computed(() => store.getters['wallet/addressOrName']);
const address = computed(() => store.state.wallet.address);
</script>
