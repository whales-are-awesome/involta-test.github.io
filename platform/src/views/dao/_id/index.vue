<template>
    <DaoPageHeader
        class="mb-[33px]"
        name="DAO Name"
        :breadcrumbs="isSubdao ? breadcrumbs : null"
        description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis disap"
    />
    <div>
        <TagsList
            v-model="tagList.value"
            class="pt-[10px] mb-8 pl-[20px]"
            :items="tagList.options"
            size="sm"
        />
        <div class="p-4 bg-surface-200 rounded-[10px]">
            <div class="flex justify-between mb-[30px]">
                <div class="flex space-x-4 ">
                    <SelectField
                        v-model="formData.statusId"
                        size="sm"
                        :options="formInfo.statusesOptions"
                    />
                    <SelectField
                        v-model="formData.voteId"
                        size="sm"
                        :options="formInfo.voteOptions"
                    />
                </div>
                <div v-if="!isSubdao">
                    <BaseButton
                        view="outlined"
                        :icon="{
                            name: 'plus',
                            width: 14,
                            prepend: true
                        }"
                        @click="open('CreateProposalLayer')"
                    >
                        New Proposal
                    </BaseButton>
                </div>
            </div>
            <template v-if="tagList.value === TagStatuses.Proposals">
                <TextSeparator class="mb-[10px]">
                    3 active proposals
                </TextSeparator>
                <div class="space-y-[18px]">
                    <BaseCard
                        v-for="item in 3"
                        :key="item"
                        :avatar="require('@/assets/images/common/placeholder.jpeg')"
                        name="DAO Name"
                        label-title="Active"
                        title="Proposal Name"
                        votes="14"
                        :breadcrumbs-hash="false"
                        :users="[{ id: 1, avatar: require('@/assets/images/common/placeholder.jpeg') }, { id: 2, avatar: require('@/assets/images/common/placeholder.jpeg') }, { id: 3, avatar: require('@/assets/images/common/placeholder.jpeg') } ]"
                        text="Early Birds Early Birds  Early Birds Early Birds мEarly Birds Early Birds Early Birds Early Birds Early Birds Early Birds Early Birds Early Birds Early Birds Early Birds Early Birds Early Birds Early Birds Early Birds"
                        :end-date="new Date((new Date).setHours(23))"
                    />
                </div>
            </template>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import TagsList from '@/components/TagsList/TagsList.vue';
import BaseCard from '@/components/BaseCard/BaseCard.vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import TextSeparator from '@/components/TextSeparator/TextSeparator.vue';
import DaoPageHeader from '@/components/DaoPageHeader/DaoPageHeader.vue';
import SelectField from '@/components/Form/SelectField/SelectField.vue';
import useLayer from '@/composables/useLayer';

import { Statuses } from '@/models/statuses';

enum TagStatuses {
    Proposals,
    Statistics,
    DAOs,
    APPs
}

const { open } = useLayer();
const route = useRoute();

const tagList = ref({
    options: [
        { id: TagStatuses.Proposals, title: TagStatuses[TagStatuses.Proposals] },
        { id: TagStatuses.Statistics, title: TagStatuses[TagStatuses.Statistics] },
        { id: TagStatuses.DAOs, title: TagStatuses[TagStatuses.DAOs] },
        { id: TagStatuses.APPs, title: TagStatuses[TagStatuses.APPs] },
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

const breadcrumbs = [
    { title: 'DAO Name', link: { name: 'home' } },
    { title: 'SubDAO_3', link: { name: 'home' } },
    { title: 'Sub__1.2' }
]

const isSubdao = computed<boolean>(() => route.name === 'dao-id-subdao');
</script>
