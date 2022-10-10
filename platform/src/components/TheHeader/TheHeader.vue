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
//////// IMPORTS ////////
import { computed, onMounted, ref } from 'vue';
import { IThemeProps } from './types';
import BaseIcon from '@/components/BaseIcon.vue';
import BaseWallet from '@/components/BaseWallet/BaseWallet.vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import makeClasses from '@/helpers/makeClasses';
import API from '@/helpers/api';

//////// CONSTANTS ////////
const nav = [
    { title: 'Documentation', to: { name: '' } },
    { title: 'Explore', to: { name: '' } }
];

//
const address = ref('');

const useClasses = makeClasses<IThemeProps>(() => ({
    inner: 'px-8 py-[14px] flex items-center',
    title: 'text-gray-800 title-h5 mr-auto',
    icon: 'mr-5 text-gray-500',
    nav: 'mr-8',
    navList: 'flex space-x-8 text-gray-500'
}))

const api = new API();

const classes = computed((): ReturnType<typeof useClasses> => {
    return useClasses({

    });
});

async function onClick() {
    console.log(1);
    address.value = (await api.eth.requestAccounts())[0];
}

onMounted(async() => {
    address.value = (await api.eth.requestAccounts())[0];
});
</script>

<style scoped>

</style>

