<template>
    <div>
        <DaoPageHeader
            name="SubDAO_3"
            description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis disap"
            :breadcrumbs="breadcrumbs"
        />
        <div class="flex justify-between items-center text-sm tracking-[0.4px] text-gray-400 mt-[46px] mb-11">
            <BaseButton
                class="!text-gray-400"
                size="sm"
                view="ghost"
                :icon="{
                    name: 'arrow-left',
                    width: 10,
                    prepend: true
                }"
            >
                Back
            </BaseButton>
            <BaseButton
                class="!text-gray-400"
                size="sm"
                view="ghost"
                :icon="{
                    name: 'arrow-left',
                    class: '-scale-x-100',
                    width: 10
                }"
            >
                Next proposal
            </BaseButton>
        </div>
        <div class="flex -mx-4 -mt-8 mb-[65px]">
            <div class="mx-4 mt-8">
                <div class="border border-surface-300 rounded-[12px] p-8 h-full">
                    <p class="title-h3 !text-600 mb-3">
                        Proposal Name
                    </p>
                    <div class="flex items-center mb-11">
                        <BaseAvatar
                            class="mr-5"
                            :src="require('@/assets/images/common/placeholder.jpeg')"
                            alt="image"
                            size="sm"
                            rounded="sm"
                        >
                            <span class="font-semibold text-gray-600">
                                DAO Name
                            </span>
                        </BaseAvatar>
                        <BaseBreadcrumbs :items="breadcrumbs" />
                    </div>
                    <div>
                        <TextSeparator class="mb-3">
                            Description
                        </TextSeparator>
                        <p class="text-400">
                            Early Birds Early Birds Early Birds Early Birds мEarly Birds Early Birds Early Birds Early Birds
                            Early Birds Early Birds Early Birds Early Birds Early Birds Early Birds Early Birds Early Birds
                            Early Birds Early Birds
                            <br><br>
                            Early Birds Early Birds Early Birds Early Birds мEarly Birds Early Birds Early Birds Early Birds
                            Early Birds Early Birds Early Birds Early Birds Early Birds Early Birds Early Birds Early Birds
                            Early Birds Early Birds
                        </p>
                    </div>
                </div>
            </div>
            <div class="max-w-[252px] w-full box-border mx-4 mt-8 flex flex-col">
                <div class="px-3 py-4 border border-surface-300 rounded-[12px] mb-4">
                    <TextSeparator class="mb-4 pb-4 border-b border-surface-300">
                        Proposal Status
                    </TextSeparator>
                    <BaseLabel
                        theme="positive"
                        view="faded"
                        :theme-settings="{
                            root: 'rounded-[8px] w-full h-[44px] !text-sm'
                        }"
                    >
                        Active
                    </BaseLabel>
                </div>
                <div class="px-3 py-4 border border-surface-300 rounded-[12px] my-auto">
                    <TextSeparator class="mb-4 pb-4 border-b border-surface-300">
                        Created by
                    </TextSeparator>
                    <BaseAvatar
                        class="mr-5"
                        :src="require('@/assets/images/common/placeholder.jpeg')"
                        alt="image"
                        rounded="lg"
                    >
                        <p class="font-medium ml-2 text-gray-500">
                            0x2c934...a180
                        </p>
                    </BaseAvatar>
                </div>
                <div class="px-3 py-4 border border-surface-300 rounded-[12px] mt-4">
                    <TextSeparator class="mb-4 pb-4 border-b border-surface-300">
                        Current Results
                    </TextSeparator>
                </div>
            </div>
        </div>
        <div class="flex">
            <div class="mr-5 relative overflow-hidden z-[-2]">
                <div>
                    <div class="rounded-full border border-surface-300 w-[48px] h-[48px] flex items-center justify-center relative">
                        <BaseIcon
                            class="text-primary-400"
                            name="sparkle"
                            width="32"
                        />
                    </div>
                </div>
                <div class="bg-gray-200 w-px h-full absolute top-[48px] left-1/2 translate-y-[8px] -translate-x-1/2 h-full"></div>
            </div>
            <div class="flex-grow pt-1">
                <p class="title-h4 text-500 mb-[38px]">
                    Pipeline
                </p>
                <div class="space-y-4">
                    <div
                        v-for="item in 4"
                        :key="item"
                        class="border border-surface-300 rounded-[12px] px-8 pt-[28px] pb-10 relative"
                    >
                        <div class="max-w-[683px]">
                            <p
                                class="absolute bg-white left-[-52px] top-[30px] text-300 text-h5 py-1 font-bold"
                                :class="{
                                    'h-full': item === 4
                                }"
                            >
                                {{ item }}
                            </p>
                            <BaseAvatar
                                class="mr-5 mb-[30px]"
                                :src="require('@/assets/images/common/placeholder.jpeg')"
                                alt="image"
                                size="md"
                                :theme-settings="{
                                    image: 'border-[0.5px] border-gray-300'
                                }"
                            >
                                <p class="title-h4 text-50 ml-1">
                                    Uniswap
                                </p>
                            </BaseAvatar>
                            <p class="text-500 font-semibold mb-1">
                                By 1 item of
                                <ActionLink
                                    class="underline-offset-2 underline"
                                    href="#"
                                >
                                    0x2c934...a180
                                </ActionLink>
                            </p>
                            <p class="text-sm text-400 mb-8">
                                Subheading: Some text about this wonderful opportunity to do smth
                            </p>
                            <BaseCollapse v-show="showMore">
                                <div>
                                    <TextSeparator class="mb-6">
                                        Sub Actions:
                                    </TextSeparator>
                                    <div class="flex mb-8">
                                        <div class="w-[18px] h-[18px] bg-primary-400 rounded-full mr-[21px]"></div>
                                        <div class="flex-grow">
                                            <p class="text-500 font-semibold mb-2">
                                                Task Name Heading
                                            </p>
                                            <p class="text-sm text-400 mb-5">
                                                Subheading: Some text about this wonderful opportunity to do smth
                                            </p>
                                            <div class="bg-surface-200 rounded-[4px] px-6 py-4">
                                                <TextField
                                                    v-if="item !== 4"
                                                    v-model="formData.search"
                                                    label="NFT ID to byu for the price"
                                                    placeholder="ID to buy"
                                                    tooltip="some text"
                                                    :is-bold="true"
                                                    button-title="Use suggested ID"
                                                    @button-click="formData.search = 'Ян киса'"
                                                >
                                                    <template
                                                        v-if="item === 2"
                                                        #append-main
                                                    >
                                                        <div class="bg-white border border-surface-300 rounded-[4px] flex items-center ml-3 px-3 py-2.5">
                                                            <div class="bg-surface-200 rounded-[4px] text-gray-300 w-6 h-6 flex items-center justify-center cursor-pointer">
                                                                <BaseIcon
                                                                    name="minus"
                                                                    width="24"
                                                                />
                                                            </div>
                                                            <div class="mx-4 text-center">
                                                                <p class="text-xxs text-300 font-semibold">
                                                                    ID to buy
                                                                </p>
                                                                <p class="text-gray-500 font-semibold">
                                                                    333.333
                                                                </p>
                                                            </div>
                                                            <div class="bg-surface-200 rounded-[4px] text-gray-300 w-6 h-6 flex items-center justify-center cursor-pointer">
                                                                <BaseIcon
                                                                    name="plus-bold"
                                                                    width="24"
                                                                />
                                                            </div>
                                                        </div>
                                                    </template>
                                                </TextField>
                                                <div
                                                    v-if="item === 3"
                                                    class="mt-6 pt-[18px] pb-2.5 px-3 bg-surface-300"
                                                >
                                                    <div class="flex pb-[20px] mb-3 border-b border-gray-200 text-200 font-bold text-xs">
                                                        <p class="mr-3">
                                                            Other Votes(23)
                                                        </p>
                                                        <p>
                                                            Average
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <div class="flex justify-between font-medium text-xxs text-gray-400 mb-3">
                                                            <p>
                                                                Vote
                                                            </p>
                                                            <p>
                                                                Stake
                                                            </p>
                                                        </div>
                                                        <div class="space-y-3">
                                                            <div
                                                                v-for="row in 3"
                                                                :key="row"
                                                                class="flex items-center justify-between text-xxs text-gray-500 font-medium"
                                                            >
                                                                <BaseAvatar
                                                                    :src="require('@/assets/images/common/placeholder.jpeg')"
                                                                    alt="image"
                                                                    size="xxs"
                                                                    rounded="lg"
                                                                >
                                                            <span>
                                                                0x2c934...a180
                                                            </span>
                                                                </BaseAvatar>
                                                                348 ETH
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    v-if="item === 4"
                                                    class="relative"
                                                >
                                                    <TextField
                                                        v-model="formData.search"
                                                        label="NFT ID to byu for the price"
                                                        placeholder="Enter token amount"
                                                        tooltip="some text"
                                                    >
                                                        <template #append-inner-right="{ classes }">
                                                            <SelectField
                                                                v-model="formData.currencyId"
                                                                class="font-bold"
                                                                :class="classes"
                                                                :options="currenyItems"
                                                                size="xs"
                                                            />
                                                        </template>
                                                    </TextField>
                                                    <div class="w-6 h-1 relative z-[5] mx-auto cursor-pointer">
                                                        <BaseButton
                                                            class="h-6 w-6 !rounded-[4px] !text-gray-400 -translate-y-1/2 !p-0"
                                                            view="outlined"
                                                        >
                                                            <BaseIcon name="arrows-exchange"/>
                                                        </BaseButton>
                                                    </div>
                                                    <TextField
                                                        v-model="formData.search"
                                                        placeholder="Enter token amount"
                                                        :textarea="true"
                                                    >
                                                        <template
                                                            #append-inner-right="{ classes }"
                                                        >
                                                            <SelectField
                                                                v-model="formData.currencyId"
                                                                class="font-bold"
                                                                :class="classes"
                                                                :options="currenyItems"
                                                                size="xs"
                                                            />
                                                        </template>
                                                    </TextField>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </BaseCollapse>
                            <ShowMoreButton
                                v-model="showMore"
                            />
                            <div class="w-[28px] h-[28px] flex flex-col items-center justify-center border border-gray-100 rounded-[4px] absolute right-8 top-9 space-y-1">
                                <div
                                    v-for="item in 3"
                                    :key="item"
                                    class="w-[2.6px] h-[2.6px] rounded-full bg-gray-500"
                                >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex -mx-4 -mt-8 pt-[69px] relative after:absolute after:top-0 after:right-full after:h-full after:w-screen after:-scale-1 after:bg-white after:-z-1">
                    <BaseButton
                        class="w-[145px] uppercase mx-4 mt-8"
                    >
                        Against
                    </BaseButton>
                    <BaseButton
                        class="w-[145px] uppercase mx-4 mt-8"
                    >
                        For
                    </BaseButton>
                    <BaseButton
                        class="w-[145px] uppercase mx-4 mt-8"
                        view="outlined"
                    >
                        Abstain
                    </BaseButton>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';
