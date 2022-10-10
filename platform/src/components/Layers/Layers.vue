<template>
    <Transition name="fade">
        <div
            v-if="isBlackoutShown"
            class="layer-blackout"
        >
        </div>
    </Transition>
    <TransitionGroup name="fade">
        <Component
            v-for="item in openedItems"
            :key="item.id"
            :is="item.component"
            v-bind="item.props"
        />
    </TransitionGroup>
</template>

<script lang="ts" setup>
import useLayer from '@/helpers/hooks/useLayer';

const { isBlackoutShown, openedItems } = useLayer();
</script>
