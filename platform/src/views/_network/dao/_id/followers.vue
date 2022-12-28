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
                {{ pageData?.fullName }} Followers (158)
            </div>
        </div>
        <div class="flex mb-6">
            <TagsButtonList
                v-model="formData.tagValue"
                class="h-[44px]"
                :items="formInfo.tags"
            />
            <BaseButton
                class="!h-auto ml-auto"
                theme="primary"
                :icon="{
                    name: 'share',
                    width: 20,
                    prepend: true
                }"
                @click="invite"
            >
                Invite member
            </BaseButton>
        </div>
        <div
            v-if="followers.data?.items.length"
            class="space-y-2"
            :class="{
                '-preloader -preloader_cover': followers.pending
            }"
        >
            <div
                v-for="item in followers.data?.items"
                :key="item.address"
                class="p-2.5 bg-primary-100 rounded-[5px] flex items-center"
            >
                <div class="w-1/3">
                    <BaseAvatar
                        :hexheads="item.address"
                        alt="img"
                        size="xxs"
                    >
                        <span class="text-600 font-medium text-xxs">
                            {{ item.name || cutAddress(item.address) }}
                        </span>
                    </BaseAvatar>
                </div>
                <div class="text-gray-500 text-xxs font-medium w-1/3 text-center">
                    {{ item.votingPower }} Tokens
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

const [ page ] = useDao({
    address: route.params.address as string
}, {
    saveInStorage: true
});

const pageData = computed(() => page.value.data);

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

</script>
