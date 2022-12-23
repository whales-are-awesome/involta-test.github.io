<template>
    <div class="min-h-full flex items-center justify-center">
        <div class="text-center flex flex-col items-center">
            <BaseIcon
                class="mb-3 sm:mb-6"
                name="error-page-icon"
                :width="isMobile.sm ? 80 : 96"
            />
            <p class="font-bold text-primary-500 mb-3 sm:text-base">
                {{ errorNumber }}
            </p>
            <p class="title-h4 text-500 mb-3 max-w-[440px] mx-auto sm:text-base sm:mb-2">
                Someone tripped over a wire in the metaverse
            </p>
            <p class="text-400 mb-11 sm:text-xs">
                {{ text }}
            </p>
            <div class="flex space-x-4">
<!--                <BaseButton-->
<!--                    :size="isMobile.sm ? 'sm' : 'lg'"-->
<!--                    theme="surface"-->
<!--                >-->
<!--                    Cancel-->
<!--                </BaseButton>-->
                <BaseButton
                    :size="isMobile.sm ? 'sm' : 'lg'"
                    theme="primary"
                    @click="$router.push({ name: 'home' })"
                >
                    Take me home
                </BaseButton>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import useIsMobile from '@/composables/useIsMobile';


// META

const route = useRoute();
const isMobile = useIsMobile();

const errorNumber = computed(() => {
    return route.query.status || 404;
});

const text = computed<string>(() => {
    return +errorNumber.value === 404
        ? 'An unknown page'
        : 'An unknown error has occured please try again.'
});
</script>
