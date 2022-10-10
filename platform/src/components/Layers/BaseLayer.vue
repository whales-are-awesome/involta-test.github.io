<template>
    <div
        class="modal-mask"
    >
        <div
            class="modal-wrapper"
            @click.self="closeLast"
        >
            <div
                class="modal-container"
                :class="containerStyles"
            >
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import useLayer from '@/helpers/hooks/useLayer';

const { closeLast } = useLayer();

const props = defineProps({
    id: Number,
    containerStyles: String,
})
</script>

<style>
.modal-mask {
    @apply pr-4;
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.modal-wrapper {
    @apply h-full flex items-center justify-center;
}

.modal-container {
    @apply bg-white relative;
    box-shadow: 0 4px 8px rgba(133, 134, 134, 0.2);
}

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
</style>
