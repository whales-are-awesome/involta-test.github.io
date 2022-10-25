<template>
    <div :class="classes.root">
        <div
            :class="classes.wrapper"
            @click.self="close(id)"
        >
            <div
                :class="[containerStyles, classes.container]"
            >
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
</script>

<script lang="ts" setup>
/* IMPORTS */
import { computed } from 'vue';
import useLayer from '@//composables/useLayer';
import makeClasses from '@/helpers/makeClasses';
import { Position } from './types';


/* INTERFACES */

interface IProps {
    id?: string
    containerStyles?: string
    position: Position
    themeSettings?: any
}

interface IThemeProps extends Pick<IProps, 'position'> {
    themeSettings?: any
}

/* META */

const props = withDefaults(defineProps<IProps>(), {
    position: 'center'
});

/* CONSTANTS AND HOOKS */

const { close } = useLayer();

const useClasses = makeClasses<IThemeProps>(() => ({
    root: () => [
        'fixed inset-0 min-h-screen z-[9998] overflow-x-hidden overflow-y-auto'
    ],
    wrapper: ({ position }) => [
        'min-h-screen',
        {
            'flex items-center justify-center': position === 'center',
            'flex justify-end': position === 'right'
        }
    ],
    container: ({ themeSettings }) => [
        [themeSettings?.container, 'bg-white relative']
    ]

}));

const classes = computed((): ReturnType<typeof useClasses> => {
    return useClasses({
        position: props.position,
        themeSettings: props.themeSettings,
    });
});
</script>

<style>
.layer-blackout {
    @apply fixed top-0 left-0 right-0 bottom-0 transition-opacity duration-300 ease-out;
    transform-style: preserve-3d;
    background-color: rgba(24, 51, 79, 0.3);
    backdrop-filter: blur(8px);
    z-index: 9990;
}

.is-layer-locked {
    @apply fixed top-0 bottom-0 w-full pointer-events-none;
}


.fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
    .modal-container {
        transition: opacity .5s;
    }
}
.fade-enter-from, .fade-leave-to  {
    opacity: 0;
    .modal-container {
        opacity: 0;
    }
}

.fade-enter-active .base-animation-layer, .fade-leave-active .base-animation-layer {
    @apply transition-fast;
}
.fade-enter-from .base-animation-layer, .fade-leave-to .base-animation-layer  {
    transform: scale(.95);
}
</style>
