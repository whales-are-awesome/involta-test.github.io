<template>
    <DaoPageHeader
        name="Dao Name"
    />
    <div class="mt-[47px]">
        <TagsList
            v-model="tagList.value"
            class="pt-[10px] mb-6"
            :items="tagList.options"
            size="sm"
        />
        <div class="p-4 bg-surface-200 rounded-[10px]">
            <div class="flex space-x-4 mb-[30px]">
                <SelectField
                    v-model="formData.statusId"
                    :options="formInfo.statusesOptions"
                />
                <SelectField
                    v-model="formData.voteId"
                    :options="formInfo.voteOptions"
                />
            </div>
            <div
                v-if="tagList.value === TagStatuses.Proposals"
                class="space-y-[18px]"
            >
                <TextSeparator class="mb-3">
                    3 active proposals
                </TextSeparator>
                <BaseCard
                    v-for="item in 3"
                    :key="item"
                    :avatar="require('@/assets/images/common/placeholder.jpeg')"
                    name="DAO Name"
                    label-title="Active"
                    title="Proposal Name"
                    votes="14"
                    :users="[{ id: 1, avatar: require('@/assets/images/common/placeholder.jpeg') }, { id: 2, avatar: require('@/assets/images/common/placeholder.jpeg') }, { id: 3, avatar: require('@/assets/images/common/placeholder.jpeg') } ]"
                    text="Early Birds Early Birds  Early Birds Early Birds мEarly Birds Early Birds Early Birds Early Birds Early Birds Early Birds Early Birds Early Birds Early Birds Early Birds Early Birds Early Birds Early Birds Early Birds"
                    :end-date="new Date((new Date).setHours(23))"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import TagsList from '@/components/TagsList/TagsList.vue';
import DappCard from '@/components/DappCard/DappCard.vue';
import BaseCard from '@/components/BaseCard/BaseCard.vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import BaseSearch from '@/components/BaseSearch/BaseSearch.vue';
import TextSeparator from '@/components/TextSeparator/TextSeparator.vue';
import DaoPageHeader from '@/components/DaoPageHeader/DaoPageHeader.vue';
import SelectField from '@/components/Form/SelectField.vue';

import { Statuses } from '@/models/statuses';

enum TagStatuses {
    Proposals,
    Statistics,
    DAOs,
    APPs
}

const tagList = ref({
    options: [
        { id: TagStatuses.Proposals, title: TagStatuses[TagStatuses.Proposals] },
        { id: TagStatuses.Statistics, title: TagStatuses[TagStatuses.Statistics] }
    ],
    value: TagStatuses.Proposals
})

const formData = ref({
    voteId: 0,
    statusId: Statuses.Active,
    search: ''
});

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

const formResult = computed(() => ({
    search: formData.value.search,
    voteId: formData.value.voteId,
    statusId: formData.value.statusId
}));
</script>
