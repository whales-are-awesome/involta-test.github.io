<template>
    <div
        class="relative flex items-center pt-[224px] pb-[238px] md:pt-[150px] md:pb-[181px] md:min-h-0 overflow-hidden"
    >
        <div class="absolute inset-0 -z-1 pointer-events-none top-0 left-0 md:hidden">
            <div class="w-[2366px] h-[1244px] absolute left-1/2 -translate-x-1/2 top-[-462px] z-[1]">
                <img
                    class="absolute inset-0 -translate-x-[100px]"
                    :src="require('@/assets/images/home/hero/waves.png')"
                    alt="waves"
                />
            </div>
            <div class="absolute inset-0 z-[-1] backdrop-blur-[70px] bg-[rgba(255,255,255,.01)]"/>
            <div class="w-[1577px] h-[966px] absolute left-1/2 -translate-x-1/2 top-[-271px] z-[-2]">
                <img
                    class="absolute inset-0"
                    :src="require('@/assets/images/home/hero/bg-colors.png')"
                    alt="colors"
                />
            </div>
        </div>
        <div class="w-[1412px] h-[1004px] absolute top-[-268px] left-1/2 -translate-x-1/2">
            <div class="absolute inset-0 background -translate-x-[188px]"></div>
        </div>
        <div class="container w-full">
            <kinesis-container event="scroll">
                <kinesis-element :strength="10">
                    <h5 class="text-center mb-5 md:text-left md:text-md-h-1 md:max-w-[347px] md:mb-4 sm:text-sm-h-2">
                        Decentralized <span class="text-[#2F3AB1]">DAO-tooling</span> ecosystem
                    </h5>
                    <p class="text-base max-w-[540px] mx-auto text-center text-primary-400 font-medium mb-10 md:text-left md:text-sm md:mx-0 md:max-w-[357px] sm:mb-9">
                        OuterCircle is an ecosystem that unifies millions of DAO-centric apps to bring new opportunities for developers and infinite flexibility for decentralized communities.
                    </p>
                    <div class="flex justify-center md:justify-start">
                        <BaseButton
                            class="mr-6"
                            rounded="lg"
                            size="lg"
                        >
                            Get early access
                        </BaseButton>
                        <BaseButton
                            view="ghost"
                            rounded="lg"
                            size="lg"
                        >
                            Contact Us
                        </BaseButton>
                    </div>
                </kinesis-element>
            </kinesis-container>
        </div>
    </div>
</template>

<script lang="ts" setup>
import BaseButton from '@/components/BaseButton/BaseButton.vue';
</script>

<style scoped>
.background {
    background-size: cover;
}

@screen md {
    .background {
        background-image: url('@/assets/images/home/hero/bg-tablet.png');
    }
}

@screen sm {
    .background {
        background-image: url('@/assets/images/home/hero/bg-mobile.png');
    }
}
</style>
