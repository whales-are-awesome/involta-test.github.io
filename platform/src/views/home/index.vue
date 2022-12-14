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
        <div class="flex space-x-4 sm:space-x-3 relative mb-5">
            <SelectField
                v-if="tagList.value === TagStatuses.Proposals"
                v-model="formData.value.statusId"
                class="flex-shrink-0"
                theme="primary"
                :options="formInfo.statusesOptions"
                :theme-settings="{
                    height: '!h-[44px]'
                }"
            />
            <SelectField
                v-if="tagList.value === TagStatuses.Daos"
                v-model="formData.value.chainId"
                class="flex-shrink-0"
                theme="primary"
                :options="formInfo.chainOptions"
                :theme-settings="{
                    height: '!h-[44px]'
                }"
            />
            <TagsButtonList
                v-if="tagList.value === TagStatuses.Proposals"
                class="flex-shrink-0"
                v-model="formData.value.voteId"
                :items="formInfo.voteOptions"
            />
            <TagsButtonList
                v-if="tagList.value === TagStatuses.Daos"
                class="flex-shrink-0"
                v-model="formData.value.daosId"
                :items="formInfo.daosOptions"
            />
            <div class="!ml-auto"></div>
            <div
                v-if="tagList.value !== TagStatuses.Statistics"
                class="max-w-[414px] w-full md:max-w-none sm:hidden relative"
            >
                <BaseSearch
                    class="md:!absolute md:top-0 md:right-0 md:z-1"
                    v-model="formData.value.search"
                />
            </div>
            <BaseButton
                v-if="tagList.value !== TagStatuses.Statistics"
                class="!h-auto flex-shrink-0"
                theme="primary-400"
                :icon="{
                    name: 'plus',
                    width: 14,
                    prepend: true
                }"
                @click="createButton.onClick"
            >
                {{ createButton.text }}
            </BaseButton>
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
            >
                <div
                    class="w-1/4 px-3 mt-6 md:w-1/3 sm:w-1/2 sm:px-[9px]"
                    v-for="item in daoItemsFiltered"
                    :key="item"
                >
                    <DaoCard
                        :to="{ name: 'network-dao-address', params: { network: item.network, address: item.address } }"
                        :avatar="item.image"
                        :name="item.fullName"
                        followers="232"
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
            <BaseButton
                v-if="daoItems.data?.total !== daoItemsFiltered?.length"
                class="w-full mt-8"
                view="outlined"
                size="sm"
                rounded="lg"
                @click="formData.offsets.Daos += 1"
            >
                Show more Daos
            </BaseButton>
        </div>
        <div v-if="tagList.value === TagStatuses.Apps">
            <div class="flex flex-wrap -mx-3 -mt-6 mb-8">
                <div
                    class="w-1/4 px-3 mt-6 md:w-1/3"
                    v-for="item in 12"
                    :key="item"
                >
                    <DaoCard
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
import useDaoItems from '@/composables/fetch/useDaoItems';
import useProposalItems from '@/composables/views/home/useProposalItems';
import useQueryUpdates from '@/composables/useQueryUpdates';
import { TagStatuses } from './types'

// META

const route = useRoute();

const formInfo = {
    voteOptions: [
        { id: 0, title: 'Need my vote' },
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
    value: Object.keys(TagStatuses).includes(capitalize(route.query.section as string)) ? capitalize(route.query.section as string):  TagStatuses.Proposals
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

useQueryUpdates(formDataProposals);


// DAOS

const formDataDaos = ref({
    chainId: formInfo.chainOptions[0].id,
    daosId: route.query.daosId || Statuses.Active,
    search: route.query.search || '',
    limit: 20,
    offset: 0
});

const [daoItems] = useDaoItems(formDataDaos);

const daoItemsFiltered = computed(() => {
    return daoItems.value.data?.items;
});


// APPS

const formDataApps = ref({
    categoryId: formInfo.voteOptions[0].id,
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
