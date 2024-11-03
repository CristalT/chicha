<script setup lang="ts">
import FormInput from './FormInput.vue'
import Button from './Button.vue'
import { Article } from '../types';
import { useTemplateRef, watchEffect } from 'vue';
import Modal from './Modal.vue';

const emit = defineEmits(['addToCart', 'close'])

defineProps<{
    visible: boolean,
}>()

const qtyInput = useTemplateRef('qty-input')

const article = defineModel<Article>({ required: true })

watchEffect(() => {
    if (qtyInput.value) {
        // @ts-ignore
        qtyInput.value.focus()
        // @ts-ignore
        qtyInput.value.select()
    }
})

</script>
<template>
    <Modal :visible @close="emit('close')">
        <article>
            <header>
                {{ article.description }}
            </header>
            <main>
                <h3>Código: {{ article.code }}</h3>
                <h3>Precio: $ {{ article.price }}</h3>
                <h3>Cantidad:
                    <FormInput type="number" ref="qty-input" v-model="article.qty" @keyup.enter="emit('addToCart', article)" />
                </h3>
            </main>
            <footer>
                <Button variant="secondary" label="Editar" />
                <Button variant="primary" label="Agregar al Carrito" @click="emit('addToCart', article)" />
            </footer>
        </article>
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

header {
    border-bottom: 1px solid #000;
    padding: 8px;
    text-align: center;
}

main {
    padding: 16px;
}

footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    border-top: 1px solid #000;
    padding: 8px;
    justify-content: space-between;
    display: flex;
    box-sizing: border-box;
}
</style>