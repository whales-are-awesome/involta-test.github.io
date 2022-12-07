<template>
    <div>
        <DaoPageHeader
            class="mb-[46px] md:mb-[48px] sm:mb-[61px]"
            name="SubDAO_3"
            description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis disap"
            :breadcrumbs="breadcrumbs"
        />
        <div class="flex justify-between items-center text-sm tracking-[0.4px] text-gray-400  mb-11 md:-mx-3 md:mb-[37px] sm:-mx-5">
            <BaseButton
                class="!text-gray-400"
                :size="!isMobile.sm  ? 'sm' : 'mobile'"
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
                :size="!isMobile.sm  ? 'sm' : 'mobile'"
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
        <div class="flex -mx-4 -mt-11 mb-[65px] lg:flex-wrap md:-mt-8">
            <div class="mx-4 mt-11 md:mt-8">
                <div class="border border-surface-300 rounded-[12px] p-8 h-full sm:px-6">
                    <p class="title-h3 text-600 mb-3 md:text-h5 sm:mb-2.5">
                        Proposal Name
                    </p>
                    <div class="flex items-center mb-11 lg:mb-8 md:mb-11 sm:flex-col sm:items-start sm:mb-8">
                        <BaseAvatar
                            class="mr-5 flex-shrink-0"
                            :src="require('@/assets/images/common/placeholder.jpeg')"
                            alt="image"
                            size="sm"
                            rounded="sm"
                        >
                            <span class="font-semibold text-gray-600 sm:text-xs">
                                DAO Name
                            </span>
                        </BaseAvatar>
                        <BaseBreadcrumbs
                            class="sm:mt-1"
                            :items="breadcrumbs"
                        />
                    </div>
                    <div>
                        <TextSeparator class="mb-3 sm:text-xxs">
                            Description
                        </TextSeparator>
                        <p class="text-400 md:text-xs">
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
            <div class="max-w-[252px] w-full mx-4 mt-11 lg:max-w-none md:mt-8">
                <div class="min-h-full flex flex-col lg:flex-row lg:-mt-4 lg:-mx-2">
                    <div class="flex mb-4 lg:mt-4 lg:mb-0 lg:px-2 lg:w-[30.5%] md:w-1/3 sm:w-1/2">
                        <div class="w-full px-3 py-4 border border-surface-300 rounded-[12px]">
                            <TextSeparator
                                class="mb-4 pb-4 border-b border-surface-300 whitespace-nowrap"
                                :theme-settings="{
                                    root: 'md:before:hidden'
                                }"
                            >
                                Proposal Status
                            </TextSeparator>
                            <BaseLabel
                                theme="positive"
                                view="faded"
                                :theme-settings="{
                                    root: 'rounded-[8px] w-full h-[44px] md:h-[24px] '
                                }"
                            >

                                <span class="text-sm md:!text-xxs sm:!text-xxs">Active</span>
                            </BaseLabel>
                        </div>
                    </div>
                    <div class="flex my-auto lg:mt-4 lg:mb-0 lg:px-2 lg:w-[39%] md:w-1/3 sm:w-1/2">
                        <div class="w-full px-3 py-4 border border-surface-300 rounded-[12px]">
                            <TextSeparator
                                class="mb-4 pb-4 border-b border-surface-300"
                                :theme-settings="{
                                    root: 'md:before:hidden'
                                }"
                            >
                                Created by
                            </TextSeparator>
                            <BaseAvatar
                                :src="require('@/assets/images/common/placeholder.jpeg')"
                                alt="image"
                                rounded="full"
                            >
                                <p class="font-medium ml-2 text-gray-500 md:text-xxs md:ml-0">
                                    0x2c934...a180
                                </p>
                            </BaseAvatar>
                        </div>
                    </div>
                    <div class="flex mt-4 lg:px-2 lg:w-[30.5%] md:w-1/3 sm:hidden">
                        <div class="w-full px-3 py-4 border border-surface-300 rounded-[12px]">
                            <TextSeparator
                                class="mb-4 pb-4 border-b border-surface-300 whitespace-nowrap"
                                :theme-settings="{
                                    root: 'md:before:hidden'
                                }"
                            >
                                Current Results
                            </TextSeparator>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex">
            <div class="mr-5 relative overflow-hidden z-[-2] flex-shrink-0 sm:mr-2">
                <div>
                    <div class="rounded-full border border-surface-300 w-[48px] h-[48px] flex items-center justify-center relative sm:w-[28px] sm:h-[28px]">
                        <BaseIcon
                            class="text-primary-400"
                            name="sparkle"
                            :width="!isMobile.sm ? 32 : 16"
                        />
                    </div>
                </div>
                <div class="bg-gray-200 w-px h-full absolute top-[48px] left-1/2 translate-y-[8px] -translate-x-1/2 h-full"></div>
            </div>
            <div class="flex-grow pt-1 sm:pt-0">
                <p class="title-h4 text-500 mb-[38px] lg:mb-[34px] sm:mb-[30px]">
                    Pipeline
                </p>
                <div class="space-y-4">
                    <div
                        v-for="item in 4"
                        :key="item"
                        class="border border-surface-300 rounded-[12px] px-8 pt-[28px] pb-10 relative sm:px-3 sm:py-4"
                    >
                        <div>
                            <p
                                class="absolute bg-white left-[-52px] top-[30px] text-300 text-h5 py-1 font-bold sm:-left-[28px] sm:text-lg"
                                :class="{
                                    'h-full': item === 4
                                }"
                            >
                                {{ item }}
                            </p>
                            <BaseAvatar
                                class="mr-5 mb-[30px] sm:mb-[32px]"
                                :src="require('@/assets/images/common/placeholder.jpeg')"
                                alt="image"
                                size="md"
                                :rounded="!isMobile.sm ? 'sm' : 'xs'"
                                :theme-settings="{
                                    image: 'border-[0.5px] border-gray-300'
                                }"
                            >
                                <p class="title-h4 text-50 ml-1 sm:ml-0 sm:text-md">
                                    Uniswap
                                </p>
                            </BaseAvatar>
                            <p class="text-500 font-semibold mb-1 lg:mb-2">
                                By 1 item of
                                <ActionLink
                                    class="underline-offset-2 underline"
                                    href="#"
                                >
                                    0x2c934...a180
                                </ActionLink>
                            </p>
                            <p class="text-sm text-400">
                                Subheading: Some text about this wonderful opportunity to do smth
                            </p>
                            <BaseCollapse v-show="showMore">
                                <div class="mt-6">
                                    <TextSeparator class="mb-6 sm:text-xxs">
                                        Sub Actions:
                                    </TextSeparator>
                                    <div class="flex mb-8">
                                        <div class="w-[18px] h-[18px] bg-primary-400 rounded-full mr-[21px] flex-shrink-0 sm:w-[12px] sm:h-[12px] sm:mr-3"></div>
                                        <div class="flex-grow">
                                            <p class="text-500 font-semibold text-sm mb-2 sm:mb-3">
                                                Task Name Heading
                                            </p>
                                            <p class="text-xs text-400 mb-5 sm:text-xs">
                                                Subheading: Some text about this wonderful opportunity to do smth
                                            </p>
                                            <div class="bg-surface-200 rounded-[4px] px-6 py-4 sm:p-2">
                                                <BlockInfo
                                                    class="mb-2"
                                                    title="NFT ID to byu for the price"
                                                    tooltip="some text"
                                                    description="description"
                                                />
                                                <div class="flex flex-wrap -mx-1.5 -mt-2">
                                                    <div class="w-1/2 px-1.5 mt-2 sm:w-full">
                                                        <TextField
                                                            v-if="item !== 4"
                                                            v-model="formData.search"
                                                            placeholder="ID to buy"
                                                            :is-bold="true"
                                                            view="floating-placeholder"
                                                            :description="item !==1 ? 'description' : null"
                                                            :button-title="item === 1 && !isMobile.sm ? 'Use suggested ID' : null"
                                                            :theme-settings="{
                                                            main: 'sm:flex-col sm:items-stretch'
                                                        }"
                                                            @button-click="formData.search = 'lol'"
                                                        />
                                                    </div>
                                                    <div class="w-1/2 px-1.5 mt-2 sm:w-full">
                                                        <div
                                                            v-if="item === 2"
                                                            class="bg-white border border-surface-300 rounded-[4px] flex items-center justify-between px-3 py-2.5 sm:w-full sm:ml-0"
                                                        >
                                                            <div class="bg-surface-200 rounded-[4px] text-gray-300 w-8 h-8 flex items-center justify-center cursor-pointer">
                                                                <BaseIcon
                                                                    name="minus"
                                                                    width="30"
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
                                                            <div class="bg-surface-200 rounded-[4px] text-gray-300 w-8 h-8 flex items-center justify-center cursor-pointer">
                                                                <BaseIcon
                                                                    name="plus-bold"
                                                                    width="30"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <ShowMoreButton
                                                    v-if="item !== 4"
                                                    class="mt-4 h-[30px]"
                                                    v-model="showMore"
                                                />
                                                <div
                                                    v-if="item === 3"
                                                    class="mt-6 pt-[18px] pb-2.5 px-3 bg-surface-300 rounded-[4px]"
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
                                                                    rounded="full"
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
                                                        title="NFT ID to byu for the price"
                                                        placeholder="Enter token amount"
                                                        tooltip="some text"
                                                        view="swap"
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
                                                            :theme-settings="{
                                                                bg: 'bg-white'
                                                            }"
                                                        >
                                                            <BaseIcon name="arrows-exchange"/>
                                                        </BaseButton>
                                                    </div>
                                                    <TextField
                                                        v-model="formData.search"
                                                        placeholder="Enter token amount"
                                                        view="swap"
                                                        size="xl"
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
                                class="mt-8"
                                v-model="showMore"
                            />
                            <div class="w-[28px] h-[28px] flex flex-col items-center justify-center border border-gray-100 rounded-[4px] absolute right-8 top-9 space-y-1 sm:right-3 sm:top-4">
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
                <div class="flex -mx-4 -mt-8 pt-[69px] relative after:absolute after:top-0 after:right-full after:h-full after:w-screen after:-scale-1 after:bg-white after:-z-1 md:-mx-2 sm:-mx-1">
                    <div class="w-[145px] px-4 mt-8 md:w-1/3 md:px-2 sm:px-1">
                        <BaseButton
                            class="uppercase w-full"
                            :size="isMobile.sm ? 'sm' : 'md'"
                        >
                            Against
                        </BaseButton>
                    </div>
                    <div class="w-[145px] px-4 mt-8 md:w-1/3 md:px-2 sm:px-1">
                        <BaseButton
                            class="uppercase w-full"
                            :size="isMobile.sm ? 'sm' : 'md'"
                        >
                            For
                        </BaseButton>
                    </div>
                    <div class="w-[145px] px-4 mt-8 md:w-1/3 md:px-2 sm:px-1">
                        <BaseButton
                            class="uppercase w-full"
                            :size="isMobile.sm ? 'sm' : 'md'"
                            view="outlined"
                        >
                            Abstain
                        </BaseButton>
                    </div>
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
import BlockInfo from '@/components/BlockInfo/BlockInfo.vue';
import useIsMobile from '@/composables/useIsMobile';
import useError from '@/composables/useError';
import { currenyItems } from '@/types/currency';
import { Statuses } from '@/types/statuses';


// META

enum TagStatuses {
    Proposals,
    Statistics,
    DAOs,
    APPs
}

const isMobile = useIsMobile();

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
