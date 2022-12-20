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
        <div :class="[classes.main, classes.height]">
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
                        <div :class="[classes.selectedOption, classes.height, classes.padding]">
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
                        <div :class="[classes.option, classes.padding]">
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
                        :class="[classes.search, classes.height, classes.padding]"
                        v-bind="attributes"
                        v-on="events"
                    >
                </template>
            </VueSelect>
        </div>
    </BlockInfo>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import VueSelect from 'vue-select';
import BaseIcon, { IProps as IIconProps } from '@/components/BaseIcon/BaseIcon.vue';
import BlockInfo, { IProps as IBlockInfoProps } from '@/components/BlockInfo/BlockInfo.vue';
import { SelectOption, Sizes, AngleView, Themes } from './types';
import makeClasses from '@/helpers/makeClasses';
import ThemeSettings from '@/types/themeSettings';


// META

interface IProps {
    modelValue: string | number
    placeholder?: string
    notFound?: string
    searchable?: boolean
    options: SelectOption[]
    isWrapped?: boolean
    size: Sizes
    theme: Themes
    angleView: AngleView
    innerLabel?: string
    themeSettings?: ThemeSettings<'root' | 'innerLabel' | 'height'>


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

const props = withDefaults(defineProps<IProps>(), {
    notFound: 'No data',
    size: 'md',
    angleView: 'primary',
    theme: 'white'
});

const emit = defineEmits<IEmits>();


// COMMON:select

const select = ref<InstanceType<typeof VueSelect> | null>(null);

function close(): void {
    select.value.open = false;
}


// CLASSES

interface IThemeProps extends Pick<IProps, 'themeSettings' | 'size' | 'angleView' | 'searchable' | 'innerLabel'| 'isWrapped' | 'theme'>{
    isOpen: boolean
    hasValue: boolean
}


const useClasses = makeClasses<IThemeProps>(() => ({
    root: ({ themeSettings, isWrapped }) => [themeSettings?.root,
        {
            'bg-white px-2 py-3 rounded-[4px]': isWrapped,
        }
    ],
    main: ({ size, isOpen, theme }) => [
        'tracking-[0.04px]',
        {
            'md:text-xxs': size === 'md',
            'text-sm': size === 'sm',
            'text-xxs': size === 'xs',
            'z-50 relative': isOpen,

            'text-gray-500': theme === 'white',
            'text-gray-600': theme === 'primary'
        }
    ],
    select: ({ theme }) => [
        'rounded-[5px] overflow-hidden cursor-pointer relative',
        {
            'border border-gray-100 shadow-[0px_4px_24px_rgba(108,108,125,.08)]': theme === 'white',
            'bg-primary-100': theme === 'primary'
        }
    ],
    openIndicator: 'hidden',
    selectedOption: ({ theme }) => [
        'transition-fast flex items-center',
        {
            'bg-white hover:bg-surface-100': theme === 'white',
            'bg-primary-100 hover:bg-primary-200': theme === 'primary'
        }
    ],
    arrowIcon: ({ angleView }) => ({
        'ml-2.5 text-200': angleView === 'primary',
        'ml-auto text-380': angleView === 'secondary'
    }),
    option: ({ theme }) => [
        'py-2 transition-fast flex items-center',
        {
            'bg-white hover:bg-surface-100': theme === 'white',
            'bg-primary-100 hover:bg-primary-200': theme === 'primary'
        }
    ],
    search: ({ searchable }) => [
        'absolute top-0 left-0 w-10/12 opacity-0 focus:opacity-100',
        {
            '!hidden': !searchable
        }
    ],
    optionIcon: 'mr-2',
    placeholder: ({ innerLabel }) => [
        'text-200',
        {
            'translate-y-[7px]': !!innerLabel
        }
    ],
    innerLabel: ({ themeSettings }) => [themeSettings?.innerLabel,
        'absolute left-3 top-3 text-gray-500 text-xxs font-semibold leading-1'
    ],
    title: ({ innerLabel }) => ({
        'translate-y-[7px]': !!innerLabel
    }),
    height: ({ size, themeSettings }) => [themeSettings?.height,
        {
            'h-[60px]': size === 'xl',
            'h-[38px] sm:h-[30px]': size === 'md',
            'h-[46px]': size === 'lg',
            'h-[30px]': ['xs', 'sm'].includes(size)
        }
    ],
    padding: ({ size }) => [
        {
            'px-4 sm:px-3': size === 'md',
            'px-3': ['lg', 'sm', 'xl'].includes(size),
            'px-1': size === 'xs',
        }
    ],
}));

const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({
        themeSettings: props.themeSettings,
        size: props.size,
        hasValue: !!value.value,
        isOpen: !!select?.value?.open,
        angleView: props.angleView,
        innerLabel: props.innerLabel,
        searchable: props.searchable,
        isWrapped: props.isWrapped,
        theme: props.theme,
    });
});


// VALUE

const value = computed({
    get() {
        return props.modelValue;
    },
    set(value: SelectOption) {
        emit('update:modelValue', value)
    }
});


// ANGLE_ICON

const angleIcon = computed<IIconProps | ''>(() => {
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
