<template>
    <div :class="classes.root">
        <div
            v-if="title || tip"
            :class="classes.top"
        >
            <div :class="classes.topMain">
                <div
                    v-if="title"
                    :class="classes.title"
                >
                    {{ title }}
                </div>
                <BaseIcon
                    v-if="required"
                    :class="classes.requiredIcon"
                    name="required"
                    width="6"
                />
                <TextTooltip
                    v-if="tooltip"
                    :content="tooltip"
                >
                    <BaseIcon
                        :class="classes.tooltipIcon"
                        name="warning-circle"
                        width="9"
                    />
                </TextTooltip>
                <div
                    v-if="tip"
                    :class="classes.tip"
                >
                    {{ tip }}
                </div>
            </div>
            <div
                v-if="description"
                :class="classes.description"
            >
                {{ description }}
            </div>
        </div>
        <div
            v-if="$slots.default"
            :class="classes.content"
        >
            <slot></slot>
        </div>
        <div
            v-if="hint || error || tipBottom"
            :class="classes.bottom"
        >
            <template v-if="hint">
                <BaseIcon
                    :class="classes.warningIcon"
                    name="warning"
                    width="10"
                />
                <div
                    :class="classes.hint"
                >
                    {{ hint }}
                </div>
            </template>
            <template v-if="error">
                <BaseIcon
                    :class="classes.errorIcon"
                    name="warning-circle"
                    width="12"
                />
                <div
                    :class="classes.error"
                >
                    {{ error }}
                </div>
            </template>
            <div
                v-if="tipBottom"
                :class="classes.tip"
            >
                {{ tipBottom }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';
import TextTooltip from '@/components/TextTooltip/TextTooltip.vue';
import makeClasses from '@/helpers/makeClasses';
import ThemeSettings from '@/types/themeSettings';


// META

export interface IProps {
    title?: string
    tooltip?: string
    description?: string
    required?: boolean
    tip?: string | number
    hint?: string
    error?: string
    tipBottom?: string | number
    disabled?: boolean

    themeSettings?: ThemeSettings<'root' | 'description' | 'descriptionSize' | 'descriptionColor'>
}

interface IEmits {
}

const props = withDefaults(defineProps<IProps>(), {
});

const emit = defineEmits<IEmits>();

const slots = useSlots();


// CLASSES

interface IThemeProps extends Pick<IProps, 'themeSettings' | 'disabled' | 'error'>{
    hasContent: boolean
}

const useClasses = makeClasses<IThemeProps>(() => {
    return {
        root: ({ themeSettings }) => [themeSettings?.root],
        top: ({ hasContent }) => [
            {
                'mb-2': hasContent
            }
        ],
        topMain: 'flex items-center',
        description: ({ themeSettings }) => [themeSettings?.description,
            themeSettings?.descriptionColor || 'text-gray-400',
            themeSettings?.descriptionSize || 'text-xxs'
        ],
        title: ({ disabled }) => [
            'text-gray-500 text-sm font-bold',
            {
                '!text-disabled-text': disabled,
            }
        ],
        requiredIcon: ({ disabled }) => [
            'text-status-error self-start ml-1 translate-y-1',
            {
                '!text-disabled-text': disabled,
            }
        ],
        tooltipIcon: ({ disabled }) => [
            'text-300 ml-[5px]',
            {
                '!text-disabled-text': disabled,
            }
        ],
        tip: ({ disabled }) => [
            'ml-auto text-gray-500 text-xs',
            {
                '!text-disabled-text': disabled,
            }
        ],
        content: ({ disabled }) => ({
            '!text-disabled-text': disabled,
        }),
        bottom: ({ error }) => [
            'mt-2 flex items-center',
            {
                'w-full': error
            }
        ],
        warningIcon: ({ disabled }) => [
            'text-gray-500 mr-2',
            {
                '!text-disabled-text': disabled,
            }
        ],
        hint: ({ disabled }) => [
            'text-gray-500 text-xs font-bold',
            {
                '!text-disabled-text': disabled,
            }
        ],
        errorIcon: 'text-[#CB101D] mr-2',
        error: 'text-[#CB101D] text-xs font-bold'
    };
});

const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({
        disabled: props.disabled,
        error: props.error,
        hasContent: !!slots.default,
        themeSettings: props.themeSettings
    });
});
</script>

<style scoped>

</style>
