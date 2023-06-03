<template>
    <div>
        <BaseChat
            v-if="messages.data"
            v-model="messages.data.items"
            class="mx-auto w-full max-w-[700px] h-screen"
            :on-scroll-top="addMessages"
        />
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import useMessageItems from '@/composables/fetch/useMessageItems';
import BaseChat from '@/components/BaseChat/BaseChat.vue';
import wait from '@/helpers/wait';


const formData = ref({
    offset: 0
})

const [messages] = useMessageItems(formData);

function addMessages() {
    const prev = messages.value.data?.items.length;

    formData.value.offset += 20;

    return wait(() => messages.value.data?.items.length !== prev || messages.value.data?.items.length === messages.value.data?.total);
}
</script>
