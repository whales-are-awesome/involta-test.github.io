<template>
    <div class="md:mx-auto">
        <div class="container">
            <div class="text-center mb-[90px] md:mb-[45px]">
                <h1 class="mb-8 md:text-md-h-1 md:mb-4 sm:text-md-h-4 sm:mb-3">
                    When will <br class="hidden md:block">OuterCircle launch?
                </h1>
                <p class="text-xl text-primary-300 max-w-[602px] mx-auto md:text-[18px] md:leading-[24px] md:max-w-[410px] sm:text-sm">
                    We're targeting late 2022 for our testnet launch. Left your email if you'd like to join our Beta-List.
                </p>
            </div>
            <form>
                <div class="max-w-[631px] mx-auto md:max-w-[410px]">
                    <TextField
                        v-model="email"
                        placeholder="Email Address"
                    >
                        <template #append>
                            <button class="flex items-center">
                                <span class="text-base text-primary-300 font-semibold mr-[6px] md:text-tiny">
                                    Subscribe
                                </span>
                                <BaseIcon
                                    class="text-primary-300"
                                    width="16"
                                    name="angle-right"
                                />
                            </button>
                        </template>
                    </TextField>
                </div>
            </form>
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
