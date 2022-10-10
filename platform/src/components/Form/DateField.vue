<template>
    <div
        :class="classes.root"
    >
        <label
            :class="classes.fieldWrapper"
        >
            <span :class="classes.fieldTitle">
                {{ title }}
            </span>
            <input
                :class="classes.field"
                type="text"
                placeholder="--.--.----"
                readonly
                :value="formatValue(value)"
                @focus="showPicker"
                @blur="hidePicker"
            >
        </label>
        <Datepicker
            v-model="value"
            v-bind="pickerOptions"
            :class="classes.picker"
        />
    </div>
</template>


<script lang="ts" setup>
import { computed, ref } from 'vue';
import Datepicker from '@vuepic/vue-datepicker';
import makeClasses from '@/helpers/makeClasses';


interface IProps {
    modelValue: Date
    title: string
}

interface IEmits {
    (e: 'update:modelValue', value: IProps['modelValue']): void
}

interface ThemeProps {
    isPickerShown: boolean
}

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();

const isPickerShown = ref(false);
const pickerOptions = {
    enableTimePicker: false,
    hidefieldIcon: true,
    autoApply: true,
    inline: true
};

const value = computed({
    get() {
        return props.modelValue;
    },
    set(value: IProps['modelValue']) {
        emit('update:modelValue', value);
    }
});
const useClasses = makeClasses<ThemeProps>(() => ({
    root: ({ isPickerShown }) => [
        'bg-white px-4 py-3 date-field relative z-50 border-2  rounded-lg transition-fast',
        {
            'border-surface-500': isPickerShown,
            'border-transparent': !isPickerShown,
        }
    ],
    fieldWrapper: 'flex flex-col text-500 placeholder:text-300',
    fieldTitle: 'text-xs text-200',
    picker: ({ isPickerShown }) => [
        'absolute top-full left-0 w-full translate-y-7',
        {
            'hidden': !isPickerShown
        }
    ]
}));

const classes = computed((): ReturnType<typeof useClasses> => {
    return useClasses({
        isPickerShown: isPickerShown.value
    });
});

function showPicker() {
    isPickerShown.value = true;
}
function hidePicker() {
    isPickerShown.value = false;
}
function formatValue(_date: Date) {
    const date = new Date(_date);

    if (!_date) return '';

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day > 9 ? day : '0' + day}.${month > 9 ? month : '0' + month}.${year}`;
}
</script>

<style src="@vuepic/vue-datepicker/dist/main.css"></style>

<style>
    .date-field {
        .dp__month_year_select:nth-of-type(2) {
            @apply ml-auto w-auto;
        }
        .dp__month_year_select:nth-of-type(3) {
            @apply ml-1 mr-auto w-auto;
        }
        .dp__calendar_header_separator {
            display: none;
        }
        .dp__calendar_header_item {
            @apply text-300 font-normal text-xs uppercase;
        }
        .dp__cell_inner {
            @apply transition-fast;
        }
        .dp__active_date {
            @apply rounded-full bg-surface-500 border-none;
        }
        .dp__cell_offset {
            @apply text-300;
        }
        .dp__today {
            @apply border-none;
        }
        .dp__date_hover:hover {
            @apply bg-surface-200 border-none rounded-full;
        }
    }
</style>
