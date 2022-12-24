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
            v-model="tagList.value"
            class="pt-[8px] mr-[42px] mb-[36px] sm:mb-[45px] md:pt-[14px]"
            :items="tagList.options"
        />
        <div class="flex -mx-2 -mt-2.5 relative mb-5 sm:flex-wrap">
            <div
                v-if="tagList.value === TagStatuses.Proposals"
                class="px-2 mt-2.5 flex-shrink-0 sm:order-[-2] md:px-1.5 sm:px-[5px] sm:w-1/2"
            >
                <SelectField
                    v-model="formData.value.statusId"
                    theme="primary"
                    :options="formInfo.statusesOptions"
                    :theme-settings="{
                        height: (isMobile.xl || isMobile.lg) ? '!h-[44px]' : '!h-[28px]'
                    }"
                />
            </div>
            <div
                v-if="tagList.value === TagStatuses.Daos"
                class="px-2 mt-2.5 flex-shrink-0 sm:order-[-2] md:px-1.5 sm:px-[5px] sm:w-1/2"
            >
                <SelectField
                    v-model="formData.value.chainId"
                    theme="primary"
                    :options="formInfo.chainOptions"
                    :theme-settings="{
                        height: (isMobile.xl || isMobile.lg) ? '!h-[44px]' : '!h-[28px]'
                    }"
                />
            </div>
            <div
                v-if="tagList.value === TagStatuses.Apps"
                class="px-2 mt-2.5 flex-shrink-0 sm:order-[-2] md:px-1.5 sm:px-[5px] sm:w-1/2"
            >
                <SelectField
                    v-model="formData.value.categoryId"
                    theme="primary"
                    :options="formInfo.categoryOptions"
                    :theme-settings="{
                        height: (isMobile.xl || isMobile.lg) ? '!h-[44px]' : '!h-[28px]'
                    }"
                />
            </div>
            <div
                v-if="tagList.value === TagStatuses.Proposals"
                class="px-2 mt-2.5 flex-shrink-0 md:px-1.5 sm:px-[5px]"
            >
                <TagsButtonList
                    class="h-full"
                    v-model="formData.value.voteId"
                    :items="formInfo.voteOptions"
                />
            </div>
            <div
                v-if="tagList.value === TagStatuses.Daos"
                class="px-2 mt-2.5 flex-shrink-0 md:px-1.5 sm:px-[5px]"
            >
                <TagsButtonList
                    class="h-full"
                    v-model="formData.value.daosId"
                    :items="formInfo.daosOptions"
                />
            </div>
            <div class="!ml-auto"></div>
            <BaseSearch
                v-if="tagList.value !== TagStatuses.Statistics"
                class="mx-2 mt-2.5 max-w-[414px] w-full z-[5] sm:max-w-[92px] md:mx-1.5 sm:mx-[5px]"
                v-model="formData.value.search"
            />
            <div
                v-if="tagList.value !== TagStatuses.Statistics"
                class="px-2 mt-2.5 flex-shrink-0 sm:order-[-1] sm:w-1/2 md:px-1.5 sm:px-[5px]"
            >
                <BaseButton
                    class="w-full"
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
            </div>
        </div>
        <div
            v-if="tagList.value === TagStatuses.Proposals"
            class="space-y-[18px] sm:space-y-[24px]"
        >
            <template v-if="proposalItems.data?.length">
                <BaseCard
                    v-for="item in 3"
                    :key="item"
                    :avatar="require('@/assets/images/common/placeholder.jpeg')"
                    name="DAO Name"
                    label-title="Active"
                    title="Proposal Name"
                    :users="[{ id: 1, avatar: require('@/assets/images/common/placeholder.jpeg') }, { id: 2, avatar: require('@/assets/images/common/placeholder.jpeg') }, { id: 3, avatar: require('@/assets/images/common/placeholder.jpeg') } ]"
                    text="Early Birds Early Birds  Early Birds Early Birds мEarly Birds Early Birds Early Birds Early Birds Early Birds Early Birds Early Birds Early Birds Early Birds Early Birds Early Birds Early Birds Early Birds Early Birds"
                    :end-date="new Date((new Date).setHours(23))"
                />
            </template>
            <div v-else-if="proposalItems.pending" class="-preloader -preloader_placeholder"></div>
            <NotFound
                v-else
                class="!mt-[88px]"
                title="No Proposals found"
                text="We couldn't find any proposals matching your query. Try another query"
            />
        </div>
        <div v-if="tagList.value === TagStatuses.Daos">
            <div
                v-if="daoItemsFiltered.length"
                class="flex flex-wrap -mx-3 -mt-6 sm:-mx-[9px]"
                :class="{
                    '-preloader -preloader_cover': daoItems.pending
                }"
                v-scroll-at.bottom="addMoreDaos"
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
                        :network="item.network"
                        :address="item.address"
                        :followers="item.followersAmountFormatted"
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
        <div v-if="tagList.value === TagStatuses.Apps">
            <div class="flex flex-wrap -mx-3 -mt-6 sm:-mx-[9px]">
                <div
                    class="w-1/4 px-3 mt-6 md:w-1/3 sm:w-1/2 sm:px-[9px]"
                    v-for="item in 12"
                    :key="item"
                >
                    <DaoCard
                        class="h-full"
                        :to="{ name: 'app' }"
                        :avatar="require('@/assets/images/common/placeholder.jpeg')"
                        name="DAO Name"
                        followers="232"
                        proposals="232"
                        category="category"
                    />
                </div>
            </div>
            <BaseButton
                class="w-full"
                view="outlined"
                size="sm"
                rounded="lg"
            >
                Show more Daos
            </BaseButton>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import BaseAvatar from '@/components/BaseAvatar/BaseAvatar.vue';
