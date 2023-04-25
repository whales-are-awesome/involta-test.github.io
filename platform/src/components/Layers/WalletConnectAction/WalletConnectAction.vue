<template>
    <BaseLayer
        :class="classes.root"
        :id="id"
        :close-on-click-outside="false"
        :theme-settings="{
            container: classes.rootContainer
        }"
    >
        <div :class="classes.iconWrapper">
            <BaseIcon
                name="connect-wallet"
                width="104"
                height="104"
            />
        </div>
        <p :class="classes.title">
            {{ title }}
        </p>
        <p
            :class="classes.text"
            v-html="text"
        >
        </p>
        <div :class="classes.buttonWrapper">
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
import makeClasses from '@/helpers/makeClasses';
import { computed } from 'vue';


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


// CLASSES

interface IThemeProps {

}

const useClasses = makeClasses<IThemeProps>(() => ({
    root: () => [
        'p-8 sm:p-6'
    ],
    rootContainer: 'p-[54px] w-[534px] flex flex-col base-animation-layer rounded-[4px] text-center',
    title: 'title-h4 mb-3',
    text: 'text-400 mb-11',
    iconWrapper: 'mb-11 flex justify-center',
    buttonWrapper: 'flex justify-center space-x-4'
}));

const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({
    });
});
</script>
