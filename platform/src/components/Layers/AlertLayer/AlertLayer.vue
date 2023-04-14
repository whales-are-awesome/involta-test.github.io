<template>
    <BaseLayer
        class="p-8"
        :class="id"
        :id="id"
        :close-on-click-outside="closeOnClickOutside"
        :theme-settings="{
            container: 'p-[54px] w-[534px] flex flex-col base-animation-layer rounded-[4px] text-center'
        }"
    >
        <div v-if="pending" class="-preloader"></div>
        <div
            v-if="iconName"
            class="mb-11 flex justify-center"
        >
            <BaseIcon
                :name="iconName"
                width="104"
            />
        </div>
        <p class="title-h4 mb-3" v-html="title"></p>
        <p
            class="text-400 mb-11"
            :class="themeSettings?.text"
            v-html="text"
        >
        </p>
        <div class="flex justify-center space-x-4">
            <BaseButton
                v-if="cancelButtonText"
                theme="surface"
                @click="close(id)"
            >
                {{ cancelButtonText }}
            </BaseButton>
            <BaseButton
                theme="primary"
                @click="accept"
            >
                {{ buttonText }}
            </BaseButton>
        </div>
    </BaseLayer>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import useLayer from '@/composables/useLayer';
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import BaseLayer from '@/components/Layers/BaseLayer/BaseLayer.vue';
import { Statuses } from './types';
import ThemeSettings from '@/types/themeSettings';


// META

export interface IProps {
    id: string
    title: string
    text: string
    cancelButtonText?: string
    closeOnClickOutside?: boolean
    buttonText: string
    status: Statuses
    callback?: () => void
    themeSettings?: ThemeSettings<'text'>
}

const props =withDefaults(defineProps<IProps>(), {
    cancelButtonText: 'Cancel',
    closeOnClickOutside: true
});

const { close } = useLayer();


// CLASSES


// ICON NAME

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


// ACCEPT

const pending = ref(false);

async function accept() {
    if (props.callback) {
        pending.value = true;

        try {
            await props.callback();
        } catch (e) {
            console.log(e);
        }

        pending.value = false;

    }

    close(props.id, true);
}
</script>
