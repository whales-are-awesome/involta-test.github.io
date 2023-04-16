<template>
    <RouterLink
        :class="classes.root"
        :to="to"
    >
        <div>
            <div :class="classes.top">
                <BaseTimer
                    v-if="canVote"
                    :class="classes.timerMobile"
                    :end-date="endDate"
                />
                <BaseLabel
                    :class="classes.label"
                    :theme="labelTheme"
                    view="faded"
                >
                    {{ labelTitleLocal }}
                </BaseLabel>
                <BaseAvatar
                    :class="classes.avatar"
                    :src="avatar"
                    alt="image"
                    size="sm"
                    rounded="xs"
                >
                <span
                    v-if="name"
                    :class="classes.daoName"
                >
                    {{ name }}
                </span>
                </BaseAvatar>
            </div>
            <div
                v-if="title"
                :class="classes.title"
            >
                {{ title }}
            </div>
            <div
                v-if="text"
                :class="classes.text"
            >
                {{ text }}
            </div>
            <div
                v-if="canVote"
                :class="classes.bottom"
            >
                <BaseTimer
                    :class="classes.timer"
                    :end-date="endDate"
                />
<!--                <div :class="classes.users">-->
<!--                    <BaseAvatar-->
<!--                        v-for="user in users.slice(0, 4)"-->
<!--                        :key="user.id"-->
<!--                        :class="classes.usersItem"-->
<!--                        size="xs"-->
<!--                        :src="user.avatar"-->
<!--                        rounded="full"-->
<!--                        :alt="`avatar - ${ user.id }`"-->
<!--                    />-->
<!--                </div>-->
<!--                <div :class="classes.votes">-->
<!--                    {{ users.length }} votes-->
<!--                </div>-->
            </div>
            <template v-if="canVote">
                <BaseButton
                    :class="classes.voteButton"
                    rounded="sm"
                    size="sm"
                    :icon="{
                        name: 'arrow-right',
                        width: 16
                    }"
                    @click="$router.push({ name: 'proposal-id', params: { id: 2 } })"
                >
                    Vote
                </BaseButton>
                <BaseButton
                    :class="classes.voteButtonMobile"
                    view="ghost"
                    size="md"
                    :icon="{
                        name: 'arrow-right',
                        width: 16
                    }"
                    @click="$router.push({ name: 'proposal-id', params: { id: 2 } })"
                >
                    Vote
                </BaseButton>
            </template>
        </div>
    </RouterLink>
</template>


<script lang="ts" setup>
import { computed, ref, onUnmounted } from 'vue';
import BaseAvatar from '@/components/BaseAvatar/BaseAvatar.vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import BaseTimer from '@/components/BaseTimer/BaseTimer.vue';
import BaseLabel from '@/components/BaseLabel/BaseLabel.vue';
import { ProposalStatus, proposalStatuses, ProposalVoteType } from '@/types/entries/proposal';
import { IUsers } from './types';
import IRouterLink from '@/types/routerLink';
import makeClasses from '@/helpers/makeClasses';
import ThemeSettings from '@/types/themeSettings';


// META

interface IProps {
    to: IRouterLink
    avatar: string
    name: string
    status: ProposalStatus
    labelTitle: string
    title: string
    text: string
    endDate: Date
    hasVotingPower: boolean
    users: IUsers[]
    themeSettings?: ThemeSettings<'root'>
}

const props = withDefaults(defineProps<IProps>(), {});


// CURRENT DATE. USED: CAN VOTE, IS REJECTED

const currentDate = ref(new Date());

const int = setInterval(() => {
    currentDate.value = new Date();
});

onUnmounted(() => {
    clearInterval(int);
});


// CLASSES

interface IThemeProps extends Pick<IProps, 'themeSettings'>{}

const useClasses = makeClasses<IThemeProps>(() => ({
    root: ({ themeSettings }) => [themeSettings?.root,
        'block bg-white shadow-[0_4px_20px_rgba(108,108,125,.08)] border border-gray-100 rounded-[10px] p-6 sm:pb-0 overflow-hidden'
    ],
    top: 'flex items-center mb-8 sm:flex-wrap',
    label: 'mr-4 sm:mr-0 sm:mb-8',
    avatar: 'mr-5 flex-shrink-0 sm:w-full sm:mr-0',
    breadcrumbs: 'sm:w-full sm:mt-[3px] sm:ml-[43px]',
    title: 'text-500 text-h5 font-bold mb-[13px] sm:mb-2.5',
    text: 'text-400 mb-6 line-clamp-2 !leading-[28px] overflow-ellipsis sm:!leading-[20px] sm:line-clamp-none sm:mb-8 sm:!text-xs',
    bottom: 'mb-8 flex items-center sm:mb-11',
    users: 'mr-4 ml-auto flex sm:ml-0 sm:mr-2',
    usersItem: 'shadow-[0_0_0_3px_white] sm:shadow-[0_0_0_1.5px_white]',
    votes: 'text-sm text-400',
    daoName: 'font-semibold text-gray-600 sm:!text-xl sm:ml-1',
    voteButton: 'w-[137px] sm:hidden',
    voteButtonMobile: 'w-full h-11 hidden sm:flex after:top-0 after:left-1/2 after:-translate-x-1/2 after:w-screen after:h-px after:bg-gray-200 after:absolute',
    timer: 'sm:hidden',
    timerMobile: 'mb-8 mr-auto hidden sm:block',
}));

const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({
        themeSettings: props.themeSettings
    });
});


// IS REJECTED. USED: LABEL, CAN VOTE

const isRejected = computed(() => props.status === ProposalStatus.Rejected);


// IS EXPIRED. USED: LABEL, CAN VOTE

const isExpired = computed(() => currentDate.value > props.endDate && props.status === ProposalStatus.Exists);

// CAN VOTE

const canVote = computed(() =>
    props.hasVotingPower
    && props.status === ProposalStatus.Exists
    && !isRejected.value
    && !isExpired.value
    && props.endDate > currentDate.value
)


// LABEL

const labelTitleLocal = computed(() =>
    isRejected.value
        ? proposalStatuses[ProposalStatus.Rejected]
        : isExpired.value
            ? 'Expired'
            : props.labelTitle
);

const labelTheme = computed(() => [
    'neutral',
    'primary',
    'positive',
    'positive',
    'critical',
][isRejected.value || isExpired.value ? ProposalStatus.Rejected : props.status]);
</script>
