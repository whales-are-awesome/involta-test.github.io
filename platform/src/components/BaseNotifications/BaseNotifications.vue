<template>
    <Notifications
        class="!w-auto"
        position="bottom right"
        :close-on-click="true"
    >
        <template #body="{ item, close }">
            <div
                :class="[classes.root,
                    !item.data?.view && {
                        'shadow-[0_2px_2px_rgba(41,41,211,0.08)] border-l-3': true,
                        'text-600 border-primary-400 bg-white': item.data?.theme === 'base',
                        'text-600 border-primary-400 bg-primary-100': item.data?.theme === 'primary-light',
                        'text-primary-600 border-primary-600 bg-primary-100': !item.data?.theme,
                    },
                    item.data?.view === 'shadow' && {
                        'border': true,
                        'text-gray-600 bg-surface-100 border-gray-600': !item.data?.theme,
                        'text-primary-600 bg-primary-100 border-primary-600': item.data?.theme === 'primary',
                        'text-[#CB101D] bg-[#FDE7E9] border-[#CB101D]': item.data?.theme === 'alert',
                        'text-[#05751F] bg-[#E6FEF3] border-[#05751F]': item.data?.theme === 'success',
                    }
                ]"
            >
                <BaseIcon
                    :class="[classes.icon,
                        !item.data?.view && {
                            'text-primary-400': !item.data?.theme || item.data?.theme === 'primary-light',
                            'text-primary-600': item.data?.theme === 'primary',
                        },
                        item.data?.view === 'shadow' && {
                            'text-inherit': !item.data?.theme,
                            'text-inherit': item.data?.theme === 'primary',
                            'text-inherit': item.data?.theme === 'alert',
                            'text-inherit': item.data?.theme === 'success',
                        }
                    ]"
                    name="info"
                    width="20"
                />
                <div :class="classes.main">
                    <p
                        :class="classes.title"
                    >
                        {{ item.title }}
                    </p>
                    <div
                        v-if="item.text"
                        v-html="item.text"
                        :class="[classes.text, item.title && 'mt-1']"
                    />
                </div>
                <BaseCross
                    :class="classes.cross"
                    width="16"
                    :theme="(!item.data?.view && !item.data?.theme) ? 'primary' : ''"
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
    root: `w-[528px] flex items-center -translate-x-[37px] -translate-y-[47px] py-4 px-4
          rounded-[5px]
          sm:w-[96vw] sm:translate-x-0 sm:-translate-y-4 sm:mx-[2vw] mt-4`,
    main: 'mr-auto',
    icon: 'mr-2',
    cross: 'ml-2',
    title: 'font-bold',
    text: 'text-sm'
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
