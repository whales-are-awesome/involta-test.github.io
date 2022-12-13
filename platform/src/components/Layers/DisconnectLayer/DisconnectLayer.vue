<template>
    <BaseLayer
        class="p-8"
        :id="id"
        :theme-settings="{
            container: 'pt-8 pb-6 px-6 max-w-[525px] w-full base-animation-layer rounded-[4px] text-center'
        }"
    >
        <p class="title-h5 mb-3 text-500">
            Do you want to disconnect wallet?
        </p>
        <p class="title-h6 mb-16 text-500">
            {{ address }}
        </p>
        <div class="flex justify-center space-x-4">
            <BaseButton
                theme="surface"
                @click="close(id)"
            >
                Cancel
            </BaseButton>
            <BaseButton
                @click="close(id, true)"
            >
                Disconnect
            </BaseButton>
        </div>
    </BaseLayer>
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue';
import useLayer from '@/composables/useLayer';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import BaseLayer from '@/components/Layers/BaseLayer/BaseLayer.vue';
import { store } from '@/store';


// META

export interface IProps {
    id: string
}

const props =withDefaults(defineProps<IProps>(), {

});

const { close } = useLayer();


// ADDRESS

const address = computed(() => store.state.wallet.address);
</script>