import TagsList from '@/components/TagsList/TagsList.vue';
import TagsButtonList from '@/components/TagsButtonList/TagsButtonList.vue';
import DaoCard from '@/components/DaoCard/DaoCard.vue';
import BaseCard from '@/components/BaseCard/BaseCard.vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import BaseSearch from '@/components/BaseSearch/BaseSearch.vue';
import SelectField from '@/components/Form/SelectField/SelectField.vue';
import NotFound from '@/components/NotFound/NotFound.vue';
import { store } from '@/store';
import { Statuses } from '@/types/statuses';
import capitalize from '@/helpers/capitalize';
import useIsMobile from '@/composables/useIsMobile';
import useDaoItems from '@/composables/fetch/useDaoItems';
import useProposalItems from '@/composables/views/home/useProposalItems';
import useQueryUpdates from '@/composables/useQueryUpdates';
import { TagStatuses } from './types'
import emitter from '@/plugins/mitt';

// META

const route = useRoute();

const isMobile = useIsMobile();

const formInfo = {
    voteOptions: [
        { id: 0, title: 'Need My Vote' },
        { id: 1, title: 'Participated' }
    ],
    daosOptions: [
        { id: 0, title: 'All Daos' },
        { id: 1, title: 'My Daos' }
    ],
    chainOptions: [
        { id: 'all', title: 'All chains' },
        { id: 'goerli', title: 'Goerli' }
    ],
    categoryOptions: [
        { id: 0, title: 'Category 1' },
        { id: 1, title: 'Category 2' }
    ],
    statusesOptions: [
        { id: Statuses.Active, title: Statuses[Statuses.Active] },
        { id: Statuses.Stopped, title: Statuses[Statuses.Stopped] },
        { id: Statuses.Closed, title: Statuses[Statuses.Closed] },
    ]
};

const tagList = ref({
    options: [
        { id: TagStatuses.Proposals, title: TagStatuses[TagStatuses.Proposals] },
        { id: TagStatuses.Statistics, title: TagStatuses.Statistics },
        { id: TagStatuses.Daos, title: TagStatuses.Daos },
        { id: TagStatuses.Apps, title: TagStatuses.Apps }
    ],
    value: TagStatuses.Proposals
});

// PROPOSALS

const formDataProposals = ref({
    voteId: +(route.query.voteId as string) || formInfo.voteOptions[0].id,
    statusId: +(route.query.statusId as string) || Statuses.Active,
    search: route.query.search || '',
    limit: 20,
    offset: 0
});

const [proposalItems] = useProposalItems(formDataProposals);

// useQueryUpdates(formDataProposals);


// DAOS

const formDataDaos = ref({
    chainId: formInfo.chainOptions[0].id,
    daosId: route.query.daosId || Statuses.Active,
    search: route.query.search || '',
    limit: 20,
    offset: 0
});

const [daoItems, fetchDaoItems] = useDaoItems(formDataDaos);

const daoItemsFiltered = computed(() => {
    return daoItems.value.data?.items;
});

emitter.on('daoCreated', fetchDaoItems);

function addMoreDaos() {
    if (daoItems.value.data?.items.length !== daoItems.value.data?.total) {
        formDataDaos.value.offset += formDataDaos.value.limit;
    }
}


// APPS

const formDataApps = ref({
    categoryId: formInfo.categoryOptions[0].id,
    search: '',
    limit: 20,
    offset: 0
});


// CREATE BUTTON

const createButton = computed(() => {
    return {
        [TagStatuses.Proposals]: {
            text: 'Create Proposal',
            onClick: () => {}
        },
        [TagStatuses.Daos]: {
            text: 'Create Dao',
            onClick: () => {}
        },
        [TagStatuses.Apps]: {
            text: 'Create App',
            onClick: () => {}
        },
        [TagStatuses.Statistics]: '',
    }[tagList.value.value];
});


// FORM DATA

const formData = computed(() => {
    return {
        [TagStatuses.Proposals]: formDataProposals,
        [TagStatuses.Daos]: formDataDaos,
        [TagStatuses.Apps]: formDataApps,
        [TagStatuses.Statistics]: '',
    }[tagList.value.value];
});


// ADDRESS

const addressOrName = computed(() => store.getters['wallet/addressOrName']);
const address = computed(() => store.state.wallet.address);
</script>
