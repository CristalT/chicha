<script setup lang="ts">
import { FormInput, Button } from '../ui'
import { ref, useTemplateRef, watchEffect } from 'vue';
import Modal from '../Modal/Modal.vue';
import { main } from '../../../wailsjs/go/models';

const emit = defineEmits(['addToCart', 'close', 'edit'])

defineProps<{
    visible: boolean,
}>()

const qtyInput = useTemplateRef<HTMLInputElement>('qty-input')

const article = defineModel<main.Sale>({ required: true })
const qty = ref(1)

function edit(article: main.Sale) {
    emit('edit', article)
}

watchEffect(() => {
    qtyInput.value?.focus()
    qtyInput.value?.select()
})

</script>
<template>
    <Modal :visible @close="emit('close')" :title="article.description">
        <h3>Código: {{ article.code }}</h3>
        <h3>Precio: $ {{ article.price }}</h3>
        <h3>Cantidad:
            <FormInput type="number" ref="qty-input" v-model="qty"
                @keyup.enter.stop="emit('addToCart', { article, qty })" />
        </h3>

        <template #footer>
            <Button variant="secondary" label="Editar" @click="edit(article)" />
            <Button variant="primary" label="Agregar al Carrito" @click="emit('addToCart', { article, qty })" />
        </template>
    </Modal>
</template>

<style lang="css" scoped>
article {
    position: relative;
    box-shadow: 6px 6px 20px #101010;
    background-color: #fff;
    height: 360px;
    width: 80vw;
    border-radius: 3px;
}
</style>