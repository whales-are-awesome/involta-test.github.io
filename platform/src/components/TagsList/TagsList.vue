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
import { IItem, Sizes } from './types';
import makeClasses from '@/helpers/makeClasses';


/* INTERFACES */

interface IProps {
    modelValue: IItem['id']
    items: IItem[]
    size: keyof typeof Sizes
}

interface IEmits {
    (e: 'update:modelValue', value: IProps['modelValue']): void
}

interface ThemeProps extends Pick<IProps, 'size'>{
}

/* META */

const props = withDefaults(defineProps<IProps>(), {
    size: Sizes.Md
});
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
    items: ({ size }) => [
        'flex',
        {
            'space-x-[22px]': size === Sizes.Md,
            'space-x-[24px]': size === Sizes.Sm
        }
    ],
    item: ({ size }) => [
        'cursor-pointer font-bold transition-fast hover:text-[#7A78F3]',
        {
            'pb-[25px]': size === Sizes.Md,
            'pb-[6px] text-sm': size === Sizes.Sm
        }
    ],
    line: ({ size }) => [
        'bg-[#7A78F3] absolute top-full left-0 -translate-y-1/2 z-10 transition-fast',
        {
            'h-px': size === Sizes.Md,
            'h-[2px]': size === Sizes.Sm
        }
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
        size: props.size
    });
});

onMounted(() => {
    nextTick(setLine)
});

watch(value, setLine);
</script>
