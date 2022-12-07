<template>
    <div
        :class="classes.root"
    >
        <div
            v-for="(item, index) in items"
            :key="index"
            :class="classes.items"
            @click.stop="router.push({ name : 'network-dao-address-subdao', params: { id: 2, subdao: 3, network: 'goerli' } })"
        >
            <div
                :class="classes.item"
            >
                <div :class="classes.itemInner">
                    {{ item.name }}
                </div>
            </div>
        </div>
    </div>
</template>


<script lang="ts" setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
//import  from '@/components/';
import { IItem } from './types';
import makeClasses from '@/helpers/makeClasses';
import ThemeSettings from '@/types/themeSettings';


// META

interface IProps {
    items: IItem[]
    themeSettings?: ThemeSettings<'root'>
}

const props = withDefaults(defineProps<IProps>(), {});

const router = useRouter();


// CLASSES

interface IThemeProps extends Pick<IProps, 'themeSettings'>{}

const useClasses = makeClasses<IThemeProps>(() => ({
    root: ({ themeSettings }) => [themeSettings?.root,
        'bg-secondary-200 w-[224px] absolute left-full top-0'
    ],
    item: 'px-6 text-gray-500 text-sm',
    itemInner: 'py-2 text-gray-500 text-sm border-b border-secondary-300'
}));

const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({
        themeSettings: props.themeSettings
    });
});
</script>
