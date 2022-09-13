<template>
    <div class="relative py-[40px]">
        <div class="absolute left-1/2 -translate-x-1/2 top-[-94px] pointer-events-none -z-1">
            <kinesis-container event="scroll">
                <kinesis-element :strength="30">
                    <img
                        class="w-[812px] -translate-x-[184px] max-w-none"
                        :src="require('@/assets/images/home/platform/bg.png')"
                        alt="bg"
                    >
                </kinesis-element>
            </kinesis-container>
        </div>
        <div class="container">
            <h3 class="mb-[115px] text-center md:text-md-h-5 md:mb-[55px] md:text-left sm:mb-[93px]">
                The complete platform
                <br>
                for DAO-tools.
            </h3>
            <kinesis-container
                event="scroll"
                class="flex flex-col px-16 space-y-[80px] md:space-y-0 md:flex-row md:flex-wrap md:px-0 md:-mt-16 md:-mx-4 pb-2 sm:space-y-16"
            >
                <kinesis-element
                    v-for="(item, index) in items"
                    :key="index"
                    class="max-w-[421px] odd:self-end md:w-1/2 md:px-4 md:!mt-16 sm:w-full"
                    :strength="(index + 1) * 20"
                >
                    <h5 class="mb-6 md:text-lg md:mb-4">
                        {{ item.title }}
                    </h5>
                    <p class="text-xl mb-9 md:text-sm md:mb-6">
                        {{ item.text }}
                    </p>
                    <BaseButton size="md">
                        Get early access
                    </BaseButton>
                </kinesis-element>
            </kinesis-container>
        </div>
    </div>
</template>

<script lang="ts" setup>
import BaseButton from '@/components/BaseButton/BaseButton.vue';

const items = [
    {
        title: 'Forget constructors',
        text: 'OuterCircle is where millions of blockchain projects come together to gather cool tools in one place'
    },
    {
        title: 'Take control',
        text: 'OuterCircle is where millions of blockchain projects come together to gather cool tools in one place'
    },
    {
        title: 'Take control',
        text: 'OuterCircle is where millions of blockchain projects come together to gather cool tools in one place'
    },
    {
        title: 'Forget constructors',
        text: 'OuterCircle is where millions of blockchain projects come together to gather cool tools in one place'
    }
];

</script>
