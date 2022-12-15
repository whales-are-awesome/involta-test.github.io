<template>
    <div
        ref="root"
        :class="classes.root"
    >
        <div :class="classes.logoWrapper">
            <BaseImage
                :class="classes.logo"
                :src="require('@/assets/images/common/logo.png')"
                alt="OuterCircle"
                @click="$router.push({ name: 'home' })"
            />
        </div>
        <div :class="classes.menuItems">
            <TheSidebarButton
                icon="home"
                :icon-width="isMobile.sm ? 13 : 17"
                :active="route.name === 'home'"
                @click="$router.push({ name: 'home' })"
            />
            <TheSidebarButton
                icon="plus"
                :icon-width="isMobile.sm ? 13 : 17"
                :active="isCreateDaoOpened"
                @click="layer.open('CreateDaoActionLayer')"
            />
            <TheSidebarButton
                :active="route.name === 'ui'"
                @click="$router.push({ name: 'ui' })"
            >
                <div class="-translate-x-2">UI</div>
            </TheSidebarButton>
            <div v-if="daoItems.pending" class="-preloader -preloader_sm -preloader_placeholder z-10"></div>
            <template v-else-if="walletAddress">
                <TheSidebarButton
                    v-for="item in daoItems.data?.items"
                    :key="item.address"
                    :image="item.image"
                    :active="route.params.address === item.address && route.params.network === item.network"
                    @click="$router.push({ name: 'network-dao-address', params: { address: item.address, network: item.network } })"
                />
            </template>
        </div>
    </div>
</template>


<script lang="ts" setup>
import { computed, defineExpose, ref } from 'vue';
import { useRoute } from 'vue-router';
import TheSidebarButton from './TheSidebarButton.vue';
import makeClasses from '@/helpers/makeClasses';
import useLayer from '@/composables/useLayer';
import { IProps } from '@/components/BlockInfo/BlockInfo.vue';
import useDaoItems from '@/composables/fetch/useDaoItems';
import useIsMobile from '@/composables/useIsMobile';
import { store } from '@/store';
import emitter from '@/plugins/mitt';


// META

const route = useRoute();

const layer = useLayer();

const isMobile = useIsMobile();


// CLASSES

interface IThemeProps {
    isHome: boolean
}

const useClasses = makeClasses<IThemeProps>(() => ({
    root: 'no-scrollbar w-[72px] h-screen overflow-auto py-2 sm:w-[44px] bg-surface-300',
    logoWrapper: `w-11 mx-auto pb-[18px] mb-[18px] relative sm:hidden
                  after:border-b-2 after:border-gray-200 after:top-full after:left-1/2 after:-translate-x-1/2 after:w-[28px] after:h-[2px] after:bg-gray-300 after:block after:absolute`,
    logo: ({ isHome }) => [
        'h-11 w-11',
        {
            'cursor-pointer': !isHome,
        }
    ],
    menuItems: 'space-y-5 sm:space-y-4'
}));

const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({
        isHome: route.name === 'home'
    });
});


// ADDRESS

const walletAddress = computed(() => store.state.wallet.address);


// DAO ITEMS

const daoItemsForm = computed(() => ({
    account: walletAddress.value
}));

const [daoItems, fetchDaoItems] = useDaoItems(daoItemsForm);

emitter.on('daoFollowed', fetchDaoItems);


// CREATE DAO LAYER

const isCreateDaoOpened = computed(() => {
    return !!layer.openedItems.value.find(item => item.id === 'CreateDaoLayer');
});


// ROOT

const root = ref<HTMLElement | null>(null);

defineExpose({
    root
});
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}
</style>
