<template>
    <BaseLayer
        :class="classes.root"
        :id="id"
        :theme-settings="{
            container: classes.rootContainer
        }"
    >
        <p :class="classes.title">
            Do you want to disconnect wallet?
        </p>
        <p :class="classes.address">
            {{ cutAddress(address, 5, 5) }}
        </p>
        <div :class="classes.buttonItems">
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
import { computed } from 'vue';
import useLayer from '@/composables/useLayer';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import BaseLayer from '@/components/Layers/BaseLayer/BaseLayer.vue';
import cutAddress from '@/helpers/cutAddress';
import { store } from '@/store';
import makeClasses from '@/helpers/makeClasses';


// META

export interface IProps {
    id: string
}

const props =withDefaults(defineProps<IProps>(), {

});

const { close } = useLayer();


// CLASSES

interface IThemeProps{

}

const useClasses = makeClasses<IThemeProps>(() => ({
    root: () => [
        'p-8 sm:p-6'
    ],
    rootContainer: 'pt-8 pb-6 px-6 max-w-[525px] w-full base-animation-layer rounded-[4px] text-center',
    title: 'title-h5 mb-3 text-500',
    address: 'title-h6 mb-16 text-500 overflow-ellipsis',
    buttonItems: 'flex justify-center space-x-4'
}));

const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({
    });
});


// ADDRESS

const address = computed(() => store.state.wallet.address);
</script>
