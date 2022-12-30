<template>
    <Notifications
        class="!w-auto"
        position="bottom right"
        :close-on-click="true"
    >
        <template #body="{ item, close }">
            <div :class="classes.root">
                <BaseIcon
                    :class="classes.icon"
                    name="info"
                    width="20"
                />
                <div :class="classes.main">
                    <p :class="classes.title">
                        {{ item.title }}
                    </p>
                    <div
                        v-if="item.text"
                        v-html="item.text"
                        :class="classes.text"
                    />
                </div>
                <BaseCross
                    :class="classes.cross"
                    width="16"
                    theme="primary"
                    @click="close"
                />
            </div>
        </template>
    </Notifications>
</template>


<script lang="ts" setup>
import { computed } from 'vue';
import BaseCross from '@/components/BaseCross/BaseCross.vue';
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';
import {  } from './types';
import makeClasses from '@/helpers/makeClasses';

// CLASSES

const useClasses = makeClasses(() => ({
    root: `w-[528px] flex items-center -translate-x-[37px] -translate-y-[47px] py-4 px-4 bg-white
          rounded-[5px] shadow-[0_2px_2px_rgba(41,41,211,0.08)] border-l-3 border-primary-400
          sm:w-[96vw] sm:translate-x-0 sm:-translate-y-4 sm:mx-[2vw]`,
    main: 'mr-auto',
    icon: 'text-primary-400 mr-2',
    cross: 'ml-2',
    title: 'font-bold text-600',
    text: 'text-sm mt-1'
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
