<template>
    <div>
        <DaoPageHeader
            v-if="pageData"
            class="mb-[33px]"
            :name="pageData?.name"
            :breadcrumbs="breadcrumbs"
            :owner="pageData?.owner"
            :link="pageData?.link"
            :description="pageData?.description"
        />
        <div v-else class="-preloader -preloader_placeholder"></div>
        <div v-if="pageData && proposalData">
            <div
                class="flex -mx-4 -mt-11 mb-[65px] xl:flex-wrap md:-mt-8"
                :class="{
                    '-preloader -preloader_cover': proposal.pending
                }"
            >
                <div class="mx-4 mt-11 flex-grow md:mt-8">
                    <div class="flex justify-between items-center text-sm tracking-[0.4px] text-gray-400  mb-11 md:-mx-3 md:mb-[37px] sm:-mx-5">
                        <BaseButton
                            :size="!isMobile.sm  ? 'sm' : 'mobile'"
                            view="ghost"
                            :icon="{
                                name: 'arrow-left',
                                width: 10,
                                prepend: true
                            }"
                            :theme-settings="{
                                textColor: 'text-gray-400'
                            }"
                            @click="$router.push(windowLocal.history?.state?.back ? windowLocal.history.state.back : { name: 'network-dao-address', params: $route.params })"
                        >
                            Back
                        </BaseButton>
                        <!--                <BaseButton-->
                        <!--                    :size="!isMobile.sm  ? 'sm' : 'mobile'"-->
                        <!--                    view="ghost"-->
                        <!--                    :icon="{-->
                        <!--                        name: 'arrow-left',-->
                        <!--                        className: '-scale-x-100',-->
                        <!--                        width: 10-->
                        <!--                    }"-->
                        <!--                    :theme-settings="{-->
                        <!--                        textColor: 'text-gray-400'-->
                        <!--                    }"-->
                        <!--                >-->
                        <!--                    Next proposal-->
                        <!--                </BaseButton>-->
                    </div>
                    <div class="border border-surface-300 rounded-[12px] p-8 xl:mb-3 sm:px-6">
                        <p class="title-h3 text-600 mb-3 md:text-h5 sm:mb-2.5">
                            {{ proposalData?.name }}
                        </p>
                        <div class="flex items-center mb-11 lg:mb-8 md:mb-11 sm:flex-col sm:items-start sm:mb-8">
                            <BaseAvatar
                                class="mr-5 flex-shrink-0"
                                :src="require('@/assets/images/common/placeholder.jpg')"
                                alt="image"
                                size="sm"
                                rounded="sm"
                            >
                        <span class="font-semibold text-gray-600 sm:text-xs">
                            {{ pageData?.name }}
                        </span>
                            </BaseAvatar>
                            <!--                            <BaseBreadcrumbs-->
                            <!--                                class="sm:mt-1"-->
                            <!--                                :items="breadcrumbs"-->
                            <!--                            />-->
                        </div>
                        <div>
                            <TextSeparator class="mb-3 sm:text-xxs">
                                Description
                            </TextSeparator>
                            <p class="text-400 md:text-xs">
                                {{ proposalData?.description }}
                            </p>
                        </div>
                    </div>
                    <template v-if="!isMobile.xl">
                        <div class="flex flex-wrap -mx-1.5 -mt-3">
                            <div
                                class="flex w-1/3 mt-3 px-1.5"
                                v-for="index in 3"
                                :key="index"
                                :class="{
                                    'w-1/3 sm:w-1/2': index !== 3,
                                    'w-1/3 sm:w-full': index === 3
                                }"
                            >
                                <div class="w-full px-3 py-4 border border-surface-300 rounded-[12px]">
                                    <TextSeparator
                                        class="mb-4 whitespace-nowrap"
                                        :theme-settings="{
                                            root: 'xl:before:hidden'
                                        }"
                                    >
                                        <template v-if="index === 1">
                                            Proposal Status
                                        </template>
                                        <template v-if="index === 2">
                                            Created by
                                        </template>
                                        <template v-if="index === 3">
                                            My current Voting Power
                                        </template>
                                        <template v-if="index === 4">
                                            Cast Your Vote
                                        </template>
                                    </TextSeparator>
                                    <BaseLabel
                                        v-if="index === 1"
                                        :theme="labelTheme"
                                        view="faded"
                                        :theme-settings="{
                                            root: 'rounded-[8px] w-full h-[36px] '
                                        }"
                                    >

                                    <span class="text-sm md:!text-xxs sm:!text-xxs">
                                        {{ labelTitleLocal }}
                                    </span>
                                    </BaseLabel>
                                    <BaseAvatar
                                        v-if="index === 2"
                                        :hexheads="proposal?.data?.createdBy"
                                        alt="image"
                                        rounded="full"
                                    >
                                        <p class="font-medium ml-2 text-gray-500 md:text-xxs md:ml-0">
                                            {{ proposal?.data?.createdByAddressOrName }}
                                        </p>
                                    </BaseAvatar>
                                    <div
                                        v-if="index === 3"
                                        class="flex items-center font-semibold text-gray-600 md:text-sm"
                                    >
                                        <div class="w-[30px] h-[30px] flex items-center justify-center rounded-full bg-[#F3F3FF] border border-[#7C7CF1] mr-3">
                                            <BaseIcon
                                                name="light"
                                                width="12"
                                                height="15"
                                            />
                                        </div>
                                        {{ proposalData?.votingPower }} Tokens
                                    </div>
                                    <template v-if="index === 4">
                                        <div class="space-y-3 mb-3">
                                            <ProposalVote
                                                v-model="currentVote"
                                                :field-value="ProposalVoteType.For"
                                                title="For"
                                                :votes="proposalData?.forVp"
                                                :vote="proposalData?.vote"
                                                :can-vote="canVote"
                                                :progress="cropPercents((proposalData?.forVp / proposalData?.totalVp * 100) || 0)"
                                            />
                                            <ProposalVote
                                                v-model="currentVote"
                                                :field-value="ProposalVoteType.Against"
                                                title="Against"
                                                :votes="proposalData?.againstVp"
                                                :vote="proposalData?.vote"
                                                :can-vote="canVote"
                                                :progress="cropPercents((proposalData?.againstVp / proposalData?.totalVp * 100) || 0)"
                                            />
                                            <ProposalVote
                                                v-model="currentVote"
                                                :field-value="ProposalVoteType.Abstain"
                                                title="Abstain"
                                                :votes="proposalData?.abstainVp"
                                                :vote="proposalData?.vote"
                                                :can-vote="canVote"
                                                :progress="cropPercents((proposalData?.abstainVp / proposalData?.totalVp * 100) || 0)"
                                            />
                                        </div>
                                        <div class="flex justify-between">
                                            <div></div>
                                            <BaseButton
                                                v-if="proposalData?.vote === ProposalVoteType.None && +proposalData?.votingPower"
                                                class="w-[96px]"
                                                size="sm"
                                                theme="primary"
                                                :disabled="!currentVote"
                                                @click="vote"
                                            >
                                                Vote
                                            </BaseButton>
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </template>
                    <div
                        v-if="proposalData?.pipeline.length"
                        class="flex mt-16"
                    >
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
                                    v-for="(item, index) in proposalData?.pipeline"
                                    :key="index"
                                    class="border border-surface-300 rounded-[12px] px-8 pt-[28px] pb-10 relative sm:px-3 sm:py-4"
                                >
                                    <div>
                                        <p
                                            class="absolute bg-white left-[-52px] top-[30px] text-300 text-h5 py-1 font-bold sm:-left-[28px] sm:text-lg"
                                            :class="{
                                                'h-full': index ===  proposalData?.pipeline.length - 1
                                            }"
                                        >
                                            {{ index + 1 }}
                                        </p>
                                        <BaseAvatar
                                            v-if="!item.isContract"
                                            class="mr-5 mb-[30px] sm:mb-[32px]"
                                            :hexheads="item.to"
                                            alt="image"
                                            size="md"
                                            :rounded="!isMobile.sm ? 'sm' : 'xs'"
                                            :theme-settings="{
                                                image: 'border-[0.5px] border-gray-300'
                                            }"
                                        >
                                            <p class="text-lg text-500 font-semibold mb-1 lg:mb-2">
                                                Interaction with
                                                <ActionLink
                                                    class="underline-offset-2 underline"
                                                    :href="`//${ route.params.network }.etherscan.io/address/${ item.to }`"
                                                    target="_blank"
                                                >
                                                    {{ item.addressOrName }}
                                                </ActionLink>
                                            </p>
                                        </BaseAvatar>
                                        <p class="text-400">
                                            <strong>Value:</strong> {{ item.value }}
                                            <br>
                                            <strong>Data:</strong> {{ item.data }}
                                        </p>
                                        <!--                                <BaseCollapse v-show="showMore">-->
                                        <!--                                    <div class="mt-6">-->
                                        <!--                                        <TextSeparator class="mb-6 sm:text-xxs">-->
                                        <!--                                            Sub Actions:-->
                                        <!--                                        </TextSeparator>-->
                                        <!--                                        <div class="flex mb-8">-->
                                        <!--                                            <div class="w-[18px] h-[18px] bg-primary-400 rounded-full mr-[21px] flex-shrink-0 sm:w-[12px] sm:h-[12px] sm:mr-3"></div>-->
                                        <!--                                            <div class="flex-grow">-->
                                        <!--                                                <p class="text-500 font-semibold text-sm mb-2 sm:mb-3">-->
                                        <!--                                                    Task Name Heading-->
                                        <!--                                                </p>-->
                                        <!--                                                <p class="text-xs text-400 mb-5 sm:text-xs">-->
                                        <!--                                                    Subheading: Some text about this wonderful opportunity to do smth-->
                                        <!--                                                </p>-->
                                        <!--                                                <div class="bg-surface-200 rounded-[4px] px-6 py-4 sm:p-2">-->
                                        <!--                                                    <BlockInfo-->
                                        <!--                                                        class="mb-2"-->
                                        <!--                                                        title="NFT ID to byu for the price"-->
                                        <!--                                                        tooltip="some text"-->
                                        <!--                                                        description="description"-->
                                        <!--                                                    />-->
                                        <!--                                                    <div class="flex flex-wrap -mx-1.5 -mt-2">-->
                                        <!--                                                        <div class="w-1/2 px-1.5 mt-2 sm:w-full">-->
                                        <!--                                                            <TextField-->
                                        <!--                                                                v-if="item !== 4"-->
                                        <!--                                                                v-model="formData.search"-->
                                        <!--                                                                placeholder="ID to buy"-->
                                        <!--                                                                :is-bold="true"-->
                                        <!--                                                                view="floating-placeholder"-->
                                        <!--                                                                :description="item !==1 ? 'description' : null"-->
                                        <!--                                                                :button-title="item === 1 && !isMobile.sm ? 'Use suggested ID' : null"-->
                                        <!--                                                                :theme-settings="{-->
                                        <!--                                                            main: 'sm:flex-col sm:items-stretch'-->
                                        <!--                                                        }"-->
                                        <!--                                                                @button-click="formData.search = 'lol'"-->
                                        <!--                                                            />-->
                                        <!--                                                        </div>-->
                                        <!--                                                        <div class="w-1/2 px-1.5 mt-2 sm:w-full">-->
                                        <!--                                                            <div-->
                                        <!--                                                                v-if="item === 2"-->
                                        <!--                                                                class="bg-white border border-surface-300 rounded-[4px] flex items-center justify-between px-3 py-2.5 sm:w-full sm:ml-0"-->
                                        <!--                                                            >-->
                                        <!--                                                                <div class="bg-surface-200 rounded-[4px] text-gray-300 w-8 h-8 flex items-center justify-center cursor-pointer">-->
                                        <!--                                                                    <BaseIcon-->
                                        <!--                                                                        name="minus"-->
                                        <!--                                                                        width="30"-->
                                        <!--                                                                    />-->
                                        <!--                                                                </div>-->
                                        <!--                                                                <div class="mx-4 text-center">-->
                                        <!--                                                                    <p class="text-xxs text-300 font-semibold">-->
                                        <!--                                                                        ID to buy-->
                                        <!--                                                                    </p>-->
                                        <!--                                                                    <p class="text-gray-500 font-semibold">-->
                                        <!--                                                                        333.333-->
                                        <!--                                                                    </p>-->
                                        <!--                                                                </div>-->
                                        <!--                                                                <div class="bg-surface-200 rounded-[4px] text-gray-300 w-8 h-8 flex items-center justify-center cursor-pointer">-->
                                        <!--                                                                    <BaseIcon-->
                                        <!--                                                                        name="plus-bold"-->
                                        <!--                                                                        width="30"-->
                                        <!--                                                                    />-->
                                        <!--                                                                </div>-->
                                        <!--                                                            </div>-->
                                        <!--                                                        </div>-->
                                        <!--                                                    </div>-->
                                        <!--                                                    <ShowMoreButton-->
                                        <!--                                                        v-if="item !== 4"-->
                                        <!--                                                        class="mt-4 h-[30px]"-->
                                        <!--                                                        v-model="showMore"-->
                                        <!--                                                    />-->
                                        <!--                                                    <div-->
                                        <!--                                                        v-if="item === 3"-->
                                        <!--                                                        class="mt-6 pt-[18px] pb-2.5 px-3 bg-surface-300 rounded-[4px]"-->
                                        <!--                                                    >-->
                                        <!--                                                        <div class="flex pb-[20px] mb-3 border-b border-gray-200 text-200 font-bold text-xs">-->
                                        <!--                                                            <p class="mr-3">-->
                                        <!--                                                                Other Votes(23)-->
                                        <!--                                                            </p>-->
                                        <!--                                                            <p>-->
                                        <!--                                                                Average-->
                                        <!--                                                            </p>-->
                                        <!--                                                        </div>-->
                                        <!--                                                        <div>-->
                                        <!--                                                            <div class="flex justify-between font-medium text-xxs text-gray-400 mb-3">-->
                                        <!--                                                                <p>-->
                                        <!--                                                                    Vote-->
                                        <!--                                                                </p>-->
                                        <!--                                                                <p>-->
                                        <!--                                                                    Stake-->
                                        <!--                                                                </p>-->
                                        <!--                                                            </div>-->
                                        <!--                                                            <div class="space-y-3">-->
                                        <!--                                                                <div-->
                                        <!--                                                                    v-for="row in 3"-->
                                        <!--                                                                    :key="row"-->
                                        <!--                                                                    class="flex items-center justify-between text-xxs text-gray-500 font-medium"-->
                                        <!--                                                                >-->
                                        <!--                                                                    <BaseAvatar-->
                                        <!--                                                                        :src="require('@/assets/images/common/placeholder.jpg')"-->
                                        <!--                                                                        alt="image"-->
                                        <!--                                                                        size="xxs"-->
                                        <!--                                                                        rounded="full"-->
                                        <!--                                                                    >-->
                                        <!--                                                            <span>-->
                                        <!--                                                                0x2c934...a180-->
                                        <!--                                                            </span>-->
                                        <!--                                                                    </BaseAvatar>-->
                                        <!--                                                                    348 ETH-->
                                        <!--                                                                </div>-->
                                        <!--                                                            </div>-->
                                        <!--                                                        </div>-->
                                        <!--                                                    </div>-->
                                        <!--                                                    <div-->
                                        <!--                                                        v-if="item === 4"-->
                                        <!--                                                        class="relative"-->
                                        <!--                                                    >-->
                                        <!--                                                        <TextField-->
                                        <!--                                                            v-model="formData.search"-->
                                        <!--                                                            title="NFT ID to byu for the price"-->
                                        <!--                                                            placeholder="Enter token amount"-->
                                        <!--                                                            tooltip="some text"-->
                                        <!--                                                            view="swap"-->
                                        <!--                                                        >-->
                                        <!--                                                            <template #append-inner-right="{ classes }">-->
                                        <!--                                                                <SelectField-->
                                        <!--                                                                    v-model="formData.currencyId"-->
                                        <!--                                                                    class="font-bold"-->
                                        <!--                                                                    :class="classes"-->
                                        <!--                                                                    :options="currenyItems"-->
                                        <!--                                                                    size="xs"-->
                                        <!--                                                                />-->
                                        <!--                                                            </template>-->
                                        <!--                                                        </TextField>-->
                                        <!--                                                        <div class="w-6 h-1 relative z-[5] mx-auto cursor-pointer">-->
                                        <!--                                                            <BaseButton-->
                                        <!--                                                                class="h-6 w-6 !rounded-[4px] !text-gray-400 -translate-y-1/2 !p-0"-->
                                        <!--                                                                view="outlined"-->
                                        <!--                                                                :theme-settings="{-->
                                        <!--                                                                bg: 'bg-white'-->
                                        <!--                                                            }"-->
                                        <!--                                                            >-->
                                        <!--                                                                <BaseIcon name="arrows-exchange"/>-->
                                        <!--                                                            </BaseButton>-->
                                        <!--                                                        </div>-->
                                        <!--                                                        <TextField-->
                                        <!--                                                            v-model="formData.search"-->
                                        <!--                                                            placeholder="Enter token amount"-->
                                        <!--                                                            view="swap"-->
                                        <!--                                                            size="xl"-->
                                        <!--                                                        >-->
                                        <!--                                                            <template-->
                                        <!--                                                                #append-inner-right="{ classes }"-->
                                        <!--                                                            >-->
                                        <!--                                                                <SelectField-->
                                        <!--                                                                    v-model="formData.currencyId"-->
                                        <!--                                                                    class="font-bold"-->
                                        <!--                                                                    :class="classes"-->
                                        <!--                                                                    :options="currenyItems"-->
                                        <!--                                                                    size="xs"-->
                                        <!--                                                                />-->
                                        <!--                                                            </template>-->
                                        <!--                                                        </TextField>-->
                                        <!--                                                    </div>-->
                                        <!--                                                </div>-->
                                        <!--                                            </div>-->
                                        <!--                                        </div>-->
                                        <!--                                    </div>-->
                                        <!--                                </BaseCollapse>-->
                                        <!--                                <ShowMoreButton-->
                                        <!--                                    class="mt-8"-->
                                        <!--                                    v-model="showMore"-->
                                        <!--                                />-->
                                        <!--                                <div class="w-[28px] h-[28px] flex flex-col items-center justify-center border border-gray-100 rounded-[4px] absolute right-8 top-9 space-y-1 sm:right-3 sm:top-4">-->
                                        <!--                                    <div-->
                                        <!--                                        v-for="item in 3"-->
                                        <!--                                        :key="item"-->
                                        <!--                                        class="w-[2.6px] h-[2.6px] rounded-full bg-gray-500"-->
                                        <!--                                    >-->
                                        <!--                                    </div>-->
                                        <!--                                </div>-->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="max-w-[293px] w-full mx-4 mt-11 xl:max-w-none md:mt-8">
                    <div class="-mt-2">
                        <template
                            v-for="index in 4"
                            :key="index"
                        >
                            <div
                                v-if="isMobile.xl || (!isMobile.xl && index === 4)"
                                class="mt-2"
                            >
                                <div class="w-full px-3 py-4 border border-surface-300 rounded-[12px]">
                                    <TextSeparator
                                        class="mb-4 whitespace-nowrap"
                                        :theme-settings="{
                                            root: 'xl:before:hidden'
                                        }"
                                    >
                                        <template v-if="index === 1">
                                            Proposal Status
                                        </template>
                                        <template v-if="index === 2">
                                            Created by
                                        </template>
                                        <template v-if="index === 3">
                                            My current Voting Power
                                        </template>
                                        <template v-if="index === 4">
                                            Cast Your Vote
                                        </template>
                                    </TextSeparator>
                                    <BaseLabel
                                        v-if="index === 1"
                                        :theme="labelTheme"
                                        view="faded"
                                        :theme-settings="{
                                            root: 'rounded-[8px] w-full h-[44px] md:h-[24px] '
                                        }"
                                    >

                                    <span class="text-sm md:!text-xxs sm:!text-xxs">
                                        {{ labelTitleLocal }}
                                    </span>
                                    </BaseLabel>
                                    <BaseAvatar
                                        v-if="index === 2"
                                        :hexheads="proposal?.data?.createdBy"
                                        alt="image"
                                        rounded="full"
                                    >
                                        <p class="font-medium ml-2 text-gray-500 md:text-xxs md:ml-0">
                                            {{ proposal?.data?.createdByAddressOrName }}
                                        </p>
                                    </BaseAvatar>
                                    <div
                                        v-if="index === 3"
                                        class="flex items-center font-semibold text-gray-600"
                                    >
                                        <div class="w-[30px] h-[30px] flex items-center justify-center rounded-full bg-[#F3F3FF] border border-[#7C7CF1] mr-3">
                                            <BaseIcon
                                                name="light"
                                                width="12"
                                                height="15"
                                            />
                                        </div>
                                        {{ proposalData?.votingPower }} Tokens
                                    </div>
                                    <template v-if="index === 4">
                                        <div class="space-y-3 mb-3">
                                            <ProposalVote
                                                v-model="currentVote"
                                                :field-value="ProposalVoteType.For"
                                                title="For"
                                                :votes="proposalData?.forVp"
                                                :vote="proposalData?.vote"
                                                :can-vote="canVote"
                                                :progress="cropPercents((proposalData?.forVp / proposalData?.totalVp * 100) || 0)"
                                            />
                                            <ProposalVote
                                                v-model="currentVote"
                                                :field-value="ProposalVoteType.Against"
                                                title="Against"
                                                :votes="proposalData?.againstVp"
                                                :vote="proposalData?.vote"
                                                :can-vote="canVote"
                                                :progress="cropPercents((proposalData?.againstVp / proposalData?.totalVp * 100) || 0)"
                                            />
                                            <ProposalVote
                                                v-model="currentVote"
                                                :field-value="ProposalVoteType.Abstain"
                                                title="Abstain"
                                                :votes="proposalData?.abstainVp"
                                                :vote="proposalData?.vote"
                                                :can-vote="canVote"
                                                :progress="cropPercents((proposalData?.abstainVp / proposalData?.totalVp * 100) || 0)"
                                            />
                                        </div>
                                        <div class="flex justify-between items-center">
                                            <div v-if="proposalData?.totalVp">
                                                {{ proposalData?.totalVp }} in total
                                            </div>
                                            <BaseButton
                                                v-if="canVote"
                                                class="w-[96px]"
                                                size="sm"
                                                theme="primary"
                                                :disabled="!currentVote"
                                                @click="vote"
                                            >
                                                Vote
                                            </BaseButton>
                                            <BaseButton
                                                v-if="canExecute"
                                                class="w-[96px]"
                                                size="sm"
                                                theme="primary"
                                                @click="execute"
                                            >
                                                Execute
                                            </BaseButton>
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="-preloader -preloader_placeholder"></div>
    </div>
