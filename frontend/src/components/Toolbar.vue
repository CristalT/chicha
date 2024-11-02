<script lang="ts" setup>
import useCart from '../composables/useCart';
import Button from './Button.vue'

const { total } = useCart()

type Option = {
    label: string,
    action: () => void
}

defineProps<{
    options: Option[]
}>()


</script>

<template>
    <div class="toolbar-container">
        <nav>
            <ul>
                <li v-for="(option, key) of options" :key="key">
                    <Button :label="option.label" @click="option.action" />
                </li>
            </ul>
        </nav>
        $ {{ total }}
    </div>
</template>

<style lang="css" scoped>
.toolbar-container {
    background-color: #fff;
    display: flex;
    align-items: center;
}

nav {
    padding: 8px;
    display: flex;
    justify-content: right;
    position: sticky;
    top: 0;
}

nav ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 8px;
}
</style>