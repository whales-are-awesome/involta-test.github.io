<template>
    <div class="relative py-[40px]">
        <div class="absolute left-1/2 -translate-x-1/2 top-[-134px] pointer-events-none -z-1">
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
            <h3 class="mb-[110px] text-center md:text-md-h-2 md:mb-[55px] md:text-left">
                The complete platform
                <br>
                for DAO-tools.
            </h3>
            <kinesis-container
                event="scroll"
                class="flex justify-between px-16 md:px-0 md:-mx-4 pb-2 sm:flex-col sm:space-y-16"
            >
                <kinesis-element
                    v-for="(item, index) in items"
                    :key="index"
                    class="max-w-[421px] md:w-1/2 md:px-4 sm:w-full"
                    :class="!index && 'mt-[345px] md:mt-0'"
                    :strength="(index + 1) * 20"
                >
                    <h5 class="mb-6 md:text-lg md:mb-4">
                        {{ item.title }}
                    </h5>
                    <p class="text-xl mb-9 md:text-sm md:mb-6">
                        {{ item.text }}
                    </p>
                    <BaseButton size="md">
                        <span class="text-base font-medium md:text-md-sm">
                            Get early access
                        </span>
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
        title: 'Take control',
        text: 'OuterCircle is where millions of blockchain projects come together to gather cool tools in one place'
    },
    {
        title: 'Forget constructors',
        text: 'OuterCircle is where millions of blockchain projects come together to gather cool tools in one place'
    }
];

</script>
