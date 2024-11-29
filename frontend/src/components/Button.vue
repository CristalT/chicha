<script setup lang="ts">
withDefaults(defineProps<{
    label?: string,
    variant?: 'primary' | 'secondary' | 'tertiary'
}>(), { variant: 'primary' })
</script>

<template>
    <button :class="variant">
        <slot v-if="!label"></slot>
        <span v-else>{{ label }}</span>
    </button>
</template>

<style lang="css" scoped>
button {
    border: none;
    font-size: 1rem;
    padding: 10px 16px;
    border-radius: 3px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
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
    background-color: transparent;
    color: var(--secondary-color);
}

.tertiary:hover {
    background-color: rgba(81, 23, 139, 0.2);

}
</style>