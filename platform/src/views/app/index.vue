<template>
    <div>
        <div class="pt-6 h-[360px] line-wave-bg -mx-8 px-8 mb-16">
            <div class="mb-[30px]">
                <BaseButton
                    class="!text-gray-400"
                    :size="!isMobile.sm  ? 'sm' : 'mobile'"
                    view="ghost"
                    :icon="{
                    name: 'arrow-left',
                    width: 10,
                    prepend: true
                }"
                >
                    Back
                </BaseButton>
            </div>
            <div class="flex space-x-[18px]">
                <div class="flex flex-grow bg-white px-4 py-6 rounded-[15px] shadow-[0px_8px_12px_rgba(221,221,231,0.2)]">
                    <BaseAvatar
                        class="mr-6 flex-shrink-0"
                        :src="require('@/assets/images/common/placeholder.jpeg')"
                        alt="DAO"
                        rounded="lg"
                        size="xxl"
                    />
                    <div>
                        <TextSeparator class="mb-2">
                            App page
                        </TextSeparator>
                        <div class="title-h4 text-gray-600 mb-2">
                            APP Name
                        </div>
                        <div class="text-xs mb-6">
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                            Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis disap
                        </div>
                        <div class="flex -mx-2 -mt-4">
                            <CategoryLabel
                                v-for="item in 3"
                                :key="item"
                                class="mx-2 mt-4"
                            >
                                Category 1
                            </CategoryLabel>
                        </div>
                    </div>
                </div>
                <div class="w-[294px] p-3 flex-shrink-0 rounded-[15px] bg-primary-100 shadow-[0px_8px_12px_rgba(221,221,231,0.2)] flex flex-col">
                    <div
                        class="bg-white rounded-[12px] p-3 mb-2"
                    >
                        <TextSeparator class="mb-3">
                            Supported by
                            <BaseTooltip
                                content="info"
                            >
                                <BaseIcon
                                    class="ml-1"
                                    name="warning-circle"
                                    width="8"
                                />
                            </BaseTooltip>
                        </TextSeparator>
                        <div class="text-lg text-gray-600 font-semibold">
                            23233 OC
                        </div>
                    </div>
                    <div
                        class="bg-white rounded-[12px] p-3"
                    >
                        <TextSeparator class="mb-3">
                            Supported by
                            <BaseTooltip
                                content="info"
                            >
                                <BaseIcon
                                    class="ml-1"
                                    name="warning-circle"
                                    width="8"
                                />
                            </BaseTooltip>
                        </TextSeparator>
                        <div class="text-lg text-gray-600 font-semibold">
                            23233 OC
                        </div>
                    </div>
                    <BaseButton
                        class="w-full font-semibold mt-auto"
                        theme="primary-400"
                        rounded="lg"
                        @click="open('SupportAppLayer')"
                    >
                        Support App
                    </BaseButton>
                </div>
            </div>
        </div>
        <div>
            <div class="title-h5 text-600 mb-6">
                App Functions
            </div>
            <div class="space-y-[18px]">
                <div
                    v-for="item in 4"
                    :key="item"
                    class="bg-primary-100 rounded-[5px] p-4 flex justify-between items-center"
                >
                    <div class="max-w-[340px]">
                        <div class="title-h6 text-600 mb-2">
                            Function name
                        </div>
                        <div class="text-xs text-gray-600">
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                            Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis disap
                        </div>
                    </div>
                    <div class="text-gray-500 text-xxs">
                        <div>
                            Used in proposals
                        </div>
                        <div>
                            <span class="title-h6 text-gray-600">2305</span> times
                        </div>
                    </div>
                    <div>
                        <BaseButton
                            view="outlined"
                            size="sm"
                            theme="primary-200"
                            rounded="lg"
                        >
                            Save for fast access
                        </BaseButton>
                    </div>
                </div>
            </div>
        </div>
    </div>
<!--    <div v-else class="-preloader -preloader_placeholder"></div>-->
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import TextSeparator from '@/components/TextSeparator/TextSeparator.vue';
import BaseTooltip from '@/components/BaseTooltip/BaseTooltip.vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import CategoryLabel from '@/components/CategoryLabel/CategoryLabel.vue';
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';
import BaseAvatar from '@/components/BaseAvatar/BaseAvatar.vue';
import useLayer from '@/composables/useLayer';
import useIsMobile from '@/composables/useIsMobile';

// META

const { open } = useLayer();

const route = useRoute();

const isMobile = useIsMobile();

const formInfo = {
    tags: [
        { id: 'all', title: 'All followers' },
        { id: 'admins', title: 'Admins only' }
    ],
};

const formData = ref({
    tagValue: formInfo.tags[0].id,
    limits: 20
});


// META:PAGE


// watchEffect(() => {
//     page.value.error && useError(404)
// });
</script>
<style scoped>
.line-wave-bg {
    @apply relative;
    background-image: url('@/assets/sprite/svg/line-wave-app.svg');
    background-repeat: repeat-x;
    background-size: auto;
}
</style>
