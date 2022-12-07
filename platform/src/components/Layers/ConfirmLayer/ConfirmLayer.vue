<template>
    <BaseLayer
        :theme-settings="{
            container: 'max-w-[664px] p-11 rounded-[20px]'
        }"
        id="ConfirmLayer"
    >
        <h4 :class="classes.title" v-html="title"></h4>
        <div :class="classes.message" v-html="message"></div>
        <div class="flex justify-end">
            <BaseButton
                @click="close('ConfirmLayer')"
                class="w-[200px]"
                view="outlined"
            >
                {{ declineButtonCaption }}
            </BaseButton>
            <BaseButton
                class="ml-2 w-[200px]"
            >
                {{ acceptButtonCaption }}
            </BaseButton>
        </div>
    </BaseLayer>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import useLayer from '@/composables/useLayer';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import BaseLayer from '@/components/Layers/BaseLayer/BaseLayer.vue';
import makeClasses from '@/helpers/makeClasses';


// META

interface IProps {
    title: string
    message: string
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
    title: () => [
        'title-h4 mb-4'
    ],
    message: () => [
        'mb-11 text-lg'
    ]
}));

const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({
    });
});
</script>
