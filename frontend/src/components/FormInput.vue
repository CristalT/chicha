<script setup lang="ts">
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
</script>
<template>
    <div class="form-control">
        <label>
            <div v-if="label">
                {{ label }}
            </div>
            <input :type v-model="model" :placeholder />
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