<template>
    <Layout/>
</template>

<script setup>
import Layout from './layouts';

window.addEventListener('error', (event) => {
    if (event?.message === 'Uncaught TypeError: this.getOption is not a function') {
        event.preventDefault();
    }
});
</script>
