<template>
    <div
        ref="root"
        :class="classes.root"
    >
        <div :class="classes.items">
            <div
                v-for="item in items"
                :key="item.id"
                ref="itemRefs"
                :class="[
                    classes.item,
                    {
                        'text-[#7A78F3]': value === item.id,
                        'text-200': value !== item.id
                    }
                ]"
                @click="value = item.id"
            >
                {{ item.title }}
            </div>
        </div>
        <div ref="line" :class="classes.line"></div>
    </div>
</template>


<script lang="ts" setup>
/* IMPORTS */

import { computed, defineProps, defineEmits, ref, onMounted, watch, nextTick } from 'vue';
import { IItem } from './types';
import makeClasses from '@/helpers/makeClasses';


/* INTERFACES */

interface IProps {
    modelValue: IItem['id']
    items: IItem[]
}

interface IEmits {
    (e: 'update:modelValue', value: IProps['modelValue']): void
}

interface ThemeProps {
}

/* META */

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();


/* DATA */

const root = ref(null);
const itemRefs = ref([]);
const line = ref(null);

/* COMPUTED */

const value = computed({
    get() {
        return props.modelValue;
    },
    set(value: IProps['modelValue']) {
        emit('update:modelValue', value);
    }
})
const useClasses = makeClasses<ThemeProps>(() => ({
    root: () => [
        'relative z-1'
    ],
    items: () => [
        'flex space-x-[22px]'
    ],
    item: () => [
        'cursor-pointer font-bold transition-fast hover:text-[#7A78F3] pb-[25px]'
    ],
    line: () => [
        'bg-[#7A78F3] h-px absolute top-full -translate-y-1/2 left-0 z-10 transition-fast'
    ]
}));

function setLine() {
    const activeIndex = props.items.findIndex(item => item.id === value.value);
    const activeEl = itemRefs.value[activeIndex];
    const cords = activeEl.getBoundingClientRect();
    const rootCords = root.value.getBoundingClientRect();

    line.value.style.width = activeEl.offsetWidth + 'px';
    line.value.style.left =  cords.x - rootCords.x + 'px';
}

const classes = computed((): ReturnType<typeof useClasses> => {
    return useClasses({
    });
});

onMounted(() => {
    nextTick(setLine)
});

watch(value, setLine);
</script>
