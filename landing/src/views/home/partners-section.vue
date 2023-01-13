<template>
    <div class="container">
        <h4 class="text-center mb-16 md:text-md-h-2 md:mb-16 sm:text-md-h-4 sm:mb-10 sm:font-bold">
            Our Partners
        </h4>
        <div class="flex flex-wrap -mt-3 -mx-1.5 sm:-mx-1 sm:-mt-2">
            <a
                v-for="(item, index) in items"
                :key="index"
                class="mt-3 px-1.5 w-1/4 md:w-1/2 sm:px-1 sm:mt-2"
                target="_blank"
                :href="item.href"
            >
                <div class="h-[92px] flex items-center justify-center border border-surface-100 rounded-[12px] px-4 transition-fast hover:-translate-y-2 sm:h-[52px] sm:rounded-[8px]">
                    <div class="">
                        <BaseIcon
                            v-if="item.icon"
                            class="sm:scale-[0.8]"
                            :name="item.icon"
                            :width="item.width"
                            :height="item.height"
                        />
                        <img
                            v-else
                            class="sm:scale-[0.8]"
                            :src="item.image"
                            :width="item.width"
                            :alt="`partner-${ index }`"
                        >
                    </div>
                </div>
            </a>
        </div>
    </div>
</template>

<script lang="ts" setup>
import BaseIcon from '@/components/BaseIcon.vue';

const items = [
    { icon: 'dao-vibes', href: '//www.youtube.com/channel/UCaKReM_yU8sm_EkUeQEaAMg', width: '151', height: '22' },
    { image: require('@/assets/images/home/partners/frienly.png'), href: '//www.frenly.cc', width: '153' },
    { icon: 'enqo', href: '//enqo.com', width: '182', height: '48' },
    { image: require('@/assets/images/home/partners/walletchat.png'), href: '//www.walletchat.fun/', width: '209' },
];
</script>
