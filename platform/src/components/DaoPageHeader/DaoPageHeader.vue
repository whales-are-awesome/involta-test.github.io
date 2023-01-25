<template>
    <div
        :class="classes.root"
    >
        <div :class="classes.inner">
            <div :class="classes.top">
                <BaseBreadcrumbs
                    :class="classes.breadcrumbs"
                    :items="breadcrumbs"
                    :hash="false"
                    :first-angle="false"
                    view="primary"
                />
                <div :class="classes.info">
                    <ActionLink
                        :class="classes.infoItem"
                        :to="{ name: 'network-dao-address-followers', params: $route.params  }"
                        theme="secondary-dark"
                    >
                        <BaseIcon
                            :class="classes.infoItemIcon"
                            name="users"
                            width="20"
                        />
                        <span>
                        Followers <strong>{{ followersAmount }}</strong>
                    </span>
                    </ActionLink>
                    <ActionLink
                        :class="classes.infoItem"
                        theme="secondary-dark"
                    >
                        <BaseIcon
                            :class="classes.infoItemIcon"
                            name="settings"
                            width="20"
                        />
                        Params
                    </ActionLink>
                </div>
            </div>
            <div :class="classes.bottom">
                <div>
                    <div
                        v-if="name"
                        :class="classes.name"
                    >
                        {{ name }}
                    </div>
                    <div
                        v-if="link"
                        :class="classes.link"
                    >
                        <ActionLink
                            :href="link"
                            target="_blank"
                        >
                            {{ link.replace('https', '').replace('//', '') }}
                        </ActionLink>
                    </div>
                    <div
                        v-if="description"
                        :class="classes.description"
                    >
                        {{ description }}
                    </div>
                </div>
<!--                <div :class="classes.links">-->
<!--                    <LinkButton-->
<!--                        v-for="link in links"-->
<!--                        :key="link.icon"-->
<!--                        :class="link.className"-->
<!--                        :href="link.href"-->
<!--                        :icon-name="link.icon"-->
<!--                        icon-width="24"-->
<!--                    />-->
<!--                </div>-->
            </div>
        </div>
    </div>
</template>


<script lang="ts" setup>
import { computed } from 'vue';
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';
import ActionLink from '@/components/ActionLink/ActionLink.vue';
import LinkButton from '@/components/LinkButton/LinkButton.vue';
import BaseBreadcrumbs from '@/components/BaseBreadcrumbs/BaseBreadcrumbs.vue';
import { IBreadcrumb  } from './types';
import makeClasses from '@/helpers/makeClasses';
import ThemeSettings from '@/types/themeSettings';


// META

interface IProps {
    name?: string
    description?: string
    followersAmount?: string
    link?: string
    breadcrumbs?: IBreadcrumb[]
    themeSettings?: ThemeSettings<'root'>
}

const props = withDefaults(defineProps<IProps>(), {});


// CLASSES

interface IThemeProps extends Pick<IProps, 'themeSettings'>{
    hasBreadcrumbs: boolean
}

const useClasses = makeClasses<IThemeProps>(() => ({
    root: ({ themeSettings }) => [themeSettings?.root,
        'line-wave-bg py-4 px-8 -mx-[30px] border-b border-primary-100 sm:py-9 sm:px-[30px]'
    ],
    inner: 'bg-white border border-primary-100 rounded-[10px] px-4 py-3 min-h-[120px] sm:flex sm:flex-col',
    top: 'flex items-center justify-between sm:order-[1] sm:flex-col sm:items-start sm:mt-[18px]',
    name: ({ hasBreadcrumbs }) => [
        'font-bold text-gray-600 mb-2 md:mb-3 sm:text-xs',
        {
            'mt-[13px] sm:mt-[17px]': hasBreadcrumbs,
            '-mt-[3px]': !hasBreadcrumbs
        }
    ],
    info: 'flex space-x-[18px] text-xs',
    infoItem: 'flex items-center',
    infoItemIcon: 'mr-1',
    bottom: 'flex justify-between sm:block',
    link: 'mb-1 text-xs',
    description: 'max-w-[659px] text-xs text-gray-500 line-clamp-2 sm:line-clamp-3',
    links: 'flex justify-end space-x-2 mt-[18px] sm:justify-start'
}));

const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({
        themeSettings: props.themeSettings,
        hasBreadcrumbs: !!props.breadcrumbs?.length
    });
});


// LINKS

const links = [
    {
        icon: 'discord',
        href: '//google.com',
        className: 'hover:text-[#7289da]'
    },
    {
        icon: 'twitter',
        href: '//google.com',
        className: 'hover:text-[#1DA1F2]'
    },
    {
        icon: 'website',
        href: '//google.com',
        className: 'hover:text-black'
    },
    {
        icon: 'geo',
        href: '//google.com',
        className: 'hover:text-black'
    },
]
</script>

<style scoped>
.line-wave-bg {
    @apply relative;
    background-image: url('@/assets/sprite/svg/line-wave.svg');
    background-repeat: repeat-x;
    background-size: auto;
}
.line-wave-bg:after {

}
@screen sm {
    .line-wave-bg {
        background-image: url('@/assets/sprite/svg/line-wave-mobile.svg');
    }
}
</style>
