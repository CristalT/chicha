<script setup lang="ts">
withDefaults(defineProps<{
    label: string,
    variant?: 'primary' | 'secondary' | 'tertiary'
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
    background-color: #b31e8b;
    color: #fff;
}

.primary:hover {
    background-color: #c735a0; 
}

.secondary {
    background-color: #3f1055;
    color: #fff;
}

.secondary:hover {
    background-color: #571e71; 
}

.tertiary {
    background-color: #fff;
    color: #3f1055;
}
.tertiary:hover {
    background-color: #ccc;
}
</style>