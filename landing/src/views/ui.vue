<template>
    <div class="container">
        <h1 class="mb-16">UI</h1>
        <div class="mb-8">
            <h4 class="mb-8">Buttons</h4>
            <div class="flex space-x-4 mb-8">
                <BaseButton
                    theme="secondary"
                    rounded="lg"
                    size="lg"
                >
                    Developer
                </BaseButton>
                <BaseButton
                    view="ghost"
                    rounded="lg"
                    size="lg"
                >
                    Developer
                </BaseButton>
            </div>
            <BaseButton
                class="mb-8"
                rounded="lg"
                size="lg"
            >
                Developer
            </BaseButton>
            <br>
            <BaseButton
                class="mb-8"
            >
                Developer
            </BaseButton>
            <br>
            <BaseButton
                view="icon"
                size="icon"
                rounded="lg"
                :icon="{ name: 'angle-right' }"
                theme="thirdly"
            >
                Developer
            </BaseButton>
        </div>
        <div class="mb-8">
            <h4 class="mb-8">TagList</h4>
            <div class="flex">
                <TagsList
                    v-model="tagListValue"
                    :items="tagListItems"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import TagsList from '@/components/TagsList/TagsList';

const tagListItems = ref([
    { id: 1, title: 'Developer' },
    { id: 2, title: 'DAO-Builder' }
]);
const tagListValue = ref(tagListItems.value[0]);
</script>
