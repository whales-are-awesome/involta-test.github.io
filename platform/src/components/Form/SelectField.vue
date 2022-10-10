<template>
    <div
        class="max-h-[46px]"
    >
        <VueSelect
            v-model="value"
            class="border border-surface-100 hover:border-surface-200 rounded-lg shadow-[0_4px_8px_rgba(221,224,231,.4)] overflow-hidden cursor-pointer relative z-10"
            ref="select"
            :options="options"
            label="title"
            :reduce="(option) => option.id"
            :clearable="false"
            :close-on-select="true"
            :searchable="false"
            v-click-outside="open"
        >
            <template #no-options>
                {{ notFound }}
            </template>
            <template #open-indicator>
                <span class="hidden"></span>
            </template>
            <template #selected-option="{ id, title }">
                <slot name="selected-option" v-bind="{ id, title }">
                    <div class="px-6 py-3 bg-white hover:bg-surface-100 transition-fast flex items-center text-sm">
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
                            class="ml-2.5 text-200"
                            :class="{
                               'rotate-180' :select?.open
                            }"
                            name="arrow-down"
                            width="8"
                            height="5"
                        />
                    </div>
                </slot>
            </template>
            <template #option="{ title, id }">
                <slot name="option" v-bind="{ title, id }">
                    <div class="px-6 py-2 bg-white hover:bg-surface-100 transition-fast">
                        <span v-html="title" />
                    </div>
                </slot>
            </template>
            <template #search="{ attributes, events }">
                <input
                    class="!hidden"
                    v-bind="attributes"
                    v-on="events"
                >
            </template>
        </VueSelect>
    </div>
</template>

<script lang="ts" setup>
import {ref, computed } from 'vue';
import VueSelect from 'vue-select';
import BaseIcon from '@/components/BaseIcon';

const select = ref(null);

export interface SelectOption {
    title: string,
    id: string|number
}

interface IProps {
    modelValue: string
    placeholder?: string
    notFound?: string
    options: SelectOption[]
}

interface IEmits {
    (e: 'update:modelValue', value: SelectOption): void
}

const props = withDefaults(defineProps<IProps>(), {
    notFound: 'No data'
});
const emit = defineEmits<IEmits>();

const value = computed({
    get() {
        return props.modelValue;
    },
    set(value: SelectOption) {
        emit('update:modelValue', value)
    }
})

function open() {
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
