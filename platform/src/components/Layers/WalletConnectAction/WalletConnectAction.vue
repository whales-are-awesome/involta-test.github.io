<template>
    <BaseLayer
        class="p-8"
        :class="id"
        :id="id"
        :close-on-click-outside="false"
        :theme-settings="{
            container: 'p-[54px] w-[534px] flex flex-col base-animation-layer rounded-[4px] text-center'
        }"
    >
        <div
            class="mb-11 flex justify-center"
        >
            <BaseIcon
                name="connect-wallet"
                width="104"
                height="104"
            />
        </div>
        <p class="title-h4 mb-3">
            {{ title }}
        </p>
        <p
            class="text-400 mb-11"
            v-html="text"
        >
        </p>
        <div class="flex justify-center space-x-4">
            <BaseButton
                theme="surface"
                @click="close(props.id, true)"
            >
                Cancel
            </BaseButton>
        </div>
    </BaseLayer>
</template>

<script lang="ts" setup>
import useLayer from '@/composables/useLayer';
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import BaseLayer from '@/components/Layers/BaseLayer/BaseLayer.vue';
import { Statuses } from './types';


// META

export interface IProps {
    id: string
    title: string
    text: string
    buttonText: string
    status: Statuses
    callback: () => any
}

const props =withDefaults(defineProps<IProps>(), {

});

const { close } = useLayer();
</script>
