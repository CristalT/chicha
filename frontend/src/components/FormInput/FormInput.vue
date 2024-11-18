<script setup lang="ts">
import { computed, useTemplateRef } from 'vue';

const input  = useTemplateRef('input')
withDefaults(defineProps<{
    label?: string,
    type?: 'text' | 'number',
    placeholder?: string
}>(), {
    label: '',
    type: 'text',
    placeholder: ''
})

const model = defineModel()

const value = computed({
    get() {
        return model.value
    },
    set(value) {
        model.value = typeof value === 'number' ? value : String(value).toUpperCase()
    }
})

function focus() {
    // @ts-ignore
    input.value?.focus()    
}

function select() {
    // @ts-ignore
    input.value?.select()
}

defineExpose({ focus, select })
</script>
<template>
    <div class="form-control">
        <label>
            <div v-if="label">
                {{ label }}
            </div>
            <input ref="input" :type v-model="value" :placeholder v-bind="$attrs" />
        </label>
    </div>
</template>

<style lang="css" scoped>
.form-control {
    width: 100%;
}

label {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

input {
    display: block;
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    font-size: 1.3rem;
    border: 1px solid #aaa;
    border-radius: 3px;
}

input:focus {
    border: 2px solid #000;
    outline: none;
}
</style>