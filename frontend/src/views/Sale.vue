<script setup lang="ts">
import useCart from '../composables/useCart';

import { main } from '../../wailsjs/go/models'
import { computed, ref } from 'vue';
import Layout from '../components/Layout.vue';
import { Sale } from '../../wailsjs/go/main/App';
import { useRouter } from 'vue-router';
import { DeleteIcon, EditIcon, CheckIcon, ArrowLeftIcon } from '../components/Icons';
import { FormInput, Button } from '../components/ui';


const router = useRouter()

const { getStoredCart } = useCart()

const { finishCart, removeFromCart } = useCart()

const emit = defineEmits(['close', 'finish'])
const items = ref<Record<string, main.Sale>>({})
const isEditing = ref<number>();

const total = computed(() => {
    return Object.values(items.value).reduce((acc: number, item: main.Sale) => {
        acc += item.price * item.qty!
        return acc
    }, 0)
})

const hasItems = computed(() => {
    return Object.keys(items.value).length > 0
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

function editItem(item: main.Sale) {
    isEditing.value = item.articleId
}

function saveChanges() {
    if (isEditing.value === undefined) return
    items.value[isEditing.value] = {
        ...items.value[isEditing.value],
        qty: Number(items.value[isEditing.value].qty)
    }

    isEditing.value = undefined

}
items.value = getStoredCart()

</script>
<template>
    <Layout>
        <template #header>
            <div class="title">
                Carrito
            </div>
        </template>
        <table>
            <thead>
                <tr>
                    <th class="text-center">Código</th>
                    <th class="text-left">Descripción</th>
                    <th class="text-right">Precio</th>
                    <th class="text-center">Cantidad</th>
                    <th class="text-right">Importe</th>
                    <th></th>
                </tr>
            </thead>
            <tbody v-if="hasItems">
                <tr v-for="(item, key) in items" :key="key">
                    <td class="text-center">{{ item.code }}</td>
                    <td>{{ item.description }}</td>
                    <td class="text-right price">{{ item.price }}</td>
                    <td class="text-center" v-if="!isEditing || isEditing !== item.articleId">{{ item.qty }}</td>
                    <td class="text-center" v-else>
                        <FormInput type="number" v-model="item.qty" style="width: 100px; margin: 0 auto"
                            @keyup.enter.stop="saveChanges" />
                    </td>
                    <td class="text-right price">{{ amount(item) }}</td>
                    <td>
                        <div class="flex row gap justify-center" v-if="!isEditing || isEditing !== item.articleId">
                            <Button variant="tertiary" @click="removeItem(item)">
                                <DeleteIcon />
                            </Button>
                            <Button variant="tertiary" @click="editItem(item)">
                                <EditIcon />
                            </Button>
                        </div>
                        <div class="flex row gap justify-center" v-else>
                            <Button variant="tertiary" @click="saveChanges">
                                <CheckIcon />
                            </Button>
                        </div>
                    </td>

                </tr>
            </tbody>
            <tbody v-else>
                <tr>
                    <td colspan="6">No hay artículos en el carrito.</td>
                </tr>
            </tbody>
        </table>
        <template #footer>

            <div class="total">
                Total: $ {{ total }}
            </div>
            <div class="row gap">
                <Button variant="tertiary" @click="$router.push({ name: 'articles' })">
                    <ArrowLeftIcon /> Volver
                </Button>

                <Button @click="emptyCart" variant="secondary">
                    <DeleteIcon /> Vaciar
                </Button>
                <Button @click="finish">
                    <CheckIcon /> Finalizar
                </Button>
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
.total {
    font-size: 1.5rem;
    padding: 0 8px;
}
</style>