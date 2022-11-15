<template>
    <BaseTooltip ref="tooltip">
        <div
            :class="classes.root"
        >
            <BaseAvatar
                :class="classes.avatar"
                :src="require('@/assets/images/common/placeholder.jpeg')"
                alt="DAO"
                rounded="lg"
                size="tiny"
            >
                <span :class="classes.value">
                    {{ cutAddress(value) }}
                </span>
            </BaseAvatar>
            <BaseIcon
                :class="classes.icon"
                name="wallet-angle-down"
                width="16"
            />
        </div>
        <template #content="{ close }">
            <div :class="classes.popup">
                <BaseButton
                    view="ghost"
                    size="sm"
                    :icon="{
                        prepend: true,
                        width: 16,
                        name: 'copy'
                    }"
                    justify="start"
                    @click="copyAddress(close)"
                >
                    Copy wallet address
                </BaseButton>
                <BaseButton
                    v-if="wallet === 'connectWallet'"
                    view="ghost"
                    size="sm"
                    :icon="{
                        prepend: true,
                        width: 16,
                        name: 'logout'
                    }"
                    :theme-settings="{
                        root: '!text-[#FF3E3E]'
                    }"
                    justify="start"
                    @click="disconnect(close)"
                >
                    Disconnect
                </BaseButton>
            </div>
        </template>
    </BaseTooltip>
</template>


<script lang="ts" setup>
/* IMPORTS */

import { computed, ref } from 'vue';
import BaseAvatar  from '@/components/BaseAvatar/BaseAvatar.vue';
import BaseTooltip  from '@/components/BaseTooltip/BaseTooltip.vue';
import BaseButton  from '@/components/BaseButton/BaseButton.vue';
import BaseIcon  from '@/components/BaseIcon/BaseIcon.vue';
import {  } from './types';
import Wallet from '@/wallets';
import useLayer from '@/composables/useLayer';
import makeClasses from '@/helpers/makeClasses';
import cutAddress from '@/helpers/cutAddress';
import copy from '@/helpers/copy';
import { store } from '@/store';


/* INTERFACES */

interface IProps {
    value: string
    themeSettings?: any
}

interface IThemeProps extends Pick<IProps, 'themeSettings'>{
    isHovered: boolean
}

/* META */

const props = withDefaults(defineProps<IProps>(), {});

/* VARS AND CUSTOM HOOKS */
const { open } = useLayer();

const useClasses = makeClasses<IThemeProps>(() => ({
    root: ({ themeSettings, isHovered }) => {
        return [themeSettings?.root, [
            'flex items-center bg-surface-400 text-gray-500 text-xs rounded-[5px] px-4 py-2 sm:py-1 sm:px-2 sm:!text-xxs border',
            {
                'border-primary-400': isHovered
            }
        ]];
    },
    circle: 'w-7 h-7 ml-3 bg-surface-500 rounded-full shrink-0',
    popup: 'bg-surface-200 rounded-[5px] p-1.5 flex flex-col',
    value: 'pl-[2px] mr-3',
    icon: ({ themeSettings, isHovered }) => {
        return [themeSettings?.icon, [
            {
                'rotate-180': isHovered
            }
        ]];
    }
}));

/* DATA */

const tooltip= ref(null);

/* COMPUTED */
const wallet = computed(() => store.state.wallet.wallet);
const isTooltipShown = computed(() => tooltip.value?.isShown);
const classes = computed((): ReturnType<typeof useClasses> => {
    return useClasses({
        isHovered: isTooltipShown.value
    });
});


/* WATCH */
/* METHODS */

function copyAddress(callback: () => void) {
    copy(props.value);
    callback();
}

async function disconnect(callback: () => void) {
    callback();

    const isClose = await open('DisconnectLayer');

    if (isClose) {
        Wallet.disconnect();
    }
}
</script>
