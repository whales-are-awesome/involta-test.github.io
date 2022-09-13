<template>
    <div class="container">
        <h3 class="text-center mb-[36px] md:text-md-h-2 md:mb-[25px] sm:text-md-h-4">
            Develop custom mechanics <br>to operate your DAO.
        </h3>
        <div class="flex justify-center mb-11">
            <TagsList
                v-model="currentItem"
                :items="tagListItems"
            />
        </div>
        <div class="flex justify-between px-[54px] md:flex-col md:px-0 md:space-y-[100px]">
            <div
                v-for="(item, index) in currentItems"
                :key="item.title"
                class="max-w-[273px] relative md:max-w-[203px]"
                :class="item.class"
            >
                <div class="md:hidden" :style="`margin-top: ${ index * 70 + (index && 4) }px`"></div>
                <div
                    data-aos="fade"
                    :data-aos-delay="250 * index"
                    data-aos-offset="150"
                >
                    <div class="w-[98px] h-[98px] bg-primary-500 shadow-[0_32px_44px_rgba(14,22,103,.12)] rounded-[10px] flex items-center justify-center mb-9 md:w-[52px] md:h-[52px] md:mb-5">
                        <BaseIcon
                            class="md:scale-[0.7]"
                            :name="item.icon.name"
                            :width="item.icon.width"
                            :height="item.icon.height"
                        />
                    </div>
                    <div
                        v-if="index !== currentItems.length - 1"
                        class="absolute -z-1"
                        :class="!index ? 'left-[126px] top-[40px] w-[222px] md:top-[240px] md:left-[-25px] md:rotate-[30deg] md:scale-[0.7] sm:top-[132px] sm:left-[-146px] sm:rotate-[81deg]': 'left-[110px] top-[-20px] w-[246px] md:top-[120px] md:left-[150px] md:rotate-[55deg] md:scale-[0.7] sm:left-[110px]'"
                        :data-aos-delay="500 * (index + 1)"
                        data-aos-offset="150"
                    >
                        <img
                            :src="require(`@/assets/images/home/mechanics/arrow-${ index + 1 }.png`)"
                            :alt="`arrow-${ index + 1 }`"
                            data-aos="fade-right"
                        />
                    </div>
                    <div class="text-xl text-primary-500 mb-4 font-bold md:text-lg">
                        {{ item.title }}
                    </div>
                    <div class="text-base text-primary-400 md:text-sm">
                        {{ item.text }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
/* IMPORTS */

import TagsList from '@/components/TagsList/TagsList';
import BaseIcon from '@/components/BaseIcon.vue';
import { computed, ref } from 'vue';

/* CONSTANTS */

const items = [
    [
        {
            class: 'sm:self-end',
            icon: {
                name: 'lamp',
                width: 30,
                height: 38
            },
            title: 'Research the field',
            text: 'Learn what DAOs need and discover new ways to develop DAO-centric dApps.'
        },
        {
            class: 'md:self-center sm:self-start',
            icon: {
                name: 'rocket',
                width: 44.5,
                height: 44
            },
            title: 'Develop and Launch',
            text: 'OuterCircle doesn\'t limit your implementation. Build your tool following ERC and use our SDK.'
        },
        {
            class: 'md:self-end sm:self-end',
            icon: {
                name: 'people',
                width: 38,
                height: 32
            },
            title: 'Reach your clients',
            text: 'List your app and reach millions of DAOs instantly. OuterCircle won\'t charge you!\n'
        }
    ],
    [
        {
            class: '',
            icon: {
                name: 'rocket',
                width: 44.5,
                height: 44
            },
            title: 'Launch your DAO',
            text: 'Mirror the existing community or create a new one from scratch in several clicks.'
        },
        {
            class: 'md:self-center',
            icon: {
                name: 'dont-limit',
                width: 57,
                height: 57
            },
            title: 'Don\'t limit yourself',
            text: 'Browse and use hundreds of existing tools made for communities or build your own.'
        },
        {
            class: 'md:self-end',
            icon: {
                name: 'smile-face',
                width: 42.75,
                height: 42.75,
            },
            title: 'Grow and evolve',
            text: 'Bring votings and chats to Web3 wallets to stay in touch with your community.'
        }
    ]
];

/* DATA */

const tagListItems = ref([
    { id: 0, title: 'Developer' },
    { id: 1, title: 'DAO-Builder' }
]);
const currentItem = ref(tagListItems.value[0]);
const currentItems = computed(() => {
    return items[currentItem.value.id];
});
</script>
