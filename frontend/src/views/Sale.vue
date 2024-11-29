<script setup lang="ts">
import useCart from '../composables/useCart';
import Button from '../components/Button.vue'

import { main } from '../../wailsjs/go/models'
import { computed, ref } from 'vue';
import Layout from '../components/Layout.vue';
import { Sale } from '../../wailsjs/go/main/App';
import { useRouter } from 'vue-router';

const router = useRouter()

const { getStoredCart } = useCart()

const { finishCart, removeFromCart } = useCart()

const emit = defineEmits(['close', 'finish'])
const items = ref<Record<string, main.Sale>>({})

const total = computed(() => {
    return Object.values(items.value).reduce((acc: number, item: main.Sale) => {
        acc += item.price * item.qty!
        return acc
    }, 0)
})

function amount(item: main.Sale) {
    return item.price * item.qty!
}

function finish() {
    const payload = Object.values(items.value)

    Sale(payload).then(() => {
        finishCart()
        router.push({ name: 'articles' })
    }).catch(console.log)
}

function emptyCart() {
    finishCart()
    router.push({ name: 'articles' })
}

function removeItem(item: main.Sale) {
    items.value = removeFromCart(item)
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
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, key) in items" :key="key">
                    <td>{{ item.code }}</td>
                    <td>{{ item.description }}</td>
                    <td class="text-right price">{{ item.price }}</td>
                    <td class="text-center">{{ item.qty }}</td>
                    <td class="text-right price">{{ amount(item) }}</td>
                    <td>
                        <Button variant="tertiary" label="Eliminar" @click="removeItem(item)"></Button>
                    </td>
                </tr>
            </tbody>
        </table>
        <template #footer>

            <div>
                Total: <strong>$ {{ total }}</strong>
            </div>
            <div class="row gap">
                <Button label="Volver" variant="tertiary" @click="$router.push({ name: 'articles' })" />

                <Button label="Vaciar" @click="emptyCart" variant="secondary" />
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