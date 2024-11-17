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
const items = ref<Record<string, Article>>({})

const total = computed(() => {
    return Object.values(items.value).reduce((acc: number, item: Article) => {
        acc += item.price * item.qty!
        return acc
    }, 0)
})

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

function cancelCart() {
    finishCart()
    emit('close')
}

</script>
<template>
    <Modal :visible @close="emit('close')" title="Carrito">
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

        <template #footer>
            <div>
                Total: <strong>$ {{ total }}</strong>
            </div>
            <div class="row gap">
                <Button label="Vaciar" @click="cancelCart" variant="secondary" />
                <Button label="Finalizar" @click="finish" />
            </div>
        </template>

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

.modal table {
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
</style>