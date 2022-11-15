<template>
    <div
        :class="classes.root"
    >
        <div :class="classes.avatarWrapper">
            <BaseAvatar
                :class="classes.avatar"
                :src="avatar"
                :alt="name"
                size="xl"
                rounded="xl"
                :theme-settings="{
                    image: 'sm:rounded-[12px]'
                }"
            />
        </div>
        <p :class="classes.title">
            {{ name }}
        </p>
        <div :class="classes.info">
            <div :class="classes.infoItem">
                <div>
                    <div :class="classes.infoItemTop">
                        Supported by
                    </div>
                    <div :class="classes.infoItemBottom">
                        {{ supportedBy }}
                    </div>
                </div>
            </div>
            <div :class="classes.infoDelimiter"></div>
            <div :class="classes.infoItem">
                <div>
                    <div :class="classes.infoItemTop">
                        Backed by
                    </div>
                    <div :class="classes.infoItemBottom">
                        {{ backedBy }}
                    </div>
                </div>
            </div>
        </div>
        <div :class="classes.buttonWrapper">
            <BaseButton
                :class="classes.button"
                view="outlined"
                size="sm"
                rounded="lg"
            >
                Join
            </BaseButton>
        </div>
    </div>
</template>


<script lang="ts" setup>
/* IMPORTS */

import { computed } from 'vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import BaseAvatar from '@/components/BaseAvatar/BaseAvatar.vue';
import {  } from './types';
import makeClasses from '@/helpers/makeClasses';

/* INTERFACES */

interface IProps {
    themeSettings?: any
    avatar: string
    name: string
    supportedBy: string
    backedBy: string
}


interface IThemeProps extends Pick<IProps, 'themeSettings'>{

}

/* META */

const props = withDefaults(defineProps<IProps>(), {});

/* VARS AND CUSTOM HOOKS */

const useClasses = makeClasses<IThemeProps>(() => ({
    root: ({ themeSettings }) => {
        return [themeSettings?.root, [
            'border border-gray-100 rounded-[12px] px-8 py-6 md:py-6 md:px-5 md:px-2.5 sm:px-2'
        ]];
    },
    avatarWrapper: 'flex justify-center mb-4',
    title: 'text-sm font-semibold text-gray-600 mb-4 text-center',
    info: 'flex justify-center mb-9 sm:mb-6',
    infoItem: 'text-center w-1/2 flex first:justify-end last:justify-start',
    infoItemTop: 'text-gray-400 text-tiny whitespace-nowrap',
    infoItemBottom: 'text-center text-xxs text-gray-600 font-semibold',
    infoDelimiter: 'bg-gray-100 flex-shrink-0 w-px h-[26px] mx-7 md:mx-2',
    buttonWrapper: 'flex justify-center',
    button: 'mx-auto w-[117px] sm:w-[64px]'
}));

/* DATA */
/* COMPUTED */

const classes = computed((): ReturnType<typeof useClasses> => {
    return useClasses({
        themeSettings: props.themeSettings
    });
});

/* WATCH */
/* METHODS */

</script>
