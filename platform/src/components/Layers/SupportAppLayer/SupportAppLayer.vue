<template>
    <BaseLayer
        :theme-settings="{
            container: 'max-w-[502px] p-10 rounded-[10px]'
        }"
        id="SupportAppLayer"
    >
        <div :class="classes.top">
            <div :class="classes.topLeft">
                <p :class="classes.title">
                    Create new Proposal
                </p>
                <p :class="classes.topText">
                    To support App development transfer OuterCircle Tokens.
                    <br>
                    <ActionLink href="#">Buy OuterCircle Tokens here.</ActionLink>.
                </p>
            </div>
            <BaseCross @click="close('SupportAppLayer')" />
        </div>
        <div :class="classes.fieldWrapper">
            <TextField
                v-model="tokenAmount"
                title="Transfer tokens to App"
                placeholder="Enter tokens amount"
                size="xl"
            >
                <template #append-inner-right="{ classes: styles }">
                    <div
                        :class="[styles, classes.fieldInner]"
                    >
                        <BaseImage
                            :class="classes.fieldInnerLogo"
                            :src="require('@/assets/images/common/logo.png')"
                            alt="OuterCircle"
                        />
                        <div :class="classes.fieldInnerText">
                            OUTER CIRCLE TOKEN
                        </div>
                    </div>
                </template>
            </TextField>
        </div>
        <BaseButton
            class="w-full"
            theme="primary-400"
            size="lg"
        >
            Transfer tokens
        </BaseButton>
    </BaseLayer>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import useLayer from '@/composables/useLayer';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import TextField from '@/components/Form/TextField/TextField.vue';
import BaseCross from '@/components/BaseCross/BaseCross.vue';
import ActionLink from '@/components/ActionLink/ActionLink.vue';
import BaseLayer from '@/components/Layers/BaseLayer/BaseLayer.vue';
import makeClasses from '@/helpers/makeClasses';


// META

const { close } = useLayer();


// CLASSES

const useClasses = makeClasses(() => ({
    top: () => [
        'flex items-center justify-between mb-11 sm:items-start'
    ],
    title: () => [
        'title-h5 !text-600 mb-2'
    ],
    topText: () => [
        'text-sm font-medium text-400 sm:text-xxs'
    ],
    cross: () => [
        'text-[#B6B6BE] cursor-pointer ml-1'
    ],
    fieldWrapper: 'mb-11',
    fieldInner: 'w-[164px] flex items-center p-1 border border-surface-300 rounded-[4px]',
    fieldInnerLogo: 'w-[24px] mr-2',
    fieldInnerText: 'text-xxs tracking-[0.08px] uppercase font-bold'
}));


// INPUT

const tokenAmount = ref('');

const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({
    });
});
</script>
