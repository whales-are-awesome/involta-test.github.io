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
                        'text-[#24243D]': value.id === item.id,
                        'text-primary-300': value.id !== item.id
                    }
                ]"
                @click="value = item"
            >
                {{ item.title }}
            </div>
        </div>
        <div ref="bg" :class="classes.bg"></div>
    </div>
</template>


<script lang="ts" setup>
/* IMPORTS */

import { computed, defineProps, defineEmits, ref, onMounted, watch, nextTick } from 'vue';
import { IItem } from './types';
import makeClasses from '@/helpers/makeClasses';


/* INTERFACES */

interface IProps {
    modelValue: IItem
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
const bg = ref(null);

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
        'p-0.5 bg-[#F1F3F4] rounded-[40px] relative z-1 md:rounded-[30px]'
    ],
    items: () => [
        'flex space-x-[12px]'
    ],
    item: () => [
        'cursor-pointer font-semibold transition-fast h-[56px] px-8 flex items-center justify-center md:px-4 md:h-[30px] md:text-md-sm'
    ],
    bg: () => [
        'rounded-[40px] bg-white h-[56px] absolute top-1/2 -translate-y-1/2 left-0 -z-1 transition-fast md:rounded-[30px] md:h-[30px]'
    ]
}));

function setBg() {
    const activeIndex = props.items.findIndex(item => item.id === value.value.id);
    const activeEl = itemRefs.value[activeIndex];
    const cords = activeEl.getBoundingClientRect();
    const rootCords = root.value.getBoundingClientRect();

    bg.value.style.width = activeEl.offsetWidth + 'px';
    bg.value.style.left =  cords.x - rootCords.x + 'px';
}

const classes = computed((): ReturnType<typeof useClasses> => {
    return useClasses({
    });
});

onMounted(() => {
    nextTick(setBg)
});

watch(value, setBg);
</script>
