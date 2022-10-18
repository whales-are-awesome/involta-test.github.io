<template>
    <div
        :class="classes.root"
    >
        <div
            v-for="(item, index) in items"
            :key="index"
            :class="classes.items"
        >
            <div
                :class="classes.item"
            >
                <div :class="classes.itemInner">
                    {{ item.name }}
                </div>
            </div>
        </div>
    </div>
</template>


<script lang="ts" setup>
/* IMPORTS */

import { computed } from 'vue';
//import  from '@/components/';
import {  } from './types';
import makeClasses from '@/helpers/makeClasses';

/* INTERFACES */

interface IItem {
    name: string
    id: number | string
}

interface IProps {
    items: IItem[]
    themeSettings?: any
}

interface IThemeProps extends Pick<IProps, 'themeSettings'>{

}

/* META */

const props = withDefaults(defineProps<IProps>(), {});

/* VARS AND CUSTOM HOOKS */

const useClasses = makeClasses<IThemeProps>(() => ({
    root: ({ themeSettings }) => {
        return [themeSettings?.root,  [
            'bg-secondary-200 w-[224px] absolute left-full top-0'
        ]];
    },
    item: 'px-6 text-gray-500 text-sm',
    itemInner: 'py-2 text-gray-500 text-sm border-b border-secondary-300'
}));

/* DATA */



/* COMPUTED */

const classes = computed((): ReturnType<typeof useClasses> => {
    return useClasses({
        themeSettings: props.themeSettings
    });
});

/* WATCH */



/* METHODS */



</script>
