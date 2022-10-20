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
            />
        </div>
        <p :class="classes.title">
            {{ name }}
        </p>
        <div :class="classes.info">
            <div :class="classes.infoItem">
                <div :class="classes.infoItemTop">
                    Supported by
                </div>
                <div :class="classes.infoItemBottom">
                    {{ supportedBy }}
                </div>
            </div>
            <div :class="classes.infoDelimiter"></div>
            <div :class="classes.infoItem">
                <div :class="classes.infoItemTop">
                    Backed by
                </div>
                <div :class="classes.infoItemBottom">
                    {{ backedBy }}
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
            'border border-gray-100 rounded-[12px] p-8'
        ]];
    },
    avatarWrapper: 'flex justify-center mb-4',
    title: 'text-sm font-semibold text-gray-600 mb-4 text-center',
    info: 'flex justify-center mb-9',
    infoItem: 'text-center',
    infoItemTop: 'text-gray-400 text-tiny',
    infoItemBottom: 'text-center text-xss text-gray-600 font-semibold',
    infoDelimiter: 'bg-gray-100 w-px h-[26px] mx-3',
    buttonWrapper: 'flex justify-center',
    button: 'mx-auto w-[117px]'
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
