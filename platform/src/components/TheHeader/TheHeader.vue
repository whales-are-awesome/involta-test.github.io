
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
                        <RouterLink
                            :to="item.to"
                        >
                            {{ item.title }}
                        </RouterLink>
                    </li>
                </ul>
            </nav>
            <BaseButton
                v-if="!address"
                size="sm"
                :icon="{
                    name: 'wallet',
                    width: 24,
                    prepend: true
                }"
                rounded="lg"
                @click="onClick"
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
    { title: 'Documentation', to: { name: '' } },
    { title: 'Explore', to: { name: '' } }
];
const useClasses = makeClasses<IThemeProps>(() => ({
    inner: 'px-8 py-[14px] flex items-center',
    title: 'text-gray-800 title-h5 mr-auto',
    icon: 'mr-5 text-gray-500',
    nav: 'mr-8',
    navList: 'flex space-x-8 text-gray-500'
}));
const api = new API();

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

async function onClick() {
    const address = (await api.eth.requestAccounts())[0];

    store.dispatch('web3/updateAddress', address);
}
</script>
