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
                    <div
                        :class="classes.infoItem"
                        @click="$router.push({ name: 'network-dao-address-members', params: $route.params  })">
                        <BaseIcon
                            :class="classes.infoItemIcon"
                            name="users"
                            width="20"
                        />
                        Members (158)
                    </div>
                    <div :class="classes.infoItem">
                        <BaseIcon
                            :class="classes.infoItemIcon"
                            name="settings"
                            width="20"
                        />
                        Params
                    </div>
                </div>
            </div>
            <div
                v-if="name"
                :class="classes.name"
            >
                {{ name }}
            </div>
            <div
                v-if="description"
                :class="classes.description"
            >
                {{ description }}
            </div>
        </div>
    </div>
</template>


<script lang="ts" setup>
import { computed } from 'vue';
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';
import BaseBreadcrumbs from '@/components/BaseBreadcrumbs/BaseBreadcrumbs.vue';
import { IBreadcrumb  } from './types';
import makeClasses from '@/helpers/makeClasses';
import ThemeSettings from '@/types/themeSettings';


// META

interface IProps {
    name?: string
    description?: string
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
    inner: 'bg-white border border-primary-100 rounded-[10px] px-4 py-3 h-[120px]',
    top: 'flex items-center justify-between',
    name: ({ hasBreadcrumbs }) => [
        'font-bold text-gray-600 mb-2 md:mb-3 sm:text-xs',
        {
            'mt-[13px] sm:mt-[17px]': hasBreadcrumbs,
            '-mt-[3px]': !hasBreadcrumbs
        }
    ],
    info: 'flex space-x-[18px] text-gray-400 text-xs sm:hidden',
    infoItem: 'flex items-center cursor-pointer',
    infoItemIcon: 'mr-1',
    description: 'max-w-[659px] text-xs text-gray-500 line-clamp-2 sm:line-clamp-3'
}));

const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({
        themeSettings: props.themeSettings,
        hasBreadcrumbs: !!props.breadcrumbs?.length
    });
});
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
