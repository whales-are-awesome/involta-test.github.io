<template>
    <BaseLayer
        :theme-settings="{
            container: 'max-w-[664px] p-11 rounded-[20px]'
        }"
        id="CreateDaoActionLayer"
    >
        <div class="flex justify-end">
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
import { useRouter } from 'vue-router';
import useLayer from '@//composables/useLayer';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import BaseLayer from '../BaseLayer/BaseLayer.vue';
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
const router = useRouter();


const { close, open } = useLayer();
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

function openCreateLayer() {
    close('CreateDaoActionLayer');
    open('CreateDaoLayer');
}

function join() {
    close('CreateDaoActionLayer');
    router.push({ name: 'home', query: { section: 'daos' } });
}
</script>
