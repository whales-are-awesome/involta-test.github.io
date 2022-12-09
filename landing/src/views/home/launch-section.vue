<template>
    <div class="launch-section md:mx-auto">
        <div class="container">
            <div class="text-center mb-[90px] md:mb-[45px]">
                <h1 class="mb-8 md:text-md-h-1 md:mb-4 sm:text-md-h-4 sm:mb-3">
                    When will <br class="hidden md:block">OuterCircle launch?
                </h1>
                <p class="text-xl text-primary-300 max-w-[602px] mx-auto md:text-[18px] md:leading-[24px] md:max-w-[410px] sm:text-sm">
                    We're targeting late 2022 for our testnet launch.
                </p>
            </div>
            <div class="flex justify-center">
                <BaseButton
                    rounded="md"
                    size="xl"
                    theme="purple"
                    href="//t.me/+Q7O_G4FME1xmN2Yy"
                >
                    <span class="flex items-center whitespace-nowrap">
                        <span class="flex items-center justify-center w-[40px] h-[40px] mr-4 rounded-[5px] bg-white bg-opacity-20 sm:w-[32px] sm:h-[32px]">
                            <BaseIcon
                                class="sm:scale(0.95)"
                                name="telegram"
                                width="20"
                            />
                        </span>
                        Join Beta Waitlist in Telegram
                    </span>
                </BaseButton>
            </div>
<!--            <form>-->
<!--                <TextField-->
<!--                    v-model="email"-->
<!--                    placeholder="Email Address"-->
<!--                >-->
<!--                    <template #append>-->
<!--                        <button class="flex items-center">-->
<!--                            <span class="text-base text-primary-300 font-semibold mr-[6px] md:text-tiny">-->
<!--                                Subscribe-->
<!--                            </span>-->
<!--                            <BaseIcon-->
<!--                                class="text-primary-300"-->
<!--                                width="16"-->
<!--                                name="angle-right"-->
<!--                            />-->
<!--                        </button>-->
<!--                    </template>-->
<!--                </TextField>-->
<!--            </form>-->
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import TextField from '@/components/Form/TextField.vue';
import BaseIcon from '@/components/BaseIcon';

const email = ref('');
</script>
