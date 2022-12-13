<template>
    <header :class="classes.root">
        <div :class="classes.inner">
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
                    @click="emit('burger-click')"
                >
                    <span
                        v-for="item in 3"
                        :key="item"
                        :class="classes.burgerRow"
                    >
                    </span>
                </BaseButton>
            </div>
            <BaseImage
                :class="classes.logo"
                :src="require('@/assets/images/common/logo.png')"
                alt="OuterCircle"
                @click="$router.push({ name: 'home' })"
            />
            <p :class="classes.title">
                OuterCircle α.
            </p>
            <div :class="classes.burgerWrapperMobile">
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
                    @click="emit('burger-click')"
                >
                    <span
                        v-for="item in 3"
                        :key="item"
                        :class="classes.burgerRow"
                    >
                    </span>
                </BaseButton>
            </div>
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
            <BaseButton
                v-if="address === ''"
                size="sm"
                :icon="{
                    name: 'wallet',
                    width: 16,
                    prepend: true
                }"
                rounded="lg"
                :href="{ name: 'auth' }"
            >
                Connect Wallet
            </BaseButton>
            <BaseWallet v-if="address" />
            <div
                v-if="address === null"
                :class="classes.preloader"
            >
            </div>
        </div>
    </header>
</template>

<script lang="ts" setup>
import { computed, defineEmits } from 'vue';
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';
import BaseWallet from '@/components/BaseWallet/BaseWallet.vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import ActionLink from '@/components/ActionLink/ActionLink.vue';
import makeClasses from '@/helpers/makeClasses';
import { store } from '@/store';


// META

interface IEmits {
    (e: 'burger-click'): void
}

const emit = defineEmits<IEmits>();


// CLASSES

interface IThemeProps {}

const useClasses = makeClasses<IThemeProps>(() => ({
    inner: 'px-8 pt-[14px] pb-5 flex items-center sm:py-3 sm:px-6',
    title: 'text-gray-800 title-h5 mr-auto sm:!text-xs',
    icon: 'mr-4 text-gray-500 md:hidden',
    nav: 'mr-8 md:hidden',
    navList: 'flex space-x-8 text-gray-500 text-xs',
    burgerWrapper: 'mr-2 hidden md:flex sm:hidden sm:mr-2',
    burgerWrapperMobile: 'mr-2 hidden sm:flex sm:mr-2',
    burger: 'w-[36px] h-[36px] sm:w-[24px] sm:h-[24px]',
    burgerRow: 'w-[12px] h-[2px] bg-gray-500 rounded-[4px] block -translate-y-[1px] sm:w-2 sm:h-px',
    logo: 'hidden w-[24px] sm:inline-block mr-1',
    preloader: 'w-[120px] h-[40px] -preloader -preloader_sm'
}));

const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({

    });
});


// NAV

const nav = [
    { title: 'Documentation', href: '//docs.outercircle.io', target: '_blank' },
    { title: 'Explore', to: { name: '' } }
];


// ADDRESS

const address = computed(() => store.state.wallet.address);
</script>
