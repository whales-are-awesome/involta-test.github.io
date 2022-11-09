<template>
    <div class="mt-[94px] sm:mt-[62px]">
        <BaseAvatar
            class="mb-[46px] md:mb-[35px] sm:mb-[38px]"
            :src="require('@/assets/images/common/placeholder.jpeg')"
            alt="image"
            size="xl"
        >
            <p class="text-gray-800 ml-7 sm:ml-2">
                Welcome,
                <br>
                dear user
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
        </div>
        <div v-if="tagList.value === TagStatuses.DAOs">
            <div
                class="flex flex-wrap -mx-3 -mt-6 mb-8 sm:-mx-[9px]"
            >
                <div
                    class="w-1/4 px-3 mt-6 md:w-1/3 sm:w-1/2 sm:px-[9px]"
                    v-for="item in 12"
                    :key="item"
                >
                    <DaoCard
                        :avatar="require('@/assets/images/common/placeholder.jpeg')"
                        name="DAO Name"
                        supported-by="232 OC"
                        backed-by="100 OC"
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
import { computed, ref } from 'vue';
import BaseAvatar from '@/components/BaseAvatar/BaseAvatar.vue';
import TagsList from '@/components/TagsList/TagsList.vue';
import DaoCard from '@/components/DaoCard/DaoCard.vue';
import BaseCard from '@/components/BaseCard/BaseCard.vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import BaseSearch from '@/components/BaseSearch/BaseSearch.vue';
import SelectField from '@/components/Form/SelectField/SelectField.vue';

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
        { id: TagStatuses.Statistics, title: TagStatuses[TagStatuses.Statistics] },
        { id: TagStatuses.DAOs, title: TagStatuses[TagStatuses.DAOs] },
        { id: TagStatuses.APPs, title: TagStatuses[TagStatuses.APPs] }
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
