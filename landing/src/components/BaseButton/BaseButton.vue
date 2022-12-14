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
            <BaseIcon
                v-if="icon"
                :class="classes.icon"
                :name="icon.name"
                :width="icon.width"
                :height="icon.height"
            ></BaseIcon>
        </span>
    </Component>
</template>

<script lang="ts">
import { Themes, Sizes, Justify, Views, Icons, Rounded, Width } from './types';
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
    IBaseButtonData
} from './types';
import makeClasses from '@/helpers/makeClasses';

/* INTERFACES */

interface IProps {
    href?: string
    icon?: {
        name: Icons
        width?: string
        height?: string
        class?: string
    }
    rounded: keyof typeof Rounded
    width?: keyof typeof Width
    disabled: boolean
    active: boolean
    type: IHTMLButtonAttributes['type'] | IHTMLLabelAttributes['type']
    theme: keyof typeof Themes
    size: keyof typeof Sizes
    view: keyof typeof Views
    justify: keyof typeof Justify
    wrapContent: boolean
    themeSettings?: any
}

interface IEmit {
    (e: 'click'): void
}

interface IThemeProps extends Pick<IProps, 'theme' | 'size' | 'justify' | 'disabled' | 'view' | 'rounded' | 'active' | 'width' | 'themeSettings'> {
    hasContent?: boolean
    hasIcon?: boolean
    isFocused?: boolean
}

/* META */

const props = withDefaults(defineProps<IProps>(), {
    disabled: false,
    active: false,
    type: 'button',
    theme: Themes.Primary,
    rounded: Rounded.Sm,
    size: Sizes.Md,
    justify: Justify.Center,
    view: Views.Filled,
    wrapContent: true
});
const slots = useSlots();
const emit = defineEmits<IEmit>();

/* CONSTANTS AND HOOKS */

const useClasses = makeClasses<IThemeProps>(() => ({
    root: ({size, width, themeSettings, view, theme, disabled}) => {
        return makeThemeSettings(themeSettings?.root, [
            'group inline-flex items-center relative z-1 [background-position-y:0]',
            {
                'px-6 h-[44px] text-base font-medium md:!h-[30px] md:!text-[10px] md:!px-4': size === Sizes.Sm,
                'px-8 h-[52px] text-lg font-semibold md:!h-[30px] md:!text-[10px] md:!px-4': size === Sizes.Md,
                'px-8 h-[56px] text-lg font-semibold md:!h-[30px] md:!text-[10px] md:!px-4': size === Sizes.Lg,
                'px-6 h-[72px] text-lg font-semibold  md:text-sm md:px-[13px] md:h-[56px]': size === Sizes.Xl,
                'pl-8 pr-6 h-[52px] text-sm fomt-medium md:h-[30px] md:text-[10px] md:pl-4 md:pr-3': size === Sizes.Icon,

                'w-full': width === Width.Full,

                'text-white': view === Views.Filled && [Themes.Primary, Themes.Purple].includes(theme),
                'text-[#24243D]': view === Views.Filled && theme === Themes.Secondary,
                'text-primary-300 hover:text-[#24243D]': view === Views.Ghost && theme === Themes.Primary,
                'text-primary-300 active:text-primary-500 hover:text-[#7E7E86]': view === Views.Icon && Themes.Thirdly,
                '!text-[#DCDCDC] pointer-events-none': view === Views.Icon && disabled,
            }
        ]);
    },
    container: ({themeSettings}) => {
        const result = ['flex justify-center items-center transition-fast'];
        const defaults = [{
        }];

        result.push(themeSettings?.container || defaults);

        return result;
    },
    bg: ({view, theme, rounded, themeSettings, disabled}) => {
        const result = ['absolute inset-0 -z-1 transition-fast'];
        const normal = [{
            'bg-primary-500 group-hover:bg-primary-0 shadow-[0_4px_10px_rgba(48,47,121,.08)]': view === Views.Filled && theme === Themes.Primary,
            'bg-primary-white group-hover:bg-primary-100 group-active:bg-primary-white shadow-[0_4px_10px_rgba(48,47,121,.08)]': view === Views.Filled && theme === Themes.Secondary,
            'bg-[#7A4BFF] shadow-[0_20px_40px_rgba(122,75,255,.4)] group-hover:bg-[#623CCC] group-hover:shadow-[0_20px_40px_rgba(122,75,255,0.8)]': view === Views.Filled && theme === Themes.Purple,
            'bg-transparent shadow-none': view === Views.Ghost && theme === Themes.Primary,
            'border-2 border-primary-300 group-hover:border-[#7E7E86] group-active:border-primary-500 group-active:bg-transparent md:border shadow-[0_4px_10px_rgba(48,47,121,.08)]': view === Views.Icon && theme === Themes.Thirdly,
            '!border-[#DCDCDC] shadow-[0_4px_10px_rgba(48,47,121,.08)]': view === Views.Icon && disabled,

            'rounded-[5px]': rounded === Rounded.Base,
            'rounded-[12px]': rounded === Rounded.Md,
            'rounded-[30px]': rounded === Rounded.Lg
        }];

        result.push(themeSettings?.bg || normal);

        return result;
    },
    content: ({themeSettings, hasContent, view, disabled}) => {
        const result = [
            {
                [`mr-4 pr-4 relative after:absolute after:w-[2px] after:h-[52px] after:bg-primary-300
                after:bg-opacity-60 after:right-0 after:top-1/2 after:-translate-y-1/2
                group-active:after:bg-primary-500 group-hover:after:bg-[#7E7E86] after:transition-fast
                md:after:w-[1px] md:after:h-[30px] md:mr-2 md:pr-2`]: hasContent && view === Views.Icon,
                'after:!bg-[#DCDCDC]': view === Views.Icon && disabled,
            }
        ];
        const normal = [{}];

        result.push(themeSettings?.content || normal);

        return result;
    },
    icon: ({hasContent, themeSettings, view, disabled}) => {
        const result = [
            'group-active:text-primary-500 group-hover:text-[#7E7E86] md:scale-[0.7]',
            {
                'text-primary-300': view === Views.Icon && !disabled,
                '!text-[#DCDCDC]': disabled,
            }
        ];
        const normal = [{
            'ml-3': hasContent && view !== Views.Icon
        }];

        result.push(themeSettings?.icon || normal);

        return result;
    }
}));

/* COMPUTED */

const componentName = computed((): IBaseButtonData['componentName'] => {
    if (typeof props.href === 'object') {
        return 'RouterLink';
    } else if (typeof props.href === 'string') {
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
        width: props.width,
        disabled: props.disabled,
        active: props.active,
        justify: props.justify,
        rounded: props.rounded,
        hasContent: hasContent.value,
        hasIcon: !!props.icon,
        themeSettings: props.themeSettings
    });
});
</script>
