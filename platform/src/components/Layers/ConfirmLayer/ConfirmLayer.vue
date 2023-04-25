<template>
    <BaseLayer
        :theme-settings="{
            container: classes.rootContainer
        }"
        :id="id"
    >
        <div :class="classes.top">
            <BaseIcon
                name="alert-error"
                width="36"
            />
            <div :class="classes.title" v-html="title"></div>
            <BaseCross />
        </div>
        <div :class="classes.message" v-html="message"></div>
        <div :class="classes.buttons">
            <BaseButton
                :class="classes.button"
                size="lg"
                theme="alert"
                @click="close(id, true)"
            >
                {{ acceptButtonCaption }}
            </BaseButton>
            <BaseButton
                :class="classes.button"
                view="ghost"
                size="lg"
                @click="close(id)"
            >
                {{ declineButtonCaption }}
            </BaseButton>
        </div>
    </BaseLayer>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import useLayer from '@/composables/useLayer';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';
import BaseCross from '@/components/BaseCross/BaseCross.vue';
import BaseLayer from '@/components/Layers/BaseLayer/BaseLayer.vue';
import makeClasses from '@/helpers/makeClasses';
import { Themes } from './types';


// META

export interface IProps {
    id: string
    title: string
    message: string
    theme: Themes
    acceptButtonCaption?: string
    declineButtonCaption?: string
}

const props = withDefaults(defineProps<IProps>(), {
    acceptButtonCaption: 'Yes',
    declineButtonCaption: 'No'
});

const { close } = useLayer();


// CLASSES

const useClasses = makeClasses(() => ({
    rootContainer: 'max-w-[480px] p-6 rounded-[8px]',
    top: 'flex items-center mb-[28px]',
    icon: 'flex-shrink-0',
    title: () => [
        'text-xl font-semibold text-600 ml-4 mr-auto'
    ],
    message: () => [
        'mb-[28px] text-md text-500'
    ],
    buttons: 'flex space-x-3',
    button: 'w-[120px]'
}));

const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({
    });
});
</script>
