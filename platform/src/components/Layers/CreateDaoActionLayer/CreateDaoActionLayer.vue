<template>
    <BaseLayer
        :id="id"
        :theme-settings="{
            container: 'p-[54px] w-[534px] flex flex-col base-animation-layer rounded-[4px] text-center'
        }"
    >
        <p class="title-h4 mb-11">
            Choose an action
        </p>
        <div class="flex justify-center space-x-4">
            <BaseButton
                class="w-[200px]"
                theme="primary"
                @click="join"
            >
                Join Dao
            </BaseButton>
            <div class="w-px flex-shrink-0 mx-4 bg-surface-500"></div>
            <BaseButton
                class="w-[200px]"
                theme="primary"
                @click="openCreateLayer"
            >
                Create new Dao
            </BaseButton>
        </div>
    </BaseLayer>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { store } from '@/store';
import useLayer from '@/composables/useLayer';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import BaseLayer from '@/components/Layers/BaseLayer/BaseLayer.vue';
import makeClasses from '@/helpers/makeClasses';


// META

interface IProps {
    id: string
}

const props = withDefaults(defineProps<IProps>(), {
});

const router = useRouter();
const route = useRoute();

const { close, open } = useLayer();


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


// LAYER

function openCreateLayer() {
    close(props.id);
    open('CreateDaoLayer');
}


// JOIN

async function join() {
    close(props.id);
    await router.replace({ name: 'home', query: { section: 'daos' } });
    if (route.name === 'home') {
        store.dispatch('app/updateView');
    }
}
</script>
