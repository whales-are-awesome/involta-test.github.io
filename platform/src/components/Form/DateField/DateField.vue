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
import Datepicker, { VueDatePicker } from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import makeClasses from '@/helpers/makeClasses';
import ThemeSettings from '@/types/themeSettings';

// META

interface IProps {
    modelValue: Date
    title: string
    themeSettings?: ThemeSettings<'root'>
}

interface IEmits {
    (e: 'update:modelValue', value: IProps['modelValue']): void
}

const props = defineProps<IProps>();

const emit = defineEmits<IEmits>();


// CLASSES

interface IThemeProps {
    isPickerShown: boolean
}

const useClasses = makeClasses<IThemeProps>(() => ({
    root: ({ isPickerShown }) => [
        'bg-white px-4 pt-[10px] pb-[6px] date-field relative border-2 rounded-lg transition-fast hover:bg-primary-100',
        {
            'border-primary-200 z-50': isPickerShown,
            'border-transparent': !isPickerShown,
        }
    ],
    fieldWrapper: 'flex flex-col text-500 placeholder:text-300',
    fieldTitle: 'text-xs text-200 !leading-none',
    field: 'bg-transparent text-sm h-[24px]',
    picker: ({ isPickerShown }) => [
        'absolute top-full left-0 w-full translate-y-7',
        {
            '!hidden': !isPickerShown
        }
    ]
}));

const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({
        isPickerShown: isPickerShown.value
    });
});



// OPTIONS

const pickerOptions: VueDatePicker = {
    enableTimePicker: false,
    autoApply: true,
    inline: true
};


// PICKER_SHOWN

const isPickerShown = ref(false);

function showPicker(): void {
    isPickerShown.value = true;
}
function hidePicker(): void {
    isPickerShown.value = false;
}


// VALUE

const value = computed({
    get() {
        return props.modelValue;
    },
    set(value: IProps['modelValue']) {
        emit('update:modelValue', value);
    }
});

function formatValue(_date: Date): string {
    const date = new Date(_date);

    if (!_date) return '';

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day > 9 ? day : '0' + day}.${month > 9 ? month : '0' + month}.${year}`;
}

</script>

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
