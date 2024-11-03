<script setup lang="ts">
import useCart from '../composables/useCart';
import Button from './Button.vue'
import Modal from './Modal.vue'
import { Article } from '../types';
import { computed, ref, watchEffect } from 'vue';
import { Sale } from '../../wailsjs/go/main/App';

const { getStoredCart, finishCart } = useCart()

const props = defineProps<{
    visible: boolean
}>()

const emit = defineEmits(['close', 'finish'])
const isVisible = computed(() => props.visible)
const items = ref<Record<string, Article>>()

watchEffect(() => {
    if (isVisible.value) {
        items.value = getStoredCart()
    }
})

function amount(item: Article) {
    return item.price * item.qty!
}

function finish() {
    // @ts-ignore
    Sale(Object.values(items.value)).then(() => {

        finishCart()
        emit('finish')
    }).catch(console.log)
}

</script>
<template>
    <Modal :visible @close="emit('close')">
        <article>
            <header>
                Carrito
            </header>
            <main>
                <table>
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Descripción</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Importe</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, key) in items" :key>
                            <td>{{ item.code }}</td>
                            <td>{{ item.description }}</td>
                            <td>{{ item.price }}</td>
                            <td>{{ item.qty }}</td>
                            <td class="text-right price-cell">{{ amount(item) }}</td>
                        </tr>
                    </tbody>
                </table>
            </main>
            <footer style="text-align: right;">
                <Button label="Finalizar" @click="finish" />
            </footer>
        </article>
    </Modal>
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
    height: 460px;
    width: 80vw;
    border-radius: 3px;
}

main {
    overflow-y: scroll;
    height: calc(100% - 100px);
}

header {
    border-bottom: 1px solid #000;
    padding: 8px;
    text-align: center;
}

table {
    & thead {
        position: sticky;
        top: 0;
        background-color: #b31e8b;
        color: #fff
    }

    & tbody tr td {
        border: 1px solid;
        padding: 4px;
    }
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