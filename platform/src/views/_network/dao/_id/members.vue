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
                {{ pageData?.fullName }} Members (158)
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
                theme="primary-400"
                :icon="{
                    name: 'share',
                    width: 20,
                    prepend: true
                }"
            >
                Invite member
            </BaseButton>
        </div>
        <div class="space-y-2">
            <div
                v-for="item in 10"
                :key="item"
                class="p-2.5 bg-primary-100 rounded-[5px] flex items-center justify-between"
            >
                <BaseAvatar
                    :src="require('@/assets/images/common/placeholder.jpeg')"
                    alt="img"
                    size="xxs"
                >
                <span class="text-600 font-medium text-xxs">
                    0x2c934...a180
                </span>
                </BaseAvatar>
                <div class="text-gray-500 text-xxs font-medium">
                    348 Tokens
                </div>
                <div class="flex space-x-2">
                    <BaseLabel
                        theme="positive"
                        view="outlined"
                        :uppercase="false"
                        rounded="lg"
                    >
                        <span class="tracking-normal">Admin</span>
                    </BaseLabel>
                    <BaseLabel
                        theme="neutral"
                        view="outlined"
                        :uppercase="false"
                        rounded="lg"
                    >
                        <span class="tracking-normal">Author</span>
                    </BaseLabel>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="-preloader -preloader_placeholder"></div>
</template>

<script lang="ts" setup>
import { computed, ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import BaseLabel from '@/components/BaseLabel/BaseLabel.vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';
import TagsButtonList from '@/components/TagsButtonList/TagsButtonList.vue';
import BaseAvatar from '@/components/BaseAvatar/BaseAvatar.vue';
import useLayer from '@/composables/useLayer';
import useDao from '@/composables/fetch/useDao';
import useError from '@/composables/useError';
import useIsMobile from '@/composables/useIsMobile';
import { IBreadcrumb } from '@/components/BaseBreadcrumbs/types';

// META

const { open } = useLayer();

const route = useRoute();

const isMobile = useIsMobile();

const formInfo = {
    tags: [
        { id: 'all', title: 'All members' },
        { id: 'admins', title: 'Admins only' }
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
})
</script>
