<script setup lang="ts">
withDefaults(defineProps<{
    label: string,
    type?: 'text' | 'number'
}>(), {
    type: 'text'
})

</script>
<template>
    <div class="form-control">
        <label>
            {{ label }}
            <input :type />
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