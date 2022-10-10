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

<script setup>
function beforeEnter(element) {
    requestAnimationFrame(() => {
        if (!element.style.height) {
            element.style.height = '0px';
        }

        element.style.display = null;
    });
}

function enter(element) {
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            element.style.height = `${element.scrollHeight}px`;
        });
    });
}

function afterEnter(element) {
    element.style.height = null;
}

function beforeLeave(element) {
    requestAnimationFrame(() => {
        if (!element.style.height) {
            element.style.height = `${element.offsetHeight}px`;
        }
    });
}

function leave(element) {
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            element.style.height = '0px';
        });
    });
}

function afterLeave(element) {
    element.style.height = null;
}
</script>

<style scoped>
.enter-active,
.leave-active {
    @apply transition-fast overflow-hidden;
}
</style>
