<template>
    <BaseLayer
        class="p-8"
        id="AlertLayer"
        :theme-settings="{
            container: 'p-[54px] w-[534px] flex flex-col base-animation-layer rounded-[4px] text-center'
        }"
    >
        <div
            v-if="iconName"
            class="mb-11 flex justify-center"
        >
            <BaseIcon
                :name="iconName"
                width="104"
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
                @click="close('AlertLayer')"
            >
                Cancel
            </BaseButton>
            <BaseButton
                theme="primary"
                @click="close('AlertLayer', true)"
            >
                {{ buttonText }}
            </BaseButton>
        </div>
    </BaseLayer>
</template>

<script lang="ts" setup>
/* IMPORTS */

import { defineProps, computed } from 'vue';
import useLayer from '@/composables/useLayer';
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import BaseLayer from '@/components/Layers/BaseLayer/BaseLayer.vue';
import { Statuses } from './types';

const { close } = useLayer();

/* INTERFACES */

interface IProps {
    title: string
    text: string
    buttonText: string
    status: Statuses
}

/* META */

const props =withDefaults(defineProps<IProps>(), {

});

/* COMPUTED */

const iconName = computed(() => {
    switch(props.status) {
        case 'success':
            return 'alert-success'
        case 'error':
            return 'alert-error'
        case 'unknown':
            return 'alert-unknown';
    }

    return '';
});
</script>
