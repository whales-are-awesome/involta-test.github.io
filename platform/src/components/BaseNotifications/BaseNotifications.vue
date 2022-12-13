<template>
    <Notifications
        position="bottom right"
        :close-on-click="true"
    >
        <template #body="{ item, close }">
            <div :class="classes.root">
                <div :class="classes.top">
                    <p
                        :class="classes.title"
                    >
                        {{ item.title }}
                    </p>
                    <BaseCross
                        :class="classes.cross"
                        width="14"
                        @click="close"
                    />
                </div>
                <div
                    v-if="item.text"
                    v-html="item.text"
                    :class="classes.text"
                />
            </div>
        </template>
    </Notifications>
</template>


<script lang="ts" setup>
import { computed } from 'vue';
import BaseCross from '@/components/BaseCross/BaseCross.vue';
import {  } from './types';
import makeClasses from '@/helpers/makeClasses';

// CLASSES

const useClasses = makeClasses(() => ({
    root: 'py-4 px-4 bg-white rounded-[4px] shadow-[0px_4px_8px_rgba(133,134,134,0.4)] border-l-4 border-primary-400',
    top: 'flex justify-between items-center',
    cross: 'ml-2',
    title: 'text-sm',
    text: 'text-xs'
}));

const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({
    });
});

</script>

<style>
.vue-notification-wrapper {
    overflow: visible !important;
}
</style>
