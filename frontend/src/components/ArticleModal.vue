<script setup lang="ts">
import FormInput from './FormInput'
import Button from './Button.vue'
import Modal from './Modal.vue'
import { computed, ref, watchEffect } from 'vue';
import { main } from '../../wailsjs/go/models';

const emit = defineEmits(['cancel', 'save'])
const props = defineProps<{
    visible: boolean,
    title: string,
}>()

const codeInput = ref<HTMLInputElement>()

const data = defineModel<main.Article>({ required: true })

const isVisible = computed(() => props.visible)

watchEffect(() => {
    if (isVisible) {
        codeInput.value?.focus()
    }
})
</script>
<template>
    <Modal :visible @close="emit('cancel')" :title>
        <div class="form">
            <FormInput ref="codeInput" label="Código" v-model="data.code" />
            <FormInput label="Descripción" v-model="data.description" />
            <div class="row gap">
                <FormInput label="Stock" type="number" v-model="data.stock" />
                <FormInput label="Costo" type="number" v-model="data.fob" />
                <FormInput label="Precio" type="number" v-model="data.price" @keypress.enter.stop="$emit('save', data)" />
            </div>
        </div>

        <template #footer>
            <Button label="Cancelar" variant="secondary" @click="$emit('cancel')" />
            <Button type="submit" label="Guardar" @click="$emit('save', data)" />
        </template>
    </Modal>

</template>

<style lang="css" scoped>
.form {
    display: flex;
    flex-direction: column;
    gap: 8px;
}
</style>