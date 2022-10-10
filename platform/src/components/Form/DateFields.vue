<template>
    <div
        :class="classes.root"
    >
        <div :class="classes.fields">
            <DateField
                v-model="value[0]"
                title="Start date"
            />
            <DateField
                v-model="value[1]"
                title="End date"
            />
        </div>
    </div>
</template>


<script lang="ts" setup>
import { computed } from 'vue';
import DateField from '@/components/Form/DateField';
import makeClasses from '@/helpers/makeClasses';


interface IProps {
    modelValue: string | Date[]
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
        return props.modelValue;
    },
    set(value: IProps['modelValue']) {
        emit('update:modelValue', value);
    }
});
const useClasses = makeClasses<ThemeProps>(() => ({
    root: 'rounded-lg border border-surface-100 shadow-[0_4_8_rgba(133,134,134,.04)]',
    fields: 'flex'
}));

const classes = computed((): ReturnType<typeof useClasses> => {
    return useClasses({
    });
});
</script>

<style>

</style>