</template>

<script lang="ts" setup>
import { computed, onUnmounted, ref, watch, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { notify } from '@kyvg/vue3-notification';
import { useTitle } from '@vueuse/core';

import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';
import DaoPageHeader from '@/components/DaoPageHeader/DaoPageHeader.vue';
import BaseAvatar from '@/components/BaseAvatar/BaseAvatar.vue';
import BaseLabel from '@/components/BaseLabel/BaseLabel.vue';
import ActionLink from '@/components/ActionLink/ActionLink.vue';
import TextSeparator from '@/components/TextSeparator/TextSeparator.vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import ProposalVote from '@/components/ProposalVote/ProposalVote.vue';
import { IBreadcrumb } from '@/components/BaseBreadcrumbs/types';

import useIsMobile from '@/composables/useIsMobile';
import useError from '@/composables/useError';
import useDao from '@/composables/fetch/useDao';
import { useFetchData } from '@/composables/useFetchData';

import { currenyItems } from '@/types/currency';
import { Statuses } from '@/types/statuses';
import { IProposalNormalizedAsDefault } from '@/types/services/ProposalService';
import { NetworksType } from '@/types/networks';
import { ProposalStatus, ProposalVoteType } from '@/types/entries/proposal';


import emitter from '@/plugins/mitt';
import ProposalService from '@/services/ProposalService';
import cropPercents from '@/helpers/cropPercents';


// META

const isMobile = useIsMobile();

const route = useRoute();

const formData = ref({
    voteId: 0,
    statusId: Statuses.Active,
    search: 5,
    currencyId: currenyItems[0]['id']
});


// META:PAGE

const [page, fetchDao] = useDao({
    address: route.params.address as string
}, {
    saveInStorage: true
});

const pageData = computed(() => page.value.data);

emitter.on('daoFollowed', fetchDao);
emitter.on('accountChanged', fetchDao);

watchEffect(() => {
    page.value.error && useError(404);
});

onUnmounted(() => {
    emitter.off('daoFollowed', fetchDao);
    emitter.off('accountChanged', fetchDao);
});


// META:IS REJECTED

const isExpired = computed(() => currentDate.value > new Date(proposalData.value?.endTime || 0) && proposalData.value?.status === ProposalStatus.Exists);


const showMore = ref(false);



// WINDOW

const windowLocal = window as Window;

// BREADCRUMBS

const breadcrumbs = computed(() => {
    if (!pageData.value?.path.length) return [];

    const data: IBreadcrumb[] = [...pageData.value?.path].reverse().map(item => ({
        title: item.name,
        link: { name: 'network-dao-address', params: { network: route.params.network, address: item.address } }
    }));

    data.push({ title: pageData.value?.fullName });

    return data;
});


// PROPOSAL. USED: VOTE

const proposal = useFetchData<IProposalNormalizedAsDefault>();

fetchProposal();

async function fetchProposal() {
    proposal.value.pending = true;
    proposal.value.cancel();

    const [data, error, cancel] = await ProposalService.sample.fetch(
        {
            network: route.params.network as NetworksType,
            address: route.params.address as string,
            id: +route.params.proposalId
        }
    ).default();

    proposal.value = { data, cancel, pending: false };
}

const proposalData = computed(() => proposal.value.data);

watchEffect(() => {
    if (proposalData.value?.name) {
        useTitle( 'OuterCircle | ' + proposalData.value?.name);
    }
});


// VOTE

const currentVote = ref(ProposalVoteType.None);

const canVote = computed(() =>
    proposalData.value?.vote === ProposalVoteType.None
    && proposalData.value?.status === ProposalStatus.Exists
    && !!+proposalData.value?.votingPower
    && !isExpired.value
)

async function vote() {
    if (proposalData.value?.vote !== ProposalVoteType.None) {
        return;
    }

    proposal.value.pending = true;

    const [data, error, cancel] = await ProposalService.sample.vote(
        {
            proposald: route.params.proposalId,
            network: route.params.network,
            contractAddress: route.params.address,
            decision: currentVote.value
        }
    );

    if (!error) {
        await fetchProposal();
        notify({
            title: 'Success',
            text: 'You have successfully voted for proposal',
            data: {
                view: 'shadow',
                theme: 'success'
            }
        });
    } else {
        proposal.value.pending = false;
        notify({
            title: 'Error',
            text: 'Something went wrong',
            data: {
                view: 'shadow',
                theme: 'alert'
            }
        });
    }
}

watch(() => proposal.value.data, () => {
    currentVote.value = proposal.value.data?.vote || ProposalVoteType.None;
});

// CURRENT DATE. USED: LABEL

const currentDate = ref(new Date());

const currentDateInt = setInterval(() => currentDate.value = new Date(), 1000);

onUnmounted(() => clearInterval(currentDateInt));


// LABEL

const labelTitleLocal = computed(() => isExpired.value ? 'Expired': proposalData.value?.statusName);

const labelTheme = computed(() => [
    'neutral',
    'primary',
    'positive',
    'positive',
    'critical',
][isExpired.value ? ProposalStatus.Rejected : (proposalData.value?.status || 0)]);


// EXECUTE

const canExecute = computed(() => proposalData.value?.status === ProposalStatus.Accepted && +proposalData.value?.votingPower);

async function execute() {
    proposal.value.pending = true;

    const [data, error, cancel] = await ProposalService.sample.execute(
        {
            network: route.params.network,
            proposald: route.params.proposalId,
            contractAddress: route.params.address
        }
    );

    if (!error) {
        await fetchProposal();
        notify({
            title: 'Success',
            text: 'You have successfully executed for proposal',
            data: {
                view: 'shadow',
                theme: 'success'
            }
        });
    } else {
        proposal.value.pending = false;
        notify({
            title: 'Error',
            text: 'Something went wrong',
            data: {
                view: 'shadow',
                theme: 'alert'
            }
        });
    }
}

</script>
