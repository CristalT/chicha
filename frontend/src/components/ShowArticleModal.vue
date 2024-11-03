<script setup lang="ts">
import FormInput from './FormInput.vue'
import Button from './Button.vue'
import { Article } from '../types';
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useTemplateRef, watch, watchEffect } from 'vue';

const props = defineProps<{
    visible: boolean,
}>()

const qtyInput = useTemplateRef('qty-input')

const emit = defineEmits(['addToCart', 'close'])

const article = defineModel<Article>({ required: true })

const isVisible = computed(() => props.visible)

function closeOnEscKeyPressed(e: KeyboardEvent) {
    if (e.code === 'Escape') {
        emit('close')
    }
}

function bootListeners(imVisible: boolean) {
    if (imVisible) {
        document.addEventListener('keyup', closeOnEscKeyPressed)
    } else {
        document.removeEventListener('keyup', closeOnEscKeyPressed)
    }
}


watchEffect(() => {
    if (qtyInput.value) {
        qtyInput.value.focus()
        qtyInput.value.select()
    }
})

watch(isVisible, (val) => {
    bootListeners(val)
})


</script>
<template>
    <div class="modal" v-if="visible" @keypress.esc="emit('close')">
        <article>
            <header>
                {{ article.description }}
            </header>
            <main>
                <h3>Código: {{ article.code }}</h3>
                <h3>Precio: $ {{ article.price }}</h3>
                <h3>Cantidad:
                    <FormInput ref="qty-input" v-model="article.qty" @keyup.enter="emit('addToCart', article)" />
                </h3>
            </main>
            <footer>
                <Button variant="secondary" label="Editar" />
                <Button variant="primary" label="Agregar al Carrito" @click="emit('addToCart', article)" />
            </footer>
        </article>
    </div>
</template>

<style lang="css" scoped>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal article {
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