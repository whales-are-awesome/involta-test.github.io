<template>
    <BaseLayer
        :class="classes.root"
        :id="id"
        :close-on-click-outside="closeOnClickOutside"
        :theme-settings="{
            container: classes.rootContainer
        }"
    >
        <div v-if="pending" :class="classes.preloader"></div>
        <div
            v-if="iconName"
            :class="classes.icon"
        >
            <BaseIcon
                :name="iconName"
                width="104"
            />
        </div>
        <p :class="classes.title" v-html="title"></p>
        <p
            :class="classes.text"
            v-html="text"
        >
        </p>
        <div :class="classes.buttons">
            <BaseButton
                v-if="cancelButtonText"
                theme="surface"
                @click="close(props.id, false);"
            >
                {{ cancelButtonText }}
            </BaseButton>
            <BaseButton
                theme="primary"
                @click="accept"
            >
                {{ buttonText }}
            </BaseButton>
        </div>
    </BaseLayer>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import useLayer from '@/composables/useLayer';
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import BaseLayer from '@/components/Layers/BaseLayer/BaseLayer.vue';
import { Statuses } from './types';
import ThemeSettings from '@/types/themeSettings';
import makeClasses from '@/helpers/makeClasses';


// META

export interface IProps {
    id: string
    title: string
    text: string
    cancelButtonText?: string
    closeOnClickOutside?: boolean
    buttonText: string
    status: Statuses
    callback?: () => void
    themeSettings?: ThemeSettings<'root' | 'text'>
}

const props = withDefaults(defineProps<IProps>(), {
    cancelButtonText: 'Cancel',
    closeOnClickOutside: true
});

const { close } = useLayer();


// CLASSES

interface IThemeProps extends Pick<IProps, 'themeSettings'>{

}

const useClasses = makeClasses<IThemeProps>(() => ({
    root: ({ themeSettings }) => [themeSettings?.root,
        'p-8 sm:p-6'
    ],
    rootContainer: 'p-[54px] w-[534px] flex flex-col base-animation-layer rounded-[4px] text-center md:p-6',
    preloader: '-preloader',
    icon: 'mb-11 flex justify-center',
    title: 'title-h4 mb-3',
    text: ({ themeSettings }) => [themeSettings?.text,
        'text-400 mb-11'
    ],
    buttons: 'flex justify-center space-x-4'
}));

const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({
        themeSettings: props.themeSettings
    });
});


// ICON NAME

const iconName = computed(() => {
    switch(props.status) {
        case 'success':
            return 'alert-success'
        case 'error':
            return 'alert-error'
        case 'unknown':
            return 'alert-unknown';
    }

    return '';
});


// ACCEPT

const pending = ref(false);

async function accept() {
    if (props.callback) {
        pending.value = true;

        try {
            await props.callback();
        } catch (e) {
            console.log(e);
        }

        pending.value = false;

    }

    close(props.id, true);
}
</script>
