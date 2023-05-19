<template>
    <div :class="classes.root">
        <BaseAvatar
            :class="classes.avatar"
            :hexheads="address"
            rounded="full"
            alt="img"
            :theme-settings="{
                size: 'h-[53px] w-[53px]'
            }"
        >
            <div>
                <div
                    :class="classes.address"
                    @click="copyAddress(address)"
                >
                    {{ cutAddress(address, 7, 4) }}
                    <BaseIcon
                        :class="classes.addressIcon"
                        name="copy"
                        width="18"
                    />
                </div>
                <div
                    v-if="name"
                    :class="classes.name"
                >
                    {{ name }}
                </div>
            </div>
        </BaseAvatar>
        <div :class="classes.bottom">
            <div :class="classes.bottomItem">
                <div :class="classes.bottomItemTitle">
                    Tokens
                </div>
                <div :class="classes.bottomItemValue">
                    {{ tokens }}
                </div>
            </div>
            <div :class="classes.bottomItem">
                <div :class="classes.bottomItemTitle">
                    Voting power
                </div>
                <div :class="classes.bottomItemValue">
                    {{ votingPower }}%
                </div>
            </div>
        </div>
    </div>
</template>


<script lang="ts" setup>
import { computed } from 'vue';
import BaseAvatar from '@/components/BaseAvatar/BaseAvatar.vue';
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';
import {  } from './types';
import makeClasses from '@/helpers/makeClasses';
import ThemeSettings from '@/types/themeSettings';
import copy from '@/helpers/copy';
import { notify } from '@kyvg/vue3-notification';
import cutAddress from '@/helpers/cutAddress';

// META

interface IProps {
    address: string
    name: string
    votingPower: number
    tokens: number
    themeSettings?: ThemeSettings<'root'>
}

interface IEmits {
}

const props = withDefaults(defineProps<IProps>(), {});

const emit = defineEmits<IEmits>();


// CLASSES

interface IThemeProps extends Pick<IProps, 'themeSettings'>{}

const useClasses = makeClasses<IThemeProps>(() => ({
    root: ({ themeSettings }) => [themeSettings?.root,
        'bg-white p-3 rounded-[12px]'
    ],
    avatar: 'mb-4',
    address: 'font-medium text-sm flex items-center group text-gray-600 group-hover:text-gray-700 cursor-pointer',
    addressIcon: 'ml-0.5 text-gray-400 group-hover:text-gray-500',
    name: 'text-primary-500 font-semibold text-xxs mt-1',
    bottom: 'bg-white py-[19px] px-3 rounded-[8px] flex',
    bottomItem: 'w-1/3',
    bottomItemTitle: 'text-gray-500 text-tiny font-medium mb-1',
    bottomItemValue: 'font-bold text-xs text-gray-600'
}));

const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({
        themeSettings: props.themeSettings
    });
});


// COPY

function copyAddress(address: string) {
    copy(address);
    notify({
        title: 'Address copied'
    });
}
</script>
