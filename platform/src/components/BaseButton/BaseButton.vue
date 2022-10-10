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

<script lang="ts">
import { Themes, Sizes, Views, Icons, Rounded } from './types';
</script>

<script setup lang="ts">
/* IMPORTS */

import { computed, useSlots } from 'vue';
import BaseIcon from '@/components/BaseIcon.vue';
import {
    IHTMLButtonAttributes,
    IRouterLinkAttributes,
    IHTMLLinkAttributes,
    IHTMLLabelAttributes,
    IBaseButtonData,
} from './types';
import makeClasses from '@/helpers/makeClasses';

/* INTERFACES */

interface IProps {
    href?: string
    icon?: {
        name: keyof typeof Icons
        width?: string
        height?: string
        class?: string
        prepend?: boolean
    }
    rounded: keyof typeof Rounded
    disabled: boolean
    type: IHTMLButtonAttributes['type'] | IHTMLLabelAttributes['type']
    theme: keyof typeof Themes
    size: keyof typeof Sizes
    view: keyof typeof Views
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
    theme: Themes.Gray,
    rounded: Rounded.Sm,
    size: Sizes.Md,
    view: Views.Filled,
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
                'px-5 h-[52px] text-lg': size === Sizes.Lg,
                'px-5 h-[40px] text-base': size === Sizes.Md,
                'px-[18px] text-sm': size === Sizes.Sm,
                'h-[36px]': size === Sizes.Sm && rounded === Rounded.Lg,
                'h-[32px]': size === Sizes.Sm && rounded !== Rounded.Lg,

                'text-white': view === Views.Filled && [Themes.Gray, Themes.Primary].includes(theme),
                'text-gray-500 active:text-gray-700': view === Views.Filled && theme === Themes.Surface,
                'text-gray-500 active:text-gray-600': [Views.Ghost, Views.Outlined].includes(view) && theme === Themes.Gray,
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
                'bg-gray-700 group-hover:bg-gray-800 group-active:bg-600': view === Views.Filled && theme === Themes.Gray,
                'border-gray-200 border group-hover:bg-gray-100 group-active:bg-transparent': view === Views.Outlined && theme === Themes.Gray,
                'group-hover:bg-gray-100 group-active:bg-transparent': view === Views.Ghost && theme === Themes.Gray,

                'bg-surface-400 group-hover:bg-gray-300': view === Views.Filled && theme === Themes.Surface,

                'bg-primary-500 group-hover:bg-primary-600 group-active:bg-primary-800': view === Views.Filled && theme === Themes.Primary,


                '!bg-disabled-light': disabled && view === Views.Filled,

                // 'rounded': rounded === Rounded.Base,
                'rounded-[5px]': rounded === Rounded.Sm,
                'rounded-[30px]': rounded === Rounded.Lg,
                'rounded-full': rounded === Rounded.Full
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
