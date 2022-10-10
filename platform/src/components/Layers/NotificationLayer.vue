<template>
    <BaseLayer class="confirm">
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

<script lang="ts">
    enum Sizes {
        Md = 'md',
        Sm = 'sm'
    }

    export {}
</script>

<script lang="ts" setup>
import {computed} from 'vue';
import useLayer from '@/helpers/hooks/useLayer';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import BaseLayer from './BaseLayer/BaseLayer.vue';
import makeClasses from '@/helpers/makeClasses';

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
const useClasses = makeClasses(() => ({
    title: () => [
        'title-h4 mb-4'
    ],
    message: () => [
        'mb-11 text-lg'
    ]
}));

const classes = computed((): ReturnType<typeof useClasses> => {
    return useClasses({
    });
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
