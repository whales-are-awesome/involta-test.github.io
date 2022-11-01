<template>
    <div class="min-h-full flex items-center justify-center">
        <div class="max-w-[680px] w-full border border-surface-300 rounded-[20px] py-8 px-6 mt-[91px] mb-8">
            <p class="title-h3 mb-4">Connect Wallet</p>
            <p class="font-medium text-sm mb-8">
                By connecting a wallet, I agree to OuterCircle’s <ActionLink href="//google.com" target="_blank">Terms of Service</ActionLink>, and <ActionLink href="//google.com" target="_blank">Privacy Policy</ActionLink>.
            </p>
            <div class="space-y-8">
                <div
                    v-for="(item, name) in wallets"
                    :key="name"
                >
                    <p class="text-400 font-medium text-sm mb-4">
                        {{ name }}
                    </p>
                    <div class="flex -mx-2 -mt-4 md:flex-wrap">
                        <WalletNameCard
                            v-for="wallet in item"
                            :key="wallet.icon"
                            class="w-[200px] mx-2 mt-4"
                            v-bind="wallet"
                            @click="auth(wallet)"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import ActionLink from '@/components/ActionLink/ActionLink.vue';
import WalletNameCard from '@/components/WalletNameCard/WalletNameCard.vue';

import API from '@/helpers/api';
import Wallet from '@/wallets';

const router = useRouter();

const wallets = {
    ['Supported Wallet']: [
        { name: 'MetaMask', icon: 'metamask', login: () => Wallet.MetaMask.login() },
        { name: 'ConnectWallet', icon: 'connect-wallet', login: () => Wallet.ConnectWallet.login() },
    ],
    ['Will be available soon:']: [
        { name: 'Ledger', icon: 'ledger', isDisabled: true, login: () => ({}) },
        { name: 'TrustWallet', icon: 'trust-wallet', isDisabled: true, login: () => ({}) },
    ]
}


async function auth(wallet: any) {
    await wallet.login();

    // router.push({ name: 'home' });
}
</script>
