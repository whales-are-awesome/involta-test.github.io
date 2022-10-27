
<template>
    <header
        :class="classes.root"
    >
        <div :class="classes.inner">
            <p :class="classes.title">
                OuterCircle.
            </p>
            <BaseIcon
                :class="classes.icon"
                name="question"
                width="24"
            />
            <nav :class="classes.nav">
                <ul :class="classes.navList">
                    <li
                        v-for="(item, index) in nav"
                        :key="index"
                    >
                        <ActionLink
                            :href="item.href"
                            :to="item.to"
                            :target="item.target"
                            theme="secondary-dark"
                        >
                            {{ item.title }}
                        </ActionLink>
                    </li>
                </ul>
            </nav>
            <div :class="classes.burgerWrapper">
                <BaseButton
                    :class="classes.burger"
                    theme="surface"
                    size=""
                    rounded="full"
                    :wrap-content="false"
                    :theme-settings="{
                        bg: '!bg-surface-300',
                        container: 'space-y-0.5 flex-col'
                    }"
                >
                    <span
                        v-for="item in 3"
                        :key="item"
                        :class="classes.burgerRow"
                    >
                    </span>
                </BaseButton>
            </div>
            <BaseButton
                v-if="!address"
                size="sm"
                :icon="{
                    name: 'wallet',
                    width: 24,
                    prepend: true
                }"
                rounded="lg"
                @click="API.login"
            >
                Connect Wallet
            </BaseButton>
            <BaseWallet
                v-if="address"
                :value="address"
            />
        </div>
    </header>
</template>

<script lang="ts" setup>
/* IMPORTS */

import { computed, ref } from 'vue';
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';
import BaseWallet from '@/components/BaseWallet/BaseWallet.vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import ActionLink from '@/components/ActionLink/ActionLink.vue';
import makeClasses from '@/helpers/makeClasses';
import API from '@/helpers/api';
import { useStore } from '@/store';

/* INTERFACES */

interface IThemeProps {

}
/* META */

const store = useStore();

/* VARS AND CUSTOM HOOKS */
const nav = [
    { title: 'Documentation', href: '//docs.outercircle.io', target: '_blank' },
    { title: 'Explore', to: { name: '' } }
];
const useClasses = makeClasses<IThemeProps>(() => ({
    inner: 'px-8 py-[14px] flex items-center',
    title: 'text-gray-800 title-h5 mr-auto',
    icon: 'mr-5 text-gray-500 md:hidden',
    nav: 'mr-8 md:hidden',
    navList: 'flex space-x-8 text-gray-500',
    burgerWrapper: 'mr-4 hidden md:block',
    burger: 'w-[36px] h-[36px]',
    burgerRow: 'w-[12px] h-[2px] bg-gray-500 rounded-[4px] block'
}));

/* DATA */

/* COMPUTED */

const classes = computed((): ReturnType<typeof useClasses> => {
    return useClasses({

    });
});
const address = computed(() => store.state.web3.address);

/* LIFECYCLE */


/* WATCH */
/* METHODS */
</script>
