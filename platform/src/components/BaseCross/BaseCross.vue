<template>
    <div
        :class="classes.root"
        @click="emit('click')"
    >
        <BaseIcon
            :class="classes.cross"
            name="cross"
            :width="width"
        />
    </div>
</template>


<script lang="ts" setup>
/* IMPORTS */

import { computed } from 'vue';
//import  from '@/components/';
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';
import makeClasses from '@/helpers/makeClasses';

/* INTERFACES */

interface IProps {
    width: number | string
    themeSettings: any
}

interface IEmits {
    (e: 'click'): void
}

interface IThemeProps extends Pick<IProps, 'themeSettings'>{

}

/* META */

const props = withDefaults(defineProps<IProps>(), {
    width: 16
});
const emit = defineEmits<IEmits>();

/* VARS AND CUSTOM HOOKS */

const useClasses = makeClasses<IThemeProps>(() => ({
    root: ({ themeSettings }) => {
        return [themeSettings?.root,  [
            'text-[#B6B6BE] hover:text-[#777781] active:shadow-[0_0_0_4px_rgba(169,169,250,.25)] transition-fast cursor-pointer rounded-[4px] bg-white p-1'
        ]];
    },
}));

/* DATA */
/* COMPUTED */

const classes = computed((): ReturnType<typeof useClasses> => {
    return useClasses({
        themeSettings: props.themeSettings
    });
});

/* WATCH */
/* METHODS */

</script>
