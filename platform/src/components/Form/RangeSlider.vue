<template>
    <div
        ref="root"
        :class="classes.root"
    >
        <Slider
            :key="updateKey"
            v-model="value"
            :min="min"
            :max="max"
            :lazy="false"
        />
    </div>
</template>


<script lang="ts" setup>
import {computed, onMounted, ref, watch, nextTick} from 'vue';
import Slider from '@vueform/slider';
import makeClasses from '@/helpers/makeClasses';

const root = ref(null);
const updateKey = ref(0);

interface IProps {
    modelValue: Array<{value: number}>
    min?: number
    max?: number
}

interface IEmits {
    (e: 'update:modelValue', value: IProps['modelValue']): void
}

interface ThemeProps {
}

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();


const value = computed({
    get() {
        return props.modelValue.map(item => item.value);
    },
    set(value: number | number[]) {
        const isSingle  = !Array.isArray(value);
        let result = [...props.modelValue];

        if (isSingle) {
            setConnect();
            result[0].value = value;
            emit('update:modelValue', result);
        } else if (value[value.length - 1] !== props.modelValue[props.modelValue.length - 1].value) {
            result = [...props.modelValue];
            result[result.length - 1].value = value.slice(-1)[0];

            setConnect();
            emit('update:modelValue', result);
        } else {
            updateKey.value++;
            nextTick(setConnect);
        }
    }
})
const useClasses = makeClasses<ThemeProps>(() => ({
    root: [
        'range-slider',
        {
            'range-slider_several-values': value.value.length > 1
        }
    ]
}));

const classes = computed((): ReturnType<typeof useClasses> => {
    return useClasses({
    });
});

onMounted(() => {
    nextTick(setConnect);
});

watch(props.modelValue, () => {
    nextTick(setConnect);
});

function setConnect() {
    //@ts-ignore
    const slider = root.value.querySelector('.slider-target');
    const sliderBase = slider.querySelector('.slider-connects');
    const hasLeftConnect = slider.querySelector('.slider-left-connect');
    const newConnect = document.createElement('div');

    if (!hasLeftConnect) {
        newConnect.classList.add('slider-left-connect');
        sliderBase.prepend(newConnect);
    }

    updateConnect();
}
function updateConnect() {
    //@ts-ignore
    const slider = root.value.querySelector('.slider-target');
    const newConnect = slider.querySelector('.slider-left-connect');
    const origins = slider.querySelectorAll('.slider-origin');
    const origin = origins.length > 1 ? origins[origins.length - 2] : origins[0];
    const transformStyle = origin.style.transform;
    const newConnectWidth = (100 - +transformStyle.replace(/[^\d.]/g, '').slice(0, -1));

    if (origins.length > 1) {
        for (let index in origins) {
            if (typeof origins[index] === 'object') {
                const tooltip = origins[index].querySelector('.slider-tooltip');
                const handle = origins[index].querySelector('.slider-handle');

                if (+index === +origins.length - 2) {
                    tooltip.classList.remove('slider-tooltip-top');
                    tooltip.classList.add('slider-tooltip-bottom');
                } else if (+index !== +origins.length - 1) {
                    tooltip.classList.add('!hidden');
                    handle.classList.add('slider-handle_small');
                }
            }
        }
    }

    newConnect.style.transform = `scaleX(${ newConnectWidth / 100 })`;
}
</script>

<style src="@vueform/slider/themes/default.css"></style>

<style>
    .range-slider {
        --slider-bg: #C3C5E4;
        --slider-height: 4px;
        --slider-connect-bg: theme('colors.primary.500');
        --slider-tooltip-bg: theme('colors.primary.500');
        --slider-tooltip-px: 12px;
        --slider-tooltip-py: 2px;
        --slider-handle-width: 10px;
        --slider-handle-height: 10px;
        --slider-tooltip-font-size: theme('fontSize.sm');
        --slider-handle-shadow: 0px 0 0 3px theme('colors.primary.500');
        --slider-handle-ring-color: theme('colors.primary.500');
        --slider-handle-shadow-active: '';

        .slider-left-connect {
            position: absolute;
            left: 0;
            top: 0;
            background: theme('colors.primary.500');
            z-index: 2;
            height: 100%;
            width: 100%;
            transform: scaleX(0);
            transform-origin: 0 50%;
            border-radius: 8px;
        }
        .slider-handle_small {
            transform: translateY(1px);
            --slider-handle-width: 3px;
            --slider-handle-height: 3px;
            --slider-handle-shadow: 0px 0 0 2px theme('colors.primary.300');
        }
    }

    .range-slider_several-values {
        .slider-left-connect {
            background: theme('colors.primary.300');
        }
        .slider-origin:not(:last-of-type) {
            pointer-events: none;
            --slider-handle-shadow: 0px 0 0 3px theme('colors.primary.300');
        }
        .slider-origin:not(:last-of-type) .slider-tooltip {
            background: theme('colors.primary.300');
            border-color: theme('colors.primary.300');
        }
    }
</style>
