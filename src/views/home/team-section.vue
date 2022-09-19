<template>
    <div class="container">
        <div class="text-center">
            <p class="text-xll font-bold text-primary-500 mb-9 md:text-md-h-1 md:mb-[16px] sm:text-sm-h-4">
                Our Team
            </p>
            <p class="text-xl text-primary-300 mb-[84px] md:text-base md:max-w-[352px] sm:text-sm">
                We are team of Web3.0 enthusiast. Developers do for other developers
            </p>
        </div>
        <div class="flex flex-wrap -mt-8 -mx-[10px] md:-mx-4 sm:-mx-[6px] sm:-mt-[12px]">
            <div
                v-for="(item, index) in items"
                :key="index"
                class="mt-8 px-[10px] w-1/4 md:w-1/2 md:px-4 sm:px-[6px] sm:mt-[12px]"
            >
               <div class="pb-[18px] border border-[#E6E6E6] bg-white shadow-[0px_12px_19px_-5px_rgba(112,58,202,.08)] rounded-[12px] text-center">
                   <div
                       class="pb-[100%] w-full mb-5 bg-cover rounded-[12px]"
                       :style="`background-image: url(${ item.image })`"
                   >
                   </div>
                   <p class="font-semibold text-primary-500 lg:text-base md:text-lg sm:text-sm">
                       {{ item.name }}
                   </p>
                   <p class="text-[#7A4BFF] lg:text-base md:text-lg sm:text-sm">
                       {{ item.job }}
                   </p>
               </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const items = [
    { name: 'Ian Sosunov', job: 'CEO', image: require('@/assets/images/home/team/ian.png') },
    { name: 'Di-Pi', job: 'CTO', image: require('@/assets/images/common/no-avatar.png') },
    { name: 'Olga Abramova', job: 'Product Designer', image: require('@/assets/images/home/team/olya.png') },
    { name: 'Nikita Suponov', job: 'Frontend dev', image: require('@/assets/images/common/no-avatar.png') }
];
</script>
