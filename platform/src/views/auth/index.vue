<template>
    <div class="my-auto flex items-center justify-center">
        <div class="max-w-[680px] w-full border border-surface-300 rounded-[20px] py-8 px-6 lg:max-w-[464px] sm:px-3 sm:py-6 sm:mt-[91px] sm:mb-8">
            <p class="title-h3 mb-4 sm:mb-3">Connect Wallet</p>
            <p class="font-medium text-sm mb-9 sm:text-sm">
                By connecting a wallet, I agree to OuterCircle’s <ActionLink href="//google.com" target="_blank">Terms of Service</ActionLink>, and <ActionLink href="//google.com" target="_blank">Privacy Policy</ActionLink>.
            </p>
            <div class="space-y-8">
                <div class="flex -mx-2 -mt-4">
                    <WalletNameCard
                        v-for="wallet in wallets"
                        :key="wallet.icon"
                        class="w-[200px] mx-2 mt-4"
                        v-bind="wallet"
                        @click="auth(wallet)"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import ActionLink from '@/components/ActionLink/ActionLink.vue';
import WalletNameCard from '@/components/WalletNameCard/WalletNameCard.vue';
import { Icons } from '@/components/BaseIcon/types';

import Wallet from '@/wallets';
import API from '@/helpers/api';

interface IWallet {
    id: string
    name: string
    icon: Icons
    login: () => Promise<string>
}

const router = useRouter();


const wallets = computed(() => {
    const result: IWallet[] = [];
    const provider = window.ethereum;
    const connectWallet = { id: 'connectWallet', name: 'ConnectWallet', icon: 'connect-wallet', login: () => Wallet.ConnectWallet.login() };

    if (provider === undefined) {
        return [connectWallet];
    }

    if ('isMetaMask' in provider && 'isTrustWallet' in provider) {
        result.push({ id: 'injectedWallet', name: 'Injected', icon: 'injected-wallet', login: () => Wallet.InjectedWallet.login() });
    } else if ('isMetaMask' in provider) {
        result.push({ id: 'injectedWallet', name: 'MetaMask', icon: 'metamask', login: () => Wallet.InjectedWallet.login() });
    } else if ('isTrustWallet' in provider) {
        result.push({ id: 'injectedWallet', name: 'TrustWallet', icon: 'trust-wallet', login: () => Wallet.InjectedWallet.login() });
    }

    result.push({ id: 'connectWallet', name: 'ConnectWallet', icon: 'connect-wallet', login: () => Wallet.ConnectWallet.login() });

    return result;
});

async function auth(wallet: IWallet) {
    await wallet.login();

    router.push({ name: 'home' });
}
</script>
