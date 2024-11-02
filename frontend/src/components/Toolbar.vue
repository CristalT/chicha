<script lang="ts" setup>
import Button from './Button.vue'

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
    </div>
</template>

<style lang="css" scoped>
.toolbar-container {
   background-color: #fff;
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
}
</style>