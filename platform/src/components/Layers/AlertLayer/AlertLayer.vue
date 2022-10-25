<template>
    <BaseLayer
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

<style scoped>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: table;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.modal-container {
    width: 300px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
}

.modal-header h3 {
    margin-top: 0;
    color: #42b983;
}

.modal-body {
    margin: 20px 0;
}

.modal-default-button {
    float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
    opacity: 0;
}

.modal-leave-to {
    opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>
