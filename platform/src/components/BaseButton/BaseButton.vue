<template>
    <Component
        :is="componentName"
        ref="root"
        :class="classes.root"
        v-bind="buttonAttrs"
        v-on="$attrs"
        @click="emit('click')"
    >
        <span :class="classes.container">
            <span :class="classes.bg"></span>
            <slot name="prepend"></slot>
            <BaseIcon
                v-if="icon && icon.prepend"
                :class="[classes.icon, icon.class]"
                :name="icon.name"
                :width="icon.width"
                :height="icon.height"
            ></BaseIcon>
            <span
                v-if="hasContent && wrapContent"
                :class="classes.content"
            >
                <slot></slot>
            </span>
            <slot
                v-else
                v-bind="{class: classes.content}"
            ></slot>
            <slot name="append"></slot>
            <BaseIcon
                v-if="icon && !icon.prepend"
                :class="[classes.icon, icon.class]"
                :name="icon.name"
                :width="icon.width"
                :height="icon.height"
            ></BaseIcon>
        </span>
    </Component>
</template>

<script setup lang="ts">
/* IMPORTS */

import { computed, useSlots } from 'vue';
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';
import {
    IHTMLButtonAttributes,
    IRouterLinkAttributes,
    IHTMLLinkAttributes,
    IHTMLLabelAttributes,
    IBaseButtonData,
    Sizes,
    Views,
    Icons,
    Rounded,
    Themes
} from './types';
import makeClasses from '@/helpers/makeClasses';
import IRouterLink from '@/models/routerLink';

/* INTERFACES */

interface IProps {
    href?: IRouterLink
    icon?: {
        name: Icons
        width?: string
        height?: string
        class?: string
        prepend?: boolean
    }
    rounded: Rounded
    disabled: boolean
    type: IHTMLButtonAttributes['type'] | IHTMLLabelAttributes['type']
    theme: Themes
    size: Sizes
    view: Views
    wrapContent: boolean
    themeSettings?: any
}

interface IEmit {
    (e: 'click'): void
}

interface IThemeProps extends Pick<IProps, 'theme' | 'size' | 'disabled' | 'view' | 'rounded' | 'themeSettings' | 'icon'> {
    hasContent?: boolean
    hasIcon?: boolean
    isFocused?: boolean
}

/* META */

const props = withDefaults(defineProps<IProps>(), {
    disabled: false,
    type: 'button',
    theme: 'gray',
    rounded: 'sm',
    size: 'md',
    view: 'filled',
    wrapContent: true
});
const slots = useSlots();
const emit = defineEmits<IEmit>();

/* CONSTANTS AND HOOKS */

const useClasses = makeClasses<IThemeProps>(() => ({
    root: ({size, themeSettings, view, theme, disabled, rounded}) => {
        return [themeSettings?.root, [
            'group inline-flex items-center justify-center relative z-1 [background-position-y:0]',
            {
                'px-5 h-[52px] text-lg': size === 'lg',
                'px-5 h-[40px] text-base': size === 'md',
                'px-[18px] text-sm': size === 'sm',
                'h-[36px]': size === 'sm' && rounded === 'lg',
                'h-[32px]': size === 'sm' && rounded !== 'lg',

                'text-white': view === 'filled' && ['gray', 'primary'].includes(theme),
                'text-gray-500 active:text-gray-700': view === 'filled' && theme === 'surface',
                'text-gray-500 active:text-gray-600': ['ghost', 'outlined'].includes(view) && theme === 'gray',
                '!text-disabled-text pointer-events-none': disabled
            }
        ]];
    },
    container: ({themeSettings}) => {
        return [themeSettings?.container, [
            'flex justify-center items-center transition-fast'
        ]];
    },
    bg: ({view, theme, disabled, rounded, themeSettings}) => {
        return [themeSettings?.bg, [
            'absolute inset-0 -z-1 transition-fast',
            {
                'bg-gray-700 group-hover:bg-gray-800 group-active:bg-600': view === 'filled' && theme === 'gray',
                'bg-white border-gray-200 border group-hover:bg-gray-100 group-active:bg-white': view === 'outlined' && theme === 'gray',
                'group-hover:bg-gray-100 group-active:bg-transparent': view === 'ghost' && theme === 'gray',

                'bg-surface-400 group-hover:bg-gray-300': view === 'filled' && theme === 'surface',

                'bg-primary-500 group-hover:bg-primary-600 group-active:bg-primary-800': view === 'filled' && theme === 'primary',


                '!bg-disabled-light': disabled && view === 'filled',

                // 'rounded': rounded === 'base',
                'rounded-[5px]': rounded === 'sm',
                'rounded-[30px]': rounded === 'lg',
                'rounded-full': rounded === 'full'
            }
        ]];
    },
    content: ({themeSettings}) => {
        return [themeSettings?.content, [

        ]];
    },
    icon: ({themeSettings, hasContent, icon}) => {
        return [themeSettings?.icon, [
            'transition-fast',
            {
                'ml-[13px]': hasContent && !icon?.prepend,
                'mr-[13px]': hasContent && icon?.prepend
            }
        ]];
    }
}));

/* COMPUTED */

const componentName = computed((): IBaseButtonData['componentName'] => {
    if (typeof props.href === 'object' || (typeof props.href === 'string' && /^\//.test(props.href))) {
        return 'RouterLink';
    } else if (typeof props.href === 'string' && !/^\//.test(props.href)) {
        return 'a';
    } else if (props.type === 'label') {
        return 'label';
    }

    return 'button';
});

const buttonAttrs = computed((): IBaseButtonData['buttonAttrs'] => {
    if (componentName.value === 'button' && (props.type === 'button' || props.type === 'submit')) {
        return {
            disabled: props.disabled,
            type: props.type
        } as IHTMLButtonAttributes;
    } else if (componentName.value === 'RouterLink') {
        return {
            to: props.href
        } as IRouterLinkAttributes;
    } else if (componentName.value === 'a') {
        return {
            href: typeof props.href === 'string' ? props.href : '',
            target: '_blank'
        } as IHTMLLinkAttributes;
    } else if (componentName.value === 'label') {
        return {} as IHTMLLabelAttributes;
    }

    return null;
});

const hasContent = computed((): IBaseButtonData['hasContent'] => {
    return !!slots.default;
});

const classes = computed((): ReturnType<typeof useClasses> => {
    return useClasses({
        size: props.size,
        theme: props.theme,
        view: props.view,
        disabled: props.disabled,
        rounded: props.rounded,
        hasContent: hasContent.value,
        hasIcon: !!props.icon,
        icon: props.icon,
        themeSettings: props.themeSettings
    });
});
</script>
