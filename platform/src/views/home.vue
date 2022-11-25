<template>
    <div class="mt-[94px] sm:mt-[62px]">
        <BaseAvatar
            class="mb-[46px] md:mb-[35px] sm:mb-[38px]"
            :src="require('@/assets/images/common/placeholder.jpeg')"
            alt="image"
            size="xl"
            rounded="xl"
            :theme-settings="{
                image: 'sm:rounded-[16px]'
            }"
        >
            <p class="title-h3 text-gray-800 ml-7 sm:ml-2">
                Welcome,
                <br>
                {{ address }}
            </p>
        </BaseAvatar>
        <div class="mb-[36px] flex justify-between relative sm:mb-[45px]">
            <TagsList
                v-model="tagList.value"
                class="pt-[8px] mr-[42px] md:pt-[14px]"
                :items="tagList.options"
            />
            <div class="max-w-[515px] w-full md:max-w-none sm:hidden">
                <BaseSearch
                    class="md:!absolute md:top-0 md:right-0 md:z-1"
                    v-model="formData.search"
                />
            </div>
        </div>
        <div
            v-if="tagList.value === TagStatuses.Proposals"
            class="space-y-[18px] sm:space-y-[24px]"
        >
            <div class="flex space-x-4 mb-6 sm:space-x-3">
                <SelectField
                    v-model="formData.statusId"
                    :options="formInfo.statusesOptions"
                />
                <SelectField
                    v-model="formData.voteId"
                    :options="formInfo.voteOptions"
                />
            </div>
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
        <div v-if="tagList.value === TagStatuses.DAOs">
            <div
                v-if="daoItemsFiltered.length"
                class="flex flex-wrap -mx-3 -mt-6 sm:-mx-[9px]"
                :class="{
                    '-preloader': daoItems.pending
                }"
            >
                <div
                    class="w-1/4 px-3 mt-6 md:w-1/3 sm:w-1/2 sm:px-[9px]"
                    v-for="item in daoItemsFiltered"
                    :key="item"
                >
                    <DaoCard
                        :avatar="item.image"
                        :name="item.name"
                        supported-by="232 OC"
                        backed-by="100 OC"
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
                        :avatar="require('@/assets/images/common/placeholder.jpeg')"
                        name="DAO Name"
                        supported-by="232 OC"
                        backed-by="100 OC"
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
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import BaseAvatar from '@/components/BaseAvatar/BaseAvatar.vue';
import TagsList from '@/components/TagsList/TagsList.vue';
import DaoCard from '@/components/DaoCard/DaoCard.vue';
import BaseCard from '@/components/BaseCard/BaseCard.vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import BaseSearch from '@/components/BaseSearch/BaseSearch.vue';
import SelectField from '@/components/Form/SelectField/SelectField.vue';
import NotFound from '@/components/NotFound/NotFound.vue';
import { store } from '@/store';

import { Statuses } from '@/models/statuses';
import useDaoItems from '@/composables/useDaoItems';
import useProposalItems from '@/composables/views/home/useProposalItems';

enum TagStatuses {
    Proposals,
    Statistics,
    DAOs,
    APPs
}

const formInfo = {
    voteOptions: [
        { id: 0, title: 'Need my vote' },
        { id: 1, title: 'All' }
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
        { id: TagStatuses.Statistics, title: TagStatuses[TagStatuses.Statistics] },
        { id: TagStatuses.DAOs, title: TagStatuses[TagStatuses.DAOs] },
        { id: TagStatuses.APPs, title: TagStatuses[TagStatuses.APPs] }
    ],
    value: TagStatuses.Proposals
})

const formData = ref({
    voteId: formInfo.voteOptions[0].id,
    statusId: Statuses.Active,
    search: '',
    limits: {
        proposals: 1,
        daos: 1
    },
    offsets: {
        proposals: 0,
        daos: 0
    }
});

const proposalItems = useProposalItems(formData);
const daoItems = useDaoItems(formData);

const daoItemsFiltered = computed(() => {
    return daoItems.value.data?.items;
});

const address = computed(() => store.getters['wallet/addressOrName']);
</script>
