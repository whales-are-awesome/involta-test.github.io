<template>
    <BlockInfo
        :title="title"
        :tooltip="tooltip"
        :required="required"
        :tip="tip"
        :hint="hint"
        :error="error"
        :tip-bottom="tipBottom"
        :disabled="disabled"
        :description="description"
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
                :searchable="searchable"
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
                                :class="classes.title"
                                v-html="title"
                            >
                            </span>
                            <span
                                v-if="!title"
                                :class="classes.placeholder"
                            >
                                {{ placeholder }}
                            </span>
                            <span
                                v-if="innerLabel"
                                :class="classes.innerLabel"
                            >
                                {{ innerLabel }}
                            </span>
                            <BaseIcon
                                :class="[classes.arrowIcon, {
                                   'rotate-180' :select?.open
                                }]"
                                :name="angleIcon.name"
                                :width="angleIcon.width"
                                :height="angleIcon.height"
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
    </BlockInfo>
</template>

<script lang="ts" setup>
/* IMPORTS */

import { computed, ref } from 'vue';
import VueSelect from 'vue-select';
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';
import BlockInfo, { IProps as IBlockInfoProps } from '@/components/BlockInfo/BlockInfo.vue';
import { SelectOption, Sizes, AngleView } from './types';
import makeClasses from '@/helpers/makeClasses';

/* INTERFACES */

interface IProps {
    modelValue: string
    placeholder?: string
    notFound?: string
    searchable?: boolean
    options: SelectOption[]
    isWrapped?: boolean
    size: Sizes
    angleView: AngleView
    innerLabel?: string
    themeSettings?: any


    title?: IBlockInfoProps['title']
    tooltip?: IBlockInfoProps['tooltip']
    required?: IBlockInfoProps['required']
    tip?: IBlockInfoProps['tip']
    hint?: IBlockInfoProps['hint']
    error?: IBlockInfoProps['error']
    description?: IBlockInfoProps['description']
    tipBottom?: IBlockInfoProps['tipBottom']
    disabled?: IBlockInfoProps['disabled']
}

interface IEmits {
    (e: 'update:modelValue', value: SelectOption): void
}

interface IThemeProps extends Pick<IProps, 'themeSettings' | 'size' | 'angleView' | 'searchable' | 'innerLabel'| 'isWrapped'>{
    isOpen: boolean
    hasValue: boolean
}

/* META */

const props = withDefaults(defineProps<IProps>(), {
    notFound: 'No data',
    size: 'md',
    angleView: 'primary'
});
const emit = defineEmits<IEmits>();

/* VARS AND CUSTOM HOOKS */

const select = ref(null);
const useClasses = makeClasses<IThemeProps>(() => ({
    root: ({ themeSettings, isWrapped }) => {
        return [themeSettings?.root,  [
            {
                'bg-white px-2 py-3 rounded-[4px]': isWrapped
            }
        ]];
    },
    main: ({ themeSettings, size, isOpen }) => {
        return [themeSettings?.main,  [
            'text-gray-500 tracking-[0.04px]',
            {
                'h-[60px]': size === 'xl',
                'h-[38px] sm:h-[30px]': size === 'md',
                'h-[46px]': size === 'lg',
                'h-[30px] text-sm': size === 'sm',
                'h-[30px] text-xxs': size === 'xs',
                'z-50 relative': isOpen
            }
        ]];
    },
    select: ({ themeSettings }) => {
        return [themeSettings?.select,  [
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
                'px-3 h-[60px]': size === 'xl',
                'px-3 h-[46px]': size === 'lg',
                'px-4 h-[38px] sm:h-[30px] sm:px-3': size === 'md',
                'px-3 h-[30px]': size === 'sm',
                'px-1 h-[30px]': size === 'xs'
            }
        ]];
    },
    arrowIcon: ({ themeSettings, angleView }) => {
        return [themeSettings?.arrowIcon,  [

            {
                'ml-2.5 text-200': angleView === 'primary',
                'ml-auto text-380': angleView === 'secondary'
            }
        ]];
    },
    option: ({ themeSettings, size }) => {
        return [themeSettings?.option,  [
            'py-2 bg-white hover:bg-surface-100 transition-fast flex items-center',
            {
                'px-4 sm:px-3': size === 'md',
                'px-3': ['lg', 'sm', 'xl'].includes(size),
                'px-1': size === 'xs'
            }
        ]];
    },
    search: ({ themeSettings, size, searchable }) => {
        return [themeSettings?.search,  [
            'absolute top-0 left-0 w-10/12 opacity-0 focus:opacity-100',
            {
                'px-3 h-[60px]': size === 'xl',
                'px-3 h-[46px]': size === 'lg',
                'px-4 h-[38px] sm:h-[30px]': size === 'md',
                'px-3 h-[30px]': size === 'sm',
                'px-1 h-[30px]': size === 'xs',
                '!hidden': !searchable
            }
        ]];
    },
    optionIcon: ({ themeSettings }) => {
        return [themeSettings?.optionIcon,  [
            'mr-2'
        ]];
    },
    placeholder: ({ themeSettings, innerLabel }) => {
        return [themeSettings?.placeholder,  [
            'text-200',
            {
                'translate-y-[7px]': !!innerLabel
            }
        ]];
    },
    innerLabel: ({ themeSettings }) => {
        return [themeSettings?.innerLabel,  [
            'absolute left-3 top-3 text-gray-500 text-xxs font-semibold leading-1'
        ]];
    },
    title: ({ themeSettings, innerLabel }) => {
        return [themeSettings?.title,  [
            {
                'translate-y-[7px]': !!innerLabel
            }
        ]];
    }
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
        hasValue: !!value.value,
        isOpen: !!select?.value?.open,
        angleView: props.angleView,
        innerLabel: props.innerLabel,
        searchable: props.searchable,
        isWrapped: props.isWrapped
    });
});
const angleIcon = computed(() => {
    switch (props.angleView) {
        case 'primary':
            return {
                name: 'select-angle',
                width: 8,
                height: 5
            };
        case 'secondary':
            return {
                name: 'chevron-down',
                width: 13,
                height: 13
        };
    }

    return '';
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
