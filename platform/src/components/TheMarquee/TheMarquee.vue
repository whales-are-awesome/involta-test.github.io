<template>
    <div
        :class="classes.root"
    >
        <div :class="classes.inner">
            <MarqueeText :repeat="15">
                <span :class="classes.item">
                    DAO Renaissance
                </span>
            </MarqueeText>
        </div>
    </div>
</template>


<script lang="ts" setup>
import { computed } from 'vue';
import MarqueeText from 'vue-marquee-text-component'
import {  } from './types';
import makeClasses from '@/helpers/makeClasses';


// CLASSES

const useClasses = makeClasses(() => ({
    root: 'h-[36px] border-b-[2px] border-t-[2px] border-[#F5F5F7] overflow-hidden relative sm:h-[24px] sm:border-b sm:border-t',
    inner: 'top-0 left-0 absolute flex items-center h-full w-full sm:pb-1',
    item: 'text-gray-500 text-xs uppercase tracking-[0.12em] font-bold px-[30px] sm:!text-tiny sm:px-[18px]'
}));

const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({

    });
});
</script>
