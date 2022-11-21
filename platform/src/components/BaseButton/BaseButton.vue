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
    Justify,
    Rounded,
    Themes
} from './types';
import makeClasses from '@/helpers/makeClasses';
import IRouterLink from '@/models/routerLink';
import ThemeSettings from '@/models/themeSettings';

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
    justify: Justify
    wrapContent: boolean
    themeSettings?: ThemeSettings<'root' | 'container' | 'bg'>
}

interface IEmit {
    (e: 'click'): void
}

interface IThemeProps extends Pick<IProps, 'theme' | 'size' | 'disabled' | 'view' | 'rounded' | 'themeSettings' | 'icon' | 'justify'> {
    hasContent: boolean
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
    justify: 'center',
    wrapContent: true
});
const slots = useSlots();
const emit = defineEmits<IEmit>();

/* CONSTANTS AND HOOKS */

const useClasses = makeClasses<IThemeProps>(() => ({
    root: ({size, themeSettings, view, theme, disabled, rounded, justify}) => [themeSettings?.root,
        'group inline-flex items-center relative z-1 [background-position-y:0] tracking-[0.4px]',
        {
            'px-5 h-[52px] text-lg': size === 'lg',
            'px-5 h-[40px] text-base': size === 'md',
            'px-[18px] text-sm sm:text-xxs sm:h-[28px]': size === 'sm',
            'px-[24px] sm:text-xxs': size === 'mobile',
            'w-[36px] h-[36px]': size === 'icon',
            'h-[36px] sm:h-[24px] sm:!text-xxs': size === 'sm' && rounded === 'lg',
            'h-[32px]': size === 'sm' && rounded !== 'lg',

            'justify-center': justify === 'center',
            'justify-start': justify === 'start',

            '!text-disabled-text pointer-events-none': disabled
        },

        view === 'filled' && {
            'text-white': ['gray', 'primary', 'primary-400'].includes(theme),
            'text-gray-500 active:text-gray-700': theme === 'surface',
        },


        view === 'outlined' && {
            'text-primary-500': view === 'outlined' && theme === 'primary-200',
            'text-gray-500 active:text-gray-600': ['gray', 'gray-500'].includes(theme),
        },

        view === 'ghost' && {
            'text-gray-500 active:text-gray-600': ['gray', 'gray-500'].includes(theme),
        },
    ],
    container: ({themeSettings}) => [themeSettings?.container,
        'flex justify-center items-center transition-fast'
    ],
    bg: ({view, theme, disabled, rounded, themeSettings}) => [themeSettings?.bg,
        'absolute inset-0 -z-1 transition-fast',
        {

            'rounded-[5px]': rounded === 'sm',
            'rounded-[10px]': rounded === 'icon',
            'rounded-[30px]': rounded === 'lg',
            'rounded-full': rounded === 'full'
        },

        view === 'filled' && {
            'bg-gray-700 group-hover:bg-gray-800 group-active:bg-600': theme === 'gray',
            'bg-surface-400 group-hover:bg-gray-300': theme === 'surface',
            'bg-primary-500 group-hover:bg-primary-600 group-active:bg-primary-800': theme === 'primary',
            'border bg-primary-400 group-hover:bg-primary-500 group-active:bg-primary-800': theme === 'primary-400',

            '!bg-disabled-light': disabled
        },

        view === 'outlined' && {
            'border-gray-200 border group-hover:bg-gray-100 group-active:bg-white': theme === 'gray',
            'border-gray-500 border group-hover:bg-gray-100 group-active:bg-white': theme === 'gray-500',
            'border border-primary-200 group-hover:bg-primary-300 group-active:bg-primary-800': theme === 'primary-200',
        },

        view === 'ghost' && {
            'group-hover:bg-gray-100 group-active:bg-transparent': theme === 'gray',
        }
    ],
    content: '',
    icon: ({ hasContent, icon }) => [
        'transition-fast',
        {
            'ml-[9px]': hasContent && !icon?.prepend,
            'mr-[9px]': hasContent && icon?.prepend
        }
    ]
}));

/* COMPUTED */

const componentName = computed<IBaseButtonData['componentName']>(() => {
    if (typeof props.href === 'object' || (typeof props.href === 'string' && /^\//.test(props.href))) {
        return 'RouterLink';
    } else if (typeof props.href === 'string' && !/^\//.test(props.href)) {
        return 'a';
    } else if (props.type === 'label') {
        return 'label';
    }

    return 'button';
});

const buttonAttrs = computed<IBaseButtonData['buttonAttrs']>(() => {
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

const hasContent = computed<IBaseButtonData['hasContent']>(() => {
    return !!slots.default;
});

const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({
        size: props.size,
        theme: props.theme,
        view: props.view,
        justify: props.justify,
        disabled: props.disabled,
        rounded: props.rounded,
        hasContent: !!hasContent.value,
        hasIcon: !!props.icon,
        icon: props.icon,
        themeSettings: props.themeSettings
    });
});
</script>
