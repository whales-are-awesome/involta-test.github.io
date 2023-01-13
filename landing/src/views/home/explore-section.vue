<template>
    <div>
        <div class="container">
            <h2 class="text-center mb-[36px] md:text-md-h-4 md:mb-6">
                Explore OuterCircle
            </h2>
            <div class="flex justify-center mb-11 md:mb-10">
                <TagsList
                    v-model="currentItem"
                    :items="tagListItems"
                />
            </div>
            <div class="flex flex-wrap -mx-4 -mt-8 md:-mx-1 md:-mt-2">
                <div
                    v-for="(item, index) in currentItems"
                    :key="item.title"
                    :class="['px-4 pt-8 flex md:px-1 md:pt-2 sm:w-full', item.class]"
                >
                    <div
                        :class="[
                            'bg-[#F4F4F4] rounded-[20px] w-full relative'
                        ]"
                    >
                        <div :class="[
                            {
                                'p-9 flex items-center -mx-[46px] md:px-6 md:py-8 md:-mx-[18px] sm:flex-col': !index,
                                'min-h-full flex': index
                            }
                        ]">
                            <div
                                :class="[
                                    'flex-shrink-0',
                                    {
                                        'px-[46px] w-1/2 md:px-[18px] sm:px-[16px] sm:mb-8 sm:w-full': !index,
                                        'absolute right-0 bottom-0': index
                                    }
                                ]"
                            >
                                <img
                                    :class="item.image.class"
                                    :src="require(`@/assets/images/home/explore/${ item.image.name }`)"
                                    :alt="`Картинка - ${ index + 1 }`"
                                >
                            </div>
                            <div
                                :class="[
                                'flex-shrink-0 w-full',
                                    {
                                        'px-[46px] w-1/2 md:px-[18px] sm:w-full': !index,
                                        'pt-[40px] pb-[66px] px-9 md:px-4 md:pt-[32px] md:pb-[64px] w-full flex flex-col': index
                                    }
                                ]"
                            >
                                <h5 class="mb-6 md:text-lg md:mb-4" v-html="item.title"></h5>
                                <p
                                    class="mb-16 text-xl md:text-sm md:mb-6"
                                    :class="{
                                        'max-w-none': !index,
                                        'max-w-[434px] md:max-w-none': index
                                    }"
                                >
                                    {{ item.text }}
                                </p>
                                <div class="mt-auto">
                                    <BaseButton
                                        view="icon"
                                        size="icon"
                                        rounded="lg"
                                        :disabled="item.button.disabled"
                                        :icon="{ name: 'angle-right' }"
                                        theme="thirdly"
                                        :href="item.button.link"
                                    >
                                        {{ item.button.title }}
                                    </BaseButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import TagsList from '@/components/TagsList/TagsList.vue';
import { ref, computed } from 'vue';

const items = [
    [
        {
            class: 'w-full',
            title: 'Enter the Ecosystem',
            text: 'Read the docs, explore standards and SDK to build your next community-centric dApp.',
            image: {
                name: 'image-1.png',
                class: 'w-full'
            },
            button: {
                title: 'Read Docs',
                link: '//docs.outercircle.io/'
            }
        },
        {
            class: 'w-1/2',
            title: 'Join community',
            text: 'Reach other builders, discuss ideas and get answers to your questions.',
            image: {
                name: 'image-2.png',
                class: 'w-[300px] md:w-[130px]'
            },
            button: {
                title: 'Join Discord',
                link: '//discord.gg/8dU5CaQaEb'
            }
        },
        {
            class: 'w-1/2',
            title: 'Stay updated',
            text: 'Follow our socials to keep a pulse on and never miss a single update.',
            image: {
                name: 'image-3.png',
                class: 'w-[300px] md:w-[130px]'
            },
            button: {
                title: 'Follow on Twitter',
                link: '//twitter.com/0xOuterCircle'
            }
        }
    ],
    [
        {
            class: 'w-full',
            title: 'Enter the Ecosystem',
            text: 'Explore existing DAO-centric apps, read tutorials and build your community with ease.',
            image: {
                name: 'image-4.png',
                class: 'w-full'
            },
            button: {
                title: 'Soon',
                disabled: true
            }
        },
        {
            class: 'w-1/2',
            title: 'Join community',
            text: 'Reach other DAO founders, find partnerships and get answers to your questions.',
            image: {
                name: 'image-2.png',
                class: 'w-[300px] md:w-[130px]'
            },
            button: {
                title: 'Join Discord',
                link: '//discord.gg/8dU5CaQaEb'
            }
        },
        {
            class: 'w-1/2',
            title: 'Stay updated',
            text: 'Follow our socials to keep a pulse on and never miss a single update.',
            image: {
                name: 'image-3.png',
                class: 'w-[300px] md:w-[130px]'
            },
            button: {
                title: 'Follow on Twitter',
                link: '//twitter.com/0xOuterCircle'
            }
        }
    ]
];

const tagListItems = ref([
    { id: 0, title: 'Developer' },
    { id: 1, title: 'DAO-Builder' }
]);
const currentItem = ref(tagListItems.value[0]);

const currentItems = computed(() => {
    return items[currentItem.value.id];
});
</script>
