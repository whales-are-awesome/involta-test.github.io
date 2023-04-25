<template>
    <BaseLayer
        :class="classes.root"
        :id="id"
        :theme-settings="{
            container: classes.rootContainer
        }"
    >
        <p :class="classes.title">
            Choose an action
        </p>
        <div :class="classes.buttons">
            <BaseButton
                :class="classes.buttonItem"
                theme="primary"
                @click="join"
            >
                Join Dao
            </BaseButton>
            <div :class="classes.delimiter"></div>
            <BaseButton
                :class="classes.buttonItem"
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
    root: 'p-8 sm:p-6',
    rootContainer: 'p-[54px] w-[534px] flex flex-col base-animation-layer rounded-[4px] text-center md:p-6',
    title: 'title-h4 mb-11',
    buttons: 'flex justify-center space-x-4 sm:flex-col sm:space-x-0 sm:space-y-4 sm:items-center',
    buttonItem: 'w-[200px]',
    delimiter: 'w-px flex-shrink-0 mx-4 bg-surface-500 sm:hidden'
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
