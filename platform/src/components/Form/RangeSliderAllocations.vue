<template>
    <div
        :class="classes.root"
    >
        <div :class="classes.top">
            <p :class="classes.title">
                {{ title }}
            </p>
            <div :class="classes.topRight">
                <div :class="classes.topRightText">
                    Reserve the Allocation
                </div>
                <BaseTooltip content="Some information">
                    <BaseIcon
                        :class="classes.help"
                        name="help"
                        width="11"
                    />
                </BaseTooltip>
                <ToggleField
                    v-model="toggleValue"
                    view="switch"
                />
            </div>
        </div>
        <RangeSlider
            :class="classes.slider"
            v-model="value"
        />
        <div :class="classes.bottom">
            <p>0%</p>
            <p>100%</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import {computed } from 'vue';
import RangeSlider from '@/components/Form/RangeSlider';
import ToggleField from '@/components/Form/ToggleField';
import BaseTooltip from '@/components/BaseTooltip/BaseTooltip.vue';
import BaseIcon from '@/components/BaseIcon';
import makeClasses from '@/helpers/makeClasses';

interface IProps {
    title: string
    modelValue: Array<{value: number}>
    toggle: boolean
}

interface IEmits {
    (e: 'update:modelValue', value: IProps['modelValue']): void
    (e: 'update:toggle', value: IProps['toggle']): void
}

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();

const value = computed({
    get() {
        return props.modelValue;
    },
    set(value: number[]) {
        emit('update:modelValue', value);
    }
});

const toggleValue = computed({
    get() {
        return props.toggle;
    },
    set(value: IProps['toggle']) {
        emit('update:toggle', value);
    }
});

const useClasses = makeClasses(() => ({
    root: '',
    title: 'text-base text-400 font-semibold',
    top: 'flex items-center justify-between mb-[50px]',
    topRight: 'flex items-center text-200 ',
    topRightText: 'text-xss uppercase',
    help: 'mr-2.5 ml-1',
    slider: 'mb-2.5',
    bottom: 'flex items-center text-300 justify-between'
}));

const classes = computed((): ReturnType<typeof useClasses> => {
    return useClasses({
    });
});
</script>

<style scoped>

</style>
