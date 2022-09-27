<template>
    <div class="container">
        <h4 class="text-center mb-[130px] md:text-md-h-2 md:mb-16 sm:text-lg sm:mb-4">
            The pulse of ecosystem.
        </h4>
        <div class="flex justify-between items-start mb-[72px] md:mb-[40px] sm:flex-col sm:mb-[200px]">
            <div class="max-w-[256px] md:max-w-[159px] sm:text-center sm:max-w-none sm:mb-16 sm:w-full">
                <div class="mb-6 text-primary-300 text-xl md:text-sm md:mb-4">
                    OuterCircle is currently under development. <br class="hidden sm:block">Reach us to get early access.
                </div>
                <BaseButton
                    class="sm:mx-auto"
                    size="sm"
                    @click="scrollIntoViewElement('.launch-section')"
                >
                    Get early access
                </BaseButton>
            </div>
            <div class="space-y-10 md:space-y-5 sm:space-y-0 sm:flex sm:justify-between sm:w-full">
                <div
                    v-for="(item, index) in topItems"
                    :key="index"
                    class="text-right sm:text-center sm:w-1/3"
                >
                    <div class="text-h-5 font-semibold text-primary-500 md:text-md-h-3 sm:text-xl">
                        {{ item.title }}
                    </div>
                    <div class="text-primary-400 text-base md:text-md-sm sm:text-sm-tiny">
                        {{ item.text }}
                    </div>
                </div>
            </div>
        </div>
        <div class="rounded-[100px] shadow-[10px_10px_50px_3px_rgba(41,39,141,.1)] relative -mx-16 md:-mx-8 md:rounded-[20px] sm:-mx-6">
            <div class="absolute inset-0 rounded-[100px] overflow-hidden flex -z-1 md:rounded-[20px]">
                <canvas class="pulse-bg-gradient w-full"></canvas>
            </div>
            <div class="pt-[86px] pb-[130px] px-16 md:pt-[36px] md:px-8 md:pb-[34px] sm:px-6">
                <div class="absolute left-1/2 bottom-full translate-y-1/3 -translate-x-1/2">
                    <div
                        class="
                            w-[360px] h-[680px] rounded-[180px] border-[12px] relative
                            border-[#E6E6EB] flex items-center justify-center
                            bg-white md:w-[200px] md:h-[350px] md:border-[4px]
                            sm:w-[110px] sm:h-[230px] sm:rounded-[200px]

                            after:absolute after:inset-0 after:bg-[rgba(27,27,32,.3)]
                            after:z-[-1] after:rounded-[inherit] after:blur-[120px]
                        "
                    >
                        <kinesis-container>
                            <kinesis-element
                                :strength="20"
                                type="depth"
                            >
                            <div class="pulse">
                                <img
                                    class="w-[580px] max-w-none pointer-events-none translate-y-[10px] md:w-[370px] md:translate-y-[-10px] sm:w-[220px]"
                                    :src="require('@/assets/images/home/pulse/image.png')"
                                    alt="Liquid"
                                />
                            </div>
                            </kinesis-element>
                        </kinesis-container>
                    </div>
                </div>
                <div class="text-white mb-[105px] md:mb-[32px]">
                    <div class="flex justify-between text-[32px] font-semibold pb-[23px] md:text-lg md:pb-[2px] sm:text-sm-sm sm:pb-[10px]">
                        <p>
                            All facets of
                        </p>
                        <p>
                            OuterCircle
                        </p>
                    </div>
                    <div class="border-dashed mb-[23px] md:mb-[18px] sm:mb-[22px]"></div>
                    <div class="text-xl font-medium flex justify-between md:text-tiny md:uppercase sm:text-md-sm">
                        <div class="flex items-center space-x-11 md:space-x-4">
                            <p>Build</p>
                            <p class="h-[50px] w-px bg-white md:h-[8px]"></p>
                            <p>Integrate</p>
                        </div>
                        <div class="flex items-center space-x-11 md:space-x-4">
                            <p>Communicate</p>
                            <p class="h-[50px] w-px bg-white md:h-[8px]"></p>
                            <p>Impact</p>
                        </div>
                    </div>
                </div>
                <div class="bg-white rounded-[20px] md:rounded-[10px]">
                    <div class="pt-8 px-24 pb-6 flex justify-between border-b border-[rgba(27,27,32,.2)] md:px-8 md:pb-3 md:pt-3 sm:px-4">
                        <div
                            v-for="(item, index) in graphHeader"
                            :key="index"
                            class="flex flex-col items-center"
                        >
                            <BaseIcon
                                class="mb-3 md:scale-[0.5] md:mb-0"
                                :name="item.icon"
                                width="24"
                            />
                            <p class="text-primary-400 text-[18px] md:text-md-sm">
                                {{ item.title }}
                            </p>
                        </div>
                    </div>
                    <div>
                        <img
                            class="w-full"
                            :src="require('@/assets/images/home/pulse/graph.png')"
                            alt="Graph"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, nextTick } from 'vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import BaseIcon from '@/components/BaseIcon.vue';
import scrollIntoViewElement from '@/helpers/scrollIntoView';

const topItems = [
    {
        title: 'TBA',
        text: 'Existing DAOs'
    },
    {
        title: 'TBA',
        text: 'Launced Apps'
    },
    {
        title: 'TBA',
        text: 'Processed Proposals'
    }
];

const graphHeader = [
    {
        title: 'DAOs',
        icon: 'pulse-dao'
    },
    {
        title: 'Apps',
        icon: 'pulse-app'
    },
    {
        title: 'Proposals',
        icon: 'pulse-proposals'
    },
    {
        title: 'Votes',
        icon: 'pulse-votes'
    },
    {
        title: 'Social',
        icon: 'pulse-social'
    },
];

onMounted(() => {
    // @ts-ignore
    /* eslint-disable */
    nextTick(() => {
        try {
            new Gradient({
                canvas: '.pulse-bg-gradient',
                colors: ['#B565FE', '#6577F5', '#3BD7F5', '#6577F5'],
                wireframe: false,
                density: [.01, 0.5],
                angle: 0,
                amplitude: 0,
                static: false,
                loadedClass: 'is-loaded',
            });
        } catch (e) {

        }
    })
});
</script>

<style>
.border-dashed {
    height: 2px;
    background-image: url("data:image/svg+xml;utf8,<svg width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><rect width='100%' height='100%' style='fill: none; stroke: white; stroke-width: 4; stroke-dasharray: 8 20'/></svg>");
}
.pulse {
    animation: 1.5s heartbeat infinite;
}
@screen md {
    .border-dashed {
        height: 1px;
        background-image: url("data:image/svg+xml;utf8,<svg width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><rect width='100%' height='100%' style='fill: none; stroke: white; stroke-width: 2; stroke-dasharray: 5 8'/></svg>");
    }
}
@screen sm {
    .border-dashed {
        background-image: url("data:image/svg+xml;utf8,<svg width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><rect width='100%' height='100%' style='fill: none; stroke: white; stroke-width: 2; stroke-dasharray: 5 10'/></svg>");
    }
}
@keyframes heartbeat {
    0% {
        transform: scale( .93 );
    }
    33% {
        transform: scale( 1 );
    }
    66% {
        transform: scale( .93 );
    }
    100% {
        transform: scale( .93 );
    }
}
</style>

