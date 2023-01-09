<template>
    <div
        v-if="pageData"
        class="mt-11"
    >
        <div>
            <BaseButton
                class="!text-gray-400 mb-5"
                :size="!isMobile.sm  ? 'sm' : 'mobile'"
                view="ghost"
                :icon="{
                    name: 'arrow-left',
                    width: 10,
                    prepend: true
                }"
                :href="{ name: 'network-dao-address', params: $route.params  }"
            >
                Back
            </BaseButton>
        </div>
        <div class="flex items-center mb-[18px]">
            <BaseIcon
                class="mr-2"
                name="users-bold"
                width="36"
            />
            <div class="title-h5 text-600">
                {{ pageData?.fullName }} Followers <span class="text-gray-500">({{ pageData?.followersAmountFormatted }})</span>
            </div>
        </div>
        <div class="flex mb-6">
            <TagsButtonList
                v-model="formData.tagValue"
                :items="formInfo.tags"
            />
            <BaseButton
                class="ml-auto"
                :class="(isMobile.lg || isMobile.xl) ? '!h-auto': ''"
                theme="primary"
                :size="(isMobile.lg || isMobile.xl) ? 'md': 'sm'"
                :icon="{
                    name: 'share',
                    width: (isMobile.lg || isMobile.xl) ? 20 : 16,
                    prepend: true
                }"
                @click="invite"
            >
                Invite {{ !isMobile.sm ? 'member' : '' }}
            </BaseButton>
        </div>
        <div
            v-if="followers.data?.items.length"
            class="flex flex-wrap -mx-1.5 -mt-3"
            :class="{
                '-preloader -preloader_cover': followers.pending
            }"
        >
            <div
                v-for="item in followers.data?.items"
                :key="item.address"
                class="w-1/3 px-1.5 mt-3 lg:w-1/2 sm:w-full"
            >
                <div
                    class="p-3 bg-primary-100 rounded-[12px]"
                >
                    <BaseAvatar
                        class="mb-4"
                        :hexheads="item.address"
                        rounded="full"
                        alt="img"
                        :theme-settings="{
                            size: 'h-[53px] w-[53px]'
                        }"
                    >
                        <div>
                            <div
                                v-if="item.name"
                                class="text-gray-600 font-semibold mb-1"
                            >
                                Vitalik.eth
                            </div>
                            <ActionLink
                                class="!text-[#6C6C7D] font-medium text-xs flex items-center"
                                @click="copyAddress(item.address)"
                            >
                                {{ cutAddress(item.address, 7, 4) }}
                                <BaseIcon
                                    class="ml-0.5"
                                    name="copy"
                                    width="14"
                                />
                            </ActionLink>
                        </div>
                    </BaseAvatar>
                    <div class="bg-white py-[19px] px-3 rounded-[8px] flex">
                        <div class="w-1/3">
                            <div class="text-gray-500 text-tiny font-medium mb-1">
                                Tokens
                            </div>
                            <div class="font-bold text-xxs text-gray-600">
                                {{ item.votingPower }}
                            </div>
                        </div>
                        <div class="w-1/3">
                            <div class="text-gray-500 text-tiny font-medium mb-1">
                                Voting power
                            </div>
                            <div class="font-bold text-xs text-gray-600">
                                6.9%
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else-if="followers.pending" class="-preloader -preloader_placeholder"></div>
        <NotFound
            v-else
            class="mt-[88px]"
            title="No followers found"
            text="No followers yet."
        />
    </div>
    <div v-else class="-preloader -preloader_placeholder"></div>
</template>

<script lang="ts" setup>
import { computed, ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { notify } from '@kyvg/vue3-notification';
import NotFound from '@/components/NotFound/NotFound.vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';
import TagsButtonList from '@/components/TagsButtonList/TagsButtonList.vue';
import BaseAvatar from '@/components/BaseAvatar/BaseAvatar.vue';
import ActionLink from '@/components/ActionLink/ActionLink.vue';
import useLayer from '@/composables/useLayer';
import useDao from '@/composables/fetch/useDao';
import useError from '@/composables/useError';
import useIsMobile from '@/composables/useIsMobile';
import { IBreadcrumb } from '@/components/BaseBreadcrumbs/types';
import FollowerService from '@/services/FollowerService';
import copy from '@/helpers/copy';
import { useFetchDataWithTotal } from '@/composables/useFetchData';
import { IFollower } from '@/types/services/FollowerService';
import cutAddress from '@/helpers/cutAddress';
import emitter from '@/plugins/mitt';

// META

const { open } = useLayer();

const route = useRoute();

const isMobile = useIsMobile();

const formInfo = {
    tags: [
        { id: 'voters', title: 'Voters' },
        { id: 'followers', title: 'Followers' }
    ],
};

const formData = ref({
    tagValue: formInfo.tags[0].id,
    limits: 20
});


// META:PAGE

const [ page, fetchDao ] = useDao({
    address: route.params.address as string
}, {
    saveInStorage: true
});

const pageData = computed(() => page.value.data);

emitter.on('daoFollowed', fetchDao);
emitter.on('accountChanged', fetchDao);


watchEffect(() => {
    page.value.error && useError(404)
});

// BREADCRUMBS

const breadcrumbs = computed(() => {
    if (!pageData.value || !pageData.value?.path.length) return [];

    const data: IBreadcrumb[] = [...pageData.value?.path].reverse().map(item => ({
        title: item.name,
        link: { name: 'network-dao-address', params: { network: route.params.network, address: item.address } }
    }));

    data.push({ title: pageData.value?.fullName });

    return data;
});

// INVITE MEMBER

function invite() {
    notify({
        title: 'Link copied',
    });
    copy(window.origin + route.path.split('/').slice(0, -1).join('/'));
}


// FOLLOWERS

const followers = useFetchDataWithTotal<IFollower>();

fetchFollowers();

emitter.on('daoFollowed', fetchFollowers);

async function fetchFollowers() {
    followers.value.pending = true;
    followers.value.cancel();

    const [data, error, cancel] = await FollowerService.fetchFollowers(
        {
            network: route.params.network as string,
            address: route.params.address as string
        },
        {
            offset: 0,
            limit: 15
        }
    );

    followers.value = { data, cancel, pending: false };
}


// copy

function copyAddress(address: string) {
    copy(address);
    notify({
        title: 'Address copied',
    });
}
</script>
