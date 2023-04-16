<template>
    <div
        ref="root"
        :class="classes.root"
    >
        <div :class="classes.inner">
            <div :class="classes.items">
                <BaseButton
                    v-for="item in items"
                    :key="item.id"
                    :class="classes.button"
                    ref="itemRefs"
                    view="ghost"
                    theme="white"
                    :size="(isMobile.xl || isMobile.lg) ? 'md' : 'mobile'"
                    :theme-settings="{
                        size: 'h-auto'
                    }"
                    @click="value = item.id"
                >
                    {{ item.title }}
                </BaseButton>
            </div>
            <div ref="bg" :class="classes.bg"></div>
        </div>
    </div>
</template>


<script lang="ts" setup>
import { computed, ref, onMounted, watch, nextTick, onUnmounted } from 'vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import useIsMobile from '@/composables/useIsMobile';
import { IItem } from './types';
import makeClasses from '@/helpers/makeClasses';
import ThemeSettings from '@/types/themeSettings';


// META

interface IProps {
    modelValue: IItem['id']
    items: IItem[]
    themeSettings?: ThemeSettings<'root'>
}

interface IEmits {
    (e: 'update:modelValue', value: IProps['modelValue']): void
}

const props = withDefaults(defineProps<IProps>(), {
});

const emit = defineEmits<IEmits>();

const isMobile = useIsMobile();


// CLASSES

interface ThemeProps extends Pick<IProps, 'themeSettings'>{}

const useClasses = makeClasses<ThemeProps>(() => ({
    root: ({ themeSettings }) => [themeSettings?.root,
        'bg-primary-100 rounded-[5px]'
    ],
    inner: 'relative z-1 h-full',
    items: 'flex h-full',
    bg: 'absolute bg-white top-0 h-full -z-1 transition-fast shadow-[0px_4px_10px_rgba(48,_47,_121,_0.08)] rounded-[5px]'
}));

const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({
        themeSettings: props.themeSettings
    });
});


// VALUE

const value = computed({
    get() {
        return props.modelValue;
    },
    set(value: IProps['modelValue']) {
        emit('update:modelValue', value);
    }
})


// BACKGROUND

const root = ref<HTMLElement | null>(null);

const itemRefs = ref<InstanceType<typeof BaseButton>[]>([]);

const bg = ref<HTMLElement | null>(null);

function setBg() {
    const activeIndex = props.items.findIndex(item => item.id === value.value);
    const activeEl = itemRefs.value[activeIndex].root;
    const cords = activeEl.getBoundingClientRect();
    const rootCords = root.value?.getBoundingClientRect();

    if (bg.value && rootCords) {
        bg.value.style.width = activeEl.offsetWidth + 'px';
        bg.value.style.left =  cords.x - rootCords.x - 2 + 'px';
    }
}

async function setBgWithDelay(): Promise<void> {
    setTimeout(() => {
        setBg();
    }, 150);
}

watch(value, setBg);

onMounted(async() => {
    await nextTick(setBg);

    window.addEventListener('resize', setBgWithDelay);
});

onUnmounted(() => window.removeEventListener('resize', setBgWithDelay));
</script>