import DaoPageHeader from '@/components/DaoPageHeader/DaoPageHeader.vue';
import BaseAvatar from '@/components/BaseAvatar/BaseAvatar.vue';
import BaseBreadcrumbs from '@/components/BaseBreadcrumbs/BaseBreadcrumbs.vue';
import BaseLabel from '@/components/BaseLabel/BaseLabel.vue';
import ActionLink from '@/components/ActionLink/ActionLink.vue';
import TextSeparator from '@/components/TextSeparator/TextSeparator.vue';
import TextField from '@/components/Form/TextField/TextField.vue';
import SelectField from '@/components/Form/SelectField/SelectField.vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import ShowMoreButton from '@/components/ShowMoreButton/ShowMoreButton.vue';
import BaseCollapse from '@/components/BaseCollapse/BaseCollapse.vue';
import { currenyItems } from '@/models/currency';
import { Statuses } from '@/models/statuses';

enum TagStatuses {
    Proposals,
    Statistics,
    DAOs,
    APPs
}

const tagList = ref({
    options: [
        {id: TagStatuses.Proposals, title: TagStatuses[TagStatuses.Proposals]},
        {id: TagStatuses.Statistics, title: TagStatuses[TagStatuses.Statistics]}
    ],
    value: TagStatuses.Proposals
})

const formData = ref({
    voteId: 0,
    statusId: Statuses.Active,
    search: 5,
    currencyId: currenyItems[0]['id']
});

const showMore = ref(false);

const formInfo = {
    voteOptions: [
        {id: 0, title: 'Need my vote'},
        {id: 1, title: 'All'}
    ],
    statusesOptions: [
        {id: Statuses.Active, title: Statuses[Statuses.Active]},
        {id: Statuses.Stopped, title: Statuses[Statuses.Stopped]},
        {id: Statuses.Closed, title: Statuses[Statuses.Closed]},
    ]
};

const breadcrumbs = [
    {title: 'DAO Name', link: {name: 'home'}},
    {title: 'SubDAO_3', link: {name: 'home'}},
    {title: 'Sub__1.2'}
]

const formResult = computed(() => ({
    search: formData.value.search,
    voteId: formData.value.voteId,
    statusId: formData.value.statusId
}));
</script>
