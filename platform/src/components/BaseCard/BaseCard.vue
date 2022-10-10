<template>
    <div :class="classes.root">
        <div :class="classes.top">
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
                rounded="sm"
            >
                <span class="font-semibold text-gray-600">
                    {{ name }}
                </span>
            </BaseAvatar>
            <BaseBreadcrumbs
                :class="classes.breadcrumbs"
                :items="breadcrumbs"
            />
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
                    class="shadow-[0_0_0_3px_white]"
                    size="xs"
                    :src="user.avatar"
                    rounded="lg"
                    :alt="`avatar - ${ user.id }`"
                />
            </div>
            <div :class="classes.votes">
                {{ users.length }} votes
            </div>
        </div>
        <BaseButton
            class="w-[137px]"
            rounded="sm"
            size="sm"
            :icon="{
                name: 'arrow-right',
                width: 16
            }"
        >
            Vote
        </BaseButton>
    </div>
</template>


<script lang="ts" setup>
/* IMPORTS */

import { computed } from 'vue';
import BaseAvatar from '@/components/BaseAvatar/BaseAvatar.vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import BaseTimer from '@/components/BaseTimer/BaseTimer.vue';
import BaseLabel from '@/components/BaseLabel/BaseLabel.vue';
import BaseBreadcrumbs from '@/components/BaseBreadcrumbs/BaseBreadcrumbs.vue';
import {  } from './types';
import makeClasses from '@/helpers/makeClasses';

/* INTERFACES */

interface IProps {
    themeSettings?: any
    avatar: string
    name: string
    labelTitle: string
    title: string
    text: string
    endDate: Date
    users: any[]
}

interface IThemeProps extends Pick<IProps, 'themeSettings'>{

}

/* META */

const props = withDefaults(defineProps<IProps>(), {});

/* CONSTANTS AND CUSTOM HOOKS */

const breadcrumbs = [
    { title: 'link 1', link: { name: 'home' } },
    { title: 'link 2', link: { name: 'home' } },
    { title: 'link 3', link: { name: 'home' } },
    { title: 'link 4' }
]

const useClasses = makeClasses<IThemeProps>(() => ({
    root: ({ themeSettings }) => {
        return [themeSettings?.root, [
            'bg-white shadow-[0_4px_20px_rgba(108,108,125,.08)] border border-gray-100 rounded-[10px] p-6'
        ]];
    },
    top: ({ themeSettings }) => {
        return [themeSettings?.top, [
            'flex items-center mb-8'
        ]];
    },
    label: ({ themeSettings }) => {
        return [themeSettings?.label, [
            'mr-4'
        ]];
    },
    avatar: ({ themeSettings }) => {
        return [themeSettings?.avatar, [
            'mr-5'
        ]];
    },
    breadcrumbs: ({ themeSettings }) => {
        return [themeSettings?.breadcrumbs, [
            ''
        ]];
    },
    title: ({ themeSettings }) => {
        return [themeSettings?.title, [
            'text-500 text-h5 font-bold mb-3'
        ]];
    },
    text: ({ themeSettings }) => {
        return [themeSettings?.text, [
            'text-400 mb-6'
        ]];
    },
    bottom: ({ themeSettings }) => {
        return [themeSettings?.title, [
            'mb-8 flex items-center'
        ]];
    },
    users: ({ themeSettings }) => {
        return [themeSettings?.title, [
            'mr-4 ml-auto flex'
        ]];
    },
    votes: ({ themeSettings }) => {
        return [themeSettings?.title, [
            'text-sm text-gray-400'
        ]];
    },
}));

/* DATA */



/* COMPUTED */

const classes = computed((): ReturnType<typeof useClasses> => {
    return useClasses({
        themeSettings: props.themeSettings
    });
});
</script>
