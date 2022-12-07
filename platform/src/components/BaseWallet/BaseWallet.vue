<template>
    <BaseTooltip ref="tooltip">
        <div
            :class="classes.root"
        >
            <BaseAvatar
                :class="classes.avatar"
                :src="`https://hexheads.xyz/image.html?address=${ address }`"
                alt="DAO"
                :is-iframe="true"
                rounded="full"
                size="tiny"
            >
                <span :class="classes.value">
                    {{ addressOrName }}
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
import { computed, ref } from 'vue';
import BaseAvatar  from '@/components/BaseAvatar/BaseAvatar.vue';
import BaseTooltip  from '@/components/BaseTooltip/BaseTooltip.vue';
import BaseButton  from '@/components/BaseButton/BaseButton.vue';
import BaseIcon  from '@/components/BaseIcon/BaseIcon.vue';
import {  } from './types';
import Wallet from '@/wallets';
import useLayer from '@/composables/useLayer';
import makeClasses from '@/helpers/makeClasses';
import copy from '@/helpers/copy';
import { store } from '@/store';
import ThemeSettings from '@/types/themeSettings';


// META

interface IProps {
    value: string
    themeSettings?: ThemeSettings<'root'>
}

const props = withDefaults(defineProps<IProps>(), {});

const { open } = useLayer();


// CLASSES

interface IThemeProps extends Pick<IProps, 'themeSettings'>{
    isHovered: boolean
}

const useClasses = makeClasses<IThemeProps>(() => ({
    root: ({ themeSettings, isHovered }) => [themeSettings?.root,
        'flex items-center bg-surface-400 text-gray-500 text-xs rounded-[5px] px-4 py-2 sm:py-1 sm:px-2 sm:!text-xxs border',
        {
            'border-primary-400': isHovered
        }
    ],
    circle: 'w-7 h-7 ml-3 bg-surface-500 rounded-full shrink-0',
    popup: 'bg-surface-200 rounded-[5px] p-1.5 flex flex-col',
    value: 'pl-[2px] mr-3',
    icon: ({ isHovered }) => ({
        'rotate-180': isHovered
    })
}));

const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({
        isHovered: isTooltipShown.value
    });
});


// TOOLTIP

const tooltip= ref(null);

const isTooltipShown = computed(() => tooltip.value?.isShown);


// WALLET

const wallet = computed(() => store.state.wallet.wallet);


// ADDRESS

const address = computed(() => store.state.wallet.address);

const addressOrName = computed(() => store.getters['wallet/addressOrName']);


// VALUE

function copyAddress(callback: () => void) {
    copy(props.value);
    callback();
}


// DISCONNECT

async function disconnect(callback: () => void) {
    callback();

    const isClose = await open('DisconnectLayer');

    if (isClose) {
        Wallet.disconnect();
    }
}
</script>
