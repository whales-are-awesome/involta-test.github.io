<template>
    <div class="container relative">
        <img
            class="absolute left-1/2 top-[27px] max-w-none -translate-x-full -z-1"
            :src="require('@/assets/images/home/team/gradient.png')"
            alt="Team gradient"
        >
        <div class="text-center">
            <h1 class="font-bold mb-9 md:text-md-h-1 md:mb-[16px] sm:text-md-h-4">
                Our Team
            </h1>
            <p class="text-xl text-primary-300 mb-[84px] mx-auto md:text-[18px] md:leading-[24px] md:mb-16 sm:text-sm">
                We are a team of Web3.0 enthusiasts. Developers do for other developers!
            </p>
        </div>
        <div class="max-w-[961px] mx-auto">
            <div class="flex flex-wrap -mt-8 -mx-[10px] md:-mx-4 sm:-mx-[6px] sm:-mt-[12px]">
                <a
                    v-for="(item, index) in items"
                    :key="index"
                    class="mt-8 px-[10px] w-1/4 md:w-1/2 md:px-4 sm:px-[6px] sm:mt-[12px]"
                    target="_blank"
                    href="//docs.outercircle.io/general/team"
                >
                    <div class="h-full pb-[18px] border border-[#E6E6E6] bg-white shadow-[0px_12px_19px_-5px_rgba(112,58,202,.08)] hover:shadow-[0px_12px_19px_5px_rgba(112,58,202,.09)] rounded-[12px] text-center transition-fast">
                        <div
                            class="pb-[100%] w-full mb-5 bg-cover rounded-[12px] md:pb-[90%] sm:pb-[100%]"
                            :style="`background-image: url(${ item.image })`"
                        >
                        </div>
                        <p class="font-semibold text-primary-500 lg:text-base md:text-lg sm:text-sm">
                            {{ item.name }}
                        </p>
                        <p class="text-[#7A4BFF] px-1 lg:text-base md:text-lg sm:text-sm">
                            {{ item.job }}
                        </p>
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const items = [
    { name: 'Ian Sosunov', job: 'Founder', image: require('@/assets/images/home/team/ian.png') },
    { name: 'Olga Abramova', job: 'Product Designer', image: require('@/assets/images/home/team/olya.png') },
    { name: 'Nikita Suponov', job: 'Frontend Developer', image: require('@/assets/images/home/team/nick.jpeg') },
    { name: 'dristpunk.eth', job: 'Blockchain Developer', image: require('@/assets/images/home/team/dristpunk.jpeg') }
];
</script>
