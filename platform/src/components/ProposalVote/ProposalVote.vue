<template>
    <div
        :class="classes.root"
        @click="onClick"
    >
        <div :class="classes.inner">
            <div :class="classes.progress" :style="`width: ${ progress }%`"></div>
            <div
                v-if="canVote"
                :class="classes.field"
            >
                <div :class="[classes.circle, classes.fieldItem]"/>
                <BaseIcon
                    :class="[classes.check, classes.fieldItem]"
                    name="check"
                    width="11"
                    height="8"
                />
            </div>
            <p :class="classes.title">
                {{ title }}
            </p>
            <p :class="classes.votes">
                {{ votes }} tokens
            </p>
            <p :class="classes.percents">
                {{ progress }}%
            </p>
        </div>
    </div>
</template>


<script lang="ts" setup>
import { computed } from 'vue';
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';
import {  } from './types';
import makeClasses from '@/helpers/makeClasses';
import ThemeSettings from '@/types/themeSettings';
import { ProposalVoteType } from '@/types/entries/proposal';

// META

interface IProps {
    modelValue: any
    fieldValue: ProposalVoteType
    vote: ProposalVoteType
    progress: number
    title: number
    canVote: boolean
    votes: number
    themeSettings?: ThemeSettings<'root'>
}

interface IEmits {
    (e: 'update:modelValue', value: IProps['modelValue']): void
}

const props = withDefaults(defineProps<IProps>(), {});

const emit = defineEmits<IEmits>();


// CLASSES

interface IThemeProps extends Pick<IProps, 'themeSettings' | 'canVote'>{
    checked: boolean
}

const useClasses = makeClasses<IThemeProps>(() => ({
    root: ({ themeSettings, canVote, checked }) => [themeSettings?.root,
        'bg-primary-100 border border-transparent rounded-[8px] transition-fast group',
        {
            'cursor-pointer hover:border-primary-400': canVote,
            'border-primary-400': checked
        }
    ],
    inner: 'flex items-center relative z-1 px-3 py-[11px]',
    progress: 'h-full absolute left-0 top-0 -z-1 rounded-[8px] bg-[#E0E0FC] transition-fast',
    field: 'w-[14px] relative mr-1.5',
    fieldItem: 'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
    circle: ({ checked }) => [
        'w-[14px] h-[14px] transition-fast rounded-full border-[1.5px] border-[#8D8DD9]',
        {
            'opacity-0': checked
        }
    ],
    check: ({ checked }) => [
        'text-primary-500 transition-fast',
        {
            'opacity-0': !checked,
            'opacity-1': checked,
        }
    ],
    title: ({ checked, canVote }) => [
        'font-semibold text-sm mr-auto transition-fast',
        {
            'text-500': !checked,
            'group-hover:text-primary-500': canVote,
            'text-primary-500': checked
        }
    ],
    votes: 'text-tiny text-500 mr-3',
    percents: 'text-xs text-500 min-w-[30px] text-right'
}));

const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({
        themeSettings: props.themeSettings,
        canVote: props.canVote,
        checked: value.value === props.fieldValue
    });
});


// VALUE. USED IN ON CLICK

const value = computed({
    get() {
        return props.vote || props.modelValue;
    },
    set(value: IProps['modelValue']) {
        emit('update:modelValue', value)
    }
});


// ON CLICK

function onClick() {
    if (props.canVote) {
        value.value = props.fieldValue
    }
}
</script>
