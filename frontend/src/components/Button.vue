<script setup lang="ts">
withDefaults(defineProps<{
    label: string,
    variant?: 'primary' | 'secondary'
}>(), { variant: 'primary' })
</script>

<template>
    <button :class="variant">{{ label }}</button>
</template>

<style lang="css" scoped>
button {
    border: none;
    font-size: 1rem;
    padding: 10px 16px;
    border-radius: 3px;
    cursor: pointer;
}

.primary {
    background-color: #000;
    color: #fff;
}

.primary:hover {
    background-color: #000000cf; 
}

.secondary {
    background-color: #ddd;
    color: #000;
}

.secondary:hover {
    background-color: #ccc; 
}
</style>