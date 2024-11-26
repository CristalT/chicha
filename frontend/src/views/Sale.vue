<script setup lang="ts">
import useCart from '../composables/useCart';
import Button from '../components/Button.vue'

import { main } from '../../wailsjs/go/models'
import { computed, ref } from 'vue';
import Layout from '../components/Layout.vue';
import { Sale } from '../../wailsjs/go/main/App';


const { getStoredCart } = useCart()

const { finishCart } = useCart()

const emit = defineEmits(['close', 'finish'])
const items = ref<Record<string, main.Sale>>({})

const total = computed(() => {
    return Object.values(items.value).reduce((acc: number, item: main.Sale) => {
        acc += item.Price * item.Qty!
        return acc
    }, 0)
})

function amount(item: main.Sale) {
    return item.Price * item.Qty!
}

function finish() {
    Sale(Object.values(items.value)).then(() => {
        finishCart()
        emit('finish')
    }).catch(console.log)
}

function cancelCart() {
    finishCart()
    emit('close')
}

items.value = getStoredCart()

</script>
<template>
    <Layout>
        <template #header>
            <div class="title">
                Memo de venta
            </div>
        </template>
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
                    <td>{{ item.Code }}</td>
                    <td>{{ item.Description }}</td>
                    <td class="text-right price">{{ item.Price }}</td>
                    <td class="text-center">{{ item.Qty }}</td>
                    <td class="text-right price">{{ amount(item) }}</td>
                </tr>
            </tbody>
        </table>
        <template #footer>

            <div>
                Total: <strong>$ {{ total }}</strong>
            </div>
            <div class="row gap">
                <Button label="Volver" variant="secondary" @click="$router.push({ name: 'articles' })" />

                <Button label="Vaciar" @click="cancelCart" variant="secondary" />
                <Button label="Finalizar" @click="finish" />
            </div>
        </template>
    </Layout>
</template>

<style lang="css" scoped>
.title {
    font-size: 1.5rem;
    text-align: center;
    color: var(--secondary-color);
    padding: 8px;
}
</style>