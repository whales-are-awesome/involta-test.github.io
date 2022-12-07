<template>
    <transition
        enter-active-class="enter-active"
        leave-active-class="leave-active"
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
        @before-leave="beforeLeave"
        @leave="leave"
        @after-leave="afterLeave"
    >
        <slot></slot>
    </transition>
</template>

<script setup lang="ts">
// HOOKS

function beforeEnter(element: HTMLElement) {
    requestAnimationFrame(() => {
        if (!element.style.height) {
            element.style.height = '0px';
        }

        element.style.display = '';
    });
}

function enter(element: HTMLElement) {
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            element.style.height = `${element.scrollHeight}px`;
        });
    });
}

function afterEnter(element: HTMLElement) {
    element.style.height = '';
}

function beforeLeave(element: HTMLElement) {
    requestAnimationFrame(() => {
        if (!element.style.height) {
            element.style.height = `${element.offsetHeight}px`;
        }
    });
}

function leave(element: HTMLElement) {
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            element.style.height = '0px';
        });
    });
}

function afterLeave(element: HTMLElement) {
    element.style.height = '';
}
</script>

<style scoped>
.enter-active,
.leave-active {
    @apply transition-fast overflow-hidden;
}
</style>
