<template>
    <FieldInfo
        v-if="tooltip || label || required"
        :tooltip="tooltip"
        :label="label"
        :hint="hint"
        :required="required"
        :tip="tip"
        :error="error"
    >
        <div :class="classes.main">
            <VueSelect
                v-model="value"
                :class="classes.select"
                ref="select"
                :options="options"
                label="title"
                :reduce="(option) => option.id"
                :clearable="false"
                :close-on-select="true"
                :searchable="false"
                v-click-outside="close"
            >
                <template #no-options>
                    {{ notFound }}
                </template>
                <template #open-indicator>
                    <span :class="classes.openIndicator"></span>
                </template>
                <template #selected-option="{ id, title, icon }">
                    <slot name="selected-option" v-bind="{ id, title, icon }">
                        <div :class="classes.selectedOption">
                            <BaseIcon
                                v-if="icon"
                                :class="classes.optionIcon"
                                :name="icon"
                                width="24"
                            />
                            <span
                                v-if="title"
                                v-html="title"
                            >
                        </span>
                            <span
                                v-else-if="placeholder"
                                class="text-200"
                            >
                            {{ placeholder }}
                        </span>
                            <BaseIcon
                                :class="[classes.arrowIcon, {
                               'rotate-180' :select?.open
                            }]"
                                name="select-angle"
                                width="8"
                                height="5"
                            />
                        </div>
                    </slot>
                </template>
                <template #option="{ title, id, icon }">
                    <slot name="option" v-bind="{ title, id, icon }">
                        <div :class="classes.option">
                            <BaseIcon
                                v-if="icon"
                                :class="classes.optionIcon"
                                :name="icon"
                                width="24"
                            />
                            <span v-html="title" />
                        </div>
                    </slot>
                </template>
                <template #search="{ attributes, events }">
                    <input
                        :class="classes.search"
                        v-bind="attributes"
                        v-on="events"
                    >
                </template>
            </VueSelect>
        </div>
    </FieldInfo>
</template>

<script lang="ts" setup>
/* IMPORTS */

import { computed, ref } from 'vue';
import VueSelect from 'vue-select';
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';
import FieldInfo from '@/components/Form/FieldInfo/FieldInfo.vue';
import { SelectOption, Sizes } from './types';
import makeClasses from '@/helpers/makeClasses';

/* INTERFACES */

interface IProps {
    modelValue: string
    placeholder?: string
    notFound?: string
    options: SelectOption[]
    themeSettings?: any
    size: Sizes

    tooltip?: string
    hint?: string
    label?: string
    required?: boolean
    tip?: string | number
    error?: string
    disabled?: boolean
}

interface IEmits {
    (e: 'update:modelValue', value: SelectOption): void
}

interface IThemeProps extends Pick<IProps, 'themeSettings' | 'size'>{
    isOpen: boolean
}

/* META */

const props = withDefaults(defineProps<IProps>(), {
    notFound: 'No data',
    size: 'md'
});
const emit = defineEmits<IEmits>();

/* VARS AND CUSTOM HOOKS */

const select = ref(null);
const useClasses = makeClasses<IThemeProps>(() => ({
    main: ({ themeSettings, size, isOpen }) => {
        return [themeSettings?.root,  [
            {
                'h-[40px]': size === 'md',
                'h-[48px]': size === 'lg',
                'h-[32px] text-sm': size === 'sm',
                'h-[32px] text-xss': size === 'xs',
                'z-50 relative': isOpen
            }
        ]];
    },
    select: ({ themeSettings }) => {
        return [themeSettings?.root,  [
            'border border-gray-100 rounded-[5px] shadow-[0px_4px_24px_rgba(108,108,125,.08)] overflow-hidden cursor-pointer relative'
        ]];
    },
    openIndicator: ({ themeSettings }) => {
        return [themeSettings?.openIndicator,  [
            'hidden'
        ]];
    },
    selectedOption: ({ themeSettings, size }) => {
        return [themeSettings?.selectedOption,  [
            'bg-white hover:bg-surface-100 transition-fast flex items-center',
            {
                'px-3 h-[48px]': size === 'lg',
                'px-5 h-[40px]': size === 'md',
                'px-3 h-[32px]': size === 'sm',
                'px-1 h-[32px]': size === 'xs'
            }
        ]];
    },
    arrowIcon: ({ themeSettings }) => {
        return [themeSettings?.arrowIcon,  [
            'ml-2.5 text-200'
        ]];
    },
    option: ({ themeSettings, size }) => {
        return [themeSettings?.option,  [
            'py-2 bg-white hover:bg-surface-100 transition-fast flex items-center',
            {
                'px-5': size === 'md',
                'px-3': ['lg', 'sm'].includes(size),
                'px-1': size === 'xs'
            }
        ]];
    },
    search: ({ themeSettings }) => {
        return [themeSettings?.search,  [
            '!hidden'
        ]];
    },
    optionIcon: ({ themeSettings }) => {
        return [themeSettings?.optionIcon,  [
            'mr-2'
        ]];
    },
}));


/* DATA */
/* COMPUTED */

const value = computed({
    get() {
        return props.modelValue;
    },
    set(value: SelectOption) {
        emit('update:modelValue', value)
    }
});

const classes = computed((): ReturnType<typeof useClasses> => {
    return useClasses({
        themeSettings: props.themeSettings,
        size: props.size,
        isOpen: !!select?.value?.open
    });
});

/* WATCH */
/* METHODS */

function close() {
    select.value.open = false;
}

</script>
<style lang="postcss">

    .v-select {

        .vs__dropdown-toggle {
        }

        .vs__selected-options {
        }



        .vs__search {
        }

        .vs__actions {
        }

        .vs__dropdown-option {
        }

        .vs__dropdown-option--selected {
        }

        .vs__selected {
        }
        .vs__deselect {
        }

        input::-ms-clear,
        input::-ms-reveal {
        }
        input::-webkit-search-decoration,
        input::-webkit-search-cancel-button,
        input::-webkit-search-results-button,
        input::-webkit-search-results-decoration {
            display: none;
        }
    }
    .v-select.vs--open {
        .svg-icon {
        }
    }
    .v-select.vs--open.vs--searchable,
    .v-select.vs--fill:not(.vs--open) {
        .vs__search {
        }
    }
    .v-select.vs--loading {
        .vs__clear,
        .vs__open-indicator {
        }
    }

    .vs--multiple {
        .vs__selected {
            display: flex;
            flex-grow: 0;
        }
        .vs__deselect {
            display: block;
            margin-left: 8px;
        }
    }
</style>
