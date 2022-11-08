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
                    <div :class="classes.infoItem">
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
/* IMPORTS */

import { computed } from 'vue';
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';
import BaseBreadcrumbs from '@/components/BaseBreadcrumbs/BaseBreadcrumbs.vue';
import { IBreadcrumb  } from './types';
import makeClasses from '@/helpers/makeClasses';

/* INTERFACES */

interface IProps {
    name?: string
    description?: string
    breadcrumbs?: IBreadcrumb[]
    themeSettings?: any
}

interface IThemeProps extends Pick<IProps, 'themeSettings'>{
    hasBreadcrumbs: boolean
}

/* META */

const props = withDefaults(defineProps<IProps>(), {});

/* VARS AND CUSTOM HOOKS */

const useClasses = makeClasses<IThemeProps>(() => ({
    root: ({ themeSettings }) => {
        return [themeSettings?.root,  [
            'line-wave-bg py-4 px-8 -mx-[30px] border-b border-primary-100'
        ]];
    },
    inner: 'bg-white border border-primary-100 rounded-[10px] px-4 py-3 h-[120px]',
    top: 'flex items-center justify-between',
    name: ({ hasBreadcrumbs }) => [
        'font-bold text-gray-600 mb-2',
        {
            'mt-[13px]': hasBreadcrumbs,
            '-mt-[3px]': !hasBreadcrumbs
        }
    ],
    info: 'flex space-x-[18px] text-gray-400 text-xs',
    infoItem: 'flex items-center',
    infoItemIcon: 'mr-1',
    description: 'max-w-[659px] text-xs text-gray-500'
}));

/* DATA */
/* COMPUTED */

const classes = computed((): ReturnType<typeof useClasses> => {
    return useClasses({
        themeSettings: props.themeSettings,
        hasBreadcrumbs: !!props.breadcrumbs?.length
    });
});

/* WATCH */
/* METHODS */

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
</style>
