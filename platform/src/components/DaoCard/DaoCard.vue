<template>
    <div :class="classes.root">
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
                        Members
                    </div>
                    <div :class="classes.infoItemBottom">
                        {{ members }}
                    </div>
                </div>
            </div>
            <div :class="classes.infoDelimiter"></div>
            <div :class="classes.infoItem">
                <div>
                    <div :class="classes.infoItemTop">
                        Proposals
                    </div>
                    <div :class="classes.infoItemBottom">
                        {{ proposals }}
                    </div>
                </div>
            </div>
        </div>
        <div :class="classes.buttonWrapper">
            <CategoryLabel v-if="category">
                {{ category }}
            </CategoryLabel>
            <BaseButton
                v-else
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
import { computed } from 'vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import BaseAvatar from '@/components/BaseAvatar/BaseAvatar.vue';
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';
import CategoryLabel from '@/components/CategoryLabel/CategoryLabel.vue';
import {  } from './types';
import makeClasses from '@/helpers/makeClasses';
import ThemeSettings from '@/types/themeSettings';


// META

interface IProps {
    avatar: string
    name: string
    category: string
    members: string
    proposals: string
    themeSettings?: ThemeSettings<'root'>
}

const props = withDefaults(defineProps<IProps>(), {});


// CLASSES

interface IThemeProps extends Pick<IProps, 'themeSettings'>{}

const useClasses = makeClasses<IThemeProps>(() => ({
    root: ({ themeSettings }) => [themeSettings?.root,
        'border border-gray-100 rounded-[12px] px-8 py-6 md:py-6 md:px-5 md:px-2.5 sm:px-2'
    ],
    avatarWrapper: 'flex justify-center mb-4',
    title: 'text-sm font-semibold text-gray-600 mb-4 text-center overflow-ellipsis overflow-hidden',
    info: 'flex justify-center mb-9 sm:mb-6',
    infoItem: 'text-center w-1/2 flex first:justify-end last:justify-start',
    infoItemTop: 'text-gray-400 text-tiny whitespace-nowrap',
    infoItemBottom: 'text-center text-xxs text-gray-600 font-semibold',
    infoDelimiter: 'bg-gray-100 flex-shrink-0 w-px h-[26px] mx-7 md:mx-2',
    buttonWrapper: 'flex justify-center',
    button: 'mx-auto w-[117px] sm:w-[64px]'
}));

const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({
        themeSettings: props.themeSettings
    });
});
</script>
