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
import IThemeSettings from '@/models/themeSettings';


/* INTERFACES */

interface IProps {
    modelValue: IItem['id']
    items: IItem[]
    size: Sizes
    themeSettings?: IThemeSettings<'root'>
}

interface IEmits {
    (e: 'update:modelValue', value: IProps['modelValue']): void
}

interface ThemeProps extends Pick<IProps, 'size' | 'themeSettings'>{
}

/* META */

const props = withDefaults(defineProps<IProps>(), {
    size: 'md'
});
const emit = defineEmits<IEmits>();

/* VARS AND CUSTOM HOOKS */

const useClasses = makeClasses<ThemeProps>(() => ({
    root: ({ themeSettings }) => [themeSettings?.root,
        'relative z-1'
    ],
    items: ({ size }) => [
        'flex',
        {
            'space-x-[15px] md:space-x-[14px] sm:space-x-[26px]': size === 'md',
            'space-x-[24px]': size === 'sm'
        }
    ],
    item: ({ size }) => [
        'cursor-pointer font-bold transition-fast hover:text-[#7A78F3]',
        {
            'pb-[30px] px-2.5 md:text-xs md:pb-[25px] sm:pb-[6px] sm:px-0': size === 'md',
            'pb-[6px] text-xs': size === 'sm'
        }
    ],
    line: ({ size }) => [
        'bg-[#7A78F3] absolute top-full left-0 -translate-y-1/2 z-10 transition-fast',
        {
            'h-px sm:h-[2px]': size === 'md',
            'h-[2px]': size === 'sm'
        }
    ]
}));

/* DATA */

const root = ref<HTMLElement | null>(null);
const itemRefs = ref<HTMLElement[]>([]);
const line = ref<HTMLElement | null>(null);

/* COMPUTED */

const value = computed({
    get() {
        return props.modelValue;
    },
    set(value: IProps['modelValue']) {
        emit('update:modelValue', value);
    }
})

/* WATCH */

watch(value, setLine);

/* LIFECYCLE */

onMounted(() => nextTick(setLine));

/* METHODS */

function setLine(): void {
    const activeIndex = props.items.findIndex(item => item.id === value.value);
    const activeEl = itemRefs.value[activeIndex];
    const cords = activeEl.getBoundingClientRect();
    const rootCords = root.value.getBoundingClientRect();

    line.value.style.width = activeEl.offsetWidth + 'px';
    line.value.style.left =  cords.x - rootCords.x + 'px';
}

const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({
        size: props.size,
        themeSettings: props.themeSettings
    });
});
</script>
