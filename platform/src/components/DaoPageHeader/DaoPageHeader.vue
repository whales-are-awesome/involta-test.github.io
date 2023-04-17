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
                        v-if="canEdit"
                        :class="classes.infoItem"
                        theme="secondary-dark"
                        @click="openEditDao"
                    >
                        <BaseIcon
                            :class="classes.infoItemIcon"
                            name="settings"
                            width="20"
                        />
                        Edit
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
                            {{ formatLink(link) }}
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
import { useRoute } from 'vue-router';
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';
import ActionLink from '@/components/ActionLink/ActionLink.vue';
import LinkButton from '@/components/LinkButton/LinkButton.vue';
import BaseBreadcrumbs from '@/components/BaseBreadcrumbs/BaseBreadcrumbs.vue';
import { IBreadcrumb  } from './types';
import { open } from '@/composables/useLayer';
import makeClasses from '@/helpers/makeClasses';
import API from '@/helpers/api';
import ThemeSettings from '@/types/themeSettings';
import { store } from '@/store';


// META

interface IProps {
    name?: string
    description?: string
    followersAmount?: string
    owner: string
    link?: string
    breadcrumbs?: IBreadcrumb[]
    themeSettings?: ThemeSettings<'root'>
}

const props = withDefaults(defineProps<IProps>(), {});

const route = useRoute();


// CLASSES

interface IThemeProps extends Pick<IProps, 'themeSettings'>{
    hasBreadcrumbs: boolean
    canEdit: boolean
}

const useClasses = makeClasses<IThemeProps>(() => ({
    root: ({ themeSettings }) => [themeSettings?.root,
        'line-wave-bg py-4 px-8 -mx-[30px] border-b border-primary-100 sm:py-9 sm:px-[30px]'
    ],
    inner: 'bg-white border border-primary-100 rounded-[10px] px-4 py-3 min-h-[120px] sm:flex sm:flex-col',
    top: ({ canEdit }) => [
        'flex items-center justify-between sm:order-[1] sm:flex-col sm:items-start sm:mt-[18px]',
        {
            'mb-5': !canEdit
        }
    ],
    name: ({ hasBreadcrumbs }) => [
        'font-bold text-gray-600 mb-2 overflow-hidden overflow-ellipsis md:mb-3 sm:text-xs',
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
        hasBreadcrumbs: !!props.breadcrumbs?.length,
        canEdit: canEdit.value
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


// META: ADDRESS

const address = computed(() => store.state.wallet.address);


// CAN EDIT

const canEdit = computed(() => props.owner === address.value);


// LINK

function formatLink(_link: string) {
    let link: string = _link.replace('https://', '')
        .replace('//', '')
        .replace('www.', '');

    if (link.endsWith('/')) {
        link = link.slice(0, -1);
    }

    return link;
}


async function openEditDao() {
    open('EditDaoLayer', {
        network: route.params.network,
        address: route.params.address
    })
}

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
