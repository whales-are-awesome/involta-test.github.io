<template>
    <div :class="classes.root">
        <div :class="classes.top">
            <BaseTimer
                :class="classes.timerMobile"
                :end-date="endDate"
            />
            <BaseLabel
                :class="classes.label"
                theme="positive"
                view="faded"
            >
                {{ labelTitle }}
            </BaseLabel>
            <BaseAvatar
                :class="classes.avatar"
                :src="avatar"
                alt="image"
                size="sm"
                rounded="xs"
            >
                <span :class="classes.daoName">
                    {{ name }}
                </span>
            </BaseAvatar>
        </div>
        <div :class="classes.title">
            {{ title }}
        </div>
        <div :class="classes.text">
            {{ text }}
        </div>
        <div :class="classes.bottom">
            <BaseTimer
                :class="classes.timer"
                :end-date="endDate"
            />
            <div :class="classes.users">
                <BaseAvatar
                    v-for="user in users.slice(0, 4)"
                    :key="user.id"
                    :class="classes.usersItem"
                    size="xs"
                    :src="user.avatar"
                    rounded="full"
                    :alt="`avatar - ${ user.id }`"
                />
            </div>
            <div :class="classes.votes">
                {{ users.length }} votes
            </div>
        </div>
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
    </div>
</template>


<script lang="ts" setup>
import { computed } from 'vue';
import BaseAvatar from '@/components/BaseAvatar/BaseAvatar.vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import BaseTimer from '@/components/BaseTimer/BaseTimer.vue';
import BaseLabel from '@/components/BaseLabel/BaseLabel.vue';
import { IUsers } from './types';
import makeClasses from '@/helpers/makeClasses';
import ThemeSettings from '@/types/themeSettings';


// META

interface IProps {
    avatar: string
    name: string
    labelTitle: string
    title: string
    text: string
    endDate: Date
    users: IUsers[]
    themeSettings?: ThemeSettings<'root'>
}

const props = withDefaults(defineProps<IProps>(), {});


// CLASSES

interface IThemeProps extends Pick<IProps, 'themeSettings'>{}

const useClasses = makeClasses<IThemeProps>(() => ({
    root: ({ themeSettings }) => [themeSettings?.root,
        'bg-white shadow-[0_4px_20px_rgba(108,108,125,.08)] border border-gray-100 rounded-[10px] p-6 sm:pb-0 overflow-hidden'
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
</script>
