<script setup lang="ts">
import FormInput from './FormInput.vue'
import Button from './Button.vue'
import Modal from './Modal.vue'
import { Article } from '../types';

const emit = defineEmits(['cancel', 'save'])
defineProps<{
    visible: boolean,
    title: string,
}>()

const data = defineModel<Article>({ required: true })
</script>
<template>
    <Modal :visible @close="emit('cancel')" :title>
        <div class="form">
            <FormInput label="Código" v-model="data.code" />
            <FormInput label="Descripción" v-model="data.description" />
            <div class="row gap">
                <FormInput label="Stock" type="number" v-model="data.stock" />
                <FormInput label="Costo" type="number" v-model="data.fob" />
                <FormInput label="Precio" type="number" v-model="data.price" />
            </div>
        </div>

        <template #footer>
            <Button label="Cancelar" variant="secondary" @click="$emit('cancel')" />
            <Button label="Guardar" @click="$emit('save', data)" />
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