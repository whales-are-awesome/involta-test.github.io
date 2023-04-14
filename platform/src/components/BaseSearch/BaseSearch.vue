<template>
    <div
        ref="root"
        :class="classes.root"
    >
        <div
            ref="inner"
            :class="classes.inner"
        >
            <BaseIcon
                :class="classes.icon"
                :name="(isMobile.lg || isMobile.xl) ? 'search-base' : 'search-thin'"
                width="16"
            />
            <input
                v-model="value"
                :class="classes.input"
                type="text"
                placeholder="Search"
                @focus="onFocus"
                @blur="onBlur"
            >
        </div>
    </div>
</template>


<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue'
import useIsMobile from '@/composables/useIsMobile'
import makeClasses from '@/helpers/makeClasses';
import ThemeSettings from '@/types/themeSettings';


// META

interface IProps {
    modelValue: string
    themeSettings?: ThemeSettings<'root'>
}

interface IEmits {
    (e: 'update:modelValue', value: IProps['modelValue']): void
}

const props = withDefaults(defineProps<IProps>(), {});

const emit = defineEmits<IEmits>();

const isMobile = useIsMobile();

const root = ref<HTMLElement>();
const inner = ref<HTMLElement>();


// CLASSES

interface IThemeProps extends Pick<IProps, 'themeSettings'>{
    isFocus: boolean
    isFilled: boolean
}

const useClasses = makeClasses<IThemeProps>(() => ({
    root: ({ themeSettings }) => [themeSettings?.root,
        'h-[44px] relative transition-fast md:h-[28px] md:w-[28px] sm:w-full'
    ],
    inner: 'bg-primary-100 rounded-[5px] transition-fast py-4 px-[18px] w-full h-full absolute top-0 right-0 md:p-1.5',
    icon: 'text-300 pointer-events-none -translate-y-[2px] md:translate-y-0',
    input: ({ isFocus }) => [
        'h-full absolute left-0 top-0 w-full bg-transparent font-medium placeholder:text-grey-400 pl-[42px] font-500 md:text-xxs md:pl-[30px] sm:opacity-100',
        {
            'md:opacity-0': !isFocus
        }
    ]
}));

const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({
        themeSettings: props.themeSettings,
        isFocus: isFocus.value,
        isFilled: !!value.value
    });
});


// FOCUS

const isFocus = ref(false);

watch(isFocus, () => {
    const parent = root.value?.parentElement;
    const cords = root.value?.getBoundingClientRect();
    const parentCords = parent?.getBoundingClientRect();

    if (!cords || !parentCords || !root.value || !parent || !inner.value) {
        return;
    }

    const resultWidth = cords.right - parentCords.left;

    inner.value.style.width = (isMobile.value.md && isFocus.value) ? resultWidth + 'px' : '';
});

function onFocus(): void {
    isFocus.value = true;
}

function onBlur(): void {
    isFocus.value = false;
}

// VALUE

const value = computed({
    get: () => props.modelValue,
    set: (value: string) => emit('update:modelValue', value)
});
</script>
