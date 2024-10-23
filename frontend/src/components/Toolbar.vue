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
    <nav>
        <ul>
            <li v-for="(option, key) of options" :key="key">
                <Button :label="option.label" @click="option.action" />
            </li>
        </ul>
    </nav>
</template>

<style lang="css" scoped>
nav {
    margin-bottom: 10px;
    display: flex;
    justify-content: right;
}
nav ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
}
</style>