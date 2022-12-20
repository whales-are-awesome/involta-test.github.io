<template>
    <DaoPageHeader
        v-if="pageData"
        class="mb-[33px]"
        :name="pageData?.name"
        :breadcrumbs="breadcrumbs"
        :followers="pageData?.followersAmountFormatted"
        :description="pageData?.description"
    />
    <div v-else class="-preloader -preloader_placeholder"></div>
    <div v-if="pageData">
        <TagsList
            v-model="tagList.value"
            class="pt-[10px] mb-8 pl-[20px]"
            :items="tagList.options"
            size="sm"
        />
        <div class="p-4 bg-surface-200 rounded-[10px]">
            <div class="flex justify-between mb-[30px]">
                <div
                    v-if="[TagStatuses.Proposals, TagStatuses.SubDAOs].includes(tagList.value)"
                    class="flex space-x-4"
                >
                    <template v-if="tagList.value === TagStatuses.Proposals">
                        <SelectField
                            v-model="formData.statusId"
                            :options="formInfo.statusesOptions"
                        />
                        <SelectField
                            v-model="formData.voteId"
                            :options="formInfo.voteOptions"
                        />
                    </template>
                    <SelectField
                        v-if="tagList.value === TagStatuses.SubDAOs"
                        v-model="formData.categoryId"
                        :options="formInfo.categoryOptions"
                    />
                </div>
                <BaseButton
                    v-if="tagList.value === TagStatuses.Proposals"
                    view="outlined"
                    :icon="{
                        name: 'plus',
                        width: 14,
                        prepend: true
                    }"
                    :theme-settings="{
                        bg: 'bg-white'
                    }"
                    @click="open('CreateProposalLayer')"
                >
                    New Proposal
                </BaseButton>
            </div>
            <template v-if="tagList.value === TagStatuses.Proposals">
                <TextSeparator
                    v-if="proposalItems.data?.length"
                    class="mb-[10px]"
                >
                    {{ proposalItems.data?.length }} active proposals
                </TextSeparator>
                <div class="space-y-[18px]">
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
                        class="!my-[88px]"
                        title="No Proposals found"
                        text="We couldn't find any proposals matching your query. Try another query"
                    />
                </div>
            </template>
            <div v-if="tagList.value === TagStatuses.SubDAOs">
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
                            class="h-full"
                            :avatar="item.image"
                            :to="{ name: 'network-dao-address', params: { network: item.network, address: item.address } }"
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
                <BaseButton
                    v-if="daoItems.data?.total !== daoItemsFiltered?.length"
                    class="w-full mt-8"
                    view="outlined"
                    size="sm"
                    rounded="lg"
                    @click="formData.offsets.daos += 1"
                >
                    Show more DAOs
                </BaseButton>
            </div>
            <div v-if="tagList.value === TagStatuses.APPs">
                <div class="flex flex-wrap -mx-3 -mt-6 mb-8">
                    <div
                        class="w-1/4 px-3 mt-6 md:w-1/3"
                        v-for="item in 12"
                        :key="item"
                    >
                        <DaoCard
                            class="h-full"
                            :avatar="require('@/assets/images/common/placeholder.jpeg')"
                            :to="{ name: 'app' }"
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
                    Show more DAOs
                </BaseButton>
            </div>
        </div>
    </div>
    <div v-else class="-preloader -preloader_placeholder"></div>
</template>

<script lang="ts" setup>
import { computed, ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import TagsList from '@/components/TagsList/TagsList.vue';
import BaseCard from '@/components/BaseCard/BaseCard.vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import TextSeparator from '@/components/TextSeparator/TextSeparator.vue';
import DaoPageHeader from '@/components/DaoPageHeader/DaoPageHeader.vue';
import SelectField from '@/components/Form/SelectField/SelectField.vue';
import NotFound from '@/components/NotFound/NotFound.vue';
import DaoCard from '@/components/DaoCard/DaoCard.vue';
import useLayer from '@/composables/useLayer';
import useDao from '@/composables/fetch/useDao';
import useError from '@/composables/useError';
import { IBreadcrumb } from '@/components/BaseBreadcrumbs/types';
import { Statuses } from '@/types/statuses';
import useProposalItems from '@/composables/views/home/useProposalItems';
import useDaoItems from '@/composables/fetch/useDaoItems';
import emitter from '@/plugins/mitt';


// META

const { open } = useLayer();

const route = useRoute();

enum TagStatuses {
    Proposals,
    Statistics,
    SubDAOs,
    APPs
}

const tagList = ref({
    options: [
        { id: TagStatuses.Proposals, title: TagStatuses[TagStatuses.Proposals] },
        { id: TagStatuses.Statistics, title: TagStatuses[TagStatuses.Statistics] },
        { id: TagStatuses.SubDAOs, title: TagStatuses[TagStatuses.SubDAOs] },
        { id: TagStatuses.APPs, title: TagStatuses[TagStatuses.APPs] },
    ],
    value: TagStatuses.Proposals
});


const formInfo = {
    voteOptions: [
        { id: 0, title: 'Need My Vote' },
        { id: 1, title: 'All' }
    ],
    statusesOptions: [
        { id: Statuses.Active, title: Statuses[Statuses.Active] },
        { id: Statuses.Stopped, title: Statuses[Statuses.Stopped] },
        { id: Statuses.Closed, title: Statuses[Statuses.Closed] },
    ],
    categoryOptions: [
        { id: 0, title: 'All categories' },
        { id: 1, title: 'Category 1' },
        { id: 2, title: 'Category d' }
    ]
};

const formData = ref({
    voteId: formInfo.voteOptions[0].id,
    statusId: Statuses.Active,
    search: '',
    categoryId: formInfo.categoryOptions[0].id,
    limits: {
        proposals: 20,
        daos: 20,
        apps: 20
    },
    offsets: {
        proposals: 0,
        daos: 0,
        apps: 0
    }
});


// META:PAGE

const [ page ] = useDao({
    address: route.params.address as string
}, {
    saveInStorage: true
});

const pageData = computed(() => page.value.data);

watchEffect(() => {
    page.value.error && useError(404)
});


// PROPOSALS ITEMS

const [proposalItems] = useProposalItems(formData);


// DAO ITEMS

const [daoItems, fetchDaoItems] = useDaoItems(formData);

const daoItemsFiltered = computed(() => {
    return daoItems.value.data?.items;
});

emitter.on('daoCreated', fetchDaoItems);


// BREADCRUMBS

const breadcrumbs = computed(() => {
    if (!pageData.value || !pageData.value?.path.length) return [];

    const data: IBreadcrumb[] = [...pageData.value?.path].reverse().map(item => ({
        title: item.name,
        link: { name: 'network-dao-address', params: { network: route.params.network, address: item.address } }
    }));

    data.push({ title: pageData.value?.fullName });

    return data;
})
</script>
