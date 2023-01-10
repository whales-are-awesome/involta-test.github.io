<template>
    <div class="relative">
        <div class="absolute inset-0 z-50 bg-white bg-opacity-70 flex justify-center items-center">
            <div class="title-h1 text-400">
                WORK IN PROGRESS
            </div>
        </div>
        <div class="line-wave-bg h-[360px] w-screen absolute top-0 left-1/2 -translate-x-1/2 z-[-1] border-b border-primary-100"></div>
        <div class="pt-[34px] px-8 mb-16 md:h-au md:mb-[143px] md:px-0 sm:pt-[26px]">
            <div class="mb-[20px] sm:mb-[15px]">
                <BaseButton
                    class="-ml-3 sm:-ml-1"
                    :size="!isMobile.sm  ? 'sm' : 'mobile'"
                    view="ghost"
                    :icon="{
                        name: 'arrow-left',
                        width: 10,
                        prepend: true
                    }"
                    :theme-settings="{
                        textColor: 'text-gray-400'
                    }"
                    @click="$router.push({ name: 'home' })"
                >
                    <span class="md:text-sm">Back</span>
                </BaseButton>
            </div>
            <div class="flex space-x-[18px] md:flex-wrap md:space-x-0 md:space-y-3">
                <div class="flex flex-grow bg-white px-4 py-6 rounded-[15px] border border-primary-100 md:w-full md:p-4 md:items-start sm:py-4 sm:px-3">
                    <BaseAvatar
                        class="mr-6 flex-shrink-0 sm:mr-3"
                        :src="require('@/assets/images/common/placeholder.jpg')"
                        alt="DAO"
                        :rounded="isMobile.sm ? 'md' : 'lg'"
                        size="xxl"
                    />
                    <div>
                        <div class="title-h4 text-gray-600 mb-3 mt-1 md:text-h5 md:mt-0 md:mb-2 sm:text-base sm:mt-1 sm:mb-1">
                            APP Name
                        </div>
                        <div class="text-xs mb-6 sm:text-tiny">
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                            Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis disap
                        </div>
                        <div class="flex flex-wrap -mx-1 -mt-2">
                            <CategoryLabel
                                v-for="item in 3"
                                :key="item"
                                class="mx-1 mt-2"
                            >
                                Category
                            </CategoryLabel>
                        </div>
                    </div>
                </div>
                <div class="w-[294px] p-3 flex-shrink-0 rounded-[15px] bg-primary-100 shadow-[0px_8px_12px_rgba(221,221,231,0.2)] flex flex-col md:w-full md:flex-row md:flex-wrap md:p-4 sm:px-3">
                    <div class="mb-2 md:mb-0 md:w-1/2 md:px-1">
                        <div
                            class="bg-white rounded-[12px] p-3 sm:p-2"
                        >
                            <TextSeparator class="mb-3 whitespace-nowrap sm:before:hidden sm:mb-2">
                                <span class="sm:text-xxs">Supported by</span>
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
                    </div>
                    <div class=" md:w-1/2 md:px-1">
                        <div
                            class="bg-white rounded-[12px] p-3 sm:p-2"
                        >
                            <TextSeparator class="mb-3 whitespace-nowrap sm:before:hidden sm:mb-2">
                                <span class="sm:text-xxs">Backed By</span>
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
                    </div>
                    <BaseButton
                        class="w-full font-semibold mt-auto mt:mb-6 md:mt-3"
                        theme="primary"
                        rounded="lg"
                        :theme-settings="{
                            size: 'h-[40px] sm:h-[32px]'
                        }"
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
                    class="bg-primary-100 rounded-[5px] p-4"
                >
                    <div class="flex justify-between items-center flex-wrap sm:items-stretch">
                        <div class="w-1/3 sm:w-full sm:mb-6">
                            <div class="title-h6 text-600 mb-2 sm:text-base">
                                Function name
                            </div>
                            <div class="text-xs text-gray-600">
                                Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                                Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis disap
                            </div>
                        </div>
                        <div class="w-1/3 text-center text-gray-500 text-xxs sm:bg-white sm:w-1/2 sm:pl-3 sm:py-3 sm:rounded-bl-[10px] sm:rounded-tl-[10px] sm:text-left">
                            <div class="sm:mb-1">
                                Used in proposals
                            </div>
                            <div>
                                <span class="title-h6 text-gray-600">2305</span> times
                            </div>
                        </div>
                        <div class="w-1/3 flex justify-end sm:bg-white sm:w-1/2 items-center sm:pr-3 sm:py-3 sm:rounded-br-[10px] sm:rounded-tr-[10px]">
                            <BaseButton
                                class="whitespace-nowrap"
                                view="outlined"
                                size="sm"
                                theme="primary-200"
                                rounded="lg"
                            >
                                Save <span v-if="!isMobile.sm">for fast access</span>
                            </BaseButton>
                        </div>
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
    background-image: url('@/assets/sprite/svg/line-wave-app.svg');
    background-repeat: repeat-x;
    background-size: auto;
}
</style>
