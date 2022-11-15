<template>
    <BaseLayer
        class="p-8"
        id="DisconnectLayer"
        :theme-settings="{
            container: 'pt-8 pb-6 px-6 max-w-[525px] w-full base-animation-layer rounded-[4px] text-center'
        }"
    >
        <p class="title-h5 mb-3 text-500">
            Do you want to disconnect wallet?
        </p>
        <p class="title-h6 mb-16 text-500">
            0xe6kL7Cpv1oYaNvfG7cdB34jHPRhsa57QzfkGdVa715
        </p>
        <div class="flex justify-center space-x-4">
            <BaseButton
                theme="surface"
                @click="close('DisconnectLayer')"
            >
                Cancel
            </BaseButton>
            <BaseButton
                @click="close('DisconnectLayer', true)"
            >
                Disconnect
            </BaseButton>
        </div>
    </BaseLayer>
</template>

<script lang="ts" setup>
/* IMPORTS */

import useLayer from '@/composables/useLayer';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import BaseLayer from '@/components/Layers/BaseLayer/BaseLayer.vue';

const { close } = useLayer();

/* INTERFACES */

/* META */

/* COMPUTED */

</script>
